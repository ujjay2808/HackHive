import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium' }) => {
  return (
    <div className={`logo-container ${size}`}>
      <div className="logo-icon">
        <span className="bracket">{'<'}</span>
        <span className="slash">/</span>
        <span className="bracket">{'>'}</span>
      </div>
      <span className="logo-text">HackHive</span>
    </div>
  );
};

export default Logo;