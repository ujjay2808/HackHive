import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { initSocket } from "../Socket";
import { ACTIONS } from "../Actions";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Logo from './Logo';
import './EditorPage.css';

// List of supported languages
const LANGUAGES = [
  { value: "python3", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "csharp", label: "C#" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "swift", label: "Swift" },
  { value: "sql", label: "SQL" },
];

function EditorPage() {
  const [clients, setClients] = useState([]);
  const [output, setOutput] = useState("");
  const [isCompileWindowOpen, setIsCompileWindowOpen] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python3");
  const codeRef = useRef(null);

  const Location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const socketRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log("Error", err);
        toast.error("Socket connection failed, Try again later");
        navigate("/");
      };

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: Location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== Location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });

      // Listen for language changes from other users
      socketRef.current.on(ACTIONS.LANGUAGE_CHANGE, ({ language }) => {
        setSelectedLanguage(language);
        toast.success(`Language changed to ${LANGUAGES.find(l => l.value === language)?.label || language}`);
      });
    };
    init();

    return () => {
      socketRef.current && socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current.off(ACTIONS.LANGUAGE_CHANGE);
    };
  }, []);

  if (!Location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room ID copied to clipboard!`);
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy the room ID");
    }
  };

  const leaveRoom = async () => {
    navigate("/");
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);

    // Emit language change to all users in the room
    socketRef.current.emit(ACTIONS.LANGUAGE_CHANGE, {
      roomId,
      language: newLanguage,
    });
  };

  const runCode = async () => {
    setIsCompiling(true);
    try {
      const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
      const response = await axios.post(`${backendURL}/compile`, {
        code: codeRef.current,
        language: selectedLanguage,
      });
      console.log("Backend response:", response.data);
      setOutput(response.data.output || JSON.stringify(response.data));
    } catch (error) {
      console.error("Error compiling code:", error);
      setOutput(error.response?.data?.error || "An error occurred");
    } finally {
      setIsCompiling(false);
    }
  };

  const toggleCompileWindow = () => {
    setIsCompileWindowOpen(!isCompileWindowOpen);
  };

  return (
    <div className="editor-container">
      {/* Sidebar */}
      <div className="editor-sidebar">
        <div className="editor-sidebar-logo">
          <Logo size="small" />
        </div>

        <div className="editor-members-title">MEMBERS</div>
        <div className="editor-members-list">
          {clients.map((client) => (
            <Client key={client.socketId} username={client.username} />
          ))}
        </div>

        <div className="editor-sidebar-actions">
          <button className="editor-btn editor-btn-copy" onClick={copyRoomId}>
            📋 Copy Room ID
          </button>
          <button className="editor-btn editor-btn-leave" onClick={leaveRoom}>
            🚪 Leave Room
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="editor-main">
        <div className="editor-toolbar">
          <select
            className="language-selector"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="editor-wrapper">
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            language={selectedLanguage}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
      </div>

      {/* Compiler Toggle Button */}
      <button
        className="compiler-toggle-btn"
        onClick={toggleCompileWindow}
      >
        {isCompileWindowOpen ? "⬇️ Close Compiler" : "⬆️ Open Compiler"}
      </button>

      {/* Compiler Window */}
      <div className={`compiler-window ${!isCompileWindowOpen ? 'hidden' : ''}`}>
        <div className="compiler-header">
          <div className="compiler-title">
            💻 Output ({LANGUAGES.find(l => l.value === selectedLanguage)?.label})
          </div>
          <div className="compiler-actions">
            <button
              className="compiler-btn-run"
              onClick={runCode}
              disabled={isCompiling}
            >
              {isCompiling ? "⏳ Running..." : "▶️ Run Code"}
            </button>
            <button className="compiler-btn-close" onClick={toggleCompileWindow}>
              ✕ Close
            </button>
          </div>
        </div>
        <div className="compiler-output">
          <pre>{output || "Output will appear here after running your code..."}</pre>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;