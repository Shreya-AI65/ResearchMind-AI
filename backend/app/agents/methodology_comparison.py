class MethodologyComparisonAgent:

    def __init__(self):
        self.agent_name = "Methodology Comparison Agent"
        self.status = "Initialized"
    def compare_papers(self, papers: list):

        comparison = []

        for paper in papers:

            comparison.append({
                "title": paper.get("title"),
                "research_area": paper.get("research_area"),
                "research_problem": paper.get("research_problem"),
                "methodology": paper.get("methodology"),
                "keywords": paper.get("keywords"),
                "year": paper.get("year"),
                "citation_count": paper.get("citation_count"),
                "quality_score": paper.get("paper_score"),
                "quality_classification": paper.get("paper_quality")
            })

        return {
        "total_papers": len(comparison),
        "comparison": comparison,
        "highest_cited_paper": self.highest_cited_paper(papers),
        "latest_paper": self.latest_paper(papers),
        "common_methodologies": self.common_methodologies(papers),
        "research_areas": self.research_areas(papers),
        "common_keywords": self.common_keywords(papers)
}
    def highest_cited_paper(self, papers):

        if not papers:
            return None

        return max(
            papers,
            key=lambda paper: paper.get("citation_count", 0)
        )
    def latest_paper(self, papers):

        if not papers:
            return None

        return max(
            papers,
            key=lambda paper: paper.get("year", 0)
        )
    def common_methodologies(self, papers):

        methods = []

        for paper in papers:

            methods.extend(
                paper.get("methodology", [])
            )

        return sorted(list(set(methods)))
    def research_areas(self, papers):

        areas = []

        for paper in papers:

            area = paper.get("research_area")

            if area:
                areas.append(area)

        return sorted(list(set(areas)))
    def common_keywords(self, papers):

        keywords = []

        for paper in papers:

            keywords.extend(
                paper.get("keywords", [])
            )

        return sorted(list(set(keywords)))