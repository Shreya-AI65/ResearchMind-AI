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
* Methodology Comparison Agent
* Research Gap Detection Agent
* Paper Quality Assessment
* Comparison Service
* Research Gap Service
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
   ├── Analysis Service
   ├── Comparison Service
   └── Research Gap Service
   │
   ▼
AI Agents
   │
   ├── Paper Retrieval Agent
   ├── Paper Analysis Agent
   ├── Methodology Comparison Agent
   └── Research Gap Detection Agent
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
├── README.md
├── requirements.txt
├── sample_response.json
│
├── app/
│   │
│   ├── __init__.py
│   ├── main.py
│   │
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── paper_retrieval.py
│   │   ├── paper_analysis.py
│   │   ├── methodology_comparison.py
│   │   └── research_gap_detection.py
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── search.py
│   │   ├── analyze.py
│   │   ├── compare.py
│   │   └── research_gap.py
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   └── paper.py
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── paper_service.py
│   │   ├── analysis_service.py
│   │   ├── comparison_service.py
│   │   └── research_gap_service.py
│   │
│   └── utils/
│       ├── __init__.py
│       ├── parser.py
│       ├── logger.py
│       └── exceptions.py
│
└── tests/
    ├── __init__.py
    ├── test_parser.py
    ├── test_analysis.py
    ├── test_analysis_pipeline.py
    ├── test_comparison.py
    └── test_research_gap.py

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

## 1. Search Papers

```http
GET /search?query=<research_topic>
```

Example:

```
GET /search?query=Agentic AI
```

---

## 2. Analyze Papers

```http
GET /analyze?query=<research_topic>
```

Example:

```
GET /analyze?query=Agentic AI
```

---

## 3. Compare Papers

```http
GET /compare?query=<research_topic>
```

Example:

```
GET /compare?query=Agentic AI
```

---

## 4. Research Gap Detection

```http
GET /research-gap?query=<research_topic>
```

Example:

```
GET /research-gap?query=Agentic AI
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

Run the complete analysis pipeline:

```bash
python -m tests.test_analysis_pipeline
```

Run the methodology comparison test:

```bash
python -m tests.test_comparison
```

Run the research gap detection test:

```bash
python -m tests.test_research_gap
```

---

# Current Capabilities

The backend currently supports:

- Research paper retrieval from Semantic Scholar
- Parsing raw API responses into structured paper objects
- Rule-based paper analysis
- Paper quality assessment
- Methodology comparison across multiple papers
- Research gap detection
- Research area aggregation
- Keyword aggregation
- Future work extraction
- Highest cited paper detection
- Latest paper detection
- Structured logging
- Exception handling
- REST API services
- Modular multi-agent architecture
- Unit and integration testing

The Paper Analysis Agent extracts:

- Research Problem
- Methodology
- Key Contributions
- Future Work
- Keywords
- Research Area
- Quality Score
- Quality Classification
---

# Technologies Used

- Python 3
- FastAPI
- Requests
- Pydantic
- Uvicorn
- Semantic Scholar Graph API
- Logging Module

---

# Implemented Services

## Paper Retrieval Service

- Semantic Scholar API Integration
- Metadata Retrieval
- API Error Handling
- Paper Parsing

---

## Analysis Service

- Rule-Based Paper Analysis
- Research Problem Extraction
- Methodology Detection
- Keyword Extraction
- Research Area Detection
- Future Work Detection
- Quality Score Calculation
- Quality Classification

---

## Comparison Service

- Compare Multiple Papers
- Methodology Comparison
- Research Area Comparison
- Keyword Comparison
- Citation Count Comparison
- Highest Cited Paper Detection
- Latest Paper Detection

---

## Research Gap Service

- Research Area Aggregation
- Common Keyword Extraction
- Future Work Aggregation
- Structured Research Gap Report Generation

---

# Future Enhancements

The following modules are planned for future development:

- Experiment Planning Agent
- Literature Review Agent
- Report Generation Agent
- Knowledge Graph Generation
- Citation Network Analysis
- Research Trend Prediction
- Benchmark Recommendation Agent
- Persistent Research Memory
- Vector Database Integration (ChromaDB)
- LLM-based Paper Analysis
- Multi-Agent Communication
- Agent-to-Agent (A2A) Communication
- Model Context Protocol (MCP)
- Authentication & User Management
- Cloud Deployment

---

# Notes

- The backend currently uses the Semantic Scholar Graph API as the primary research paper source.
- Public API requests are subject to rate limits (HTTP 429). An API key will be integrated in future versions to increase request capacity.
- The current paper analysis pipeline is rule-based and is designed to be upgraded with LLM-powered analysis in future releases.
- The backend follows a modular multi-agent architecture, allowing independent development of specialized AI agents.
---

# License

ResearchMind AI is an academic research project developed for educational, research, and learning purposes.

This project is currently under active development.