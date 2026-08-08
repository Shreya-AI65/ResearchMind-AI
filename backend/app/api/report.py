from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.models.api_response import SuccessResponse
from app.models.report_request import ReportRequest

from app.services.report_generation_service import (
    ReportGenerationService
)


router = APIRouter()

service = ReportGenerationService()


# ============================================================
# Generate Research Report
# ============================================================

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


# ============================================================
# Download Existing Generated Report
# ============================================================

@router.get("/report/download/{filename}")
def download_report(filename: str):

    try:

        # ----------------------------------------------------
        # Security:
        # Only use the filename, never accept a full path.
        # ----------------------------------------------------

        safe_filename = Path(filename).name

        if not safe_filename:
            raise HTTPException(
                status_code=400,
                detail="Invalid filename."
            )


        # ----------------------------------------------------
        # generated_reports directory
        # ----------------------------------------------------

        generated_reports_dir = (
            Path(__file__).resolve().parents[2]
            / "generated_reports"
        )


        file_path = (
            generated_reports_dir /
            safe_filename
        ).resolve()


        # ----------------------------------------------------
        # Debug information
        # ----------------------------------------------------

        print(
            "----------------------------------------"
        )

        print(
            "Download requested:",
            safe_filename
        )

        print(
            "Generated reports directory:",
            generated_reports_dir
        )

        print(
            "Full file path:",
            file_path
        )

        print(
            "File exists:",
            file_path.exists()
        )

        print(
            "----------------------------------------"
        )


        # ----------------------------------------------------
        # Check that file exists
        # ----------------------------------------------------

        if not file_path.exists():

            raise HTTPException(
                status_code=404,
                detail=(
                    f"Report file not found: "
                    f"{safe_filename}"
                )
            )


        # ----------------------------------------------------
        # Make sure it is actually a file
        # ----------------------------------------------------

        if not file_path.is_file():

            raise HTTPException(
                status_code=404,
                detail="Requested report is not a file."
            )


        # ----------------------------------------------------
        # Determine MIME type
        # ----------------------------------------------------

        suffix = (
            file_path.suffix.lower()
        )


        if suffix == ".pdf":

            media_type = "application/pdf"


        elif suffix == ".docx":

            media_type = (
                "application/"
                "vnd.openxmlformats-officedocument."
                "wordprocessingml.document"
            )


        elif suffix == ".md":

            media_type = "text/markdown"


        else:

            media_type = (
                "application/octet-stream"
            )


        # ----------------------------------------------------
        # Return existing file
        # ----------------------------------------------------

        return FileResponse(
            path=str(file_path),
            filename=safe_filename,
            media_type=media_type
        )


    except HTTPException:

        raise


    except Exception as e:

        print(
            "Download error:",
            str(e)
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to download report."
        )