import requests

from app.utils.exceptions import (
    PaperRetrievalException,
    APIRateLimitException,
    InvalidQueryException,
    EmptyResponseException
)
from app.core.config import (
    SEMANTIC_SCHOLAR_BASE_URL,
    SEARCH_ENDPOINT,
    DEFAULT_PAPER_LIMIT,
    REQUEST_TIMEOUT
)


class PaperRetrievalAgent:
    BASE_URL = SEMANTIC_SCHOLAR_BASE_URL

    SEARCH_ENDPOINT = SEARCH_ENDPOINT

    def __init__(self):
        self.agent_name = "Paper Retrieval Agent"
        self.status = "Initialized"

    def search_papers(self, query: str):

    # Check for empty query
        if not query.strip():
            raise InvalidQueryException("Search query cannot be empty.")

        params = {
            "query": query,
            "limit": DEFAULT_PAPER_LIMIT,
            "fields": "title,authors,abstract,year,citationCount,url"
        }

        print(self.BASE_URL + self.SEARCH_ENDPOINT)
        print(params)

        response = requests.get(
            self.BASE_URL + self.SEARCH_ENDPOINT,
            params=params,
            timeout=REQUEST_TIMEOUT
        )

        print("=" * 50)
        print("Status Code:", response.status_code)
        print("Headers:", response.headers)
        print("Response Text:", response.text)
        print("=" * 50)

    # Handle API rate limit
        if response.status_code == 429:
            raise APIRateLimitException(
            "Semantic Scholar API rate limit exceeded."
            )

    # Handle any other API error
        if response.status_code != 200:
            raise PaperRetrievalException(
            f"API returned status code {response.status_code}"
        )

        data = response.json()

    # Handle empty results
        if "data" not in data or len(data["data"]) == 0:
            raise EmptyResponseException("No papers found.")

        
        return data