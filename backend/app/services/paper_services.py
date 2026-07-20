"""
Paper Service

Purpose:
Acts as the bridge between the Paper Retrieval Agent and the
Paper Parser. This service retrieves raw paper data, parses it,
and returns clean structured paper information.
"""

from app.agents.paper_retrieval import PaperRetrievalAgent
from app.utils.parser import PaperParser


class PaperService:

    def __init__(self):
        self.retrieval_agent = PaperRetrievalAgent()

    def search_papers(self, query: str):
        """
        Retrieve papers using the Paper Retrieval Agent
        and return parsed paper information.
        """

        raw_response = self.retrieval_agent.search_papers(query)

        # If API returns an error, forward it.
        if "data" not in raw_response:
            return raw_response

        parsed_papers = PaperParser.parse_response(raw_response)

        return {
            "query": query,
            "total_papers": len(parsed_papers),
            "papers": parsed_papers
        }