from pydantic import BaseModel
from typing import List


class Paper(BaseModel):
    """
    Standard paper representation used across ResearchMind AI.
    """

    title: str

    authors: List[str]

    abstract: str

    year: int | None = None

    citation_count: int = 0

    url: str