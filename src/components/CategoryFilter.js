import React from 'react';
import './CategoryFilter.css';

const categories = [
  'general',
  'business',
  'technology',
  'sports',
  'health',
  'entertainment',
  'science',
  'trending', // 🔥 Trending added here
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      {categories.map(cat => (
        <button
          key={cat}
          className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat === 'trending' ? '🔥 Trending' : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
