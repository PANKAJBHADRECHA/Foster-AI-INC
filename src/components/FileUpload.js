// src/components/FileUpload.js
import React, { useState } from 'react';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

const FileUpload = ({ onFileParsed }) => {
  const [error, setError] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setError(null);
    const file = e.dataTransfer.files[0];
    if (file) {
      parseFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const parseFile = (file) => {
    const fileType = file.type;

    if (fileType === 'application/pdf') {
      parsePDF(file);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      parseDOCX(file);
    } else {
      setError('Unsupported file type');
    }
  };

  const parsePDF = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const loadingTask = pdfjsLib.getDocument(event.target.result);
      loadingTask.promise.then(
        (pdf) => {
          const numPages = pdf.numPages;
          let text = '';
          const promises = [];

          for (let i = 1; i <= numPages; i++) {
            promises.push(
              pdf.getPage(i).then((page) => {
                return page.getTextContent().then((content) => {
                  content.items.forEach((item) => {
                    text += item.str + ' ';
                  });
                });
              })
            );
          }

          Promise.all(promises).then(() => {
            onFileParsed(text);
          });
        },
        (error) => {
          setError('Error parsing PDF: ' + error);
        }
      );
    };
    reader.readAsArrayBuffer(file);
  };

  const parseDOCX = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      mammoth.extractRawText({ arrayBuffer })
        .then((result) => {
          onFileParsed(result.value);
        })
        .catch((error) => {
          setError('Error parsing DOCX: ' + error);
        });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={styles.dropArea}
    >
      <p>Drag & Drop a .docx or .pdf file here</p>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  dropArea: {
    border: '2px dashed #ccc',
    padding: '20px',
    textAlign: 'center',
    marginTop: '20px',
    borderRadius: '4px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default FileUpload;
