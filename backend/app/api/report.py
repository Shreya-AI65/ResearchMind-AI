from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.models.api_response import SuccessResponse
from app.models.report_request import ReportRequest

from app.services.report_generation_service import (
    ReportGenerationService
)

router = APIRouter()

service = ReportGenerationService()


# --------------------------------------------------
# Generate Research Report
# --------------------------------------------------

@router.post("/report")
def generate_report(request: ReportRequest):

    result = service.generate_report(request)

    if result["status"] == "failed":
        raise HTTPException(
            status_code=500,
            detail=result["error"]
        )

    return SuccessResponse(
        message="Research report generated successfully.",
        data=result
    )


# --------------------------------------------------
# Download Markdown Report
# --------------------------------------------------

@router.post("/report/download/markdown")
def download_markdown(request: ReportRequest):

    result = service.generate_report(request)

    if result["status"] == "failed":
        raise HTTPException(
            status_code=500,
            detail=result["error"]
        )

    return FileResponse(
        path=result["markdown_file"],
        media_type="text/markdown",
        filename="Research_Report.md"
    )


# --------------------------------------------------
# Download DOCX Report
# --------------------------------------------------

@router.post("/report/download/docx")
def download_docx(request: ReportRequest):

    result = service.generate_report(request)

    if result["status"] == "failed":
        raise HTTPException(
            status_code=500,
            detail=result["error"]
        )

    return FileResponse(
        path=result["docx_file"],
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename="Research_Report.docx"
    )


# --------------------------------------------------
# Download PDF Report
# --------------------------------------------------

@router.post("/report/download")
def download_report(request: ReportRequest):

    result = service.generate_report(request)

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