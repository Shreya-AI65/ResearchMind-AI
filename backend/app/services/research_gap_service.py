from app.agents.paper_retrieval import PaperRetrievalAgent
from app.agents.paper_analysis import PaperAnalysisAgent
from app.agents.research_gap_detection import ResearchGapDetectionAgent

from app.utils.parser import PaperParser
from app.utils.logger import setup_logger
from app.utils.exceptions import ResearchMindException

logger = setup_logger(__name__)


class ResearchGapService:

    def __init__(self):

        self.retrieval_agent = PaperRetrievalAgent()
        self.analysis_agent = PaperAnalysisAgent()
        self.gap_agent = ResearchGapDetectionAgent()

    def analyze(self, query: str):

        logger.info(f"Research Gap request received: {query}")

        try:

            raw_response = self.retrieval_agent.search_papers(query)

            parsed_papers = PaperParser.parse_response(raw_response)

            analyzed_papers = []

            for paper in parsed_papers:

                analyzed_papers.append(
                    self.analysis_agent.analyze_paper(paper)
                )

            gap_report = self.gap_agent.generate_gap_report(
                analyzed_papers
            )

            logger.info(
                "Research Gap Detection completed successfully."
            )

            return {
                "success": True,
                "message": "Research Gap Detection completed successfully.",
                "data": gap_report
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