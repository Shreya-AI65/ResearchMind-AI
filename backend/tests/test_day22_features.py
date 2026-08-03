"""
Day 22 Integration Test

Tests:
1. User Mode Detection
2. Personalized Prompt
3. Report Generation
4. Report Quality
5. Report Analytics
"""

from app.models.report_request import ReportRequest
from app.services.report_generation_service import ReportGenerationService


def main():

    service = ReportGenerationService()

    request = ReportRequest(
        query="Agentic AI",
        name="Rahul",
        age=21,
        qualification="B.Tech",
        experience_level="Intermediate",
        explanation_style="Balanced",
        template="technical"
    )

    result = service.generate_report(request)

    print("=" * 60)
    print("DAY 22 INTEGRATION TEST")
    print("=" * 60)

    print("\nStatus:")
    print(result["status"])

    if result["status"] == "success":

        report = result["report"]

        print("\nResearch Topic:")
        print(report["research_topic"])

        print("\nQuality:")
        print(report["quality"])

        print("\nAnalytics:")
        print(report["analytics"])

        print("\nToken Usage:")
        print(result["token_usage"])

        print("\nCompression:")
        print(result["compression"])

        print("\nGenerated Files:")
        print(result["pdf_file"])
        print(result["docx_file"])
        print(result["markdown_file"])

    else:

        print(result["error"])


if __name__ == "__main__":
    main()