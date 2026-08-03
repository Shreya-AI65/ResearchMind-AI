"""
Report Formatter

Formats reports according to the selected template.
"""


class ReportFormatter:

    @staticmethod
    def format_report(template, report):

        template = template.lower()

        # ---------------------------------------------
        # Executive Report
        # ---------------------------------------------

        if template == "executive":

            return {
                "title": report["title"],
                "research_topic": report["research_topic"],
                "executive_summary": report["executive_summary"],
                "research_gap": report["research_gap"],
                "future_research_directions":
                    report["future_research_directions"],
                "conclusion": report["conclusion"]
            }

        # ---------------------------------------------
        # Academic Report
        # ---------------------------------------------

        elif template == "academic":

            return {
                "title": report["title"],
                "abstract": report["executive_summary"],
                "introduction": report["literature_review"],
                "methodology":
                    report["methodology_comparison"],
                "research_gap":
                    report["research_gap"],
                "experiment_plan":
                    report["experiment_plan"],
                "citation_analysis":
                    report["citation_analysis"],
                "conclusion":
                    report["conclusion"]
            }

        # ---------------------------------------------
        # Survey Paper
        # ---------------------------------------------

        elif template == "survey":

            return {
                "title": report["title"],
                "literature_review":
                    report["literature_review"],
                "methodology_comparison":
                    report["methodology_comparison"],
                "citation_analysis":
                    report["citation_analysis"],
                "research_gap":
                    report["research_gap"],
                "future_research_directions":
                    report["future_research_directions"]
            }

        # ---------------------------------------------
        # Proposal
        # ---------------------------------------------

        elif template == "proposal":

            return {
                "title": report["title"],
                "problem_statement":
                    report["research_gap"],
                "proposed_methodology":
                    report["experiment_plan"],
                "expected_outcomes":
                    report["future_research_directions"],
                "datasets":
                    report["recommended_datasets"],
                "evaluation_metrics":
                    report["evaluation_metrics"]
            }

        # ---------------------------------------------
        # Technical (Default)
        # ---------------------------------------------

        return report