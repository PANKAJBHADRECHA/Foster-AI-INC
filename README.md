# Clinical Note Templates

![React](https://img.shields.io/badge/React-17.0.2-blue.svg)
![PDF.js](https://img.shields.io/badge/PDF.js-3.6.157-blue.svg)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

**Clinical Note Templates** is a React-based web application designed to streamline the creation, management, and organization of clinical notes. The application offers robust features including template creation with subtopics and descriptions, predefined tag management, filtering, highlighting, theming, and advanced file parsing capabilities for PDF and DOCX documents.

## Features

### Template Management

- **Add Templates:** Create new clinical note templates with fields for subtopics and descriptions.
- **Edit Templates:** Modify existing templates to update information as needed.
- **Highlight Templates:** Mark important templates for quick access and emphasis.
- **Copy Templates:** Easily copy entire templates for reuse.

### Tagging System

- **Predefined Tags:** Assign predefined tags to templates for better categorization and organization.
- **Filter by Tags:** Easily filter templates based on selected tags to find relevant notes quickly.

### Theming

- **Dark & Light Modes:** Toggle between dark and light themes to suit your preference and reduce eye strain.

### File Parsing (Bonus Feature)

- **Upload Files:** Drag and drop or select PDF and DOCX files to parse and extract their content.
- **Extract Text:** Parse and extract text content from uploaded PDF and DOCX files, integrating it into your templates.
- **Error Handling:** Provides meaningful feedback in case of unsupported file types or parsing errors.

## Demo

![App Screenshot](./screenshots/app-screenshot.png)

*Figure 1: Screenshot of Clinical Note Templates application.*

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/) - Frontend library for building user interfaces.
  - [React Icons](https://react-icons.github.io/react-icons/) - Icon library for React.
  - [pdfjs-dist](https://github.com/mozilla/pdf.js/) - PDF parsing library.
  - [Mammoth.js](https://github.com/mwilliamson/mammoth.js/) - DOCX parsing library.
  - [React Dropzone](https://react-dropzone.js.org/) - File upload component for React.

- **Styling:**
  - CSS3 - Styling the application components.

- **Tooling:**
  - [Create React App](https://create-react-app.dev/) - Toolchain for setting up the React application.

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- **Node.js** (v12 or above)
- **npm** or **Yarn** package manager

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/clinical-note-templates.git
   cd clinical-note-templates


2. **Install Dependencies**

   ```bash
   npm install


3. **Start the Development Server**

   ```bash
   npm start


**Usage**

###  Accessing the Application
Open your browser and navigate to `http://localhost:3000`.

### Creating a New Template
1. Click on the "Add Template" button.
2. Fill in the necessary fields:
   - **Title:** Enter the template title.
   - **Subtopics:** Add relevant subtopics.
   - **Description:** Provide a description of the template.
3. Assign predefined tags for better organization.
4. Click "Save" to store the template.

### Managing Templates
- **Edit:** Click on a template to modify its details.
- **Highlight:** Use the highlight feature to mark important templates.
- **Copy:** Duplicate an existing template for reuse.

### Tagging and Filtering
- Assign tags to categorize templates.
- Use the filter option to view templates based on selected tags.

### Theming
Toggle between dark and light modes using the theme switcher in the header.

### File Parsing
1. Navigate to the "Upload" section.
2. Drag and drop or select a PDF/DOCX file.
3. The application will parse and extract the text, integrating it into your templates.
