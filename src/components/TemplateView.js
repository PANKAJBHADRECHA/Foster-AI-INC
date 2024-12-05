// src/components/TemplateView.js

import React, { useState } from 'react';
import { FaMagic, FaCheckCircle, FaPencilAlt, FaCopy } from 'react-icons/fa';
import { format } from 'date-fns';

const TemplateView = ({ template, onEdit, onBack, toggleHighlight }) => {
  const { title, subtopics, createdAt, highlighted, tags } = template;
  const [showTags, setShowTags] = useState(false); // State to toggle tag dropdown

  const copySubtopicToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Subtopic description copied to clipboard!');
      })
      .catch((err) => {
        alert('Failed to copy text: ', err);
      });
  };

  const copyWholeTemplate = () => {
    let templateContent = `Title: ${title}\nPosted At: ${format(new Date(createdAt), 'PPP p')}\n\n`;
    subtopics.forEach((subtopic, index) => {
      templateContent += `Subtopic ${index + 1}: ${subtopic.name}\nDescription: ${subtopic.description}\n\n`;
    });

    navigator.clipboard
      .writeText(templateContent)
      .then(() => {
        alert('Whole template copied to clipboard!');
      })
      .catch((err) => {
        alert('Failed to copy template: ', err);
      });
  };

  return (
    <div className="template-view">
      <div className="template-title-container">
        <div>
          <h2 className="template-title">{title}</h2>
          <p className="template-time">Posted At: {format(new Date(createdAt), 'PPP p')}</p>
          {/* Tags Dropdown */}
          {tags && tags.length > 0 && (
            <div className="tags-dropdown-container">
              <button
                className="dropbtn tags-dropbtn"
                onClick={() => setShowTags(!showTags)}
              >
                Tags
              </button>
              {showTags && (
                <div className="tags-dropdown-content">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="icons-container">
          <FaMagic
            className={`icon magic-icon ${highlighted ? 'highlighted-icon' : ''}`}
            title="Toggle Highlight"
            onClick={toggleHighlight}
          />
          <FaCheckCircle className="icon check-icon" title="Verified Template" />
          <FaPencilAlt className="icon edit-icon" title="Edit Template" onClick={onEdit} />
          <FaCopy className="icon copy-icon" title="Copy Template" onClick={copyWholeTemplate} />
        </div>
      </div>
      {subtopics.map((subtopic, index) => (
        <div key={index} className="subtopic-view">
          <div className="subtopic-header">
            <h3>{subtopic.name}</h3>
            <button
              onClick={() => copySubtopicToClipboard(subtopic.description)}
              className="copy-button"
              title="Copy Description"
            >
              📋
            </button>
          </div>
          <p>{subtopic.description}</p>
        </div>
      ))}
      <div className="view-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};

export default TemplateView;
