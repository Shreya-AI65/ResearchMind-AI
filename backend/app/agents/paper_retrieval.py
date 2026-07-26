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

    def search_papers(self, query: str):

        if not query.strip():
            raise InvalidQueryException(
                "Search query cannot be empty."
            )

        logger.info(f"Searching papers for query: {query}")

        params = {
            "query": query,
            "limit": DEFAULT_PAPER_LIMIT,
            "fields": "title,authors,abstract,year,citationCount,url"
        }

        headers = {
            "x-api-key": SEMANTIC_SCHOLAR_API_KEY
        }
        print("API Key:", SEMANTIC_SCHOLAR_API_KEY)
        print("Base URL:", self.BASE_URL)
        print("Endpoint:", self.SEARCH_ENDPOINT)
        print("Headers:", headers)
        print("Params:", params)
        response = requests.get(
            self.BASE_URL + self.SEARCH_ENDPOINT,
            params=params,
            headers=headers,
            timeout=REQUEST_TIMEOUT
        )

        print("=" * 80)
        print("URL:", response.url)
        print("Status Code:", response.status_code)
        print("Headers:", response.headers)
        print("Body:")
        print(response.text)
        print("=" * 80)
        
        logger.info(f"Semantic Scholar Response Status: {response.status_code}")
        if response.status_code == 429:
            raise APIRateLimitException(
                "Semantic Scholar API rate limit exceeded."
            )

        if response.status_code == 401:
            raise PaperRetrievalException(
                "Invalid or unauthorized Semantic Scholar API Key."
            )

        if response.status_code == 403:
            raise PaperRetrievalException(
                "Access forbidden. Please verify your API key permissions."
            )

        if response.status_code != 200:
            raise PaperRetrievalException(
                f"Status: {response.status_code}\nResponse: {response.text}"
        )

        data = response.json()

        if "data" not in data or len(data["data"]) == 0:
            raise EmptyResponseException(
                "No papers found."
            )

        logger.info(f"Successfully retrieved {len(data['data'])} papers.")

        return data