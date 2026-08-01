import time
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
    DEFAULT_PAPER_LIMIT,
    REQUEST_TIMEOUT,
    SEMANTIC_SCHOLAR_API_KEY
)

logger = setup_logger(__name__)


class PaperRetrievalAgent:

    def __init__(self):

        self.agent_name = "Paper Retrieval Agent"
        self.status = "Initialized"
        self.base_url = SEMANTIC_SCHOLAR_BASE_URL
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

        MAX_RETRIES = 3

        for attempt in range(MAX_RETRIES):

            response = requests.get(
                self.base_url + self.endpoint,
                headers=headers,
                params=params,
                timeout=REQUEST_TIMEOUT
            )

            logger.info(
                f"Semantic Scholar Response Status: {response.status_code}"
            )

            # Success
            if response.status_code == 200:
                break

            # Rate Limit
            if response.status_code == 429:

                wait_time = 2 ** attempt

                logger.warning(
                    f"Rate limit reached. Retry {attempt + 1}/{MAX_RETRIES} "
                    f"after {wait_time} seconds..."
                )

                time.sleep(wait_time)
                continue

            # Other Errors
            raise PaperRetrievalException(
                f"Semantic Scholar API Error: {response.status_code}"
            )

        else:
            raise APIRateLimitException(
                "Semantic Scholar API rate limit exceeded after multiple retries."
            )

        data = response.json()

        if not data.get("data"):
            raise EmptyResponseException(
                "No papers found."
            )

        papers = []

        for paper in data.get("data", []):

            papers.append({
                "title": paper.get("title", ""),
                "authors": [
                    author.get("name", "")
                    for author in paper.get("authors", [])
                ],
                "abstract": paper.get("abstract", ""),
                "year": paper.get("year", ""),
                "citation_count": paper.get("citationCount", 0),
                "url": paper.get("url", "")
            })

        logger.info(
            f"Successfully retrieved {len(papers)} papers."
        )

        return papers