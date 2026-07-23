from app.agents.methodology_comparison import MethodologyComparisonAgent

comparison_agent = MethodologyComparisonAgent()

papers = [
    {
        "title": "Agentic AI Survey",
        "research_area": "Agentic AI",
        "research_problem": "Autonomous intelligent systems",
        "methodology": ["Survey", "Framework"],
        "keywords": ["agentic", "survey", "framework"],
        "year": 2025,
        "citation_count": 609,
        "quality_score": 9.5,
        "quality_classification": "Excellent"
    },
    {
        "title": "Small Language Models",
        "research_area": "Large Language Models",
        "research_problem": "Efficient AI agents",
        "methodology": ["Architecture", "LLM"],
        "keywords": ["llm", "agentic", "architecture"],
        "year": 2025,
        "citation_count": 310,
        "quality_score": 8.8,
        "quality_classification": "Very Good"
    },
    {
        "title": "Agentic AI Review",
        "research_area": "Agentic AI",
        "research_problem": "Future autonomous AI",
        "methodology": ["Survey", "System"],
        "keywords": ["future", "survey", "agentic"],
        "year": 2024,
        "citation_count": 120,
        "quality_score": 8.0,
        "quality_classification": "Good"
    }
]

result = comparison_agent.compare_papers(papers)

print("=" * 70)
print("Methodology Comparison Test")
print("=" * 70)

for key, value in result.items():
    print(f"\n{key}:")
    print(value)