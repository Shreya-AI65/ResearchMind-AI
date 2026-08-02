from pydantic import BaseModel


class ReportRequest(BaseModel):

    query: str

    name: str = "Guest"

    age: int = 20

    qualification: str = "B.Tech"

    experience_level: str = "Intermediate"

    explanation_style: str = "balanced"