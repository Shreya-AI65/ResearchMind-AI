from app.agents.citation_analysis import CitationAnalysisAgent

papers = [
    {
        "title": "Paper A",
        "citation_count": 250
    },
    {
        "title": "Paper B",
        "citation_count": 120
    },
    {
        "title": "Paper C",
        "citation_count": 80
    }
]

agent = CitationAnalysisAgent()

result = agent.analyze_citations(papers)

print(result)