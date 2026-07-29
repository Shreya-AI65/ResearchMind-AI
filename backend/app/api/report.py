from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.services.report_generation_service import (
    ReportGenerationService
)

router = APIRouter()

service = ReportGenerationService()


@router.get("/report")
def generate_report(query: str):

    result = service.generate_report(query)

    if result["status"] == "failed":
        raise HTTPException(
            status_code=500,
            detail=result["error"]
        )

    return result


@router.get("/report/download")
def download_report(query: str):

    result = service.generate_report(query)

    if result["status"] == "failed":
        raise HTTPException(
            status_code=500,
            detail=result["error"]
        )

    return FileResponse(
        path=result["pdf_file"],
        filename="Research_Report.pdf",
        media_type="application/pdf"
    )