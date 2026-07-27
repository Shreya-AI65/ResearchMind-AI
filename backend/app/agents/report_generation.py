"""
Report Generation Agent

Purpose:
Generate a complete research report by combining outputs
from previous AI agents.
"""


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
        experiment_plan
    ):

        report = {

            "research_topic": query,

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

            "conclusion":

                "The automated multi-agent pipeline successfully "
                "retrieved, analyzed, compared and summarized "
                "existing literature while recommending future "
                "research opportunities and experiment plans."

        }

        return report