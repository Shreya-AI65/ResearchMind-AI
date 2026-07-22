from fastapi import FastAPI

from app.api.search import router as search_router
from app.api.analyze import router as analyze_router

app = FastAPI(
    title="ResearchMind AI Backend"
)

app.include_router(search_router)
app.include_router(analyze_router)