"""
Report Export API

Export complete report history as JSON.
"""

import os

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

router = APIRouter()


@router.get("/reports/export")
def export_report_history():

    history_file = "generated_reports/report_history.json"

    if not os.path.exists(history_file):

        raise HTTPException(
            status_code=404,
            detail="Report history not found."
        )

    return FileResponse(
        path=history_file,
        filename="report_history.json",
        media_type="application/json"
    )