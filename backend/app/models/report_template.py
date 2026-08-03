"""
Report Template Model
"""

from pydantic import BaseModel


class ReportTemplate(BaseModel):

    template: str = "technical"