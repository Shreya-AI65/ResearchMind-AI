from fastapi import FastAPI

from app.api.search import router as search_router
from app.api.analyze import router as analysis_router
from app.api.compare import router as compare_router
from app.api.research_gap import router as research_gap_router

app = FastAPI(
    title="ResearchMind AI Backend"
)

app.include_router(search_router)
app.include_router(analysis_router)
app.include_router(compare_router)
app.include_router(research_gap_router)