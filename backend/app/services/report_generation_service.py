from app.agents.paper_retrieval import PaperRetrievalAgent
from app.agents.paper_analysis import PaperAnalysisAgent
from app.agents.methodology_comparison import MethodologyComparisonAgent
from app.agents.research_gap_detection import ResearchGapDetectionAgent
from app.agents.experiment_planning import ExperimentPlanningAgent
from app.agents.literature_review import LiteratureReviewAgent
from app.agents.report_generation import ReportGenerationAgent

from app.utils.parser import PaperParser
from app.utils.logger import setup_logger
from app.utils.exceptions import ResearchMindException

logger = setup_logger(__name__)


class ReportGenerationService:

    def __init__(self):

        self.retrieval_agent = PaperRetrievalAgent()
        self.analysis_agent = PaperAnalysisAgent()
        self.comparison_agent = MethodologyComparisonAgent()
        self.research_gap_agent = ResearchGapDetectionAgent()
        self.experiment_agent = ExperimentPlanningAgent()
        self.literature_agent = LiteratureReviewAgent()
        self.report_agent = ReportGenerationAgent()

    def generate_report(self, query: str):

        logger.info(f"Report generation request received: {query}")

        try:

            # Step 1 - Retrieve Papers
            raw_response = self.retrieval_agent.search_papers(query)
            print("✓ Paper retrieval completed")

            # Step 2 - Parse Papers
            parsed_papers = PaperParser.parse_response(raw_response)
            print("✓ Paper parsing completed")

            # Step 3 - Analyze Papers
            analyzed_papers = []

            for paper in parsed_papers:
                analyzed_papers.append(
                    self.analysis_agent.analyze_paper(paper)
                )

            print("✓ Paper analysis completed")

            # Step 4 - Compare Methodologies
            methodology = self.comparison_agent.compare_papers(
                analyzed_papers
            )

            print("✓ Methodology comparison completed")

            # Step 5 - Detect Research Gaps
            research_gap = self.research_gap_agent.generate_gap_report(
                analyzed_papers
            )

            print("✓ Research gap detection completed")

            # Step 6 - Generate Experiment Plan
            experiment_plan = self.experiment_agent.generate_plan(
                research_gap
            )

            print("✓ Experiment planning completed")

            # Step 7 - Generate Literature Review
            literature_review = self.literature_agent.generate_review(
                analyzed_papers,
                research_gap
            )

            print("✓ Literature review completed")

            # Step 8 - Generate Final Report
            report = self.report_agent.generate_report(
                query,
                literature_review,
                methodology,
                research_gap,
                experiment_plan
            )

            print("✓ Final report generated")

            logger.info("Research report generated successfully.")

            return {
                "success": True,
                "message": "Research report generated successfully.",
                "data": report
            }

        except ResearchMindException as e:

            logger.error(str(e))

            return {
                "success": False,
                "message": str(e),
                "data": None
            }

        except Exception as e:

            logger.exception("Unexpected server error")

            import traceback

            print("\n" + "=" * 70)
            print("REPORT GENERATION ERROR")
            print("=" * 70)
            print(f"Exception Type : {type(e).__name__}")
            print(f"Exception      : {e}")
            traceback.print_exc()
            print("=" * 70 + "\n")

            return {
                "success": False,
                "message": str(e),
                "data": None
            }