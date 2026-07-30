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
        literature_review,
        methodology_comparison,
        research_gap,
        experiment_plan,
        citation_analysis
    ):

        report = {

            "title": "Research Analysis Report",

            "generated_by": self.agent_name,

            "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

            "research_topic": query,

            "total_papers": methodology_comparison.get(
                "total_papers",
                0
            ),

            "executive_summary":
            f"This report summarizes the current research "
            f"on {query} using automated multi-agent analysis.",

        "literature_review":
            literature_review,

        "methodology_comparison":
            methodology_comparison,

        "research_gap":
            research_gap,

        "experiment_plan":
            experiment_plan,

        "citation_analysis":
            citation_analysis,

        "recommended_datasets":
            experiment_plan.get(
                "recommended_datasets",
                []
            ),

        "baseline_models":
            experiment_plan.get(
                "baseline_models",
                []
            ),

        "evaluation_metrics":
            experiment_plan.get(
                "evaluation_metrics",
                []
            ),

        "future_research_directions":
            research_gap.get(
                "future_work",
                []
            ),

        "report_summary": {

            "dominant_research_area":
                (
                    research_gap.get(
                        "summary",
                        {}
                    ).get(
                        "dominant_area"
                    )
                ),

            "top_research_trend":
                (
                    research_gap.get(
                        "summary",
                        {}
                    ).get(
                        "top_trend"
                    )
                ),

            "highest_cited_paper":
                (
                    methodology_comparison.get(
                        "comparison_summary",
                        {}
                    ).get(
                        "highest_cited_title"
                    )
                ),

            "latest_paper":
                (
                    methodology_comparison.get(
                        "comparison_summary",
                        {}
                    ).get(
                        "latest_paper_title"
                    )
                ),
            "recommended_datasets":
                experiment_plan.get(
                    "recommended_datasets",
                    []
                ) if experiment_plan else [],

            "baseline_models":
                experiment_plan.get(
                    "baseline_models",
                    []
                ) if experiment_plan else [],

            "evaluation_metrics":
                experiment_plan.get(
                    "evaluation_metrics",
                    []
                ) if experiment_plan else [],

        },

        "conclusion":

            "The automated multi-agent pipeline successfully "
            "retrieved, analyzed, compared, detected research gaps, "
            "generated literature reviews, and recommended experiment "
            "plans. The collected evidence highlights current research "
            "trends while identifying promising future research directions."

    }

        return report