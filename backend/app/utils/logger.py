"""
Logger Utility

Purpose:
Provides a centralized logging configuration for the ResearchMind AI backend.
All modules should use this logger instead of print() statements.
"""

import logging


def setup_logger(name: str):

    logger = logging.getLogger(name)

    if not logger.handlers:

        logger.setLevel(logging.INFO)

        console_handler = logging.StreamHandler()

        formatter = logging.Formatter(
            "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
        )

        console_handler.setFormatter(formatter)

        logger.addHandler(console_handler)

    return logger