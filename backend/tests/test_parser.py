"""
Unit Test

Purpose:
Verify that the Paper Parser correctly converts
Semantic Scholar responses into clean paper objects.
"""
import os
import sys
import json

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, project_root)

from app.utils.parser import PaperParser


def test_parser():

    with open("sample_response.json", "r", encoding="utf-8") as file:
        sample_data = json.load(file)

    papers = PaperParser.parse_response(sample_data)

    print("\n===== Parser Test =====")

    print(f"Total Papers Parsed: {len(papers)}")

    for index, paper in enumerate(papers, start=1):

        print("\n----------------------------")
        print(f"Paper {index}")
        print("----------------------------")

        print("Title:")
        print(paper["title"])

        print("\nAuthors:")
        print(", ".join(paper["authors"]))

        print("\nYear:")
        print(paper["year"])

        print("\nCitation Count:")
        print(paper["citation_count"])

        print("\nURL:")
        print(paper["url"])

    print("\nParser Test Passed Successfully.")


if __name__ == "__main__":
    test_parser()