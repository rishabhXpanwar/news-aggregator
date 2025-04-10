// src/pages/Bookmarks.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import './Bookmarks.css';

const Bookmarks = ({ darkMode, toggleDarkMode }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarked');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const removeBookmark = (url) => {
    const updated = bookmarks.filter((article) => article.url !== url);
    setBookmarks(updated);
    localStorage.setItem('bookmarked', JSON.stringify(updated));
  };

  return (
    <div className={`bookmarks-container ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <h2>⭐ Bookmarked Articles</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet!</p>
      ) : (
        bookmarks.map((article) => (
          <div key={article.url} className="news-card">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
            <button onClick={() => removeBookmark(article.url)}>❌ Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookmarks;
