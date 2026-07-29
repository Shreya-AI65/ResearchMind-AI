from app.utils.pdf_generator import generate_pdf

sample_report = {
    "research_topic": "Agentic AI",
    "generated_by": "Report Generation Agent",
    "generated_at": "2026-07-29 16:45:00",
    "total_papers": 5,

    "executive_summary":
        "This report summarizes current research in Agentic AI.",

    "literature_review": {
        "summary": "Agentic AI is an emerging field."
    },

    "methodology_comparison": {
        "comparison_summary": {
            "highest_cited_title": "Paper A"
        }
    },

    "research_gap": {
        "summary": {
            "dominant_area": "Agentic AI",
            "top_trend": "reasoning"
        }
    },

    "experiment_plan": {
        "recommended_datasets": ["AgentBench"],
        "baseline_models": ["GPT-4"],
        "evaluation_metrics": ["Accuracy"]
    },

    "report_summary": {
        "dominant_research_area": "Agentic AI"
    },

    "conclusion":
        "Agentic AI shows strong future research potential."
}

pdf_path = generate_pdf(sample_report)

print(pdf_path)