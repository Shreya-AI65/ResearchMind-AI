from fastapi import APIRouter
from datetime import datetime

from app.services.report_generation_service import (
    ReportGenerationService
)

router = APIRouter()


@router.get("/health")
def health_check():

    services = {
        "api": "healthy"
    }

    try:
        ReportGenerationService()
        services["report_generation"] = "healthy"

    except Exception:
        services["report_generation"] = "unavailable"


    if all(
        status == "healthy"
        for status in services.values()
    ):
        overall_status = "healthy"

    else:
        overall_status = "degraded"


    return {
        "success": True,
        "message": "ResearchMind AI system health status.",
        "status": overall_status,
        "service": "ResearchMind AI Backend",
        "services": services,
        "timestamp": datetime.utcnow().isoformat()
    }