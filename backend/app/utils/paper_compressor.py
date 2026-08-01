"""
Paper Compressor Utility

Purpose:
Reduce unnecessary text before sending papers
to downstream AI agents to minimize token usage.
"""


class PaperCompressor:

    @staticmethod
    def compress(paper: dict):

        abstract = paper.get("abstract", "")

        # Keep only the first 200 words
        words = abstract.split()

        compressed = " ".join(words[:200])

        return {
            **paper,
            "abstract": compressed
        }

    @staticmethod
    def compress_all(papers):

        return [
            PaperCompressor.compress(paper)
            for paper in papers
        ]