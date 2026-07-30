# API Workflow

## Overview

The API Workflow of ResearchMind AI defines how a user's research query flows through the backend system. The backend follows a modular multi-agent architecture where each service coordinates specialized AI agents responsible for paper retrieval, analysis, comparison, research gap detection, literature review generation, experiment planning, citation analysis, report generation, and multi-format report export.

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
Semantic Scholar API
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
Semantic Scholar API
   │
   ▼
Paper Parser
   │
   ▼
Paper Analysis Agent
   │
   ▼
Structured Analysis
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
Semantic Scholar API
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

## Literature Review Workflow

```text
User
   │
   ▼
GET /literature-review
   │
   ▼
Literature Review Service
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
Research Gap Detection Agent
   │
   ▼
Literature Review Agent
   │
   ▼
Literature Review
   │
   ▼
JSON Response
```

---

## Citation Analysis Workflow

```text
User
   │
   ▼
GET /citation-analysis
   │
   ▼
Citation Analysis Service
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
Citation Analysis Agent
   │
   ▼
Citation Statistics
   │
   ▼
JSON Response
```

---

## Report Generation Workflow

```text
User
   │
   ▼
GET /report
   │
   ▼
Report Generation Service
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
Research Gap Detection Agent
   │
   ▼
Citation Analysis Agent
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
Structured Research Report
   │
   ▼
JSON Response
```

---

## PDF Report Download Workflow

```text
User
   │
   ▼
GET /report/download
   │
   ▼
Report Generation Service
   │
   ▼
Report Generation Agent
   │
   ▼
PDF Generator
   │
   ▼
Research_Report.pdf
   │
   ▼
File Download
```

---

## DOCX Report Download Workflow

```text
User
   │
   ▼
GET /report/download/docx
   │
   ▼
Report Generation Service
   │
   ▼
Report Generation Agent
   │
   ▼
DOCX Generator
   │
   ▼
Research_Report.docx
   │
   ▼
File Download
```

---

## Markdown Report Download Workflow

```text
User
   │
   ▼
GET /report/download/markdown
   │
   ▼
Report Generation Service
   │
   ▼
Report Generation Agent
   │
   ▼
Markdown Generator
   │
   ▼
Research_Report.md
   │
   ▼
File Download
```

---

# Implemented REST Endpoints

- GET `/search`
- GET `/analyze`
- GET `/compare`
- GET `/research-gap`
- GET `/literature-review`
- GET `/citation-analysis`
- GET `/report`
- GET `/report/download`
- GET `/report/download/docx`
- GET `/report/download/markdown`

---

# Current Workflow Status

| Component | Status |
|------------|---------|
| FastAPI Backend | ✅ Completed |
| Search API | ✅ Completed |
| Analysis API | ✅ Completed |
| Comparison API | ✅ Completed |
| Research Gap API | ✅ Completed |
| Literature Review API | ✅ Completed |
| Citation Analysis API | ✅ Completed |
| Report Generation API | ✅ Completed |
| PDF Download API | ✅ Completed |
| DOCX Download API | ✅ Completed |
| Markdown Download API | ✅ Completed |
| Paper Retrieval Agent | ✅ Completed |
| Paper Parser | ✅ Completed |
| Paper Analysis Agent | ✅ Completed |
| Methodology Comparison Agent | ✅ Completed |
| Research Gap Detection Agent | ✅ Completed |
| Literature Review Agent | ✅ Completed |
| Citation Analysis Agent | ✅ Completed |
| Experiment Planning Agent | ✅ Completed |
| Report Generation Agent | ✅ Completed |
| PDF Generator | ✅ Completed |
| DOCX Generator | ✅ Completed |
| Markdown Generator | ✅ Completed |
| Multi-Agent Pipeline | ✅ Completed |

---

# Error Handling Workflow

```text
User Request
      │
      ▼
API Endpoint
      │
      ▼
Service Layer
      │
      ▼
AI Agents
      │
      ▼
Exception Handler
      │
      ▼
Logger
      │
      ▼
Structured JSON Error Response
```

---

# Conclusion

The current API workflow implements a complete multi-agent research automation pipeline. The backend now supports research paper retrieval, paper analysis, methodology comparison, research gap detection, literature review generation, citation analysis, experiment planning, comprehensive report generation, and export of research reports in **PDF**, **DOCX**, and **Markdown** formats. The modular architecture ensures scalability, maintainability, and straightforward integration of future AI agents, additional academic databases, and advanced research intelligence capabilities.