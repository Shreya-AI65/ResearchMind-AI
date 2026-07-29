from fastapi import FastAPI

from app.api.search import router as search_router
from app.api.analyze import router as analysis_router
from app.api.compare import router as compare_router
from app.api.research_gap import router as research_gap_router
from app.api.experiment_plan import router as experiment_plan_router
from app.api.literature_review import router as literature_review_router
from app.api.report import router as report_router
from app.api.report_history import router as history_router
app = FastAPI(
    title="ResearchMind AI Backend"
)

app.include_router(search_router)
app.include_router(analysis_router)
app.include_router(compare_router)
app.include_router(research_gap_router)
app.include_router(experiment_plan_router)
app.include_router(literature_review_router)
app.include_router(report_router)
app.include_router(history_router)