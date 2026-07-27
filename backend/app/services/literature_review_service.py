from app.agents.paper_retrieval import PaperRetrievalAgent
from app.agents.paper_analysis import PaperAnalysisAgent
from app.agents.research_gap_detection import ResearchGapDetectionAgent
from app.agents.literature_review import LiteratureReviewAgent

from app.utils.parser import PaperParser
from app.utils.logger import setup_logger
from app.utils.exceptions import ResearchMindException

logger = setup_logger(__name__)


class LiteratureReviewService:

    def __init__(self):

        self.retrieval_agent = PaperRetrievalAgent()
        self.analysis_agent = PaperAnalysisAgent()
        self.research_gap_agent = ResearchGapDetectionAgent()
        self.review_agent = LiteratureReviewAgent()

    def generate_review(self, query: str):

        logger.info(f"Literature review request received: {query}")

        try:

            # Retrieve papers
            raw_response = self.retrieval_agent.search_papers(query)

            # Parse papers
            parsed_papers = PaperParser.parse_response(raw_response)

            # Analyze papers
            analyzed_papers = []

            for paper in parsed_papers:
                analyzed_papers.append(
                    self.analysis_agent.analyze_paper(paper)
                )

            # Generate research gap
            research_gap = self.research_gap_agent.generate_gap_report(
                analyzed_papers
            )

            # Generate literature review
            review = self.review_agent.generate_review(
                analyzed_papers,
                research_gap
            )

            logger.info("Literature review generated successfully.")

            return {
                "success": True,
                "message": "Literature review generated successfully.",
                "data": review
            }

        except ResearchMindException as e:

            logger.error(str(e))

            return {
                "success": False,
                "message": str(e),
                "data": None
            }

        except Exception as e:

            logger.exception("Unexpected error occurred.")

            return {
                "success": False,
                "message": str(e),
                "data": None
            }