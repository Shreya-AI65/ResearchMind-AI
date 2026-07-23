from app.agents.paper_retrieval import PaperRetrievalAgent
from app.agents.paper_analysis import PaperAnalysisAgent
from app.agents.methodology_comparison import MethodologyComparisonAgent

from app.utils.parser import PaperParser
from app.utils.logger import setup_logger
from app.utils.exceptions import ResearchMindException

logger = setup_logger(__name__)

class ComparisonService:

    def __init__(self):

        self.retrieval_agent = PaperRetrievalAgent()
        self.analysis_agent = PaperAnalysisAgent()
        self.comparison_agent = MethodologyComparisonAgent()

    def compare(self, query: str):

        logger.info(f"Comparison request received: {query}")

        try:

            raw_response = self.retrieval_agent.search_papers(query)

            parsed_papers = PaperParser.parse_response(raw_response)

            analyzed_papers = []

            for paper in parsed_papers:

                analyzed_papers.append(
                    self.analysis_agent.analyze_paper(paper)
                )

            comparison = self.comparison_agent.compare_papers(
                analyzed_papers
            )

            logger.info("Paper comparison completed successfully.")

            return {
                "success": True,
                "message": "Paper comparison completed successfully.",
                "data": comparison
            }

        except ResearchMindException as e:

            logger.error(str(e))

            return {
                "success": False,
                "message": str(e),
                "data": None
            }

        except Exception:

            logger.exception("Unexpected error occurred.")

            return {
                "success": False,
                "message": "Unexpected server error.",
                "data": None
            }