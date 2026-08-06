# 🚀 ResearchMind AI

**ResearchMind AI** is a multi-agent AI-powered research assistant designed to automate the complete academic research workflow. It retrieves research papers, analyzes them, identifies research gaps, generates literature reviews, creates experiment plans, produces comprehensive reports, and provides an interactive web dashboard for managing research outputs.

---

# ✨ Features

## 🤖 Backend

- Paper Retrieval Agent
- Paper Analysis Agent
- Methodology Comparison Agent
- Research Gap Detection Agent
- Literature Review Generation
- Experiment Planning Agent
- Report Generation Agent
- Report Versioning
- Report History Management
- Report Search
- Report Statistics
- Report Delete Management
- Report Export (PDF, DOCX, Markdown)
- REST API with FastAPI
- Centralized Logging
- Global Exception Handling
- Semantic Scholar Integration

---

## 💻 Frontend

- React + Vite
- Tailwind CSS
- Dashboard
- Sidebar Navigation
- Navbar
- Generate Report Page
- Report History
- Report Search
- Report Statistics
- Settings Page
- PDF Download
- DOCX Download
- Markdown Download
- Responsive Layout
- Reusable UI Components
- Loading Indicators
- Analytics Cards
- Report Cards

---

# 🏗 Project Architecture

```text
                    User
                      │
                      ▼
          React Frontend Dashboard
                      │
                Axios REST API
                      │
                      ▼
               FastAPI Backend
                      │
 ────────────────────────────────────────────
                      │
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
        PDF • DOCX • Markdown
```

---

# 📂 Project Structure

```text
ResearchMind_AI/

├── backend/
│   ├── app/
│   │   ├── agents/
│   │   ├── api/
│   │   ├── core/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── generated_reports/
│   ├── tests/
│   ├── requirements.txt
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── README.md
│
├── docs/
├── LICENSE
└── README.md
```

---

# ⚙ Technology Stack

## Backend

- Python
- FastAPI
- Pydantic
- ReportLab
- python-docx
- Markdown
- Semantic Scholar API
- JSON
- Logging

---

## Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Icons
- Recharts
- Framer Motion

---

# 📡 REST APIs

## Research APIs

```text
GET    /api/v1/search
GET    /api/v1/analyze
GET    /api/v1/compare
GET    /api/v1/research-gap
GET    /api/v1/literature-review
GET    /api/v1/experiment-plan

POST   /api/v1/report
POST   /api/v1/report/download
POST   /api/v1/report/download/docx
POST   /api/v1/report/download/markdown
```

---

## Report Management APIs

```text
GET      /api/v1/report/history
GET      /api/v1/reports/search
GET      /api/v1/reports/statistics
GET      /api/v1/reports/export

DELETE   /api/v1/reports/delete
```

---

# 📑 Generated Reports

ResearchMind AI automatically generates:

- PDF Reports
- DOCX Reports
- Markdown Reports

All generated reports are stored inside:

```text
backend/generated_reports/
```

along with complete version history.

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Shreya-AI65/ResearchMind_AI.git

cd ResearchMind_AI
```

---

# Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend

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

Frontend

```text
http://localhost:5173
```

---

# 📈 Development Progress

## ✅ Phase 1 – Project Planning

- Project Planning
- Documentation
- Repository Setup

---

## ✅ Phase 2 – Research Analysis

- Paper Retrieval Agent
- Paper Analysis Agent
- Unit Testing
- Integration Testing

---

## ✅ Phase 3 – Research Intelligence

- Methodology Comparison
- Research Gap Detection

---

## ✅ Phase 4 – Report Generation

- Literature Review Generation
- Experiment Planning
- Report Generation
- PDF Export
- DOCX Export
- Markdown Export

---

## ✅ Phase 5 – Report Management

- Report Versioning
- Report History
- Report Search
- Report Statistics
- Report Delete API
- Report Export API

---

## ✅ Phase 6 – Frontend Integration

Completed

- React + Vite Setup
- Tailwind CSS
- React Router
- Dashboard
- Sidebar
- Navbar
- Generate Report Page
- Report History Page
- Report Search Page
- Report Statistics Page
- Settings Page
- Backend API Integration
- PDF Download
- DOCX Download
- Markdown Download
- Responsive UI
- Reusable Components

---

## 🚧 Phase 7 – Upcoming

- Interactive Analytics Charts
- Report Viewer
- Delete Report UI
- Export History UI
- Dark Mode
- Authentication
- Mobile Optimization
- User Profile
- Dashboard Enhancements

---

# 🛣 Future Roadmap

- Knowledge Graph Visualization
- Citation Network Analysis
- AI Research Chat Assistant
- Multi-user Collaboration
- Authentication & Authorization
- Cloud Deployment
- Docker Support
- LLM Integration
- Research Trend Prediction
- Vector Database Integration

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👩‍💻 Author

**Shreya Singh**

B.Tech Computer Science Engineering (AI & Data Science)

Pimpri Chinchwad University, Pune

**ResearchMind AI**