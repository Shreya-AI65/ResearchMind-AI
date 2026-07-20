"""
Paper Parser

Purpose:
Convert raw API responses into a clean and consistent format that can
be used by downstream ResearchMind AI agents.
"""


class PaperParser:

    @staticmethod
    def parse_paper(raw_paper):

        return {
            "title": raw_paper.get("title", ""),
            "authors": [
                author.get("name", "")
                for author in raw_paper.get("authors", [])
            ],
            "abstract": raw_paper.get("abstract", ""),
            "year": raw_paper.get("year", ""),
            "citation_count": raw_paper.get("citationCount", 0),
            "url": raw_paper.get("url", "")
        }

    @staticmethod
    def parse_response(api_response):

        papers = api_response.get("data", [])

        return [
            PaperParser.parse_paper(paper)
            for paper in papers
        ]