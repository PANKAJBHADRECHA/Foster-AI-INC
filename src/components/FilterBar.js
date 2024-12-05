// src/components/FilterBar.js

import React, { useState } from 'react';

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  filterHighlight,
  setFilterHighlight,
  availableTags,
  filterTags,
  setFilterTags,
}) => {
  const [isHighlightDropdownOpen, setIsHighlightDropdownOpen] = useState(false);
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);

  const handleTagChange = (tag) => {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter((t) => t !== tag));
    } else {
      setFilterTags([...filterTags, tag]);
    }
  };

  return (
    <div className="filter-bar">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Highlight Filter Dropdown */}
      <div className="dropdown filter-highlight">
        <button
          className="dropbtn"
          onClick={() => setIsHighlightDropdownOpen(!isHighlightDropdownOpen)}
        >
          Filter Highlight
        </button>
        {isHighlightDropdownOpen && (
          <div className="dropdown-content">
            <label>
              <input
                type="radio"
                name="highlight-filter"
                value="all"
                checked={filterHighlight === 'all'}
                onChange={() => setFilterHighlight('all')}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="highlight-filter"
                value="highlighted"
                checked={filterHighlight === 'highlighted'}
                onChange={() => setFilterHighlight('highlighted')}
              />
              Highlighted
            </label>
            <label>
              <input
                type="radio"
                name="highlight-filter"
                value="non-highlighted"
                checked={filterHighlight === 'non-highlighted'}
                onChange={() => setFilterHighlight('non-highlighted')}
              />
              Non-Highlighted
            </label>
          </div>
        )}
      </div>

      {/* Tags Filter Dropdown */}
      <div className="dropdown filter-tags">
        <button
          className="dropbtn"
          onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
        >
          Filter Tags
        </button>
        {isTagsDropdownOpen && (
          <div className="dropdown-content tags-dropdown">
            {availableTags.map((tag, index) => (
              <label key={index} className="tag-label">
                <input
                  type="checkbox"
                  value={tag}
                  checked={filterTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                {tag}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
