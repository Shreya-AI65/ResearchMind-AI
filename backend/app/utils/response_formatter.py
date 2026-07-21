"""
Response Formatter

Purpose:
Provides a standardized JSON response format
for all API responses.
"""


class ResponseFormatter:

    @staticmethod
    def success(message: str, data):

        return {
            "success": True,
            "message": message,
            "data": data
        }

    @staticmethod
    def error(message: str):

        return {
            "success": False,
            "message": message,
            "data": None
        }