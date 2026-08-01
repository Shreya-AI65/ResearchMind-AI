"""
Request Timing Middleware

Measures the execution time of every API request.
"""

import time

from fastapi import Request

import logging

logger = logging.getLogger(__name__)

async def process_time_middleware(
    request: Request,
    call_next
):
    """
    Add processing time to every response.
    """

    start_time = time.perf_counter()

    response = await call_next(request)

    process_time = round(
        time.perf_counter() - start_time,
        4
    )

    response.headers["X-Process-Time"] = f"{process_time} sec"
    logger.info(
    f"{request.method} {request.url.path} completed in {process_time} sec"
    )

    return response