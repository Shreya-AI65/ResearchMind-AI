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

        return {
            "total_papers": len(papers),
            "research_areas": self.detect_research_areas(papers),
            "common_keywords": self.detect_common_keywords(papers),
            "future_work": self.detect_future_work(papers)
        }