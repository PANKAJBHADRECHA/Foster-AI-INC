// src/components/Pagination.js

import React from 'react';

const Pagination = ({ totalPages, currentPage, paginate, handleLimitChange, templatesPerPage }) => {
  const pageNumbers = [];

  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle large number of pages by showing only a subset
  const getPageNumbersToShow = () => {
    const maxPageNumbersToShow = 5;
    const halfRange = Math.floor(maxPageNumbersToShow / 2);
    let start = currentPage - halfRange;
    let end = currentPage + halfRange;

    if (start < 1) {
      start = 1;
      end = Math.min(totalPages, maxPageNumbersToShow);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxPageNumbersToShow + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pagesToShow = getPageNumbersToShow();

  return (
    <div className="pagination">
      <div className="limit-selector">
        <label htmlFor="limit">Templates per page:</label>
        <select id="limit" value={templatesPerPage} onChange={handleLimitChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="page-buttons">
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)} className="pagination-button">
            Prev
          </button>
        )}
        {pagesToShow.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`pagination-button ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => paginate(currentPage + 1)} className="pagination-button">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
