// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <h1 className="logo">📰 News Aggregator</h1>

      <nav className="nav-links">
        <Link to="/" className="nav-btn">🏠 Home</Link>
        <Link to="/bookmarks" className="nav-btn bookmark-link">⭐ Bookmarks</Link>
        <button className="dark-mode-btn" onClick={toggleDarkMode}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
