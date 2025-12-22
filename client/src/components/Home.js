import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Logo from './Logo';
import './Home.css';

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room ID generated successfully!");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both fields are required");
      return;
    }

    // redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("Joining room...");
  };

  // when enter then also join
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <div className="home-logo-container">
          <Logo size="large" />
        </div>

        <h4 className="home-title">Enter the ROOM ID</h4>

        <div className="home-input-group">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="home-input"
            placeholder="ROOM ID"
            onKeyUp={handleInputEnter}
          />
        </div>

        <div className="home-input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="home-input"
            placeholder="USERNAME"
            onKeyUp={handleInputEnter}
          />
        </div>

        <button
          onClick={joinRoom}
          className="home-join-btn"
        >
          JOIN ROOM
        </button>

        <p className="home-create-room">
          Don't have a room ID?{" "}
          <span
            onClick={generateRoomId}
            className="home-create-link"
          >
            Create New Room
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;