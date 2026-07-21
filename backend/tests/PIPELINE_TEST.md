# End-to-End Pipeline Testing

## Overview

This document records the end-to-end testing performed on the ResearchMind AI backend. The objective of these tests is to verify that all backend components communicate correctly and produce the expected outputs for both successful and error scenarios.

The complete request flow tested is:

```text
Client
   │
   ▼
FastAPI Endpoint
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
Response Formatter
   │
   ▼
JSON Response
```

---

## Testing Environment

- Backend Framework: FastAPI
- Programming Language: Python 3.13
- API Used: Semantic Scholar Graph API
- Operating System: Windows
- Testing Method: Manual API Testing using Browser and FastAPI

---

## Test Case 1 – Valid Search Query

**Request**

```
GET /search?query=Agentic AI
```

**Expected Result**

- HTTP Status Code: 200
- Standardized success response
- Parsed research papers returned

**Actual Result**

- Successfully retrieved research papers.
- Response formatter returned standardized JSON response.

**Status**

✅ PASS

---

## Test Case 2 – Empty Search Query

**Request**

```
GET /search?query=
```

**Expected Result**

- Validation error
- Standardized error response

**Actual Result**

```
{
    "success": false,
    "message": "Search query cannot be empty.",
    "data": null
}
```

**Status**

✅ PASS

---

## Test Case 3 – API Rate Limit Handling

**Scenario**

Semantic Scholar API returned HTTP Status Code 429.

**Expected Result**

Backend should catch the exception and return a user-friendly error message.

**Actual Result**

```
{
    "success": false,
    "message": "Semantic Scholar API rate limit exceeded.",
    "data": null
}
```

**Status**

✅ PASS

---

## Test Case 4 – Parser Verification

**Objective**

Verify that the parser correctly extracts the required paper information.

**Verified Fields**

- Title
- Authors
- Abstract
- Publication Year
- Citation Count
- Paper URL

**Status**

✅ PASS

---

## Test Case 5 – Logger Verification

**Objective**

Verify that backend logs record request processing and errors correctly.

**Observed Logs**

- Search query received
- Successful paper parsing
- API rate limit errors
- Exception handling logs

**Status**

✅ PASS

---

## Test Summary

| Component | Status |
|-----------|--------|
| FastAPI Endpoint | ✅ PASS |
| Paper Service | ✅ PASS |
| Paper Retrieval Agent | ✅ PASS |
| Semantic Scholar API Integration | ✅ PASS |
| Paper Parser | ✅ PASS |
| Response Formatter | ✅ PASS |
| Exception Handling | ✅ PASS |
| Logger | ✅ PASS |

---

## Conclusion

The complete backend pipeline was tested successfully. All backend components communicated correctly and produced the expected results under both normal and exceptional conditions. The implemented logging, exception handling, parser, service layer, and response formatter worked as intended, confirming that the backend foundation is stable and ready for the next development phase.