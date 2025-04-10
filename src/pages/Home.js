// src/pages/Home.js
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import NewsList from '../components/NewsList';
import './Home.css';

const Home = ({ darkMode, toggleDarkMode }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('general');

  return (
    <div className={`home-container ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <SearchBar onSearch={setQuery} />
      <CategoryFilter selectedCategory={category} onSelectCategory={setCategory} />
      <NewsList searchQuery={query} category={category} />
    </div>
  );
};

export default Home;
