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

        # Maximum number of API attempts
        self.max_retries = 3

        # Default retry delay
        self.default_retry_delay = 5


    # ============================================================
    # SEARCH PAPERS
    # ============================================================

    def search_papers(self, query):

        # --------------------------------------------------------
        # Validate query
        # --------------------------------------------------------

        if not query or len(query.strip()) < 3:

            raise InvalidQueryException(
                "Query must contain at least 3 characters."
            )


        query = query.strip()


        # --------------------------------------------------------
        # API parameters
        # --------------------------------------------------------

        params = {
            "query": query,
            "limit": DEFAULT_PAPER_LIMIT,
            "fields": (
                "title,"
                "authors,"
                "abstract,"
                "year,"
                "citationCount,"
                "url"
            )
        }


        # --------------------------------------------------------
        # API headers
        # --------------------------------------------------------

        headers = {}

        if SEMANTIC_SCHOLAR_API_KEY:

            headers["x-api-key"] = SEMANTIC_SCHOLAR_API_KEY


        logger.info(
            f"Searching Semantic Scholar for query: {query}"
        )


        # ========================================================
        # API REQUEST WITH RETRY HANDLING
        # ========================================================

        for attempt in range(self.max_retries):

            try:

                response = requests.get(

                    self.base_url + self.endpoint,

                    headers=headers,

                    params=params,

                    timeout=REQUEST_TIMEOUT
                )


            except requests.exceptions.Timeout:

                logger.warning(
                    f"Semantic Scholar request timed out "
                    f"(attempt {attempt + 1}/"
                    f"{self.max_retries})"
                )


                if attempt == self.max_retries - 1:

                    raise PaperRetrievalException(
                        "Semantic Scholar request timed out."
                    )


                retry_delay = (
                    self.default_retry_delay *
                    (2 ** attempt)
                )


                logger.info(
                    f"Retrying after {retry_delay} seconds..."
                )


                time.sleep(retry_delay)

                continue


            except requests.exceptions.RequestException as e:

                logger.error(
                    f"Semantic Scholar connection error: {str(e)}"
                )


                raise PaperRetrievalException(
                    "Unable to connect to Semantic Scholar."
                )


            logger.info(
                "Semantic Scholar response status: "
                f"{response.status_code}"
            )


            # ====================================================
            # SUCCESS
            # ====================================================

            if response.status_code == 200:

                break


            # ====================================================
            # RATE LIMIT
            # ====================================================

            if response.status_code == 429:

                # ------------------------------------------------
                # Respect Retry-After if provided by API
                # ------------------------------------------------

                retry_after = response.headers.get(
                    "Retry-After"
                )


                if retry_after:

                    try:

                        retry_delay = int(
                            retry_after
                        )

                    except ValueError:

                        retry_delay = (
                            self.default_retry_delay *
                            (2 ** attempt)
                        )

                else:

                    retry_delay = (
                        self.default_retry_delay *
                        (2 ** attempt)
                    )


                logger.warning(
                    "Semantic Scholar API rate limit "
                    f"reached. Attempt "
                    f"{attempt + 1}/{self.max_retries}. "
                    f"Retrying after "
                    f"{retry_delay} seconds."
                )


                if attempt == self.max_retries - 1:

                    raise APIRateLimitException(
                        "Semantic Scholar API rate limit "
                        "exceeded. Please try again later."
                    )


                time.sleep(retry_delay)

                continue


            # ====================================================
            # OTHER API ERRORS
            # ====================================================

            if response.status_code >= 500:

                logger.warning(
                    "Semantic Scholar server error: "
                    f"{response.status_code}. "
                    f"Attempt "
                    f"{attempt + 1}/{self.max_retries}."
                )


                if attempt == self.max_retries - 1:

                    raise PaperRetrievalException(
                        "Semantic Scholar server error."
                    )


                retry_delay = (
                    self.default_retry_delay *
                    (2 ** attempt)
                )


                time.sleep(retry_delay)

                continue


            # ----------------------------------------------------
            # Client-side API error
            # ----------------------------------------------------

            raise PaperRetrievalException(

                "Semantic Scholar API Error: "
                f"{response.status_code}"
            )


        else:

            raise PaperRetrievalException(
                "Unable to retrieve papers from "
                "Semantic Scholar."
            )


        # ========================================================
        # PARSE RESPONSE
        # ========================================================

        try:

            data = response.json()

        except ValueError:

            raise PaperRetrievalException(
                "Invalid response received from "
                "Semantic Scholar."
            )


        # ========================================================
        # EMPTY RESPONSE
        # ========================================================

        if not data.get("data"):

            raise EmptyResponseException(
                f"No papers found for query: {query}"
            )


        # ========================================================
        # FORMAT PAPERS
        # ========================================================

        papers = []


        for paper in data.get("data", []):

            papers.append({

                "title": paper.get(
                    "title",
                    ""
                ),

                "authors": [

                    author.get(
                        "name",
                        ""
                    )

                    for author in paper.get(
                        "authors",
                        []
                    )

                ],

                "abstract": paper.get(
                    "abstract") or ""                   ""
                ,

                "year": paper.get(
                    "year",
                    ""
                ),

                "citation_count": paper.get(
                    "citationCount",
                    0
                ),

                "url": paper.get(
                    "url",
                    ""
                )

            })


        # ========================================================
        # FINAL VALIDATION
        # ========================================================

        if not papers:

            raise EmptyResponseException(
                f"No valid papers found for query: {query}"
            )


        logger.info(
            f"Successfully retrieved "
            f"{len(papers)} papers for query: "
            f"{query}"
        )


        return papers