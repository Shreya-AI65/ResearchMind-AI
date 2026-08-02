"""
Token Counter Utility
"""

import logging

logger = logging.getLogger(__name__)


class TokenCounter:

    @staticmethod
    def estimate_tokens(text: str) -> int:
        """
        Estimate tokens using the approximation:
        1 token ≈ 4 characters
        """

        if not text:
            return 0

        return max(1, len(text) // 4)

    @staticmethod
    def count_query(query: str) -> int:
        """
        Count tokens in user query.
        """
        return TokenCounter.estimate_tokens(query)

    @staticmethod
    def count_papers(papers: list) -> int:
        """
        Count total tokens across all paper abstracts.
        """

        total = 0

        for paper in papers:
            total += TokenCounter.estimate_tokens(
                paper.get("abstract", "")
            )

        return total

    @staticmethod
    def count_text(text: str) -> int:
        """
        Count tokens in any text.
        """
        return TokenCounter.estimate_tokens(text)

    @staticmethod
    def build_usage(
        query_tokens,
        paper_tokens,
        review_tokens,
        report_tokens
    ):
        """
        Build token usage statistics.
        """

        usage = {
            "query": query_tokens,
            "paper_retrieval": paper_tokens,
            "literature_review": review_tokens,
            "final_report": report_tokens
        }

        usage["total"] = sum(usage.values())

        logger.info(f"Token Usage: {usage}")

        return usage

    @staticmethod
    def compression_statistics(
        original_tokens,
        compressed_tokens
    ):
        """
        Calculate compression statistics.
        """

        saved_tokens = original_tokens - compressed_tokens

        percentage = 0

        if original_tokens > 0:
            percentage = round(
                (saved_tokens / original_tokens) * 100,
                2
            )

        return {
            "original_tokens": original_tokens,
            "compressed_tokens": compressed_tokens,
            "saved_tokens": saved_tokens,
            "compression_percentage": percentage
        }