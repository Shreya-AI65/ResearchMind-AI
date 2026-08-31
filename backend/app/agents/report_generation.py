"""
Report Generation Agent

Purpose:
Generate a complete research report by combining outputs
from previous AI agents.
"""

from datetime import datetime


class ReportGenerationAgent:

    def __init__(self):
        self.agent_name = "Report Generation Agent"
        self.status = "Initialized"

    def generate_report(
        self,
        query,
        user_mode,
        personalized_prompt,
        template,
        template_prompt,
        literature_review,
        methodology_comparison,
        research_gap,
        experiment_plan,
        citation_analysis
    ):

        # ============================================================
        # SAFETY / DEFAULT VALUES
        # ============================================================

        literature_review = literature_review or {}
        methodology_comparison = methodology_comparison or {}
        research_gap = research_gap or {}
        experiment_plan = experiment_plan or {}
        citation_analysis = citation_analysis or {}

        user_mode = user_mode or "intermediate"

        # ============================================================
        # EXECUTIVE SUMMARY BASED ON USER MODE
        # ============================================================

        if user_mode.lower() == "beginner":

            executive_summary = (
                f"This report explains the topic '{query}' in simple language. "
                "Complex concepts are simplified with beginner-friendly explanations."
            )

        elif user_mode.lower() == "intermediate":

            executive_summary = (
                f"This report provides a technical overview of '{query}' "
                "including methodologies, research gaps and experiment planning."
            )

        else:

            executive_summary = (
                f"This report presents an academic analysis of '{query}' "
                "covering literature review, methodology comparison, "
                "research gaps, citation analysis and future work."
            )

        # ============================================================
        # EXTRACT EXPERIMENT PLAN INFORMATION
        # ============================================================

        recommended_datasets = experiment_plan.get(
            "recommended_datasets",
            []
        )

        baseline_models = experiment_plan.get(
            "baseline_models",
            []
        )

        evaluation_metrics = experiment_plan.get(
            "evaluation_metrics",
            []
        )

        # ============================================================
        # EXTRACT RESEARCH GAP INFORMATION
        # ============================================================

        future_research_directions = research_gap.get(
            "future_work",
            []
        )

        research_recommendations = research_gap.get(
            "recommendations",
            []
        )

        research_gaps = research_gap.get(
            "research_gaps",
            []
        )

        research_trends = research_gap.get(
            "research_trends",
            []
        )

        emerging_topics = research_gap.get(
            "emerging_topics",
            []
        )

        # ============================================================
        # REPORT
        # ============================================================

        report = {

            # --------------------------------------------------------
            # BASIC REPORT INFORMATION
            # --------------------------------------------------------

            "title": "Research Analysis Report",

            "generated_by": self.agent_name,

            "generated_at": datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            ),

            "research_topic": query,

            "user_mode": user_mode,

            "personalized_prompt": personalized_prompt,

            "report_template": template,

            "template_prompt": template_prompt,

            "total_papers": methodology_comparison.get(
                "total_papers",
                0
            ),

            # --------------------------------------------------------
            # EXECUTIVE SUMMARY
            # --------------------------------------------------------

            "executive_summary": executive_summary,

            # --------------------------------------------------------
            # LITERATURE REVIEW
            # --------------------------------------------------------

            "literature_review": literature_review,

            # --------------------------------------------------------
            # METHODOLOGY COMPARISON
            # --------------------------------------------------------

            "methodology_comparison": methodology_comparison,

            # --------------------------------------------------------
            # RESEARCH GAP ANALYSIS
            # --------------------------------------------------------

            "research_gap": research_gap,

            # --------------------------------------------------------
            # EXPERIMENT PLAN
            # --------------------------------------------------------

            "experiment_plan": experiment_plan,

            # --------------------------------------------------------
            # CITATION ANALYSIS
            # --------------------------------------------------------

            "citation_analysis": citation_analysis,

            # --------------------------------------------------------
            # RECOMMENDED DATASETS
            # --------------------------------------------------------

            "recommended_datasets": recommended_datasets,

            # --------------------------------------------------------
            # BASELINE MODELS
            # --------------------------------------------------------

            "baseline_models": baseline_models,

            # --------------------------------------------------------
            # EVALUATION METRICS
            # --------------------------------------------------------

            "evaluation_metrics": evaluation_metrics,

            # --------------------------------------------------------
            # FUTURE RESEARCH DIRECTIONS
            # --------------------------------------------------------

            "future_research_directions": future_research_directions,

            # --------------------------------------------------------
            # RESEARCH RECOMMENDATIONS
            #
            # NEW DAY 32 TASK 4 INTEGRATION
            # --------------------------------------------------------

            "research_recommendations": research_recommendations,

            # --------------------------------------------------------
            # IDENTIFIED RESEARCH GAPS
            # --------------------------------------------------------

            "identified_research_gaps": research_gaps,

            # --------------------------------------------------------
            # RESEARCH TRENDS
            # --------------------------------------------------------

            "research_trends": research_trends,

            # --------------------------------------------------------
            # EMERGING TOPICS
            # --------------------------------------------------------

            "emerging_topics": emerging_topics,

            # ========================================================
            # REPORT SUMMARY
            # ========================================================

            "report_summary": {

                # ----------------------------------------------------
                # DOMINANT RESEARCH AREA
                # ----------------------------------------------------

                "dominant_research_area":

                    research_gap.get(
                        "summary",
                        {}
                    ).get(
                        "dominant_area"
                    ),

                # ----------------------------------------------------
                # TOP RESEARCH TREND
                # ----------------------------------------------------

                "top_research_trend":

                    research_gap.get(
                        "summary",
                        {}
                    ).get(
                        "top_trend"
                    ),

                # ----------------------------------------------------
                # HIGHEST CITED PAPER
                # ----------------------------------------------------

                "highest_cited_paper":

                    methodology_comparison.get(
                        "comparison_summary",
                        {}
                    ).get(
                        "highest_cited_title"
                    ),

                # ----------------------------------------------------
                # LATEST PAPER
                # ----------------------------------------------------

                "latest_paper":

                    methodology_comparison.get(
                        "comparison_summary",
                        {}
                    ).get(
                        "latest_paper_title"
                    ),

                # ----------------------------------------------------
                # RECOMMENDED DATASETS
                # ----------------------------------------------------

                "recommended_datasets":
                    recommended_datasets,

                # ----------------------------------------------------
                # BASELINE MODELS
                # ----------------------------------------------------

                "baseline_models":
                    baseline_models,

                # ----------------------------------------------------
                # EVALUATION METRICS
                # ----------------------------------------------------

                "evaluation_metrics":
                    evaluation_metrics,

                # ----------------------------------------------------
                # RESEARCH RECOMMENDATIONS
                #
                # NEW DAY 32 TASK 4 INTEGRATION
                # ----------------------------------------------------

                "research_recommendations":
                    research_recommendations,

                # ----------------------------------------------------
                # RESEARCH GAP COUNT
                # ----------------------------------------------------

                "research_gap_count":
                    len(research_gaps),

                # ----------------------------------------------------
                # FUTURE WORK COUNT
                # ----------------------------------------------------

                "future_work_items":
                    len(future_research_directions)

            },

            # ========================================================
            # CONCLUSION
            # ========================================================

            "conclusion":

                "The report has been generated using a personalized "
                "multi-agent pipeline. The explanation style was "
                "adapted according to the "
                f"{user_mode} profile to improve readability and "
                "usefulness."

        }

        return report