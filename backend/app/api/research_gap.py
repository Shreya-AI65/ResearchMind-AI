from fastapi import APIRouter

from app.services.research_gap_service import ResearchGapService

router = APIRouter()

service = ResearchGapService()


@router.get("/research-gap")
def research_gap(query: str):

    return service.analyze(query)