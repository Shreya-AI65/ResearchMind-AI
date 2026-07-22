"""
Analysis Service

Purpose:
Coordinates the complete paper analysis workflow by retrieving
papers, parsing them, and generating structured analysis.
"""

from app.agents.paper_retrieval import PaperRetrievalAgent
from app.agents.paper_analysis import PaperAnalysisAgent
from app.utils.parser import PaperParser
from app.utils.logger import setup_logger
from app.utils.exceptions import ResearchMindException

logger = setup_logger(__name__)


class AnalysisService:

    def __init__(self):
        self.retrieval_agent = PaperRetrievalAgent()
        self.analysis_agent = PaperAnalysisAgent()

    def analyze_papers(self, query: str):

        logger.info(f"Analysis request received: {query}")

        try:

            # Step 1: Retrieve papers
            raw_response = self.retrieval_agent.search_papers(query)

            # Step 2: Parse papers
            parsed_papers = PaperParser.parse_response(raw_response)

            logger.info(f"{len(parsed_papers)} papers parsed successfully.")

            # Step 3: Analyze papers
            analysis_results = []

            for paper in parsed_papers:
                analysis = self.analysis_agent.analyze_paper(paper)
                analysis_results.append(analysis)

            logger.info(
                f"Analysis completed for {len(analysis_results)} papers."
            )

            return {
                "query": query,
                "total_papers": len(analysis_results),
                "analysis": analysis_results
            }

        except ResearchMindException as e:

            logger.error(str(e))

            return {
                "status": "Error",
                "message": str(e)
            }

        except Exception:

            logger.exception("Unexpected error during analysis.")

            return {
                "status": "Error",
                "message": "An unexpected error occurred during paper analysis."
            }