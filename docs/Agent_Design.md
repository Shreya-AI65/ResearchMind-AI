# Agent Design

## Overview

ResearchMind AI follows a multi-agent architecture in which each agent performs a specialized research task. Instead of relying on a single AI model, multiple intelligent agents collaborate to generate a complete research workflow.

---

# Agent 1: Paper Retrieval Agent

## Objective

Retrieve high-quality research papers related to the user's query.

### Responsibilities

* Search multiple research databases.
* Remove duplicate papers.
* Rank papers by relevance.
* Collect metadata.
* Parse Semantic Scholar API responses.
* Convert papers into standardized objects.
* Forward structured papers to the Paper Analysis Agent.

### Input

* Research topic
* User query
* Keywords

### Output

* Ranked paper list
* Metadata
* PDF links
* Citation information

### APIs

* Semantic Scholar
* Crossref
* arXiv
* PubMed

### Next Agent

Paper Analysis Agent

---

# Agent 2: Paper Analysis Agent

## Objective

Analyze retrieved research papers and extract structured information that can be used by downstream AI agents.

### Responsibilities

* Extract research problem.
* Detect methodology.
* Extract key contributions.
* Detect future work.
* Extract keywords.
* Detect research area.
* Calculate paper quality score.
* Classify paper quality.

### Input

Structured research papers retrieved from the Paper Retrieval Agent.

### Output

Structured paper analysis including:

* Research Problem
* Methodology
* Key Contributions
* Future Work
* Keywords
* Research Area
* Paper Quality Score
* Paper Quality Classification

### Current Implementation

✅ Rule-based paper analysis

### Future Enhancements

* LLM-based summarization
* Dataset extraction
* Evaluation metric extraction
* Strength and limitation detection
* Automatic novelty detection

### Next Agent

Methodology Comparison Agent
---

## Agent 3 – Methodology Comparison Agent

### Objective

Compare multiple analyzed research papers and generate structured comparison information.

### Responsibilities

- Compare research methodologies
- Compare research areas
- Compare research problems
- Compare publication years
- Compare citation counts
- Compare paper quality scores
- Compare quality classifications
- Extract common methodologies
- Extract common keywords
- Identify highest cited paper
- Identify latest published paper

### Input

Analyzed research papers.

### Output

Structured comparison report.

### Status

Backend implementation completed.

### Current Implementation Status

✅ Rule-based implementation completed.

### Implemented Features

- Compare analyzed papers
- Compare research methodologies
- Compare research areas
- Compare research problems
- Compare publication years
- Compare citation counts
- Compare paper quality scores
- Compare quality classifications
- Identify highest cited paper
- Identify latest paper
- Extract common methodologies
- Extract common research areas
- Extract common keywords

### Current Output

- Total papers compared
- Structured comparison report
- Highest cited paper
- Latest published paper
- Common methodologies
- Common research areas
- Common keywords
---

# Agent 4: Research Gap Detection Agent

## Objective

Analyze multiple research papers to identify common research trends and potential research gaps.

### Responsibilities

- Aggregate research areas
- Aggregate common keywords
- Collect future work statements
- Generate structured research gap reports

### Input

Analyzed research papers.

### Output

- Total papers analyzed
- Research areas
- Common keywords
- Future work suggestions

### Current Implementation

✅ Rule-based implementation completed.

### Future Enhancements

- Automatic research gap identification
- Trend analysis
- Conflicting methodology detection
- Novel research opportunity detection
- LLM-based gap reasoning

### Next Agent

Experiment Planning Agent

---

# Agent 5: Experiment Planning Agent

## Objective

Generate an implementation-ready research plan.

### Responsibilities

Suggest

* Datasets
* Baseline models
* Evaluation metrics
* Hardware requirements
* Validation strategy
* Experimental workflow

### Input

Research gaps

### Output

Complete experiment plan

### Next Agent

Report Generation Module

---

# Report Generation Module

## Objective

Generate the final research report.

### Responsibilities

Combine outputs from all agents into:

* Literature Review
* Paper Summaries
* Comparison Tables
* Research Gaps
* Experiment Plan
* References

### Export Formats

* PDF
* DOCX
* Markdown

---

Current Backend Flow

User Query
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
        ▼
Methodology Comparison Agent
        │
        ▼
Research Gap Detection Agent
        │
        ▼
Structured JSON Response

---------------------------------------

Future Multi-Agent Flow

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
Experiment Planning Agent
        │
        ▼
Report Generation Module
        │
        ▼
Final Research Report

---

| Agent | Status |
|-------|--------|
| Paper Retrieval Agent | ✅ Completed |
| Paper Analysis Agent | ✅ Completed |
| Methodology Comparison Agent | ✅ Completed |
| Research Gap Detection Agent | ✅ Completed |
| Experiment Planning Agent | ⏳ Planned |
| Report Generation Module | ⏳ Planned |
---

# Future Agents

The architecture can be extended by introducing additional specialized agents:

* Citation Analysis Agent
* Knowledge Graph Agent
* Code Generation Agent
* Benchmark Recommendation Agent
* AI Reviewer Agent
* Research Trend Prediction Agent
* Presentation Generation Agent
* Collaboration Agent

---

# Benefits of Multi-Agent Design

* Modular architecture
* Easy maintenance
* Independent agent upgrades
* Better scalability
* Parallel execution
* Reduced hallucination
* Explainable outputs
* Improved research quality
* Independent testing of agents
* Reusable service-oriented architecture