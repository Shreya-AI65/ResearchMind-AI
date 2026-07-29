"""
Report History API

Returns previously generated reports.
"""

import json
import os

from fastapi import APIRouter

router =APIRouter()

@router.get("/reports/history")
def get_report_history():
    history_file= "generated_reports/report_history.json"

    if not os.path.exists(history_file):
        return{
            "total_reports":0,
            "history":[]
        }
    with open(
        history_file,
        "r",
        encoding="utf-8"
    ) as file:
        history=json.load(file)

    return{
        "total_reports": len(history),
        "history": history
    }