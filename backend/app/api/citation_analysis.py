"""
Citation Analysis API
"""

from fastapi import APIRouter, HTTPException

from app.services.citation_analysis_service import (
    CitationAnalysisService
)

router = APIRouter()

service = CitationAnalysisService()


@router.get("/citation-analysis")
def citation_analysis(query: str):

    result = service.analyze_citations(query)

    if result["status"] == "failed":

        raise HTTPException(
            status_code=500,
            detail=result["error"]
        )

    return result