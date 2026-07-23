# ResearchMind AI – Backend

## Overview

The backend of **ResearchMind AI** is built using **FastAPI** and provides the core services required for intelligent research paper retrieval, parsing, analysis, and future multi-agent collaboration. It follows a modular architecture where each AI agent performs a specific responsibility, making the system scalable and easy to maintain.

---

# Features

## Implemented

* FastAPI Backend
* Paper Retrieval Agent
* Paper Analysis Agent
* Paper Parser
* Analysis Service
* REST API Endpoints
* Exception Handling
* Logging System
* Rule-Based Paper Analysis
* Paper Quality Assessment
* Unit Testing
* Integration Testing

---

# Backend Architecture

```text
Client
   │
   ▼
FastAPI Routes
   │
   ▼
Services
   │
   ├── Paper Service
   └── Analysis Service
   │
   ▼
AI Agents
   │
   ├── Paper Retrieval Agent
   └── Paper Analysis Agent
   │
   ▼
Utilities
   │
   ├── Parser
   ├── Logger
   └── Exceptions
   │
   ▼
Semantic Scholar API
```

---

# Project Structure

```text
backend/
│
├── app/
│   ├── agents/
│   │   ├── paper_retrieval.py
│   │   └── paper_analysis.py
│   │
│   ├── api/
│   │   ├── paper_routes.py
│   │   └── analysis_routes.py
│   │
│   ├── services/
│   │   ├── paper_service.py
│   │   └── analysis_service.py
│   │
│   ├── models/
│   │   ├── paper.py
│   │   └── paper_analysis.py
│   │
│   ├── utils/
│   │   ├── parser.py
│   │   ├── logger.py
│   │   └── exceptions.py
│   │
│   ├── core/
│   │   └── config.py
│   │
│   └── main.py
│
├── tests/
│   ├── test_parser.py
│   ├── test_analysis.py
│   └── test_analysis_pipeline.py
│
├── requirements.txt
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
cd ResearchMind_AI/backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# Running the Backend

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```
http://127.0.0.1:8000
```

Interactive API Documentation:

```
http://127.0.0.1:8000/docs
```

---

# Available API Endpoints

## Search Papers

```http
GET /search?query=<research_topic>
```

Example:

```
GET /search?query=Agentic AI
```

---

## Analyze Papers

```http
GET /analyze?query=<research_topic>
```

Example:

```
GET /analyze?query=Agentic AI
```

---

# Testing

Run the parser test:

```bash
python -m tests.test_parser
```

Run the paper analysis test:

```bash
python -m tests.test_analysis
```

Run the complete analysis pipeline test:

```bash
python -m tests.test_analysis_pipeline
```

---

# Current Capabilities

The backend currently supports:

* Research paper retrieval from Semantic Scholar
* Parsing raw API responses into structured paper objects
* Rule-based paper analysis
* Extraction of:

  * Research Problem
  * Methodology
  * Key Contributions
  * Future Work
  * Keywords
  * Research Area
* Paper quality scoring
* Paper quality classification
* Structured logging
* Exception handling
* REST API services
* Unit and integration testing

---

# Technologies Used

* Python 3
* FastAPI
* Requests
* Pydantic
* Uvicorn
* Semantic Scholar API

---

## Implemented Services

### Paper Retrieval

- Semantic Scholar API Integration
- Paper Parsing
- Metadata Extraction

### Paper Analysis

- Research Problem Extraction
- Methodology Detection
- Keyword Extraction
- Research Area Detection
- Future Work Detection
- Paper Quality Scoring

### Methodology Comparison

- Compare analyzed papers
- Compare methodologies
- Compare research areas
- Compare keywords
- Compare citation counts
- Highest cited paper detection
- Latest paper detection

---

# Future Enhancements

Upcoming backend modules include:

* Research Gap Detection Agent
* Methodology Comparison Agent
* Paper Recommendation Engine
* Report Generation Agent
* Knowledge Graph Construction
* Vector Database Integration
* Multi-Agent Communication
* LLM-based Paper Analysis
* Authentication and User Management

---

# Notes

* The backend currently uses the Semantic Scholar Graph API for paper retrieval.
* If the Semantic Scholar API rate limit (HTTP 429) is reached, the backend returns a structured error response without crashing.
* The rule-based analysis pipeline is designed to be replaced or enhanced with LLM-powered techniques in future development phases.

---

# License

This backend is part of the **ResearchMind AI** academic research project and is intended for educational and research purposes.
