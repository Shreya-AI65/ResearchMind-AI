"""
Research Gap Detection Agent

Purpose:
Analyzes multiple research papers to identify
research gaps, future opportunities, common
limitations, and emerging trends.
"""


class ResearchGapDetectionAgent:

    def __init__(self):
        self.agent_name = "Research Gap Detection Agent"
        self.status = "Initialized"

    def detect_research_areas(self, papers):
        """
        Detect all unique research areas from analyzed papers.
        """

        areas = []

        for paper in papers:
            area = paper.get("research_area")

            if area:
                areas.append(area)

        return sorted(list(set(areas)))

    def detect_common_keywords(self, papers):
        """
        Detect common keywords from analyzed papers.
        """

        keywords = []

        for paper in papers:
            keywords.extend(
                paper.get("keywords", [])
            )

        return sorted(list(set(keywords)))

    def detect_future_work(self, papers):
        """
        Collect future work suggestions from analyzed papers.
        """

        future_work = []

        for paper in papers:
            future_work.extend(
                paper.get("future_work", [])
            )

        return sorted(list(set(future_work)))

    def generate_gap_report(self, papers):
        """
        Generate a structured research gap report.
        """

        if not papers:
            return {
                "total_papers": 0,
                "research_areas": [],
                "common_keywords": [],
                "future_work": [],
                "research_area_distribution": {},
                "keyword_frequency": {},
                "research_trends": [],
                "gap_categories": {},
                "emerging_topics": [],
                "recommendations": [],
                "summary": {}
            }

        distribution = self.research_area_distribution(papers)
        trends = self.research_trends(papers)
        future_work = self.detect_future_work(papers)

        return {
            "total_papers": len(papers),
            "research_areas": self.detect_research_areas(papers),
            "common_keywords": self.detect_common_keywords(papers),
            "future_work": future_work,
            "research_area_distribution": distribution,
            "keyword_frequency": self.keyword_frequency(papers),
            "research_trends": trends,
            "gap_categories": self.gap_categories(papers),
            "emerging_topics": self.emerging_topics(papers),
            "recommendations": self.recommendations(papers),

            "summary": {
                "dominant_area": (
                    max(distribution, key=distribution.get)
                    if distribution
                    else None
                ),
                "top_trend": (
                    trends[0]
                    if trends
                    else None
                ),
                "future_work_items": len(future_work)
            }
        }

    # Wrapper method used by services
    def detect_gaps(self, papers):
        """
        Detect research gaps and return structured report.
        """
        return self.generate_gap_report(papers)

    
    def research_area_distribution(self, papers):

        distribution = {}

        for paper in papers:

            area = paper.get("research_area", "Unknown")

            distribution[area] = (
                distribution.get(area, 0) + 1
            )

        return dict(
            sorted(
                distribution.items(),
                key=lambda x: x[1],
                reverse=True
            )
        )

    
    def keyword_frequency(self, papers):

        frequency = {}

        for paper in papers:

            for keyword in paper.get("keywords", []):

                frequency[keyword] = (
                    frequency.get(keyword, 0) + 1
                )   

        return dict(
            sorted(
                frequency.items(),
                key=lambda x: x[1],
                reverse=True
            )
        )

    
    def research_trends(self, papers):

        frequency = self.keyword_frequency(papers)

        return list(frequency.keys())[:15]

    
    def gap_categories(self, papers):

        categories = {

            "datasets": [],

            "models": [],

            "evaluation": [],

            "applications": [],

            "general": []

        }

        for paper in papers:

            for item in paper.get("future_work", []):

                text = item.lower()

                if "dataset" in text:

                    categories["datasets"].append(item)

                elif "model" in text:

                    categories["models"].append(item)

                elif (
                    "evaluation" in text
                    or "benchmark" in text
                ):

                    categories["evaluation"].append(item)

                elif (
                    "application" in text
                    or "deployment" in text
                ):

                    categories["applications"].append(item)

                else:

                    categories["general"].append(item)

        for category in categories:
            categories[category] = sorted(list(set(categories[category])))

        return categories


    def emerging_topics(self, papers):

        frequency = self.keyword_frequency(papers)

        return [
            keyword
            for keyword, count in frequency.items()
            if count >= 2
        ]

    
    def recommendations(self, papers):

        recommendations = []

        trends = self.research_trends(papers)

        if "agentic" in trends:

            recommendations.append(
                "Explore autonomous multi-agent systems."
            )

        if "reasoning" in trends:

            recommendations.append(
                "Improve reasoning capabilities using LLM planning."
            )   

        if "benchmark" in trends:

            recommendations.append(
                "Evaluate using standardized benchmarks."
            )
        if "framework" in trends:
            recommendations.append(
                "Design more robust AI frameworks."
            )

        if "memory" in trends:
            recommendations.append(
                "Investigate long-term memory mechanisms."
            )

        if "planning" in trends:
            recommendations.append(
                "Improve autonomous planning algorithms."
            )
        if not recommendations:

            recommendations.append(
                "Investigate unexplored research directions."
            )

        return recommendations
    