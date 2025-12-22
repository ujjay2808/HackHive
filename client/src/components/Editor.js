import React, { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

// Import all language modes
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike"; // For Java, C, C++, C#
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/go/go";
import "codemirror/mode/rust/rust";
import "codemirror/mode/php/php";
import "codemirror/mode/swift/swift";
import "codemirror/mode/sql/sql";

import CodeMirror from "codemirror";
import { ACTIONS } from "../Actions";

// Language mode mapping
const LANGUAGE_MODE_MAP = {
  python3: { name: "python" },
  javascript: { name: "javascript" },
  typescript: { name: "javascript", typescript: true },
  java: { name: "text/x-java" },
  cpp: { name: "text/x-c++src" },
  c: { name: "text/x-csrc" },
  csharp: { name: "text/x-csharp" },
  ruby: { name: "ruby" },
  go: { name: "go" },
  rust: { name: "rust" },
  php: { name: "php" },
  swift: { name: "swift" },
  sql: { name: "sql" },
};

function Editor({ socketRef, roomId, onCodeChange, language }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: LANGUAGE_MODE_MAP[language] || { name: "javascript" },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          tabSize: 4,
          indentUnit: 4,
          indentWithTabs: false,
          lineWrapping: false,
        }
      );
      
      editorRef.current = editor;
      editor.setSize(null, "100%");

      // Code change listener
      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    init();
  }, []);

  // Update language mode when language changes
  useEffect(() => {
    if (editorRef.current && language) {
      const mode = LANGUAGE_MODE_MAP[language] || { name: "javascript" };
      editorRef.current.setOption("mode", mode);
    }
  }, [language]);

  // Receive code changes from other users
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <div style={{ height: "100%", overflow: "hidden" }}>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
}

export default Editor;