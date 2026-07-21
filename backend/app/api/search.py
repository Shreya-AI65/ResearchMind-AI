from fastapi import APIRouter
from app.services.paper_service import PaperService

router = APIRouter()

paper_service = PaperService()


@router.get("/search")
def search(query: str):
    return paper_service.search_papers(query)