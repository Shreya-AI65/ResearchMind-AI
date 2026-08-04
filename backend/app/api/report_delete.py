"""
Report Delete API

Delete a generated report and remove it
from report history.
"""

import json
import os

from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.delete("/reports/delete")
def delete_report(version: int):

    history_file = "generated_reports/report_history.json"

    if not os.path.exists(history_file):
        raise HTTPException(
            status_code=404,
            detail="Report history not found."
        )

    with open(
        history_file,
        "r",
        encoding="utf-8"
    ) as file:

        history = json.load(file)

    report_to_delete = None

    current_version = 1

    for report in history:

        # Use stored version if available,
        # otherwise assign sequential version
        report_version = report.get(
            "version",
            current_version
        )

        if report_version == version:

            report_to_delete = report
            break

        current_version += 1

    if report_to_delete is None:

        raise HTTPException(
            status_code=404,
            detail="Report version not found."
        )

    # -----------------------------------
    # Delete Generated Files
    # -----------------------------------

    for key in ["pdf", "docx", "markdown"]:

        filename = report_to_delete.get(key)

        if filename:

            filepath = os.path.join(
                "generated_reports",
                filename
            )

            if os.path.exists(filepath):
                os.remove(filepath)

    # -----------------------------------
    # Remove From History
    # -----------------------------------

    history.remove(report_to_delete)

    with open(
        history_file,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            history,
            file,
            indent=4
        )

    return {

        "status": "success",

        "message": "Report deleted successfully.",

        "deleted_version": version
    }