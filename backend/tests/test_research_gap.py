from app.agents.research_gap_detection import ResearchGapDetectionAgent


papers = [

    {
        "research_area": "Agentic AI",
        "keywords": [
            "agent",
            "planning",
            "reasoning"
        ],
        "future_work": [
            "Improve reasoning capabilities."
        ]
    },

    {
        "research_area": "Large Language Models",
        "keywords": [
            "llm",
            "reasoning",
            "transformer"
        ],
        "future_work": [
            "Reduce computational cost."
        ]
    },

    {
        "research_area": "Agentic AI",
        "keywords": [
            "agent",
            "autonomous",
            "planning"
        ],
        "future_work": [
            "Support multi-agent collaboration."
        ]
    }

]

agent = ResearchGapDetectionAgent()

report = agent.generate_gap_report(papers)

print("=" * 60)
print("Research Gap Detection Test")
print("=" * 60)

for key, value in report.items():

    print(f"\n{key}:")
    print(value)