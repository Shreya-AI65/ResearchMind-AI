"""
Citation Analysis Service

Coordinates paper retrieval, paper analysis,
and citation analysis.
"""

import logging
import time

from app.agents.paper_retrieval import PaperRetrievalAgent
from app.agents.paper_analysis import PaperAnalysisAgent
from app.agents.citation_analysis import CitationAnalysisAgent

logger = logging.getLogger(__name__)


class CitationAnalysisService:

    def __init__(self):

        self.paper_agent = PaperRetrievalAgent()
        self.analysis_agent = PaperAnalysisAgent()
        self.citation_agent = CitationAnalysisAgent()

    def analyze_citations(self, query: str):

        start_time = time.perf_counter()

        logger.info(
            f"Starting citation analysis for: {query}"
        )

        try:

            # Step 1: Retrieve papers
            papers = self.paper_agent.search_papers(query)

            # Step 2: Analyze papers
            analyzed_papers = []

            for paper in papers:

                analyzed_papers.append(
                    self.analysis_agent.analyze_paper(paper)
                )

            # Step 3: Citation Analysis
            citation_report = self.citation_agent.analyze_citations(
                analyzed_papers
            )

            execution_time = round(
                time.perf_counter() - start_time,
                2
            )

            logger.info(
                f"Citation analysis completed in {execution_time} seconds."
            )

            return {

                "status": "success",

                "execution_time": execution_time,

                "citation_analysis": citation_report

            }

        except Exception as e:

            logger.exception(
                "Citation analysis failed."
            )

            return {

                "status": "failed",

                "error": str(e)

            }