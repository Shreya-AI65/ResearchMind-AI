# API Workflow

## Overview

The API Workflow of ResearchMind AI defines how a user's research query flows through the backend system. The backend follows a modular architecture where each component is responsible for a specific task, making the system scalable, maintainable, and easy to extend with additional AI agents.

---

# Workflow

## Paper Search Workflow
User Research Query
        │
        ▼
FastAPI Endpoint
        │
        ▼
Comparison Service
        │
        ▼
Paper Retrieval Agent
        │
        ▼
Semantic Scholar API
        │
        ▼
Paper Parser
        │
        ▼
Paper Analysis Agent
        │
        ▼
Methodology Comparison Agent
        │
        ▼
Structured Comparison Result
        │
        ▼
JSON Response

---

## Comparison Workflow

The Methodology Comparison workflow performs the following operations:

1. Receive a research query.
2. Retrieve relevant research papers.
3. Parse the API response.
4. Analyze each paper.
5. Compare analyzed papers.
6. Generate structured comparison data.
7. Return the comparison result as JSON.

---

## Paper Analysis Workflow

```text
User enters Research Topic
            │
            ▼
FastAPI Analysis Endpoint (/analyze)
            │
            ▼
Analysis Service
            │
            ▼
Paper Retrieval Agent
            │
            ▼
Semantic Scholar Graph API
            │
            ▼
Paper Parser
            │
            ▼
Paper Analysis Agent
            │
            ▼
Paper Quality Assessment
            │
            ▼
Structured Analysis Result
            │
            ▼
JSON Response
```

---

# Component Description

## 1. User

The workflow begins when the user enters a research topic or keyword through the frontend interface.

Example:

- Agentic AI
- Retrieval-Augmented Generation
- Large Language Models

---

## 2. FastAPI Endpoint

The FastAPI backend receives the user's search query through the `/search` endpoint.

Responsibilities:
- Accept user requests
- Validate input
- Forward the query to the Paper Retrieval Agent

---

## 3. Paper Retrieval Agent

The Paper Retrieval Agent is responsible for communicating with external academic databases.

Current Source:
- Semantic Scholar Graph API

Responsibilities:
- Send search requests
- Receive research paper metadata
- Handle API errors
- Return raw JSON responses

Future Enhancement:
- Support multiple academic databases

---

## 4. Semantic Scholar Graph API

The Semantic Scholar API provides academic paper metadata including:

- Title
- Authors
- Abstract
- Publication Year
- Citation Count
- URL

During development, API requests are temporarily limited because the public endpoint enforces request limits. An API key request has been submitted for authenticated access.

---

## 5. Paper Parser

The Paper Parser converts raw API responses into a standardized format.

Responsibilities:
- Extract titles
- Extract authors
- Extract abstracts
- Extract publication year
- Extract citation count
- Extract paper URL

This ensures that downstream components receive clean and consistent data.

---

## 6. Paper Model

The Paper Model defines a standard structure for representing research papers across the application.

Fields include:
- Title
- Authors
- Abstract
- Publication Year
- Citation Count
- URL

Using a common data model ensures consistency throughout the project.

---

## 7. Paper Service

The Paper Service acts as the bridge between the Paper Retrieval Agent and the parser.

Responsibilities:
- Retrieve raw paper data
- Parse API responses
- Return structured paper objects
- Handle error responses

---

## 8. Analysis Service

The Analysis Service coordinates the complete paper analysis pipeline.

### Responsibilities

* Receive analysis requests from the FastAPI endpoint.
* Retrieve papers using the Paper Retrieval Agent.
* Parse research paper metadata.
* Invoke the Paper Analysis Agent.
* Handle logging and exception management.
* Return structured analysis results.

---

## 9. Paper Analysis Agent

The Paper Analysis Agent performs rule-based analysis of research papers.

### Extracted Information

* Research Problem
* Methodology
* Key Contributions
* Future Work
* Keywords
* Research Area
* Paper Quality Score
* Paper Quality Classification

The extracted information is returned as structured JSON, allowing future AI agents to reuse the analysis.
---

## 10. Future AI Agents

Once structured paper data is available, it will be processed by specialized AI agents.

Planned agents include:

- Literature Review Agent
- Paper Comparison Agent
- Research Gap Detection Agent
- Research Report Generator
- Citation Analysis Agent

These agents will collaboratively generate high-quality research outputs.

---

# Current Workflow Status

| Component                 | Status      |
| ------------------------- | ----------- |
| FastAPI Backend           | ✅ Completed |
| Search API                | ✅ Completed |
| Analysis API              | ✅ Completed |
| Paper Retrieval Agent     | ✅ Completed |
| Paper Parser              | ✅ Completed |
| Paper Model               | ✅ Completed |
| Paper Service             | ✅ Completed |
| Paper Analysis Agent      | ✅ Completed |
| Analysis Service          | ✅ Completed |
| Logging                   | ✅ Completed |
| Exception Handling        | ✅ Completed |
| Parser Testing            | ✅ Completed |
| Analysis Unit Testing     | ✅ Completed |
| Integration Testing       | ✅ Completed |
| Multi-Agent Collaboration | ⏳ Planned   |

---

# Future Improvements

The workflow will be expanded to support multiple academic data sources, including:

- Semantic Scholar
- OpenAlex
- arXiv
- Crossref
- IEEE Xplore (subject to licensing and access)

Future versions of ResearchMind AI will combine results from multiple sources before passing them to downstream AI agents, improving coverage and reducing dependence on a single provider.

---

# Conclusion

The current API workflow establishes a modular backend architecture for ResearchMind AI. It separates paper retrieval, parsing, modeling, and service logic into independent components, making the system easier to maintain and extend. This design provides a strong foundation for implementing advanced AI agents for literature review generation, research gap identification, and automated research assistance.

# Final Backend Pipelines

## Search Pipeline

```text
User
↓
/search API
↓
Paper Service
↓
Paper Retrieval Agent
↓
Semantic Scholar API
↓
Paper Parser
↓
Structured Paper Objects
↓
JSON Response
```

---

## Analysis Pipeline

```text
User
↓
/analyze API
↓
Analysis Service
↓
Paper Retrieval Agent
↓
Semantic Scholar API
↓
Paper Parser
↓
Paper Analysis Agent
↓
Paper Quality Assessment
↓
Structured Analysis Result
↓
JSON Response
```

---

## Error Handling Pipeline

```text
User Request
↓
API Endpoint
↓
Service Layer
↓
Exception Handling
↓
Logger
↓
Structured JSON Error Response
```
