from fastapi import FastAPI

from app.core.version  import API_PREFIX
from app.api.search import router as search_router
from app.api.analyze import router as analysis_router
from app.api.compare import router as compare_router
from app.api.research_gap import router as research_gap_router
from app.api.experiment_plan import router as experiment_plan_router
from app.api.literature_review import router as literature_review_router
from app.api.report import router as report_router
from app.api.report_history import router as history_router
from app.api.citation_analysis import router as citation_router

from app.utils.exception_handler import register_exception_handlers
from app.middleware.timer import process_time_middleware


app = FastAPI(
    title="ResearchMind AI Backend",
    version="1.0.0"
)

# Register Global Exception Handlers
register_exception_handlers(app)

# Register Middleware
app.middleware("http")(process_time_middleware)

# -----------------------------
# API Version 1 Routes
# -----------------------------

app.include_router(
    search_router,
    prefix=API_PREFIX,
    tags=["Search"]
)

app.include_router(
    analysis_router,
    prefix=API_PREFIX,
    tags=["Analysis"]
)

app.include_router(
    compare_router,
    prefix=API_PREFIX,
    tags=["Comparison"]
)

app.include_router(
    research_gap_router,
    prefix=API_PREFIX,
    tags=["Research Gap"]
)

app.include_router(
    experiment_plan_router,
    prefix=API_PREFIX,
    tags=["Experiment Planning"]
)

app.include_router(
    literature_review_router,
    prefix=API_PREFIX,
    tags=["Literature Review"]
)

app.include_router(
    report_router,
    prefix=API_PREFIX,
    tags=["Report Generation"]
)

app.include_router(
    history_router,
    prefix=API_PREFIX,
    tags=["Report History"]
)

app.include_router(
    citation_router,
    prefix=API_PREFIX,
    tags=["Citation Analysis"]
)