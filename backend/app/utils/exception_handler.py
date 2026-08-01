"""
Global Exception Handler

Provides standardized JSON responses
for all application exceptions.
"""

from datetime import datetime

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException


def register_exception_handlers(app: FastAPI):
    """
    Register all global exception handlers.
    """

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(
        request: Request,
        exc: StarletteHTTPException
    ):

        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "message": exc.detail,
                "data": None,
                "status_code": exc.status_code,
                "timestamp": datetime.now().isoformat()
            }
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request,
        exc: RequestValidationError
    ):

        return JSONResponse(
            status_code=422,
            content={
                "success": False,
                "message": "Validation Error",
                "data": exc.errors(),
                "status_code": 422,
                "timestamp": datetime.now().isoformat()
            }
        )

    @app.exception_handler(Exception)
    async def general_exception_handler(
        request: Request,
        exc: Exception
    ):

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": str(exc),
                "data": None,
                "status_code": 500,
                "timestamp": datetime.now().isoformat()
            }
        )