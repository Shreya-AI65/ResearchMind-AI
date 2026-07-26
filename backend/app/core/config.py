import os
from dotenv import load_dotenv

load_dotenv()

SEMANTIC_SCHOLAR_BASE_URL = "https://api.semanticscholar.org/graph/v1"

SEARCH_ENDPOINT = "/paper/search"

DEFAULT_PAPER_LIMIT = 5

REQUEST_TIMEOUT = 30

SEMANTIC_SCHOLAR_API_KEY = os.getenv("SEMANTIC_SCHOLAR_API_KEY")

PROJECT_NAME = "ResearchMind AI"

VERSION = "0.1.0"

DEBUG = True