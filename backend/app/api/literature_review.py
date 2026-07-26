from fastapi import APIRouter

from app.services.literature_review_service import (
    LiteratureReviewService
)

router = APIRouter()

service = LiteratureReviewService()


@router.get("/literature-review")
def literature_review(query: str):

    return service.generate_review(query)