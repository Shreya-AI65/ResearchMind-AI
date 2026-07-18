from fastapi import APIRouter
from app.agents.paper_retrieval import PaperRetrievalAgent

router = APIRouter()

agent = PaperRetrievalAgent()


@router.get("/search")
def search(query: str):
    return agent.search_papers(query)