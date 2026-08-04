"""
Report Search API

Search previously generated reports.
"""

from fastapi import APIRouter
from app.utils.report_history import ReportHistoryManager

router = APIRouter()

history = ReportHistoryManager()


@router.get("/reports/search")
def search_reports(topic: str):

    reports = history.get_history()

    results = [

        report

        for report in reports

        if topic.lower() in report["research_topic"].lower()

    ]

    return {

        "query": topic,

        "total_results": len(results),

        "results": results

    }