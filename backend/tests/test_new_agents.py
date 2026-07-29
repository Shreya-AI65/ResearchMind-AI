from app.agents.methodology_comparison import MethodologyComparisonAgent
from app.agents.research_gap_detection import ResearchGapDetectionAgent
from app.agents.report_generation import ReportGenerationAgent

comparison_agent = MethodologyComparisonAgent()
gap_agent = ResearchGapDetectionAgent()
report_agent = ReportGenerationAgent()

sample_papers = [
    {
        "title": "Paper A",
        "research_area": "Agentic AI",
        "research_problem": "Problem A",
        "methodology": ["Survey", "Framework"],
        "keywords": ["agentic", "reasoning"],
        "year": 2025,
        "citation_count": 300,
        "paper_score": 90,
        "paper_quality": "Excellent",
        "future_work": []
    },
    {
        "title": "Paper B",
        "research_area": "Machine Learning",
        "research_problem": "Problem B",
        "methodology": ["Model"],
        "keywords": ["learning"],
        "year": 2024,
        "citation_count": 120,
        "paper_score": 75,
        "paper_quality": "Very Good",
        "future_work": []
    }
]

comparison = comparison_agent.compare_papers(sample_papers)
gaps = gap_agent.detect_gaps(sample_papers)

report = report_agent.generate_report(
    query="Agentic AI",
    literature_review={"summary": "Demo"},
    methodology_comparison=comparison,
    research_gap=gaps,
    experiment_plan={
        "recommended_datasets": ["OpenAI Dataset"],
        "baseline_models": ["GPT"],
        "evaluation_metrics": ["Accuracy"]
    }
)

print(report)