"""
Token Counter Utility

Purpose:
Estimate the number of tokens used by different
ResearchMind AI agents.

This utility provides an approximate token count
without requiring an external tokenizer.
"""

import logging

logger = logging.getLogger(__name__)


class TokenCounter:
    """
    Utility class for estimating token usage.
    """

    @staticmethod
    def estimate_tokens(text: str) -> int:
        """
        Estimate token count.

        Rule:
        Approximately 1 token ≈ 4 characters.
        """

        if not text:
            return 0

        return max(1, len(text) // 4)

    @staticmethod
    def count_query(query: str) -> int:
        """
        Count tokens in user query.
        """

        tokens = TokenCounter.estimate_tokens(query)

        logger.info(
            f"User Query Tokens: {tokens}"
        )

        return tokens

    @staticmethod
    def count_papers(papers: list) -> int:
        """
        Count tokens used by retrieved papers.
        """

        total = 0

        for paper in papers:

            abstract = paper.get("abstract", "")

            total += TokenCounter.estimate_tokens(
                abstract
            )

        logger.info(
            f"Retrieved Paper Tokens: {total}"
        )

        return total

    @staticmethod
    def count_text(name: str, text: str) -> int:
        """
        Count tokens for any generated text.
        """

        tokens = TokenCounter.estimate_tokens(text)

        logger.info(
            f"{name} Tokens: {tokens}"
        )

        return tokens

    @staticmethod
    def total_usage(*values) -> int:
        """
        Calculate total estimated token usage.
        """

        total = sum(values)

        logger.info(
            f"Total Estimated Tokens: {total}"
        )

        return total