"""
Integration Test
Methodology Comparison Pipeline
"""

from app.services.comparison_service import ComparisonService


def main():

    service = ComparisonService()

    result = service.compare("Agentic AI")

    print("=" * 70)
    print("ResearchMind AI - Methodology Comparison Pipeline Test")
    print("=" * 70)

    print(result)


if __name__ == "__main__":
    main()