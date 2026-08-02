"""
User Profile Model

Stores user information for personalized AI responses.
"""

from pydantic import BaseModel
from typing import Optional


class UserProfile(BaseModel):

    # Basic Information
    name: Optional[str] = None
    age: int

    # Academic Background
    qualification: str

    # Experience Level
    experience_level: str

    # Preferred Explanation Style
    explanation_style: str = "balanced"

    # Research Interests
    research_interests: Optional[str] = None

    # Existing Research Context
    existing_research: Optional[str] = None