# API Workflow

## Overview

The API Workflow of ResearchMind AI defines how a user's research query flows through the backend system. The backend follows a modular architecture where each component is responsible for a specific task, making the system scalable, maintainable, and easy to extend with additional AI agents.

---

# Workflow

## Search Workflow

```text
User
   │
   ▼
GET /search
   │
   ▼
Paper Service
   │
   ▼
Paper Retrieval Agent
   │
   ▼
Authenticated Semantic Scholar API
   │
   ▼
Paper Parser
   │
   ▼
Structured Paper Objects
   │
   ▼
JSON Response
```

---

## Analysis Workflow

```text
User
   │
   ▼
GET /analyze
   │
   ▼
Analysis Service
   │
   ▼
Paper Retrieval Agent
   │
   ▼
Authenticated Semantic Scholar API
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

## Comparison Workflow

```text
User
   │
   ▼
GET /compare
   │
   ▼
Comparison Service
   │
   ▼
Paper Retrieval Agent
   │
   ▼
Authenticated Semantic Scholar API
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
Comparison Report
   │
   ▼
JSON Response
```

---

## Research Gap Workflow

```text
User
   │
   ▼
GET /research-gap
   │
   ▼
Research Gap Service
   │
   ▼
Paper Retrieval Agent
   │
   ▼
Authenticated Semantic Scholar API
   │
   ▼
Paper Parser
   │
   ▼
Paper Analysis Agent
   │
   ▼
Research Gap Detection Agent
   │
   ▼
Research Gap Report
   │
   ▼
JSON Response
```
---

# Component Description

## 1. User

The workflow begins when the user submits a research topic through one of the available API endpoints.

Example queries:

- Agentic AI
- Large Language Models
- Retrieval-Augmented Generation
- Graph Neural Networks

---

## 2. FastAPI Endpoints

The FastAPI backend exposes multiple REST endpoints.

Implemented endpoints:

- GET /search
- GET /analyze
- GET /compare
- GET /research-gap

Responsibilities

- Receive requests
- Validate query parameters
- Forward requests to the appropriate service
- Return JSON responses

---

## 3. Service Layer

The Service Layer coordinates the complete backend workflow.

Implemented services:

- Paper Service
- Analysis Service
- Comparison Service
- Research Gap Service

Responsibilities

- Coordinate AI agents
- Handle business logic
- Parse API responses
- Manage logging
- Handle exceptions

---

## 4. Paper Retrieval Agent

Responsibilities

- Search Semantic Scholar
- Retrieve paper metadata
- Handle API communication
- Handle API failures

Output

- Raw paper metadata

---

## 5. Semantic Scholar API

Current external data source.

Retrieved fields include:

- Title
- Authors
- Abstract
- Year
- Citation Count
- URL

Current limitation:

The public API is rate-limited (HTTP 429). Support for authenticated API keys is planned.

---

## 6. Paper Parser

Responsibilities

- Parse raw JSON
- Normalize metadata
- Produce structured paper objects

Extracted fields

- Title
- Authors
- Abstract
- Year
- Citation Count
- URL

---

## 7. Paper Analysis Agent

Responsibilities

- Detect research problem
- Detect methodology
- Extract key contributions
- Detect future work
- Extract keywords
- Detect research area
- Calculate quality score
- Assign quality classification

Output

Structured paper analysis.

---

## 8. Methodology Comparison Agent

Responsibilities

- Compare methodologies
- Compare research areas
- Compare keywords
- Compare citation counts
- Detect highest cited paper
- Detect latest paper

Output

Comparison report.

---

## 9. Research Gap Detection Agent

Responsibilities

- Aggregate research areas
- Aggregate common keywords
- Aggregate future work
- Generate research gap report

Output

Research gap analysis.

---
## 10. Future AI Agents

Planned modules include:

- Experiment Planning Agent
- Literature Review Agent
- Report Generation Agent
- Citation Analysis Agent
- Knowledge Graph Agent
- AI Reviewer

---


# Current Workflow Status

| Component | Status |
|------------|---------|
| FastAPI Backend | ✅ Completed |
| Search API | ✅ Completed |
| Analysis API | ✅ Completed |
| Comparison API | ✅ Completed |
| Research Gap API | ✅ Completed |
| Paper Retrieval Agent | ✅ Completed |
| Paper Parser | ✅ Completed |
| Paper Analysis Agent | ✅ Completed |
| Methodology Comparison Agent | ✅ Completed |
| Research Gap Detection Agent | ✅ Completed |
| Paper Service | ✅ Completed |
| Analysis Service | ✅ Completed |
| Comparison Service | ✅ Completed |
| Research Gap Service | ✅ Completed |
| Multi-Agent Collaboration | ⏳ Planned |

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
GET /search
↓
Paper Service
↓
Paper Retrieval Agent
↓
Authenticated Semantic Scholar API
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
GET /analyze
↓
Analysis Service
↓
Paper Retrieval Agent
↓
Authenticated Semantic Scholar API
↓
Paper Parser
↓
Paper Analysis Agent
↓
Paper Quality Assessment
↓
JSON Response
```

---

## Comparison Pipeline

```text
User
↓
GET /compare
↓
Comparison Service
↓
Paper Retrieval Agent
↓
Authenticated Semantic Scholar API
↓
Paper Parser
↓
Paper Analysis Agent
↓
Methodology Comparison Agent
↓
Comparison Report
↓
JSON Response
```

---

## Research Gap Pipeline

```text
User
↓
GET /research-gap
↓
Research Gap Service
↓
Paper Retrieval Agent
↓
Authenticated Semantic Scholar API
↓
Paper Parser
↓
Paper Analysis Agent
↓
Research Gap Detection Agent
↓
Research Gap Report
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

---

# Conclusion

The current API workflow provides a modular backend architecture that supports research paper retrieval, rule-based paper analysis, methodology comparison, and research gap detection through independent service layers and AI agents.

The architecture cleanly separates API endpoints, services, AI agents, utilities, and external API communication, making the backend scalable, maintainable, and ready for future multi-agent extensions such as Experiment Planning, Literature Review Generation, Report Generation, and Knowledge Graph construction.