// src/components/TemplateForm.js

import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const TemplateForm = ({ onSave, onCancel, currentTemplate, availableTags }) => {
  const [title, setTitle] = useState('');
  const [subtopics, setSubtopics] = useState([{ name: '', description: '' }]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [parsedText, setParsedText] = useState('');

  useEffect(() => {
    if (currentTemplate) {
      setTitle(currentTemplate.title);
      setSubtopics(
        currentTemplate.subtopics.length > 0
          ? currentTemplate.subtopics
          : [{ name: '', description: '' }]
      );
      setSelectedTags(currentTemplate.tags || []);
      setParsedText(currentTemplate.parsedText || '');
    } else {
      setTitle('');
      setSubtopics([{ name: '', description: '' }]);
      setSelectedTags([]);
      setParsedText('');
    }
  }, [currentTemplate]);

  const handleSubtopicChange = (index, field, value) => {
    const updatedSubtopics = [...subtopics];
    updatedSubtopics[index][field] = value;
    setSubtopics(updatedSubtopics);
  };

  const addSubtopic = () => {
    setSubtopics([...subtopics, { name: '', description: '' }]);
  };

  const removeSubtopic = (index) => {
    const updatedSubtopics = subtopics.filter((_, i) => i !== index);
    setSubtopics(
      updatedSubtopics.length > 0 ? updatedSubtopics : [{ name: '', description: '' }]
    );
  };

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleFileUpload = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension === 'pdf') {
      parsePDF(file);
    } else if (fileExtension === 'docx') {
      parseDOCX(file);
    } else {
      alert('Unsupported file format. Please upload a PDF or DOCX file.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
  });

  const parsePDF = (file) => {
    const reader = new FileReader();

    reader.onload = function () {
      const typedarray = new Uint8Array(this.result);

      pdfjsLib.getDocument(typedarray).promise.then((pdf) => {
        let textContent = '';

        const numPages = pdf.numPages;
        const promises = [];

        for (let i = 1; i <= numPages; i++) {
          promises.push(
            pdf.getPage(i).then((page) => {
              return page.getTextContent().then((content) => {
                const pageText = content.items.map((item) => item.str).join(' ');
                textContent += pageText + '\n';
              });
            })
          );
        }

        Promise.all(promises).then(() => {
          setParsedText(textContent);
        });
      }).catch((error) => {
        console.error('Error parsing PDF:', error);
        alert('Failed to parse PDF file.');
      });
    };

    reader.onerror = function () {
      console.error('Error reading PDF file.');
      alert('Failed to read PDF file.');
    };

    reader.readAsArrayBuffer(file);
  };

  const parseDOCX = (file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const arrayBuffer = e.target.result;

      mammoth.extractRawText({ arrayBuffer })
        .then((result) => {
          setParsedText(result.value);
        })
        .catch((error) => {
          console.error('Error parsing DOCX:', error);
          alert('Failed to parse DOCX file.');
        });
    };

    reader.onerror = function () {
      console.error('Error reading DOCX file.');
      alert('Failed to read DOCX file.');
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      alert('Title is required.');
      return;
    }

    // Validate that all subtopics have name and description
    for (let i = 0; i < subtopics.length; i++) {
      if (subtopics[i].name.trim() === '' || subtopics[i].description.trim() === '') {
        alert(`Both name and description are required for subtopic ${i + 1}.`);
        return;
      }
    }

    onSave({ title, subtopics, tags: selectedTags, parsedText });
    setTitle('');
    setSubtopics([{ name: '', description: '' }]);
    setSelectedTags([]);
    setParsedText('');
  };

  return (
    <div className="template-form">
      <h2>{currentTemplate ? 'Edit Template' : 'Add New Template'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="template-title">Title:</label>
          <input
            id="template-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter template title"
            required
          />
        </div>

        {/* Tags Selection */}
        <div className="form-group">
          <label>Tags:</label>
          <div className="tags-selection-container">
            {availableTags.map((tag, index) => (
              <label key={index} className="tag-checkbox-label">
                <input
                  type="checkbox"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                />
                {tag}
              </label>
            ))}
          </div>
          <div className="selected-tags-container">
            {selectedTags.map((tag, index) => (
              <span key={index} className="selected-tag">
                {tag}
                <button
                  type="button"
                  className="remove-tag-button"
                  onClick={() => handleTagToggle(tag)}
                  aria-label={`Remove tag ${tag}`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <small>Select from predefined tags.</small>
        </div>

        {/* Drag and Drop File Upload */}
        <div className="form-group">
          <label>Upload File (PDF or DOCX):</label>
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the file here ...</p> :
                <p>Drag & drop a PDF or DOCX file here, or click to select file</p>
            }
          </div>
          {parsedText && (
            <div className="parsed-text-container">
              <label htmlFor="parsed-text">Parsed Text:</label>
              <textarea
                id="parsed-text"
                value={parsedText}
                onChange={(e) => setParsedText(e.target.value)}
                placeholder="Parsed text will appear here..."
                rows="10"
              ></textarea>
            </div>
          )}
          <small>Drag and drop a PDF or DOCX file to parse its content.</small>
        </div>

        {/* Subtopics */}
        <div className="form-group">
          <label>Subtopics:</label>
          {subtopics.map((subtopic, index) => (
            <div key={index} className="subtopic">
              <input
                type="text"
                value={subtopic.name}
                onChange={(e) => handleSubtopicChange(index, 'name', e.target.value)}
                placeholder="Subtopic Name"
                required
              />
              <textarea
                value={subtopic.description}
                onChange={(e) => handleSubtopicChange(index, 'description', e.target.value)}
                placeholder="Subtopic Description"
                rows="3"
                required
              ></textarea>
              <div className="subtopic-buttons">
                {subtopics.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubtopic(index)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                )}
                {index === subtopics.length - 1 && (
                  <button type="button" onClick={addSubtopic} className="add-button">
                    Add Subtopic
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form Buttons */}
        <div className="form-buttons">
          <button type="submit" className="save-button">
            Save
          </button>
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplateForm;
