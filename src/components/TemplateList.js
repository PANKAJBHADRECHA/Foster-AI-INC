// src/components/TemplateList.js

import React from 'react';
import { format } from 'date-fns';
import { FaMagic } from 'react-icons/fa';

const TemplateList = ({ templates, onSelect, toggleHighlight, templatesAll }) => {
  return (
    <div className="template-list">
      <h2>Saved Templates</h2>
      {templates.length === 0 ? (
        <p>No templates available. Please add a new template.</p>
      ) : (
        <ul>
          {templates.map((template) => {
            const index = templatesAll.indexOf(template);
            return (
              <li
                key={index}
                onClick={() => onSelect(index)}
                className={template.highlighted ? 'highlighted' : ''}
              >
                <div className="template-item">
                  <div className="template-info">
                    <h3>{template.title}</h3>
                    <p className="template-time">{format(new Date(template.createdAt), 'PPP p')}</p>
                    {template.tags && template.tags.length > 0 && (
                      <div className="template-tags">
                        {template.tags.map((tag, idx) => (
                          <span key={idx} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <FaMagic
                    className={`icon magic-icon list-icon ${template.highlighted ? 'highlighted-icon' : ''}`}
                    title="Toggle Highlight"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering onSelect
                      toggleHighlight(index);
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TemplateList;
