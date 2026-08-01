"""
Paper Parser

Purpose:
Convert raw API responses into a clean and consistent format that can
be used by downstream ResearchMind AI agents.
"""


class PaperParser:

    @staticmethod
    def parse_paper(raw_paper):
        """
        Convert a single paper into the standard format.
        """

        return {
            "title": raw_paper.get("title", ""),
            "authors": [
                author.get("name", "")
                if isinstance(author, dict)
                else author
                for author in raw_paper.get("authors", [])
            ],
            "abstract": raw_paper.get("abstract", ""),
            "year": raw_paper.get("year", ""),
            "citation_count": (
                raw_paper.get("citationCount")
                or raw_paper.get("citation_count", 0)
            ),
            "url": raw_paper.get("url", "")
        }

    @staticmethod
    def parse_response(api_response):
        """
        Supports both:
        1. Raw Semantic Scholar API response (dict)
        2. Already parsed paper list (list)
        """

        # Already parsed list
        if isinstance(api_response, list):
            return [
                PaperParser.parse_paper(paper)
                for paper in api_response
            ]

        # Raw Semantic Scholar response
        if isinstance(api_response, dict):

            papers = api_response.get("data", [])

            return [
                PaperParser.parse_paper(paper)
                for paper in papers
            ]

        # Invalid response
        return []