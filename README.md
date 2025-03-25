# Module 10 Assignment: Project Architecture and DevOps Basics

## Overview

This project is a Learning Management System (LMS) built on the MERN stack, designed to be scalable and maintainable. The project is structured following modular design principles and integrates essential DevOps practices such as version control, CI/CD pipelines, and (optionally) containerization using Docker.

---

## Table of Contents

- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [DevOps and CI/CD Pipeline](#devops-and-cicd-pipeline)
- [Version Control and Branching Strategy](#version-control-and-branching-strategy)
- [Automated Testing](#automated-testing)
- [Optional: Docker Containerization](#optional-docker-containerization)
- [Getting Started](#getting-started)
- [Contribution Guidelines](#contribution-guidelines)

---

## Project Architecture

The LMS project follows a modular approach with a clear separation of concerns (SoC). The backend and frontend are separated into distinct directories, ensuring that each component is independently scalable and maintainable.

**Key Architectural Considerations:**

- **Separation of Backend and Frontend:**  
  - **Backend:** Node.js/Express server handling API routes, business logic, and database interactions.
  - **Frontend:** React application built with Vite and TypeScript for a responsive and interactive user interface.
  
- **Environment Variables:**  
  Sensitive data such as database URIs, API keys, and secrets are stored in `.env` files, ensuring security and flexibility across different environments.

- **Modular Code Organization:**  
  Each layer (controllers, models, services, and tests) in the backend is organized into its dedicated directory. Similarly, the frontend organizes components, pages, and context for state management.

---

## Folder Structure

```
Module10_Assignment_<YourName>/
│
├── backend/                     # Node.js/Express backend
│   ├── config/                  # Configuration files (e.g., environment variables)
│   │   └── config.js
│   ├── controllers/             # Route handlers
│   ├── models/                  # MongoDB models
│   ├── routes/                  # API routes
│   ├── services/                # Reusable database services (e.g., userService.js)
│   ├── tests/                   # Backend tests (e.g., user.test.js)
│   ├── .env                   # Backend environment variables
│   ├── app.js                   # Express application
│   └── package.json             # Backend dependencies and scripts
│
├── frontend/                    # React frontend
│   ├── components/              # Reusable React components
│   ├── context/                 # State management (e.g., Context API)
│   ├── pages/                   # Page components (e.g., Home, Dashboard)
│   ├── public/                  # Static files (index.html, favicon)
│   ├── src/                     # Main source code
│   ├── .env                   # Frontend environment variables
│   ├── App.tsx                  # Main app component
│   ├── index.tsx                # React entry point
│   ├── package.json             # Frontend dependencies and scripts
│   └── tsconfig.json            # TypeScript configuration
│
├── .gitignore                   # Git ignore file (node_modules, .env, etc.)
├── README.md                    # Project documentation
├── .github/                   
│   └── workflows/
│       └── ci.yml               # CI/CD pipeline configuration (GitHub Actions)
├── docker-compose.yml           # Docker Compose configuration (optional)
└── CONTRIBUTING.md              # Contribution guidelines (optional)
```

---

## Backend Setup

1. **Initialization and Dependencies:**

   Navigate to the `/backend` directory and initialize the project:
   ```bash
   cd backend
   npm init -y
   ```
   Install required dependencies:
   ```bash
   npm install express mongoose dotenv bcryptjs jsonwebtoken cors
   npm install --save-dev jest supertest
   ```

2. **Environment Variables:**

   Create a `.env` file with the following content:
   ```bash
   DB_URI=mongodb://localhost:27017/lms
   JWT_SECRET=your_jwt_secret
   ```

3. **Express Application:**

   Configure your Express application in `app.js`, load environment variables from `config/config.js`, and set up database connections and routes.

---

## Frontend Setup

1. **Project Initialization:**

   Navigate to the `/frontend` directory and initialize the project using Vite with a React TypeScript template:
   ```bash
   cd frontend
   npm create vite@latest . --template react-ts
   ```

2. **Install Dependencies:**

   Install additional libraries:
   ```bash
   npm install axios react-router-dom @tailwindcss/forms
   npm install --save-dev jest @testing-library/react
   ```

3. **Environment Variables:**

   Create a `.env` file with the following:
   ```bash
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Scripts:**

   Update the `package.json` scripts to include:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "test": "jest"
   }
   ```

---

## DevOps and CI/CD Pipeline

The project includes a CI/CD pipeline configured with GitHub Actions. The pipeline automates testing, building, and (optionally) deployment.

**Workflow File (.github/workflows/ci.yml):**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
      - development
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x, 16.x]
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: |
          cd backend && npm install
          cd ../frontend && npm install

      - name: Run backend tests
        run: |
          cd backend && npm test

      - name: Build frontend
        run: |
          cd frontend && npm run build

      - name: Deploy (optional step)
        run: |
          echo "Deploying app..."
          # Add deployment commands (e.g., using Heroku, AWS, etc.)
```

This pipeline checks out the code, sets up Node.js, installs dependencies, runs tests for both backend and frontend, and builds the React application.

---

## Version Control and Branching Strategy

The project uses Git for version control with the following workflow:

- **Repository Initialization:**
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  ```

- **.gitignore:**

  A sample `.gitignore` includes:
  ```bash
  node_modules/
  .env
  dist/
  .DS_Store
  ```

- **Branching Strategy:**
  - **main:** Contains stable, release-ready code.
  - **development:** Integration branch for ongoing features.
  - **feature/<feature-name>:** Separate branches for specific features (e.g., `feature/file-upload`).

- **Pushing to GitHub:**
  ```bash
  git remote add origin https://github.com/your-username/lms-project.git
  git push -u origin main
  ```
  Set up branch protection rules for `main` in your GitHub repository settings.

---

## Automated Testing

### Backend Testing

- **Test File Example:** `backend/tests/user.test.js`
  ```javascript
  const request = require('supertest');
  const app = require('../app');

  describe('GET /api/users', () => {
    it('should return a list of users', async () => {
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data');
    });
  });
  ```

### Frontend Testing

- **Test File Example:** `frontend/tests/App.test.tsx`
  ```tsx
  import { render, screen } from '@testing-library/react';
  import App from '../App';

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
  ```

---

## Optional: Docker Containerization

### Backend Dockerfile

- Create a `Dockerfile` in the `/backend` directory:
  ```dockerfile
  FROM node:16
  WORKDIR /app
  COPY package.json ./
  RUN npm install
  COPY . .
  EXPOSE 5000
  CMD ["npm", "start"]
  ```

### docker-compose.yml

- Create a `docker-compose.yml` file in the root directory:
  ```yaml
  version: '3'
  services:
    backend:
      build: ./backend
      ports:
        - "5000:5000"
      environment:
        - DB_URI=mongodb://mongo:27017/lms
    frontend:
      build: ./frontend
      ports:
        - "3000:3000"
      environment:
        - VITE_API_URL=http://localhost:5000/api
    mongo:
      image: mongo
      volumes:
        - ./data/db:/data/db
      ports:
        - "27017:27017"
  ```

---

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/lms-project.git
   cd lms-project
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm run dev    # or npm start for production
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Running Tests:**
   - **Backend:**
     ```bash
     cd backend
     npm test
     ```
   - **Frontend:**
     ```bash
     cd frontend
     npm test
     ```

5. **Using Docker (Optional):**
   - Start all services using Docker Compose:
     ```bash
     docker-compose up --build
     ```

---

## Contribution Guidelines

- **Branching:**  
  Follow the branching strategy outlined above. Always create feature-specific branches off the `development` branch.

- **Commit Messages:**  
  Write clear and concise commit messages that reflect the changes made.

- **Pull Requests:**  
  Ensure that each pull request includes a description of the changes, and link any relevant issues.

- **Code Reviews:**  
  Make sure your code passes all tests before merging into the main branches.
