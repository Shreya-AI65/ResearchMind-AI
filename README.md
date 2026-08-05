# 🚀 ResearchMind AI

**ResearchMind AI** is a multi-agent AI-powered research assistant designed to automate the complete academic research workflow. It retrieves research papers, analyzes them, identifies research gaps, generates literature reviews, creates experiment plans, produces comprehensive reports, and provides an interactive web dashboard for managing research outputs.

---

# ✨ Features

## 🤖 Backend

* Paper Retrieval Agent
* Paper Analysis Agent
* Methodology Comparison Agent
* Research Gap Detection Agent
* Literature Review Generation
* Experiment Planning Agent
* Report Generation Agent
* Report Versioning
* Report History Management
* Report Search
* Report Statistics
* Report Delete Management
* PDF Report Export
* DOCX Report Export
* Markdown Report Export
* REST API with FastAPI
* Centralized Logging
* Exception Handling
* Semantic Scholar Integration

---

## 💻 Frontend

* React + Vite
* Tailwind CSS
* Responsive Dashboard
* Sidebar Navigation
* Navbar
* Dashboard Analytics
* Report History Page
* Report Viewer
* Report Search
* Statistics Page
* Settings Page
* Generate Report Page
* Reusable UI Components
* Loading Component
* Analytics Cards
* Report Cards

---

# 🏗 Project Architecture

```text
User

        │

        ▼

React Frontend (Dashboard)

        │

Axios REST API

        │

        ▼

FastAPI Backend

        │

──────────────────────────────────────

Paper Retrieval Agent

        │

Paper Analysis Agent

        │

Methodology Comparison Agent

        │

Research Gap Detection Agent

        │

Literature Review Agent

        │

Experiment Planning Agent

        │

Report Generation Agent

        │

Report Management APIs

        │

PDF / DOCX / Markdown Reports
```

---

# 📂 Project Structure

```text
ResearchMind_AI/

├── backend/
│
│   ├── app/
│   │
│   ├── agents/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── utils/
│   ├── generated_reports/
│   ├── tests/
│   └── README.md
│
├── frontend/
│
│   ├── src/
│   │
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   ├── styles/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── README.md
│
├── docs/
│
├── LICENSE
└── README.md
```

---

# ⚙ Technology Stack

## Backend

* Python
* FastAPI
* Pydantic
* ReportLab
* python-docx
* Markdown
* Semantic Scholar API
* Logging
* JSON

---

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* React Icons
* Recharts
* Framer Motion

---

# 📡 REST APIs

## Research APIs

```text
POST /api/v1/search

POST /api/v1/analyze

POST /api/v1/compare

POST /api/v1/research-gap

POST /api/v1/literature-review

POST /api/v1/experiment-plan

POST /api/v1/report
```

---

## Report Management APIs

```text
GET    /reports/history

GET    /reports/statistics

GET    /reports/search

DELETE /reports/delete
```

---

# 📑 Generated Reports

The system automatically generates:

* PDF Report
* DOCX Report
* Markdown Report

Every generated report is automatically stored in:

```text
backend/generated_reports/
```

with complete version history.

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Shreya-AI65/ResearchMind_AI.git
```

---

# Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL

```text
http://127.0.0.1:8000
```

Swagger Documentation

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL

```text
http://localhost:5173
```

---

# Development Progress

## ✅ Phase 1

* Project Planning
* Documentation
* Repository Setup

---

## ✅ Phase 2

* Paper Retrieval Agent
* Paper Analysis Agent
* Unit Testing
* Integration Testing

---

## ✅ Phase 3

* Methodology Comparison
* Research Gap Detection

---

## ✅ Phase 4

* Literature Review Generation
* Experiment Planning
* Report Generation
* PDF Export
* DOCX Export
* Markdown Export

---

## ✅ Phase 5

* Report Versioning
* Report History
* Report Search
* Report Statistics
* Report Delete API

---

## 🚧 Phase 6 (Current)

### Frontend Development

Completed

* React + Vite Setup
* Tailwind CSS Configuration
* React Router Setup
* Dashboard Layout
* Sidebar
* Navbar
* Reusable Components
* Analytics Cards
* Loading Component
* Report Card
* Search Bar

Upcoming

* Backend API Integration
* Interactive Charts
* Report Viewer
* Download Manager
* Authentication
* Dark Mode
* Mobile Optimization

---

# Future Roadmap

* Knowledge Graph Visualization
* Citation Network Analysis
* AI Chat Assistant
* Multi-user Collaboration
* Authentication & Authorization
* Cloud Deployment
* Docker Support
* LLM Integration
* Research Trend Prediction
* Vector Database Integration

---

# License

This project is licensed under the **MIT License**.

---

# Author

**Shreya Singh**

B.Tech Computer Science Engineering (AI & Data Science)

Pimpri Chinchwad University, Pune

ResearchMind AI Project
