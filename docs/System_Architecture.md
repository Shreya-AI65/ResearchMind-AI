# System Architecture

## Overview

ResearchMind AI is a multi-agent AI research assistant designed to support researchers throughout the complete research lifecycle. Instead of relying on a single large language model, the system consists of multiple specialized AI agents that collaborate to retrieve, analyze, compare, and synthesize scientific knowledge.

Each agent is responsible for a specific task while sharing information with other agents to produce comprehensive, evidence-based research outputs.

---

# High-Level Workflow

## Current Backend Workflow

```text
                      User
                        │
                        ▼
                 FastAPI Backend
                        │
                        ▼
              API Endpoint (/search,
            /analyze, /compare,
              /research-gap)
                        │
                        ▼
                 Service Layer
        (Paper / Analysis / Comparison /
          Research Gap Services)
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
        ┌───────────────────────────────┐
        │                               │
        ▼                               ▼
Methodology Comparison Agent   Research Gap Detection Agent
        │                               │
        └──────────────┬────────────────┘
                       ▼
            Structured JSON Response
```

---

# Architecture Components

## 1. User Interface

Responsibilities

* Accept research questions.
* Display generated reports.
* Show citations.
* Visualize comparisons.
* Present research recommendations.

Input

* Research topic.
* User questions.
* Uploaded research papers (optional).

Output

* Research report.
* Literature review.
* Research recommendations.

---

## 2. Paper Retrieval Agent

### Responsibilities

- Search Semantic Scholar.
- Retrieve research papers.
- Fetch metadata.
- Handle API communication.
- Handle API errors.

### Output

- Structured paper metadata.
---

## 3. Paper Analysis Agent

### Responsibilities

- Analyze paper abstracts.
- Extract research problems.
- Detect methodologies.
- Extract key contributions.
- Detect future work.
- Extract keywords.
- Detect research area.
- Calculate quality score.
- Assign quality classification.

### Output

- Structured paper analysis.

---

## 4. Methodology Comparison Agent

### Responsibilities

- Compare multiple analyzed papers.
- Compare methodologies.
- Compare research areas.
- Compare keywords.
- Compare citation counts.
- Identify highest cited paper.
- Identify latest published paper.

### Output

- Structured comparison report.

---

## 5. Research Gap Detection Agent

### Responsibilities

- Aggregate research areas.
- Aggregate common keywords.
- Aggregate future work statements.
- Generate structured research gap report.

### Output

- Research gap report.

### Current Status

✅ Implemented

### Current Implementation

Completed

Capabilities

- Research area extraction
- Keyword aggregation
- Future work extraction
- Structured research gap report generation
---

## 6. Experiment Planning Agent

Responsibilities

Generate

* Experimental workflow.
* Baseline models.
* Dataset suggestions.
* Evaluation metrics.
* Hardware recommendations.
* Validation strategy.

Output

Experiment plan.

---

## 7. Report Generation Module

Responsibilities

Combine outputs from all agents into

* Literature review
* Research report
* Comparison tables
* Future work
* References

Export Formats

* PDF
* Markdown
* DOCX

---

# Data Flow

## Current Backend Data Flow

```text
User
   │
   ▼
FastAPI Endpoint
   │
   ▼
Service Layer
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
   ├──────────────► Methodology Comparison Agent
   │
   └──────────────► Research Gap Detection Agent
   │
   ▼
Structured JSON Response
```

---

## Planned Multi-Agent Flow

```text
User Query
      │
      ▼
Paper Retrieval
      │
      ▼
Paper Analysis
      │
      ▼
Methodology Comparison
      │
      ▼
Research Gap Detection
      │
      ▼
Experiment Planning
      │
      ▼
Report Generation
```

---

# Current Implementation Status

| Component | Status |
|------------|---------|
| FastAPI Backend | ✅ Completed |
| Search API | ✅ Completed |
| Analysis API | ✅ Completed |
| Comparison API | ✅ Completed |
| Research Gap API | ✅ Completed |
| Paper Retrieval Agent | ✅ Completed |
| Paper Analysis Agent | ✅ Completed |
| Methodology Comparison Agent | ✅ Completed |
| Research Gap Detection Agent | ✅ Completed |
| Paper Parser | ✅ Completed |
| Paper Service | ✅ Completed |
| Analysis Service | ✅ Completed |
| Comparison Service | ✅ Completed |
| Research Gap Service | ✅ Completed |
| Logging | ✅ Completed |
| Exception Handling | ✅ Completed |
| Unit Testing | ✅ Completed |
| Integration Testing | ✅ Completed |
| Experiment Planning Agent | ⏳ Planned |
| Report Generation Module | ⏳ Planned |
---

# Advantages of Multi-Agent Architecture

- Modular backend design
- Independent AI agents
- Easy maintenance
- High scalability
- Better separation of responsibilities
- Easier testing
- Reusable components
- Structured JSON communication
- Easy integration of future AI agents
- Reduced code coupling
---

# Future Extensions

- Experiment Planning Agent
- Literature Review Agent
- Report Generation Agent
- Citation Analysis Agent
- Knowledge Graph Generation
- Research Trend Prediction
- Benchmark Recommendation Agent
- AI Reviewer
- Multi-Agent Collaboration
- Agent-to-Agent (A2A) Communication
- Model Context Protocol (MCP)
- Persistent Research Memory

---

# Conclusion

The current backend architecture of ResearchMind AI provides a modular and extensible foundation for intelligent research assistance. It successfully integrates research paper retrieval, rule-based paper analysis, methodology comparison, and research gap detection into independent AI agents coordinated through FastAPI service layers.

This architecture enables easy addition of future agents such as Experiment Planning, Literature Review Generation, Knowledge Graph Construction, and Report Generation without modifying the existing pipeline, ensuring scalability, maintainability, and efficient multi-agent collaboration.