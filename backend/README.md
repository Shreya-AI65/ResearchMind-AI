# ResearchMind AI – Backend

## Overview

The backend of **ResearchMind AI** is developed using **FastAPI** and serves as the intelligent core of the ResearchMind AI platform. It follows a modular multi-agent architecture where specialized AI agents collaborate to retrieve, analyze, compare, summarize, and generate structured research knowledge.

The backend currently supports the complete research analysis pipeline including paper retrieval, analysis, methodology comparison, research gap detection, experiment planning, literature review generation, and automated research report generation.

---

# Features

## Implemented

- FastAPI Backend
- REST API Architecture
- Paper Retrieval Agent
- Paper Analysis Agent
- Methodology Comparison Agent
- Research Gap Detection Agent
- Experiment Planning Agent
- Literature Review Agent
- Report Generation Agent
- Paper Parser
- Paper Service
- Analysis Service
- Comparison Service
- Research Gap Service
- Experiment Planning Service
- Literature Review Service
- Report Generation Service
- Structured Logging
- Exception Handling
- Rule-Based Research Analysis
- Semantic Scholar API Integration
- API Key Authentication
- Environment Variable Configuration (.env)
- Unit Testing
- Integration Testing
- End-to-End Pipeline Testing

---

# Backend Architecture

```text
Client
   │
   ▼
FastAPI Routes
   │
   ▼
───────────────────────────────────────────────
                SERVICES
───────────────────────────────────────────────

Paper Service
Analysis Service
Comparison Service
Research Gap Service
Experiment Planning Service
Literature Review Service
Report Generation Service

   │
   ▼

───────────────────────────────────────────────
                 AI AGENTS
───────────────────────────────────────────────

Paper Retrieval Agent
Paper Analysis Agent
Methodology Comparison Agent
Research Gap Detection Agent
Experiment Planning Agent
Literature Review Agent
Report Generation Agent

   │
   ▼

Parser
Logger
Exceptions
Configuration

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
│
├── agents/
│   ├── paper_retrieval.py
│   ├── paper_analysis.py
│   ├── methodology_comparison.py
│   ├── research_gap_detection.py
│   ├── experiment_planning.py
│   ├── literature_review.py
│   └── report_generation.py
│
├── api/
│   ├── search.py
│   ├── analyze.py
│   ├── compare.py
│   ├── research_gap.py
│   ├── experiment_plan.py
│   ├── literature_review.py
│   └── report.py
│
├── core/
│   └── config.py
│
├── models/
│   └── paper.py
│
├── services/
│   ├── paper_service.py
│   ├── analysis_service.py
│   ├── comparison_service.py
│   ├── research_gap_service.py
│   ├── experiment_planning_service.py
│   ├── literature_review_service.py
│   └── report_generation_service.py
│
├── utils/
│   ├── parser.py
│   ├── logger.py
│   ├── exceptions.py
│   └── response_formatter.py
│
└── tests/
    ├── test_parser.py
    ├── test_analysis.py
    ├── test_analysis_pipeline.py
    ├── test_comparison.py
    ├── test_research_gap.py
    ├── test_experiment_planning.py
    ├── test_literature_review.py
    └── test_report_generation.py
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into backend

```bash
cd ResearchMind_AI/backend
```

Create virtual environment

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Variables

Create a `.env` file inside backend.

Example

```env
SEMANTIC_SCHOLAR_API_KEY=YOUR_API_KEY
```

---

# Running Backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# Available APIs

## Search Papers

```
GET /search
```

Example

```
/search?query=Agentic AI
```

---

## Analyze Papers

```
GET /analyze
```

---

## Compare Methodologies

```
GET /compare
```

---

## Research Gap Detection

```
GET /research-gap
```

---

## Experiment Planning

```
GET /experiment-plan
```

---

## Literature Review

```
GET /literature-review
```

---

## Research Report Generation

```
GET /report
```

---

# Latest Features

The backend currently supports a complete multi-agent research analysis pipeline.

## Implemented AI Agents

* Paper Retrieval Agent
* Paper Analysis Agent
* Methodology Comparison Agent
* Research Gap Detection Agent
* Literature Review Agent
* Experiment Planning Agent
* Report Generation Agent

---

# Available API Endpoints

| Endpoint                 | Description                       |
| ------------------------ | --------------------------------- |
| GET `/search`            | Retrieve research papers          |
| GET `/analyze`           | Analyze research papers           |
| GET `/compare`           | Compare research methodologies    |
| GET `/research-gap`      | Detect research gaps              |
| GET `/literature-review` | Generate literature review        |
| GET `/report`            | Generate complete research report |
| GET `/report/download`   | Download report as PDF            |

---

# Report Generation Pipeline

```text
User Query
      │
      ▼
Paper Retrieval Agent
      │
      ▼
Paper Analysis Agent
      │
      ▼
Methodology Comparison Agent
      │
      ▼
Research Gap Detection Agent
      │
      ▼
Literature Review Agent
      │
      ▼
Experiment Planning Agent
      │
      ▼
Report Generation Agent
      │
      ▼
PDF Generator
      │
      ▼
