import React from 'react';
import Avatar from 'react-avatar';
import './Client.css';

function Client({ username }) {
  return (
    <div className="client-container">
      <div className="client-avatar">
        <Avatar 
          name={username.toString()} 
          size={40} 
          round="10px" 
        />
      </div>
      <span className="client-username">{username.toString()}</span>
    </div>
  );
}

export default Client;