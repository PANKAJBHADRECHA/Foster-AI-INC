// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Ensure this file exists and contains necessary styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
