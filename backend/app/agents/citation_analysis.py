"""
Citation Analysis Agent

Analyzes citation statistics of research papers.
"""


class CitationAnalysisAgent:

    def __init__(self):
        self.agent_name = "Citation Analysis Agent"
        self.status = "Initialized"

    def analyze_citations(self, analyzed_papers):

        if not analyzed_papers:
            return {
                "total_papers": 0,
                "total_citations": 0,
                "average_citations": 0,
                "highest_cited_paper": None,
                "lowest_cited_paper": None,
                "citation_ranking": []
            }

        ranked = sorted(
            analyzed_papers,
            key=lambda paper: paper.get("citation_count", 0),
            reverse=True
        )

        total = sum(
            paper.get("citation_count", 0)
            for paper in analyzed_papers
        )

        average = round(
            total / len(analyzed_papers),
            2
        )

        ranking = []

        for index, paper in enumerate(ranked, start=1):

            ranking.append({
                "rank": index,
                "title": paper.get("title"),
                "citation_count": paper.get("citation_count", 0)
            })

        return {

            "total_papers": len(analyzed_papers),

            "total_citations": total,

            "average_citations": average,

            "highest_cited_paper": ranked[0],

            "lowest_cited_paper": ranked[-1],

            "citation_ranking": ranking
        }