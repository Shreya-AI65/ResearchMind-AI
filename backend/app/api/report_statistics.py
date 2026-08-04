"""
Report Statistics API

Provides analytics for generated reports.
"""

from collections import Counter

from fastapi import APIRouter

from app.utils.report_history import ReportHistoryManager

router = APIRouter()

history = ReportHistoryManager()


@router.get("/reports/statistics")
def report_statistics():

    reports = history.get_history()

    total_reports = len(reports)

    if total_reports == 0:

        return {
            "total_reports": 0,
            "total_topics": 0,
            "most_popular_topic": None,
            "latest_report": None
        }

    topics = [

        report["research_topic"]

        for report in reports

    ]

    topic_counter = Counter(topics)

    most_popular = topic_counter.most_common(1)[0]

    latest = reports[-1]

    from app.models.api_response import SuccessResponse

    return SuccessResponse(
        message="Report statistics fetched successfully.",
        data={
            "total_reports": total_reports,
            "total_topics": len(topic_counter),
            "most_popular_topic": {
                "topic": most_popular[0],
                "reports": most_popular[1]
            },
            "latest_report": latest
        }
    )