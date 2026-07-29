class MethodologyComparisonAgent:

    def __init__(self):
        self.agent_name = "Methodology Comparison Agent"
        self.status = "Initialized"
    def compare_papers(self, papers: list):
        if not papers:
            return {
            "total_papers": 0,
            "comparison": [],
            "highest_cited_paper": None,
            "latest_paper": None,
            "common_methodologies": [],
            "research_areas": [],
            "common_keywords": [],
            "methodology_frequency": {},
            "most_common_methodology": None,
            "quality_distribution": {},
            "publication_years": {},
            "citation_statistics": {},
            "comparison_summary": {}
        }
    
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
            "common_keywords": self.common_keywords(papers),
            "methodology_frequency": self.methodology_frequency(papers),
            "most_common_methodology": self.most_common_methodology(papers),
            "quality_distribution": self.quality_distribution(papers),
            "publication_years": self.publication_years(papers),
            "citation_statistics": self.citation_statistics(papers),
            "comparison_summary": self.comparison_summary(papers)
        }
    def methodology_frequency(self, papers):

        frequency = {}

        for paper in papers:

            methods = paper.get("methodology", [])

            for method in methods:

                frequency[method] = frequency.get(method, 0) + 1

        return dict(
            sorted(
                frequency.items(),
                key=lambda x: x[1],
                reverse=True
            )
        )
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
    def most_common_methodology(self, papers):
    
        frequency = self.methodology_frequency(papers)
    
        if not frequency:
            return None
    
        return max(
            frequency,
            key=frequency.get
        )
    def quality_distribution(self, papers):
    
        distribution = {}
        for paper in papers:
    
            quality = paper.get(
                "paper_quality",
                "Unknown"
            )
    
            distribution[quality] = (
            distribution.get(quality, 0) + 1
            )
    
        return distribution
    def publication_years(self, papers):
    
        years = {}
    
        for paper in papers:
    
            year = paper.get("year")
    
            years[year] = years.get(year, 0) + 1
    
        return dict(sorted(years.items()))
    def citation_statistics(self, papers):
    
        citations = [
    
            paper.get("citation_count", 0)
    
            for paper in papers
    
        ]
    
        if not citations:
    
            return {}
    
        return {
    
            "highest": max(citations),
    
            "lowest": min(citations),
    
            "average": round(
                sum(citations) / len(citations),2),
            "total": sum(citations)
    
        }
    def comparison_summary(self, papers):
    
        return {
    
            "total_papers": len(papers),
    
            "most_common_methodology":
                self.most_common_methodology(papers),
    
            "research_areas":
                self.research_areas(papers),

            "quality_distribution":
                self.quality_distribution(papers),
    
            "citation_statistics":
                self.citation_statistics(papers),
            "highest_cited_title": self.highest_cited_paper(papers).get("title") if papers else None,
            "latest_paper_title": self.latest_paper(papers).get("title") if papers else None
        }