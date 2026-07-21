from app.agents.paper_retrieval import PaperRetrievalAgent
from app.utils.parser import PaperParser
from app.utils.logger import setup_logger
from app.utils.exceptions import ResearchMindException
from app.utils.response_formatter import ResponseFormatter

logger = setup_logger(__name__)


class PaperService:

    def __init__(self):
        self.retrieval_agent = PaperRetrievalAgent()

    def search_papers(self, query: str):

        logger.info(f"Received search query: {query}")

        try:
            raw_response = self.retrieval_agent.search_papers(query)

            parsed_papers = PaperParser.parse_response(raw_response)

            logger.info(f"Successfully parsed {len(parsed_papers)} papers.")

            return ResponseFormatter.success(
                "Papers retrieved successfully.",
                {
                    "query": query,
                    "total_papers": len(parsed_papers),
                    "papers": parsed_papers
                }
            )

        except ResearchMindException as e:

            logger.error(str(e))

            return ResponseFormatter.error(str(e))

        except Exception as e:

            logger.exception("Unexpected error occurred.")

            return ResponseFormatter.error(
    "An unexpected error occurred."
)