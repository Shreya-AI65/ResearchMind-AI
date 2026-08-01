"""
Token Optimization Benchmark Test

Purpose:
Evaluate how much token reduction is achieved after
compressing research papers.
"""

from app.agents.paper_retrieval import PaperRetrievalAgent
from app.utils.paper_compressor import PaperCompressor
from app.utils.token_counter import TokenCounter


def test_token_optimization():

    agent = PaperRetrievalAgent()

    queries = [
        "Agentic AI",
        "Large Language Models",
        "Retrieval Augmented Generation",
        "Computer Vision",
        "Multi Agent Systems"
    ]

    total_original = 0
    total_compressed = 0
    total_saved = 0

    successful_tests = 0

    print("\n")
    print("=" * 70)
    print("TOKEN OPTIMIZATION BENCHMARK")
    print("=" * 70)

    for query in queries:

        try:

            print("\n")
            print("-" * 70)
            print(f"Testing Query : {query}")
            print("-" * 70)

            # ---------------------------------------
            # Retrieve Papers
            # ---------------------------------------

            papers = agent.search_papers(query)

            # ---------------------------------------
            # Count Original Tokens
            # ---------------------------------------

            original_tokens = TokenCounter.count_papers(
                papers
            )

            # ---------------------------------------
            # Compress Papers
            # ---------------------------------------

            compressed_papers = PaperCompressor.compress_all(
                papers
            )

            # ---------------------------------------
            # Count Compressed Tokens
            # ---------------------------------------

            compressed_tokens = TokenCounter.count_papers(
                compressed_papers
            )

            # ---------------------------------------
            # Statistics
            # ---------------------------------------

            saved_tokens = (
                original_tokens -
                compressed_tokens
            )

            reduction = round(
                (
                    saved_tokens /
                    original_tokens
                ) * 100,
                2
            )

            total_original += original_tokens
            total_compressed += compressed_tokens
            total_saved += saved_tokens

            successful_tests += 1

            # ---------------------------------------
            # Print Results
            # ---------------------------------------

            print(f"Original Tokens     : {original_tokens}")
            print(f"Compressed Tokens   : {compressed_tokens}")
            print(f"Tokens Saved        : {saved_tokens}")
            print(f"Reduction (%)       : {reduction}%")

        except Exception as e:

            print(f"\nQuery '{query}' skipped.")
            print(f"Reason: {e}")

    # --------------------------------------------------
    # Average Statistics
    # --------------------------------------------------

    print("\n")
    print("=" * 70)
    print("OVERALL BENCHMARK RESULT")
    print("=" * 70)

    if successful_tests == 0:

        print("No successful benchmark could be completed.")

    else:

        average_original = round(
            total_original / successful_tests,
            2
        )

        average_compressed = round(
            total_compressed / successful_tests,
            2
        )

        average_saved = round(
            total_saved / successful_tests,
            2
        )

        average_reduction = round(
            (
                average_saved /
                average_original
            ) * 100,
            2
        )

        print(f"Queries Tested          : {successful_tests}")
        print(f"Average Original Tokens : {average_original}")
        print(f"Average Compressed      : {average_compressed}")
        print(f"Average Tokens Saved    : {average_saved}")
        print(f"Average Reduction (%)   : {average_reduction}%")

        print("\n")
        print("=" * 70)
        print("Benchmark Completed Successfully")
        print("=" * 70)


if __name__ == "__main__":
    test_token_optimization()