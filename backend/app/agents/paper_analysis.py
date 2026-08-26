"""
Paper Analysis Agent

Purpose:
Analyzes parsed research papers and extracts structured
information that can be used by downstream AI agents such as
research-gap detection, methodology comparison, and report generation.
"""

import re


class PaperAnalysisAgent:

    # ============================================================
    # STOP WORDS
    # ============================================================

    STOP_WORDS = {
        # General English
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
        "between",
        "through",
        "within",
        "without",
        "under",
        "over",
        "such",
        "than",
        "more",
        "most",
        "very",
        "high",
        "low",
        "many",
        "much",
        "other",
        "some",
        "each",
        "both",
        "also",
        "only",
        "often",
        "where",
        "when",
        "which",
        "while",
        "whose",
        "about",
        "after",
        "before",
        "during",
        "among",
        "across",
        "through",
        "toward",
        "towards",

        # Common verbs
        "been",
        "have",
        "has",
        "had",
        "are",
        "was",
        "were",
        "being",
        "can",
        "could",
        "would",
        "should",
        "may",
        "might",
        "will",
        "shall",
        "does",
        "done",
        "make",
        "makes",
        "made",
        "provide",
        "provides",
        "provided",
        "develop",
        "developed",
        "developing",
        "show",
        "shows",
        "shown",
        "used",
        "use",
        "using",
        "include",
        "includes",
        "including",
        "present",
        "presents",
        "presented",
        "propose",
        "proposes",
        "proposed",

        # Research-related generic words
        "paper",
        "study",
        "research",
        "approach",
        "method",
        "methods",
        "result",
        "results",
        "work",
        "future",
        "analysis",
        "system",
        "systems",
        "model",
        "models",
        "framework",
        "frameworks",
        "data",
        "information",
        "process",
        "processes",
        "problem",
        "problems",
        "solution",
        "solutions",

        # Generic descriptive words
        "important",
        "ability",
        "different",
        "general",
        "specific",
        "effective",
        "efficient",
        "significant",
        "various",
        "comprehensive",
        "intelligent",
        "emerging",
        "novel",
        "recent",
        "potential",
        "possible",
        "available",
        "existing",
        "current",
        "related",
        "overall",
        "main",
        "key",
        "multiple",
        "large",
        "small",
        "first",
        "second",
        "third",

        # Common paper wording
        "authors",
        "author",
        "paperwork",
        "findings",
        "results",
        "conclusion",
        "conclusions",
        "objective",
        "objectives",
        "purpose",
        "study",
        "studies",
    }


    # ============================================================
    # DOMAIN KEYWORDS
    # ============================================================

    DOMAIN_KEYWORDS = {
        "llm",
        "large-language-model",
        "large-language-models",
        "rag",
        "retrieval-augmented-generation",
        "transformer",
        "bert",
        "gpt",
        "reinforcement",
        "reinforcement-learning",
        "robotics",
        "robot",
        "computer-vision",
        "vision",
        "reasoning",
        "planning",
        "memory",
        "autonomous",
        "agent",
        "agents",
        "multi-agent",
        "multi-agents",
        "benchmark",
        "benchmarks",
        "dataset",
        "datasets",
        "knowledge",
        "knowledge-graph",
        "knowledge-graphs",
        "graph",
        "graphs",
        "natural-language-processing",
        "nlp",
        "machine-learning",
        "deep-learning",
        "generative-ai",
        "artificial-intelligence",
        "document-intelligence",
        "scientific-document",
        "scientific-documents",
    }


    # ============================================================
    # RESEARCH AREA PATTERNS
    # ============================================================

    RESEARCH_AREA_PATTERNS = [

        (
            "Scientific Document Intelligence",
            [
                "scientific document",
                "scientific documents",
                "document intelligence",
                "scientific literature",
                "research document",
                "research papers",
                "scholarly documents",
            ]
        ),

        (
            "Retrieval-Augmented Generation",
            [
                "retrieval-augmented generation",
                "retrieval augmented generation",
                "rag",
            ]
        ),

        (
            "Multi-Agent Systems",
            [
                "multi-agent system",
                "multi-agent systems",
                "multi agent system",
                "multi agent systems",
            ]
        ),

        (
            "Agentic AI",
            [
                "agentic ai",
                "agentic artificial intelligence",
                "autonomous agent",
                "autonomous agents",
            ]
        ),

        (
            "Large Language Models",
            [
                "large language model",
                "large language models",
                "llm",
                "llms",
            ]
        ),

        (
            "Computer Vision",
            [
                "computer vision",
                "image recognition",
                "visual recognition",
                "image processing",
            ]
        ),

        (
            "Natural Language Processing",
            [
                "natural language processing",
                "nlp",
                "language processing",
                "text classification",
            ]
        ),

        (
            "Reinforcement Learning",
            [
                "reinforcement learning",
                "reinforcement-learning",
            ]
        ),

        (
            "Robotics",
            [
                "robotics",
                "robot",
                "robots",
            ]
        ),

        (
            "Machine Learning",
            [
                "machine learning",
                "supervised learning",
                "unsupervised learning",
                "classification model",
            ]
        ),

        (
            "Healthcare AI",
            [
                "healthcare ai",
                "medical ai",
                "clinical ai",
                "healthcare",
                "medical diagnosis",
            ]
        ),
    ]


    # ============================================================
    # INITIALIZATION
    # ============================================================

    def __init__(self):

        self.agent_name = "Paper Analysis Agent"
        self.status = "Initialized"


    # ============================================================
    # MAIN ANALYSIS FUNCTION
    # ============================================================

    def analyze_paper(self, paper: dict):
        """
        Analyze a research paper and extract structured information.
        """

        if not isinstance(paper, dict):
            paper = {}


        title = paper.get("title") or ""

        authors = paper.get("authors") or []

        abstract = paper.get("abstract") or ""

        year = paper.get("year") or 0

        citation_count = (
            paper.get("citation_count") or 0
        )


        # Ensure abstract is always a string

        abstract = str(abstract).strip()


        score = self.calculate_paper_score(
            paper
        )


        return {

            "title": title,

            "authors": authors,

            "year": year,

            "citation_count": citation_count,

            "summary": (
                abstract
                if abstract
                else "Abstract not available for analysis."
            ),

            "research_problem":
                self.extract_research_problem(
                    abstract
                ),

            "methodology":
                self.extract_methodology(
                    abstract
                ),

            "key_contributions":
                self.extract_contributions(
                    abstract
                ),

            "future_work":
                self.extract_future_work(
                    abstract
                ),

            "keywords":
                self.extract_keywords(
                    abstract
                ),

            "research_area":
                self.detect_research_area(
                    title,
                    abstract
                ),

            "paper_score":
                score,

            "paper_quality":
                self.paper_quality(
                    score
                )
        }


    # ============================================================
    # KEYWORD EXTRACTION
    # ============================================================

    def extract_keywords(self, text):

        if not text:
            return []


        text = text.lower()


        # Extract words and hyphenated technical terms

        words = re.findall(
            r"[a-zA-Z]+(?:-[a-zA-Z]+)*",
            text
        )


        candidates = []


        for word in words:

            word = word.strip("-")


            if len(word) < 4:
                continue


            # Ignore generic stop words

            if word in self.STOP_WORDS:
                continue


            # Ignore pure numeric content

            if word.isdigit():
                continue


            # Singularize simple plurals

            normalized = word


            if (
                normalized.endswith("ies")
                and len(normalized) > 5
            ):

                normalized = (
                    normalized[:-3]
                    + "y"
                )


            elif (
                normalized.endswith("s")
                and not normalized.endswith(
                    (
                        "ss",
                        "ous",
                        "is",
                        "us"
                    )
                )
                and len(normalized) > 5
            ):

                normalized = normalized[:-1]


            if normalized in self.STOP_WORDS:
                continue


            candidates.append(
                normalized
            )


        # --------------------------------------------------------
        # Count frequency
        # --------------------------------------------------------

        frequency = {}

        for word in candidates:

            frequency[word] = (
                frequency.get(word, 0)
                + 1
            )


        # --------------------------------------------------------
        # Prioritize domain-specific terms
        # --------------------------------------------------------

        scored_keywords = []


        for word, count in frequency.items():

            score = count


            if word in self.DOMAIN_KEYWORDS:

                score += 5


            # Technical-looking compound terms

            if "-" in word:

                score += 3


            # Longer technical terms are slightly preferred

            if len(word) >= 10:

                score += 1


            scored_keywords.append(
                (
                    score,
                    count,
                    word
                )
            )


        # Highest relevance first

        scored_keywords.sort(
            key=lambda item: (
                -item[0],
                -item[1],
                item[2]
            )
        )


        keywords = [
            item[2]
            for item in scored_keywords[:15]
        ]


        return keywords


    # ============================================================
    # RESEARCH AREA DETECTION
    # ============================================================

    def detect_research_area(
        self,
        title: str,
        abstract: str
    ):

        title = title or ""
        abstract = abstract or ""


        text = (
            title
            + " "
            + abstract
        ).lower()


        # Check more specific domains first

        for area, patterns in (
            self.RESEARCH_AREA_PATTERNS
        ):

            for pattern in patterns:

                if pattern in text:

                    return area


        return "General Artificial Intelligence"


    # ============================================================
    # RESEARCH PROBLEM EXTRACTION
    # ============================================================

    def extract_research_problem(
        self,
        abstract: str
    ):

        if not abstract:

            return "Not Available"


        sentences = self._split_sentences(
            abstract
        )


        problem_patterns = [

            "challenge",
            "challenges",
            "problem",
            "problems",
            "limitation",
            "limitations",
            "lack of",
            "lack",
            "difficult",
            "difficulty",
            "difficulties",
            "however",
            "remains",
            "remain",
            "gap",
            "gaps",
            "issue",
            "issues",
            "struggle",
            "struggles",
            "cannot",
            "unable",
        ]


        candidates = []


        for sentence in sentences:

            lower = sentence.lower()


            for pattern in problem_patterns:

                if pattern in lower:

                    candidates.append(
                        sentence.strip()
                    )

                    break


        if candidates:

            return candidates[0]


        # If no explicit problem sentence exists,
        # return the first meaningful sentence.

        if sentences:

            return sentences[0]


        return "Not Available"


    # ============================================================
    # METHODOLOGY EXTRACTION
    # ============================================================

    def extract_methodology(
        self,
        abstract: str
    ):

        if not abstract:

            return ["Not Identified"]


        text = abstract.lower()


        methodology_patterns = {

            "Survey":
                [
                    "survey",
                    "systematic review",
                    "literature review"
                ],

            "Framework":
                [
                    "framework",
                    "proposed framework"
                ],

            "Architecture":
                [
                    "architecture",
                    "architectural"
                ],

            "Algorithm":
                [
                    "algorithm",
                    "algorithmic"
                ],

            "Experimental Evaluation":
                [
                    "experiment",
                    "experimental",
                    "evaluation",
                    "evaluated",
                    "benchmark",
                    "benchmarking"
                ],

            "Dataset":
                [
                    "dataset",
                    "datasets",
                    "data set"
                ],

            "Large Language Model":
                [
                    "large language model",
                    "large language models",
                    "llm",
                    "llms"
                ],

            "Retrieval-Augmented Generation":
                [
                    "retrieval-augmented generation",
                    "retrieval augmented generation",
                    "rag"
                ],

            "Transformer":
                [
                    "transformer",
                    "transformers"
                ],

            "Machine Learning":
                [
                    "machine learning",
                    "machine-learning"
                ],

            "Deep Learning":
                [
                    "deep learning",
                    "deep-learning"
                ],

            "Reinforcement Learning":
                [
                    "reinforcement learning",
                    "reinforcement-learning"
                ],
        }


        detected = []


        for method, patterns in (
            methodology_patterns.items()
        ):

            for pattern in patterns:

                if pattern in text:

                    detected.append(
                        method
                    )

                    break


        if detected:

            return detected[:6]


        return ["Not Identified"]


    # ============================================================
    # KEY CONTRIBUTION EXTRACTION
    # ============================================================

    def extract_contributions(
        self,
        abstract: str
    ):

        if not abstract:

            return []


        sentences = self._split_sentences(
            abstract
        )


        contribution_patterns = [

            "we propose",
            "we introduce",
            "we present",
            "we develop",
            "we design",
            "we develop a",
            "this paper proposes",
            "this paper introduces",
            "this work proposes",
            "this work introduces",
            "our approach",
            "our framework",
            "our model",
            "our system",
            "contribution",
            "contributions",
            "demonstrate",
            "demonstrates",
            "achieve",
            "achieves",
            "outperform",
            "outperforms",
        ]


        contributions = []


        for sentence in sentences:

            lower = sentence.lower()


            if any(
                pattern in lower
                for pattern in contribution_patterns
            ):

                clean_sentence = (
                    sentence.strip()
                )


                if (
                    clean_sentence
                    and clean_sentence
                    not in contributions
                ):

                    contributions.append(
                        clean_sentence
                    )


        return contributions[:3]


    # ============================================================
    # FUTURE WORK EXTRACTION
    # ============================================================

    def extract_future_work(
        self,
        abstract: str
    ):

        if not abstract:

            return []


        sentences = self._split_sentences(
            abstract
        )


        future_patterns = [

            "future work",
            "future research",
            "further research",
            "future studies",
            "in future",
            "in the future",
            "remain to be",
            "remains to be",
            "could be extended",
            "can be extended",
            "should be explored",
            "needs further",
            "further investigation",
            "future direction",
            "future directions",
        ]


        future = []


        for sentence in sentences:

            lower = sentence.lower()


            if any(
                pattern in lower
                for pattern in future_patterns
            ):

                clean_sentence = (
                    sentence.strip()
                )


                if (
                    clean_sentence
                    and clean_sentence
                    not in future
                ):

                    future.append(
                        clean_sentence
                    )


        return future[:3]


    # ============================================================
    # SENTENCE SPLITTER
    # ============================================================

    def _split_sentences(
        self,
        text: str
    ):

        if not text:

            return []


        text = re.sub(
            r"\s+",
            " ",
            text
        ).strip()


        sentences = re.split(
            r"(?<=[.!?])\s+",
            text
        )


        return [
            sentence.strip()
            for sentence in sentences
            if sentence.strip()
        ]


    # ============================================================
    # PAPER SCORE
    # ============================================================

    def calculate_paper_score(
        self,
        paper: dict
    ):
        """
        Calculate a simple quality score for a research paper.
        """

        paper = paper or {}


        score = 0


        citation_count = (
            paper.get(
                "citation_count"
            )
            or 0
        )


        abstract = (
            paper.get(
                "abstract"
            )
            or ""
        )


        year = (
            paper.get(
                "year"
            )
            or 0
        )


        # --------------------------------------------------------
        # Citation score
        # --------------------------------------------------------

        if citation_count >= 500:

            score += 40

        elif citation_count >= 100:

            score += 30

        elif citation_count >= 20:

            score += 20

        else:

            score += 10


        # --------------------------------------------------------
        # Abstract completeness
        # --------------------------------------------------------

        abstract_length = len(
            str(abstract)
        )


        if abstract_length > 500:

            score += 30

        elif abstract_length > 200:

            score += 20

        elif abstract_length > 100:

            score += 10


        # --------------------------------------------------------
        # Recent publication
        # --------------------------------------------------------

        try:

            year = int(year)

        except (
            TypeError,
            ValueError
        ):

            year = 0


        if year >= 2025:

            score += 30

        elif year >= 2022:

            score += 20

        elif year > 0:

            score += 10


        return score


    # ============================================================
    # PAPER QUALITY
    # ============================================================

    def paper_quality(
        self,
        score
    ):

        if score >= 85:

            return "Excellent"


        if score >= 70:

            return "Very Good"


        if score >= 50:

            return "Good"


        return "Average"