Research_Report.pdf
```

---

# Running the Project

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

Open Swagger UI:

```text
http://127.0.0.1:8000/docs
```

---

# Running Tests

Run unit tests:

```bash
python -m tests.test_analysis
```

Run integration tests:

```bash
python -m tests.test_analysis_pipeline
```

Run comparison, research gap, and report generation tests:

```bash
python -m tests.test_new_agents
```

Run complete report generation pipeline:

```bash
python -m tests.test_report_generation
```

---

# Generated Reports

Generated PDF reports are automatically saved inside:

```text
generated_reports/
```

Example:

```text
generated_reports/
└── Research_Report.pdf
```

---

# Current Project Status

| Module                | Status |
| --------------------- | ------ |
| Search API            | ✅      |
| Analysis API          | ✅      |
| Comparison API        | ✅      |
| Research Gap API      | ✅      |
| Literature Review API | ✅      |
| Report Generation API | ✅      |
| PDF Download API      | ✅      |
| Multi-Agent Pipeline  | ✅      |
| PDF Export            | ✅      |
| Integration Testing   | ✅      |

---

# Next Development Phase

The next phase of ResearchMind AI will focus on:

* DOCX report generation
* PowerPoint report generation
* React frontend integration
* Multi-source academic search
* Knowledge graph visualization
* Citation analysis
* AI-powered research recommendations

---

# Testing

Parser

```bash
python -m tests.test_parser
```

Paper Analysis

```bash
python -m tests.test_analysis
```

Analysis Pipeline

```bash
python -m tests.test_analysis_pipeline
```

Comparison

```bash
python -m tests.test_comparison
```

Research Gap

```bash
python -m tests.test_research_gap
```

Experiment Planning

```bash
python -m tests.test_experiment_planning
```

Literature Review

```bash
python -m tests.test_literature_review
```

Report Generation

```bash
python -m tests.test_report_generation
```

---

# Current Capabilities

The backend currently performs

- Research Paper Retrieval
- Paper Parsing
- Metadata Extraction
- Research Problem Extraction
- Methodology Extraction
- Keyword Extraction
- Research Area Detection
- Future Work Detection
- Paper Quality Assessment
- Paper Quality Classification
- Methodology Comparison
- Citation Comparison
- Latest Paper Detection
- Highest Cited Paper Detection
- Research Gap Detection
- Dataset Recommendation
- Baseline Model Recommendation
- Evaluation Metric Recommendation
- Hardware Recommendation
- Validation Strategy Recommendation
- Literature Review Generation
- Automated Research Report Generation
- Structured JSON Responses
- Exception Handling
- Logging
- Modular AI Agent Architecture

---

# AI Agents

## Paper Retrieval Agent

Responsible for retrieving papers from Semantic Scholar.

---

## Paper Analysis Agent

Extracts

- Summary
- Research Problem
- Methodology
- Contributions
- Future Work
- Keywords
- Research Area
- Quality Score
- Quality Classification

---

## Methodology Comparison Agent

Compares

- Methodologies
- Keywords
- Research Areas
- Citation Counts
- Latest Paper
- Highest Cited Paper

---

## Research Gap Detection Agent

Detects

- Missing Research Areas
- Future Work
- Research Opportunities
- Open Problems

---

## Experiment Planning Agent

Generates

- Dataset Recommendations
- Baseline Models
- Evaluation Metrics
- Hardware Requirements
- Validation Strategies
- Experimental Workflow

---

## Literature Review Agent

Generates

- Introduction
- Paper Summaries
- Research Trends
- Research Gaps
- Future Scope
- Conclusion

---

## Report Generation Agent

Generates a complete research report containing

- Executive Summary
- Literature Review
- Methodology Comparison
- Research Gaps
- Experiment Plan
- Recommended Datasets
- Baseline Models
- Evaluation Metrics
- Future Research Directions
- Conclusion

---

# Technologies Used

- Python
- FastAPI
- Requests
- Pydantic
- python-dotenv
- Uvicorn
- Semantic Scholar Graph API

---

# Future Enhancements

The following modules are planned

- Knowledge Graph Agent
- Citation Network Analysis
- Research Trend Prediction
- Benchmark Recommendation Agent
- Research Memory
- ChromaDB Integration
- PostgreSQL Integration
- LLM-Based Paper Analysis
- Multi-Agent Collaboration
- Agent-to-Agent Communication (A2A)
- Model Context Protocol (MCP)
- User Authentication
- Cloud Deployment
- Docker Support
- CI/CD Pipeline

---

# Notes

- ResearchMind AI currently uses the Semantic Scholar Graph API as the primary research paper source.
- Public API requests may return HTTP 429 (Too Many Requests) due to Semantic Scholar rate limits.
- Using a registered API key increases the available request quota.
- The backend currently uses rule-based analysis and is designed for future integration with Large Language Models (LLMs).
- The modular architecture allows independent development and testing of each AI agent.

---

# License

ResearchMind AI is an academic research project developed for educational, research, and learning purposes.

The project is currently under active development.

---

# Author

**Shreya Singh**

B.Tech Computer Science Engineering (Artificial Intelligence & Data Science)

ResearchMind AI — Multi-Agent Research Intelligence Platform