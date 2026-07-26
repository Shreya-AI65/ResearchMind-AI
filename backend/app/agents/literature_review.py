"""
Literature Review Agent

Purpose:
Generates a structured literature review from
multiple analyzed research papers.
"""


class LiteratureReviewAgent:

    def __init__(self):
        self.agent_name = "Literature Review Agent"
        self.status = "Initialized"

    def generate_introduction(self, papers):

        return (
            f"This literature review summarizes findings from "
            f"{len(papers)} research papers related to the selected topic. "
            f"It highlights research trends, methodologies, key contributions, "
            f"future directions, and overall observations."
        )

    def generate_paper_summaries(self, papers):

        summaries = []

        for paper in papers:

            summaries.append({
                "title": paper.get("title"),
                "year": paper.get("year"),
                "summary": paper.get("summary")
            })

        return summaries

    def extract_research_trends(self, papers):

        trends = []

        for paper in papers:

            trends.extend(
                paper.get("keywords", [])
            )

        return sorted(list(set(trends)))

    def extract_research_gaps(self, papers):

        gaps = []

        for paper in papers:

            gaps.extend(
                paper.get("future_work", [])
            )

        return sorted(list(set(gaps)))

    def generate_conclusion(self, papers):

        return (
            "Overall, the reviewed studies demonstrate significant "
            "progress in this research area while highlighting several "
            "opportunities for future work and further experimentation."
        )

    def generate_review(self, analyzed_papers):

        return {

            "introduction":
                self.generate_introduction(analyzed_papers),

            "paper_summaries":
                self.generate_paper_summaries(analyzed_papers),

            "research_trends":
                self.extract_research_trends(analyzed_papers),

            "research_gaps":
                self.extract_research_gaps(analyzed_papers),

            "future_scope":
                self.extract_research_gaps(analyzed_papers),

            "conclusion":
                self.generate_conclusion(analyzed_papers)

        }