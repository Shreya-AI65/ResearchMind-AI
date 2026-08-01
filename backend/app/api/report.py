from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.models.api_response import SuccessResponse
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

    return SuccessResponse(
        message="Research report generated successfully.",
        data=result
    )


@router.get("/report/download/markdown")
def download_markdown(query: str):

    result = service.generate_report(query)

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


@router.get("/report/download/docx")
def download_docx(query: str):

    result = service.generate_report(query)

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