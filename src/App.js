// src/App.js

import React, { useState, useEffect } from 'react';
import TemplateList from './components/TemplateList';
import TemplateForm from './components/TemplateForm';
import TemplateView from './components/TemplateView';
import Pagination from './components/Pagination';
import FilterBar from './components/FilterBar'; // Updated import
import { FaMoon, FaSun } from 'react-icons/fa'; // Icons for theme toggle
import './index.css';

const App = () => {
  const [templates, setTemplates] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'view', 'edit'
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [templatesPerPage, setTemplatesPerPage] = useState(20);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHighlight, setFilterHighlight] = useState('all'); // 'all', 'highlighted', 'non-highlighted'
  const [filterTags, setFilterTags] = useState([]);

  // Available Tags
  const availableTags = [
    'health',
    'wellness',
    'fitness',
    'medical',
    'healthcare',
    'mental health',
    'nutrition',
    'exercise',
    'disease',
    'prevention',
  ];

  // Load templates from localStorage on initial render
  useEffect(() => {
    const storedTemplates = localStorage.getItem('templates');
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates));
    }
  }, []);

  // Save templates to localStorage whenever templates state changes
  useEffect(() => {
    localStorage.setItem('templates', JSON.stringify(templates));
  }, [templates]);

  // Apply theme by adding/removing 'dark' class on body
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const handleAddClick = () => {
    setCurrentView('add');
    setSelectedIndex(null);
  };

  const handleSave = (template) => {
    const timestamp = new Date();
    const newTemplate = { ...template, createdAt: timestamp, highlighted: false };

    if (currentView === 'edit' && selectedIndex !== null) {
      // Edit existing template
      const updatedTemplates = [...templates];
      updatedTemplates[selectedIndex] = {
        ...updatedTemplates[selectedIndex],
        ...newTemplate,
        createdAt: updatedTemplates[selectedIndex].createdAt, // Keep original timestamp
      };
      setTemplates(updatedTemplates);
      setCurrentView('view');
    } else {
      // Add new template
      setTemplates([newTemplate, ...templates]); // Add to the beginning for recent first
      setCurrentView('list');
      setCurrentPage(1); // Reset to first page
    }
  };

  const handleCancel = () => {
    if (currentView === 'add') {
      setCurrentView('list');
    } else if (currentView === 'edit') {
      setCurrentView('view');
    }
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setCurrentView('view');
  };

  const handleEdit = () => {
    setCurrentView('edit');
  };

  const handleBack = () => {
    setCurrentView('list');
    setSelectedIndex(null);
  };

  // Toggle Highlighted State
  const toggleHighlight = (index) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index].highlighted = !updatedTemplates[index].highlighted;
    setTemplates(updatedTemplates);
  };

  // Search and Filter Logic
  const filteredTemplates = templates.filter((template) => {
    // Filter by search term
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by highlight status
    let matchesHighlight = true;
    if (filterHighlight === 'highlighted') {
      matchesHighlight = template.highlighted === true;
    } else if (filterHighlight === 'non-highlighted') {
      matchesHighlight = template.highlighted === false;
    }

    // Filter by tags
    let matchesTags = true;
    if (filterTags.length > 0) {
      matchesTags = filterTags.every((tag) => template.tags && template.tags.includes(tag));
    }

    return matchesSearch && matchesHighlight && matchesTags;
  });

  // Pagination logic
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = filteredTemplates.slice(indexOfFirstTemplate, indexOfLastTemplate);
  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLimitChange = (e) => {
    setTemplatesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when limit changes
  };

  // Theme toggle handler
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div className="app-container">
      <header>
        <h1>
          <span className="foster">Foster</span> <span className="health">Health</span>
        </h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkTheme ? <FaSun /> : <FaMoon />}
        </button>
      </header>
      {currentView === 'list' && (
        <>
          <div className="center-button">
            <button onClick={handleAddClick}>New Note</button>
          </div>
          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterHighlight={filterHighlight}
            setFilterHighlight={setFilterHighlight}
            availableTags={availableTags}
            filterTags={filterTags}
            setFilterTags={setFilterTags}
          />
          <TemplateList
            templates={currentTemplates}
            onSelect={handleSelect}
            toggleHighlight={toggleHighlight}
            templatesAll={templates}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
            handleLimitChange={handleLimitChange}
            templatesPerPage={templatesPerPage}
          />
        </>
      )}
      {(currentView === 'add' || currentView === 'edit') && (
        <TemplateForm
          onSave={handleSave}
          onCancel={handleCancel}
          currentTemplate={currentView === 'edit' && selectedIndex !== null ? templates[selectedIndex] : null}
          availableTags={availableTags}
        />
      )}
      {currentView === 'view' && selectedIndex !== null && (
        <TemplateView
          template={templates[selectedIndex]}
          onEdit={handleEdit}
          onBack={handleBack}
          toggleHighlight={() => toggleHighlight(selectedIndex)}
        />
      )}
    </div>
  );
};

export default App;
