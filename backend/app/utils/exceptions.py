"""
Custom Exceptions

Purpose:
Defines custom exceptions used throughout the ResearchMind AI backend.
"""


class ResearchMindException(Exception):
    """Base exception for the project."""
    pass


class PaperRetrievalException(ResearchMindException):
    """Raised when paper retrieval fails."""
    pass


class APIRateLimitException(ResearchMindException):
    """Raised when API rate limit is exceeded."""
    pass


class InvalidQueryException(ResearchMindException):
    """Raised when the search query is invalid."""
    pass


class EmptyResponseException(ResearchMindException):
    """Raised when no papers are returned."""
    pass