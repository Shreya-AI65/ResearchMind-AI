from urllib import response

import requests


class PaperRetrievalAgent:
    BASE_URL = "https://api.semanticscholar.org/graph/v1"
    SEARCH_ENDPOINT = "/paper/search"

    def __init__(self):
        self.agent_name = "Paper Retrieval Agent"
        self.status = "Initialized"

    def search_papers(self, query: str):
        params = {
            "query": query,
            "limit": 5,
            "fields": "title,authors,abstract,year,citationCount,url"
        }
        print(self.BASE_URL + self.SEARCH_ENDPOINT)
        print(params)
        response = requests.get(
            self.BASE_URL + self.SEARCH_ENDPOINT,
            params=params
        )
        print("=" * 50)
        print("Status Code:", response.status_code)
        print("Headers:", response.headers)
        print("Response Text:", response.text)
        print("=" * 50)
        if response.status_code == 200:
            data = response.json()
            return data

        return {
            "agent": self.agent_name,
            "status": "Error",
            "status_code": response.status_code,
            "response": response.text
}