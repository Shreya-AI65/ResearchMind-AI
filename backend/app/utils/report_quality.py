"""
Report Quality Evaluator

Evaluates the completeness of a generated report.
"""


class ReportQualityEvaluator:

    @staticmethod
    def evaluate(report):

        score = 0

        checks = {
            "literature_review": 20,
            "methodology_comparison": 15,
            "research_gap": 20,
            "experiment_plan": 15,
            "citation_analysis": 10,
            "future_research_directions": 10,
            "conclusion": 10
        }

        for section, marks in checks.items():

            if report.get(section):
                score += marks

        if score >= 90:
            level = "Excellent"

        elif score >= 75:
            level = "Good"

        elif score >= 60:
            level = "Average"

        else:
            level = "Needs Improvement"

        return {
            "score": score,
            "quality": level
        }