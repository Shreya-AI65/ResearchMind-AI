"""
Report Generation Service

Coordinates all AI agents to generate the final
research report.
"""
from app.utils.pdf_generator import generate_pdf
from app.utils.docx_generator import generate_docx
from app.utils.markdown_generator import generate_markdown
from app.utils.report_history import ReportHistoryManager
import logging
import time

from app.agents.paper_retrieval import PaperRetrievalAgent
from app.agents.paper_analysis import PaperAnalysisAgent
from app.agents.literature_review import LiteratureReviewAgent
from app.agents.methodology_comparison import MethodologyComparisonAgent
from app.agents.research_gap_detection import ResearchGapDetectionAgent
from app.agents.experiment_planning import ExperimentPlanningAgent
from app.agents.report_generation import ReportGenerationAgent
from app.agents.citation_analysis import CitationAnalysisAgent

logger = logging.getLogger(__name__)


class ReportGenerationService:

    def __init__(self):

        self.paper_agent = PaperRetrievalAgent()
        self.analysis_agent = PaperAnalysisAgent()
        self.review_agent = LiteratureReviewAgent()
        self.methodology_agent = MethodologyComparisonAgent()
        self.gap_agent = ResearchGapDetectionAgent()
        self.experiment_agent = ExperimentPlanningAgent()
        self.report_agent = ReportGenerationAgent()
        self.history = ReportHistoryManager()
        self.citation_agent = CitationAnalysisAgent()

    def generate_report(self, query: str):

        start_time = time.perf_counter()

        logger.info(f"Generating report for query: {query}")

        try:

            # Step 1: Retrieve papers
            papers = self.paper_agent.search_papers(query)

            # Step 2: Analyze papers
            analyzed_papers = []
            logger.info(f"Retrieved papers type: {type(papers)}")
            logger.info(f"First paper type: {type(papers[0])}")
            for paper in papers:
                analyzed_papers.append(
                    self.analysis_agent.analyze_paper(paper)
                )

            # Step 3: Compare methodologies
            methodology = self.methodology_agent.compare_papers(
                analyzed_papers
            )

            # Step 4: Detect research gaps
            research_gap = self.gap_agent.detect_gaps(
                analyzed_papers
            )

            # Step 5: Generate literature review
            literature_review = self.review_agent.generate_review(
                analyzed_papers,
                research_gap
            )

            # Step 6: Generate experiment plan
            experiment_plan = self.experiment_agent.generate_plan(
                research_gap
            )
            citation_analysis = self.citation_agent.analyze_citations(
                analyzed_papers
            )

            # Step 7: Generate final report
            report = self.report_agent.generate_report(
                query=query,
                literature_review=literature_review,
                methodology_comparison=methodology,
                research_gap=research_gap,
                experiment_plan=experiment_plan,
                citation_analysis=citation_analysis
            )
            pdf_file = generate_pdf(report)
            docx_file = generate_docx(report)
            markdown_file = generate_markdown(report)
            self.history.save_history(
                query,
                pdf_file,
                docx_file,
                markdown_file
            )
            execution_time = round(
                time.perf_counter() - start_time,
                2
            )

            logger.info(
                f"Report generated successfully in {execution_time} seconds."
            )

            return {
                "status": "success",
                "execution_time": execution_time,
                "pdf_file": pdf_file,
                "docx_file":docx_file,
                "markdown_file":markdown_file,
                "report": report
            }
        except Exception as e:

            logger.exception("Report generation failed.")

            return {
                "status": "failed",
                "error": str(e)
            }