from fastapi import APIRouter

from app.services.report_generation_service import (
    ReportGenerationService
)

router = APIRouter()

service = ReportGenerationService()


@router.get("/report")
def generate_report(query: str):

    return service.generate_report(query)