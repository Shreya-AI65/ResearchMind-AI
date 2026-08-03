"""
Report Generation Service

Coordinates all AI agents to generate the final
research report.
"""

import logging
import time
from app.utils.report_analytics import ReportAnalytics
from app.utils.report_formatter import ReportFormatter
from app.utils.report_templates import TEMPLATES
from app.utils.prompt_builder import PromptBuilder
from app.services.user_mode_service import UserModeService
from app.models.user_profile import UserProfile
from app.models.report_request import ReportRequest
from app.utils.pdf_generator import generate_pdf
from app.utils.docx_generator import generate_docx
from app.utils.markdown_generator import generate_markdown
from app.utils.report_history import ReportHistoryManager
from app.utils.token_counter import TokenCounter
from app.utils.paper_compressor import PaperCompressor
from app.utils.report_quality import ReportQualityEvaluator
from app.agents.paper_retrieval import PaperRetrievalAgent
from app.agents.paper_analysis import PaperAnalysisAgent
from app.agents.literature_review import LiteratureReviewAgent
from app.agents.methodology_comparison import MethodologyComparisonAgent
from app.agents.research_gap_detection import ResearchGapDetectionAgent
from app.agents.experiment_planning import ExperimentPlanningAgent
from app.agents.report_generation import ReportGenerationAgent
from app.agents.citation_analysis import CitationAnalysisAgent
from app.utils.exceptions import APIRateLimitException


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

    def generate_report(
        self,
        request: ReportRequest
    ):

        start_time = time.perf_counter()

        query = request.query

        logger.info(
            f"Generating report for query: {query}"
        )

        query_tokens = TokenCounter.count_query(query)
        # --------------------------------------------------
        # User Personalization
        # --------------------------------------------------

        user = UserProfile(
            name=request.name,
            age=request.age,
            qualification=request.qualification,
            experience_level=request.experience_level,
            explanation_style=request.explanation_style
        )

        user_mode = UserModeService.detect_mode(user)

        personalized_prompt = PromptBuilder.build_prompt(
            user_mode,
            query
        )
        template_prompt = TEMPLATES.get(

            request.template.lower(),

            TEMPLATES["technical"]
        )

        logger.info(f"Detected User Mode: {user_mode}")
        logger.info(f"Generated Prompt:\n{personalized_prompt}")
        try:

            # --------------------------------------------------
            # Step 1: Retrieve Papers
            # --------------------------------------------------

            papers = self.paper_agent.search_papers(query)

            original_paper_tokens = TokenCounter.count_papers(
                papers
            )

            papers = PaperCompressor.compress_all(
                papers
            )

            compressed_paper_tokens = TokenCounter.count_papers(
                papers
            )

            paper_tokens = compressed_paper_tokens

            # --------------------------------------------------
            # Step 2: Analyze Papers
            # --------------------------------------------------

            analyzed_papers = []

            logger.info(
                f"Retrieved papers type: {type(papers)}"
            )

            if papers:

                logger.info(
                    f"First paper type: {type(papers[0])}"
                )

            for paper in papers:

                analyzed_papers.append(
                    self.analysis_agent.analyze_paper(
                        paper
                    )
                )

            # --------------------------------------------------
            # Step 3: Methodology Comparison
            # --------------------------------------------------

            methodology = self.methodology_agent.compare_papers(
                analyzed_papers
            )

            # --------------------------------------------------
            # Step 4: Research Gap Detection
            # --------------------------------------------------

            research_gap = self.gap_agent.detect_gaps(
                analyzed_papers
            )

            # --------------------------------------------------
            # Step 5: Literature Review
            # --------------------------------------------------

            literature_review = self.review_agent.generate_review(
                analyzed_papers,
                research_gap
            )

            review_tokens = TokenCounter.count_text(
                str(literature_review)
            )

            # --------------------------------------------------
            # Step 6: Experiment Planning
            # --------------------------------------------------

            experiment_plan = self.experiment_agent.generate_plan(
                research_gap
            )

            # --------------------------------------------------
            # Step 7: Citation Analysis
            # --------------------------------------------------

            citation_analysis = self.citation_agent.analyze_citations(
                analyzed_papers
            )

            # --------------------------------------------------
            # Step 8: Generate Final Report
            # --------------------------------------------------

            report = self.report_agent.generate_report(
                query=query,
                user_mode=user_mode,
                personalized_prompt=personalized_prompt,
                template=request.template,
                template_prompt=template_prompt,
                literature_review=literature_review,
                methodology_comparison=methodology,
                research_gap=research_gap,
                experiment_plan=experiment_plan,
                citation_analysis=citation_analysis
            )
            report = ReportFormatter.format_report(

                request.template,

                report
            )

            report_tokens = TokenCounter.count_text(
                str(report)
            )

            # --------------------------------------------------
            # Step 9: Token Usage
            # --------------------------------------------------

            token_usage = TokenCounter.build_usage(
                query_tokens,
                paper_tokens,
                review_tokens,
                report_tokens
            )

            compression = TokenCounter.compression_statistics(
                original_paper_tokens,
                compressed_paper_tokens
            )

            report["token_usage"] = token_usage
            report["compression"] = compression

            quality = ReportQualityEvaluator.evaluate(report)

            report["quality"] = quality

            # --------------------------------------------------
            # Step 10: Generate Files
            # --------------------------------------------------

            pdf_file = generate_pdf(report)

            docx_file = generate_docx(report)

            markdown_file = generate_markdown(report)

            # --------------------------------------------------
            # Step 11: Save Report History
            # --------------------------------------------------

            self.history.save_history(
                query=query,
                pdf_path=pdf_file,
                docx_path=docx_file,
                markdown_path=markdown_file
            )

            # --------------------------------------------------
            # Step 12: Execution Time
            # --------------------------------------------------

            execution_time = round(
                time.perf_counter() - start_time,
                2
            )

            logger.info(
                f"Report generated successfully in {execution_time} seconds."
            )

            logger.info(
                f"Token Usage: {token_usage}"
            )

            logger.info(
                f"Compression Statistics: {compression}"
            )
            analytics = ReportAnalytics.generate(

                report,

                execution_time,

                token_usage,

                compression,

                pdf_file,

                docx_file,

                markdown_file
            )

            report["analytics"] = analytics

            # --------------------------------------------------
            # Final Response
            # --------------------------------------------------

            return {
                "status": "success",
                "execution_time": execution_time,
                "token_usage": token_usage,
                "compression": compression,
                "analytics": analytics,
                "pdf_file": pdf_file,
                "docx_file": docx_file,
                "markdown_file": markdown_file,
                "report": report
            }
        
        
        except APIRateLimitException as e:

            logger.warning(str(e))

            return {
                "status": "failed",
                "error": "Semantic Scholar API is temporarily rate-limited. Please try again after a few minutes."
            }

        except Exception as e:

            logger.exception("Report generation failed.")

            return {
                "status": "failed",
                "error": str(e)
            }