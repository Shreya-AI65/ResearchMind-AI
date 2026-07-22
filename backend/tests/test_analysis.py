"""
Test for Paper Analysis Agent
"""

from app.agents.paper_analysis import PaperAnalysisAgent


def main():

    sample_paper = {
        "title": "Agentic AI: A Comprehensive Survey",
        "authors": [
            "John Smith",
            "Emily Johnson"
        ],
        "abstract": (
            "Agentic AI is an emerging paradigm in artificial intelligence. "
            "This survey presents a comprehensive framework for autonomous systems. "
            "We propose a new architecture for intelligent agents. "
            "Future work includes improving reasoning capabilities."
        ),
        "year": 2025,
        "citation_count": 609
    }

    agent = PaperAnalysisAgent()

    result = agent.analyze_paper(sample_paper)

    print("=" * 60)
    print("Paper Analysis Test")
    print("=" * 60)

    for key, value in result.items():
        print(f"{key}:")
        print(value)
        print()


if __name__ == "__main__":
    main()