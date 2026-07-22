"""
Integration Test for Paper Analysis Pipeline

This test verifies the complete analysis workflow:
Paper Retrieval -> Parser -> Analysis Service
"""

from app.services.analysis_service import AnalysisService


def main():

    service = AnalysisService()

    query = "Agentic AI"

    result = service.analyze_papers(query)

    print("=" * 70)
    print("ResearchMind AI Analysis Pipeline Test")
    print("=" * 70)

    print(result)


if __name__ == "__main__":
    main()