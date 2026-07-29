"""
Paper Analysis Agent

Purpose:
Analyzes parsed research papers and extracts structured
information that can be used by downstream AI agents such as
research-gap detection, methodology comparison, and report generation.
"""

import re
class PaperAnalysisAgent:
    STOP_WORDS = {
    
        "the",
        "and",
        "with",
        "that",
        "this",
        "from",
        "into",
        "their",
        "there",
        "these",
        "those",
        "using",
        "based",
        "proposed",
        "paper",
        "study",
        "research",
        "approach",
        "method",
        "methods",
        "result",
        "results",
        "show",
        "shows",
        "used",
        "also",
        "can",
        "been",
        "have",
        "has",
        "had",
        "are",
        "was",
        "were",
        "being",
        "than",
        "more",
        "most",
        "into",
        "over",
        "such",
        "very",
        "high",
        "low",
        "new",
        "novel",
        "propose",
        "proposes",
        "provide",
        "provides",
        "emerging",
        "future",
        "presents",
        "present",
        "paradigm",
        "includes",
        "include",
        "including",
        "improving",
        "intelligent",
        "comprehensive",
        "work",
        }
    DOMAIN_KEYWORDS = {
    
        "llm",
        "rag",
        "transformer",
        "bert",
        "gpt",
        "reinforcement",
        "robotics",
        "vision",
        "reasoning",
        "planning",
        "memory",
        "autonomous",
        "agent",
        "multi-agent",
        "benchmark",
        "dataset",
        "knowledge",
        "graph"
    
        }
    def __init__(self):
        self.agent_name = "Paper Analysis Agent"
        self.status = "Initialized"

    def analyze_paper(self, paper: dict):
        """
    Analyze a research paper and extract structured information.
    """

        title = paper.get("title", "")
        authors = paper.get("authors", [])
        abstract = paper.get("abstract", "")
        year = paper.get("year", "")
        citation_count = paper.get("citation_count", 0)
        score = self.calculate_paper_score(paper)
        
        return {
            "title": title,
            "authors": authors,
            "year": year,
            "citation_count": citation_count,
            "summary": abstract,
            "research_problem": self.extract_research_problem(abstract),
            "methodology": self.extract_methodology(abstract),
            "key_contributions": self.extract_contributions(abstract),
            "future_work": self.extract_future_work(abstract),
            "keywords": self.extract_keywords(abstract),
            "research_area": self.detect_research_area(title, abstract),
            "paper_score": score,
            "paper_quality": self.paper_quality(score)
        }

    def extract_keywords(self, text):

        if not text:
            return []

        text = text.lower()

        words = re.findall(r"[a-zA-Z\-]+", text)

        keywords = []

        for word in words:

            if len(word) < 4:
                continue

            # Convert simple plurals to singular
            # Singularize only common plural forms
            if word.endswith("ies") and len(word) > 5:
                word = word[:-3] + "y"
            elif (
                word.endswith("s")
                and not word.endswith(("ss", "ous", "is"))
                and len(word) > 5
            ):
                word = word[:-1]

            if word in self.STOP_WORDS:
                continue

            keywords.append(word)

        # Remove duplicates while preserving order
        keywords = list(dict.fromkeys(keywords))

        return keywords[:15]

    def detect_research_area(self, title: str, abstract: str):
        """
        Detect research area using simple rule-based matching.
        """

        text = (title + " " + abstract).lower()

        if "agent" in text:
            return "Agentic AI"

        if "language model" in text:
            return "Large Language Models"

        if "machine learning" in text:
            return "Machine Learning"

        if "computer vision" in text:
            return "Computer Vision"

        if "robot" in text:
            return "Robotics"

        if "health" in text:
            return "Healthcare AI"

        return "General Artificial Intelligence"

    def extract_research_problem(self, abstract: str):

        if not abstract:
            return "Not Available"

        first_sentence = abstract.split(".")[0]

        return first_sentence.strip()

    def extract_methodology(self, abstract: str):

        methods = [
            "survey",
            "framework",
            "architecture",
            "model",
            "system",
            "approach",
            "algorithm",
            "transformer",
            "llm",
            "rag"
        ]

        text = abstract.lower()

        detected = []

        for method in methods:
            if method in text:
                detected.append(method.title())

        if detected:
            return detected

        return ["Not Identified"]

    def extract_contributions(self, abstract: str):

        if not abstract:
            return []

        contributions = []

        sentences = abstract.split(".")

        for sentence in sentences:

            lower = sentence.lower()

            if (
                "propose" in lower
                or "introduce" in lower
                or "present" in lower
                or "develop" in lower
                or "survey" in lower
            ):
                contributions.append(sentence.strip())

        return contributions[:3]

    def extract_future_work(self, abstract: str):
        if not abstract:
            return []

        future = []

        sentences = abstract.split(".")

        for sentence in sentences:

            lower = sentence.lower()

            if (
                "future" in lower
                or "further research" in lower
                or "future work" in lower
                or "next" in lower
            ):
                future.append(sentence.strip())

        return future

    def calculate_paper_score(self, paper: dict):
        """
    Calculate a simple quality score for a research paper.
    """

        score = 0

        citation_count = paper.get("citation_count", 0)
        abstract = paper.get("abstract", "")
        year = paper.get("year", 0)

    # Citation score
        if citation_count >= 500:
            score += 40
        elif citation_count >= 100:
            score += 30
        elif citation_count >= 20:
            score += 20
        else:
            score += 10

    # Abstract completeness
        if len(abstract) > 500:
            score += 30
        elif len(abstract) > 200:
            score += 20
        elif len(abstract) > 100:
            score += 10

    # Recent publication
        if year >= 2025:
            score += 30
        elif year >= 2022:
            score += 20
        else:
            score += 10

        return score

    def paper_quality(self, score):

        if score >= 85:
            return "Excellent"

        if score >= 70:
            return "Very Good"

        if score >= 50:
            return "Good"

        return "Average"