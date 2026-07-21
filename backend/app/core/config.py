"""
Configuration File

Purpose:
Store all configurable application settings in one place.
This makes the application easier to maintain and extend.
"""

# Semantic Scholar API Configuration
SEMANTIC_SCHOLAR_BASE_URL = "https://api.semanticscholar.org/graph/v1"

SEARCH_ENDPOINT = "/paper/search"

DEFAULT_PAPER_LIMIT = 5

REQUEST_TIMEOUT = 30


# Future Configuration

# API Key (to be added after approval)
SEMANTIC_SCHOLAR_API_KEY = ""

# Application Information
PROJECT_NAME = "ResearchMind AI"

VERSION = "0.1.0"

DEBUG = True