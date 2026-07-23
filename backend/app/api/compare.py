from fastapi import APIRouter

from app.services.comparison_service import ComparisonService

router = APIRouter()

comparison_service = ComparisonService()


@router.get("/compare")
def compare_papers(query: str):
    """
    Compare research papers for a given query.
    """

    return comparison_service.compare(query)