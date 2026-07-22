"""
Analysis API

Provides endpoints for analyzing research papers.
"""

from fastapi import APIRouter
from app.services.analysis_service import AnalysisService

router = APIRouter()

analysis_service = AnalysisService()


@router.get("/analyze")
def analyze(query: str):
    """
    Analyze research papers for a given search query.
    """

    return analysis_service.analyze_papers(query)