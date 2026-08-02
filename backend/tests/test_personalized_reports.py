"""
Test Personalized Report Generation

Verifies that different user profiles generate
different personalized prompts and reports.
"""

from app.models.report_request import ReportRequest
from app.services.report_generation_service import (
    ReportGenerationService
)

service = ReportGenerationService()


def test_profile(request):

    print("=" * 70)
    print(f"Testing: {request.name}")
    print("=" * 70)

    result = service.generate_report(request)

    print("Status:", result["status"])

    if result["status"] == "success":

        report = result["report"]

        print("\nResearch Topic:")
        print(report["research_topic"])

        print("\nUser Mode:")
        print(report.get("user_mode"))

        print("\nPrompt:")
        print(report.get("personalized_prompt"))

        print("\nExecution Time:")
        print(result["execution_time"])

        print("\nToken Usage:")
        print(result["token_usage"])

    else:

        print("Error:")
        print(result["error"])

    print()


if __name__ == "__main__":

    beginner = ReportRequest(
        query="Agentic AI",
        name="Rahul",
        age=18,
        qualification="B.Tech Student",
        experience_level="Beginner",
        explanation_style="Simple"
    )

    intermediate = ReportRequest(
        query="Agentic AI",
        name="Priya",
        age=22,
        qualification="B.Tech",
        experience_level="Intermediate",
        explanation_style="Balanced"
    )

    researcher = ReportRequest(
        query="Agentic AI",
        name="Dr. Sharma",
        age=35,
        qualification="PhD",
        experience_level="Researcher",
        explanation_style="Technical"
    )

    test_profile(beginner)
    test_profile(intermediate)
    test_profile(researcher)