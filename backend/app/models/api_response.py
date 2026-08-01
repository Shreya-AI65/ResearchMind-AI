"""
Standard API Response Models

These models provide a consistent response format
for all backend APIs.
"""

from typing import Any, Optional
from pydantic import BaseModel
from datetime import datetime


class APIResponse(BaseModel):
    """
    Standard API Response
    """

    success: bool
    message: str
    data: Optional[Any] = None
    timestamp: str = datetime.now().isoformat()


class SuccessResponse(APIResponse):
    """
    Success Response
    """

    success: bool = True


class ErrorResponse(APIResponse):
    """
    Error Response
    """

    success: bool = False