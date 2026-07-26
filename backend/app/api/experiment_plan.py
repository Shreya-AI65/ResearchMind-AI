from fastapi import APIRouter

from app.services.experiment_planning_service import (
    ExperimentPlanningService
)

router = APIRouter()

service = ExperimentPlanningService()


@router.get("/experiment-plan")
def experiment_plan(query: str):
    return service.generate_plan(query)