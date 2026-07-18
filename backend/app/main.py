from fastapi import FastAPI
from app.api.search import router as search_router

app = FastAPI(
    title="ResearchMind AI",
    description="Multi-Agent AI Research Assistant",
    version="1.0.0"
)

app.include_router(search_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to ResearchMind AI",
        "status": "Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy"
    }