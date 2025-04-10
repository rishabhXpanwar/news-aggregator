// src/components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

const suggestions = ['Bitcoin', 'Elon Musk', 'NASA', 'AI', 'SpaceX', 'India', 'Elections'];

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
    setShowSuggestions(false);
  };

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="search-bar-container">
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search news..."
          value={input}
          onChange={handleInput}
          onFocus={() => setShowSuggestions(input.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />
        <button className="search-button" type="submit">🔍</button>
      </form>

      {showSuggestions && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((s, i) => (
            <li key={i} className="suggestion-item" onClick={() => handleSuggestionClick(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
