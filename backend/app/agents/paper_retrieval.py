
import time
from urllib import response

import requests

from app.utils.exceptions import (
    PaperRetrievalException,
    APIRateLimitException,
    InvalidQueryException,
    EmptyResponseException
)

from app.utils.logger import setup_logger

from app.core.config import (
    SEMANTIC_SCHOLAR_BASE_URL,
    SEARCH_ENDPOINT,
    DEFAULT_PAPER_LIMIT,
    REQUEST_TIMEOUT,
    SEMANTIC_SCHOLAR_API_KEY
)

logger = setup_logger(__name__)


class PaperRetrievalAgent:

    BASE_URL = SEMANTIC_SCHOLAR_BASE_URL
    SEARCH_ENDPOINT = SEARCH_ENDPOINT

    def __init__(self):
        self.agent_name = "Paper Retrieval Agent"
        self.status = "Initialized"
        self.base_url = "https://api.semanticscholar.org/graph/v1"
        self.endpoint = "/paper/search"


    def search_papers(self, query):

        if not query or len(query.strip()) < 3:
            raise InvalidQueryException(
                "Query must contain at least 3 characters."
            )

        params = {
            "query": query,
            "limit": DEFAULT_PAPER_LIMIT,
            "fields": "title,authors,abstract,year,citationCount,url"
        }

        headers = {
            "x-api-key": SEMANTIC_SCHOLAR_API_KEY
        }

        logger.info(f"Searching papers for query: {query}")

        response = requests.get(
            self.base_url + self.endpoint,
            headers=headers,
            params=params,
            timeout=REQUEST_TIMEOUT
        )

        logger.info(
            f"Semantic Scholar Response Status: {response.status_code}"
        )

        if response.status_code == 429:
            raise APIRateLimitException(
                "Semantic Scholar API rate limit exceeded."
            )

        if response.status_code != 200:
            raise PaperRetrievalException(
                f"Semantic Scholar API Error: {response.status_code}"
            )

        data = response.json()

        if not data.get("data"):
            raise EmptyResponseException(
                "No papers found."
            )

        papers = []

        for paper in data.get("data", []):

            papers.append({
                "title": paper.get("title"),
                "authors": [
                    author.get("name")
                    for author in paper.get("authors", [])
                ],
                "abstract": paper.get("abstract"),
                "year": paper.get("year"),
                "citation_count": paper.get("citationCount"),
                "url": paper.get("url")
            })

        logger.info(
            f"Successfully retrieved {len(papers)} papers."
        )

        return papers