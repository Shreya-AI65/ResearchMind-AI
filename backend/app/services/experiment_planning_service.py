from app.agents.paper_retrieval import PaperRetrievalAgent
from app.agents.paper_analysis import PaperAnalysisAgent
from app.agents.research_gap_detection import ResearchGapDetectionAgent
from app.agents.experiment_planning import ExperimentPlanningAgent

from app.utils.parser import PaperParser
from app.utils.logger import setup_logger
from app.utils.exceptions import ResearchMindException

logger = setup_logger(__name__)


class ExperimentPlanningService:

    def __init__(self):

        self.retrieval_agent = PaperRetrievalAgent()
        self.analysis_agent = PaperAnalysisAgent()
        self.research_gap_agent = ResearchGapDetectionAgent()
        self.experiment_agent = ExperimentPlanningAgent()

    def generate_plan(self, query: str):

        logger.info(f"Experiment planning request received: {query}")

        try:

            print("\n==============================")
            print("STEP 1 : Retrieving Papers")
            print("==============================")

            raw_response = self.retrieval_agent.search_papers(query)

            print("✓ Papers Retrieved")

            print("\n==============================")
            print("STEP 2 : Parsing Papers")
            print("==============================")

            parsed_papers = PaperParser.parse_response(raw_response)

            print(f"✓ Parsed {len(parsed_papers)} Papers")

            print("\n==============================")
            print("STEP 3 : Analyzing Papers")
            print("==============================")

            analyzed_papers = []

            for paper in parsed_papers:

                analyzed = self.analysis_agent.analyze_paper(paper)

                analyzed_papers.append(analyzed)

            print("✓ Paper Analysis Completed")

            print("\n==============================")
            print("STEP 4 : Research Gap Detection")
            print("==============================")

            research_gap = self.research_gap_agent.detect_gaps(
                analyzed_papers
            )

            print(research_gap)

            print("✓ Research Gap Generated")

            print("\n==============================")
            print("STEP 5 : Experiment Planning")
            print("==============================")

            experiment_plan = self.experiment_agent.generate_plan(
                research_gap
            )

            print("✓ Experiment Plan Generated")

            logger.info("Experiment plan generated successfully.")

            return {
                "success": True,
                "message": "Experiment plan generated successfully.",
                "data": experiment_plan
            }

        except ResearchMindException as e:

            print("\nResearchMindException")
            print(type(e).__name__)
            print(str(e))

            logger.exception(str(e))

            return {
                "success": False,
                "message": str(e),
                "data": None
            }

        except Exception as e:

            print("\nUnexpected Exception")
            print(type(e).__name__)
            print(str(e))

            logger.exception(str(e))

            return {
                "success": False,
                "message": str(e),
                "data": None
            }