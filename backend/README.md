# ResearchMind AI Backend

## Overview

The ResearchMind AI Backend is built using FastAPI and serves as the core API layer of the ResearchMind AI project. It is responsible for retrieving research papers, processing academic data, handling API requests, formatting responses, and supporting future AI agents.

---

# Features

- Paper Retrieval Agent
- Semantic Scholar API Integration
- Paper Parser
- Paper Service Layer
- Standardized Response Formatter
- Centralized Configuration
- Custom Exception Handling
- Centralized Logging
- End-to-End Pipeline Testing

---

# Technology Stack

- Python 3.13
- FastAPI
- Uvicorn
- Requests
- Semantic Scholar API

---

# Project Structure

```text
backend/
│
├── app/
│   ├── agents/
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── main.py
│
├── tests/
├── sample_response.json
├── requirements.txt
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the backend folder

```bash
cd backend
```

Create a virtual environment

```bash
python -m venv venv
```

Activate the virtual environment

Windows

```bash
venv\Scripts\activate
```

Linux/macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

# Running the Backend

```bash
uvicorn app.main:app --reload
```

Server

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

ReDoc Documentation

```
http://127.0.0.1:8000/redoc
```

---

# API Endpoint

## Search Papers

**GET**

```
/search?query=<keyword>
```

Example

```
http://127.0.0.1:8000/search?query=Agentic+AI
```

---

# Sample Success Response

```json
{
  "success": true,
  "message": "Papers retrieved successfully.",
  "data": {
    "query": "Agentic AI",
    "total_papers": 5,
    "papers": []
  }
}
```

---

# Sample Error Response

```json
{
  "success": false,
  "message": "Search query cannot be empty.",
  "data": null
}
```

---

# Current Backend Modules

- Paper Retrieval Agent
- Paper Service
- Paper Parser
- Response Formatter
- Logger Utility
- Configuration Manager
- Custom Exceptions

---

# Completed Milestones

- FastAPI Backend Setup
- Semantic Scholar Integration
- Parser Development
- Service Layer
- Response Formatter
- Exception Handling
- Configuration Management
- Logging
- Pipeline Testing

---

# Future Development

- Paper Analysis Agent
- Research Gap Detection
- Literature Review Generator
- Paper Comparison Engine
- Multi-Agent Workflow
- Authentication
- Database Integration

---

# Author

**Shreya Singh**

ResearchMind AI Backend