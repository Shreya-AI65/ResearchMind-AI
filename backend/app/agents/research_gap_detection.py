"""
Research Gap Detection Agent

Purpose:
Analyzes multiple analyzed research papers to identify:

- Research gaps
- Common limitations
- Future opportunities
- Methodology limitations
- Evaluation gaps
- Dataset gaps
- Retrieval and grounding gaps
- Hallucination challenges
- Knowledge freshness issues
- Coordination challenges
- Security issues
- Scalability issues
- Explainability issues
- Emerging research trends
"""

import re
from collections import Counter


class ResearchGapDetectionAgent:

    def __init__(self):
        self.agent_name = "Research Gap Detection Agent"
        self.status = "Initialized"

    # ============================================================
    # RESEARCH AREAS
    # ============================================================

    def detect_research_areas(self, papers):

        areas = []

        for paper in papers or []:

            area = paper.get("research_area")

            if area:
                areas.append(str(area).strip())

        return sorted(set(areas))

    # ============================================================
    # COMMON KEYWORDS
    # ============================================================

    def detect_common_keywords(self, papers):

        frequency = self.keyword_frequency(papers)

        return list(frequency.keys())

    # ============================================================
    # FUTURE WORK
    # ============================================================

    def detect_future_work(self, papers):

        future_work = []

        for paper in papers or []:

            items = paper.get("future_work") or []

            if isinstance(items, str):
                items = [items]

            for item in items:

                if not item:
                    continue

                item = str(item).strip()

                if item and item not in future_work:
                    future_work.append(item)

        return future_work

    # ============================================================
    # MAIN GAP REPORT
    # ============================================================

    def generate_gap_report(self, papers):

        papers = papers or []

        if not papers:

            return {
                "total_papers": 0,
                "research_areas": [],
                "common_keywords": [],
                "future_work": [],
                "research_area_distribution": {},
                "keyword_frequency": {},
                "research_trends": [],
                "gap_categories": {},
                "research_gaps": [],
                "emerging_topics": [],
                "recommendations": [],
                "summary": {
                    "dominant_area": None,
                    "top_trend": None,
                    "future_work_items": 0,
                    "research_gap_count": 0
                }
            }

        distribution = self.research_area_distribution(papers)

        trends = self.research_trends(papers)

        future_work = self.detect_future_work(papers)

        gap_categories = self.gap_categories(papers)

        research_gaps = self.detect_research_gaps(papers)

        emerging_topics = self.emerging_topics(papers)

        recommendations = self.recommendations(papers)

        return {

            "total_papers": len(papers),

            "research_areas":
                self.detect_research_areas(papers),

            "common_keywords":
                self.detect_common_keywords(papers),

            "future_work":
                future_work,

            "research_area_distribution":
                distribution,

            "keyword_frequency":
                self.keyword_frequency(papers),

            "research_trends":
                trends,

            "gap_categories":
                gap_categories,

            "research_gaps":
                research_gaps,

            "emerging_topics":
                emerging_topics,

            "recommendations":
                recommendations,

            "summary": {

                "dominant_area": (
                    max(
                        distribution,
                        key=distribution.get
                    )
                    if distribution
                    else None
                ),

                "top_trend": (
                    trends[0]
                    if trends
                    else None
                ),

                "future_work_items":
                    len(future_work),

                "research_gap_count":
                    len(research_gaps)
            }
        }

    # ============================================================
    # SERVICE WRAPPER
    # ============================================================

    def detect_gaps(self, papers):

        return self.generate_gap_report(papers)

    # ============================================================
    # RESEARCH AREA DISTRIBUTION
    # ============================================================

    def research_area_distribution(self, papers):

        distribution = {}

        for paper in papers or []:

            area = (
                paper.get("research_area")
                or "Unknown"
            )

            distribution[area] = (
                distribution.get(area, 0) + 1
            )

        return dict(
            sorted(
                distribution.items(),
                key=lambda x: x[1],
                reverse=True
            )
        )

    # ============================================================
    # KEYWORD FREQUENCY
    # ============================================================

    def keyword_frequency(self, papers):

        frequency = Counter()

        for paper in papers or []:

            keywords = (
                paper.get("keywords") or []
            )

            if isinstance(keywords, str):
                keywords = [keywords]

            for keyword in keywords:

                if not keyword:
                    continue

                keyword = (
                    str(keyword)
                    .strip()
                    .lower()
                )

                if keyword:
                    frequency[keyword] += 1

        return dict(
            sorted(
                frequency.items(),
                key=lambda x: (-x[1], x[0])
            )
        )

    # ============================================================
    # RESEARCH TRENDS
    # ============================================================

    def research_trends(self, papers):

        frequency = self.keyword_frequency(papers)

        return list(frequency.keys())[:15]

    # ============================================================
    # GAP CATEGORIES
    # ============================================================

    def gap_categories(self, papers):

        categories = {

            "datasets": [],

            "models": [],

            "retrieval": [],

            "grounding": [],

            "hallucination": [],

            "knowledge_freshness": [],

            "evaluation": [],

            "applications": [],

            "coordination": [],

            "security": [],

            "scalability": [],

            "explainability": [],

            "reasoning": [],

            "memory": [],

            "planning": [],

            "general": []
        }

        for paper in papers or []:

            texts = self._get_paper_texts(paper)

            for text in texts:

                self._categorize_text(
                    text,
                    categories
                )

        for category in categories:

            categories[category] = list(
                dict.fromkeys(
                    categories[category]
                )
            )

        return categories

    # ============================================================
    # GET ALL RELEVANT PAPER TEXT
    # ============================================================

    def _get_paper_texts(self, paper):

        texts = []

        fields = [

            "title",

            "summary",

            "abstract",

            "research_problem",

            "methodology",

            "key_contributions",

            "future_work"
        ]

        for field in fields:

            value = paper.get(field)

            if not value:
                continue

            if isinstance(value, list):

                for item in value:

                    if item:
                        texts.append(
                            str(item)
                        )

            elif isinstance(value, dict):

                for item in value.values():

                    if item:
                        texts.append(
                            str(item)
                        )

            else:

                texts.append(
                    str(value)
                )

        return texts

    # ============================================================
    # CATEGORY CLASSIFICATION
    # ============================================================

    def _categorize_text(
        self,
        text,
        categories
    ):

        if not text:
            return

        text = str(text).strip()

        if not text:
            return

        lower = text.lower()

        matched = False

        # --------------------------------------------------------
        # DATASET
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "dataset",
                "data set",
                "data scarcity",
                "limited data",
                "lack of data",
                "data availability"
            ]
        ):

            categories["datasets"].append(text)

            matched = True

        # --------------------------------------------------------
        # RETRIEVAL
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "retrieval",
                "retriever",
                "retrieved",
                "search quality",
                "retrieval quality",
                "relevant documents",
                "document retrieval"
            ]
        ):

            categories["retrieval"].append(text)

            matched = True

        # --------------------------------------------------------
        # GROUNDING
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "grounding",
                "grounded",
                "source attribution",
                "faithfulness",
                "factuality",
                "citation accuracy"
            ]
        ):

            categories["grounding"].append(text)

            matched = True

        # --------------------------------------------------------
        # HALLUCINATION
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "hallucination",
                "hallucinations",
                "fabricated",
                "incorrect generation",
                "factual error"
            ]
        ):

            categories["hallucination"].append(text)

            matched = True

        # --------------------------------------------------------
        # KNOWLEDGE FRESHNESS
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "knowledge freshness",
                "fresh knowledge",
                "stale knowledge",
                "outdated knowledge",
                "knowledge update",
                "knowledge updating",
                "continual learning",
                "continuous learning",
                "dynamic knowledge"
            ]
        ):

            categories[
                "knowledge_freshness"
            ].append(text)

            matched = True

        # --------------------------------------------------------
        # MODEL
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "model limitation",
                "model limitations",
                "model performance",
                "model architecture",
                "models",
                "model",
                "language model",
                "llm"
            ]
        ):

            categories["models"].append(text)

            matched = True

        # --------------------------------------------------------
        # EVALUATION
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "evaluation",
                "evaluate",
                "evaluated",
                "benchmark",
                "benchmarking",
                "metric",
                "metrics",
                "performance comparison",
                "standardized evaluation"
            ]
        ):

            categories["evaluation"].append(text)

            matched = True

        # --------------------------------------------------------
        # APPLICATION / DEPLOYMENT
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "application",
                "applications",
                "deployment",
                "real-world",
                "real world",
                "production",
                "practical deployment"
            ]
        ):

            categories[
                "applications"
            ].append(text)

            matched = True

        # --------------------------------------------------------
        # COORDINATION
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "coordination",
                "cooperation",
                "collaboration",
                "communication",
                "inter-agent",
                "multi-agent",
                "agent interaction",
                "misalignment"
            ]
        ):

            categories[
                "coordination"
            ].append(text)

            matched = True

        # --------------------------------------------------------
        # SECURITY
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "security",
                "privacy",
                "attack",
                "attacks",
                "vulnerability",
                "vulnerabilities",
                "adversarial",
                "trust"
            ]
        ):

            categories[
                "security"
            ].append(text)

            matched = True

        # --------------------------------------------------------
        # SCALABILITY
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "scalability",
                "scalable",
                "scale",
                "resource constraint",
                "resource constraints",
                "computational cost",
                "high cost"
            ]
        ):

            categories[
                "scalability"
            ].append(text)

            matched = True

        # --------------------------------------------------------
        # EXPLAINABILITY
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "explainability",
                "explainable",
                "interpretability",
                "interpretable",
                "transparency"
            ]
        ):

            categories[
                "explainability"
            ].append(text)

            matched = True

        # --------------------------------------------------------
        # REASONING
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "reasoning limitation",
                "reasoning challenge",
                "reasoning ability",
                "complex reasoning",
                "logical reasoning"
            ]
        ):

            categories[
                "reasoning"
            ].append(text)

            matched = True

        # --------------------------------------------------------
        # MEMORY
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "long-term memory",
                "long term memory",
                "memory limitation",
                "memory management",
                "persistent memory"
            ]
        ):

            categories[
                "memory"
            ].append(text)

            matched = True

        # --------------------------------------------------------
        # PLANNING
        # --------------------------------------------------------

        if any(
            term in lower
            for term in [
                "planning limitation",
                "planning challenge",
                "long-term planning",
                "autonomous planning",
                "planning ability"
            ]
        ):

            categories[
                "planning"
            ].append(text)

            matched = True

        # --------------------------------------------------------
        # GENERAL
        # --------------------------------------------------------

        if not matched:

            if self._is_limitation_or_gap_text(
                lower
            ):

                categories[
                    "general"
                ].append(text)

    # ============================================================
    # DETECT RESEARCH GAPS
    # ============================================================

    def detect_research_gaps(self, papers):

        papers = papers or []

        # --------------------------------------------------------
        # First collect category evidence
        # --------------------------------------------------------

        categories = self.gap_categories(
            papers
        )

        # --------------------------------------------------------
        # Generate synthesized gaps
        # --------------------------------------------------------

        synthesized = (
            self._synthesize_category_gaps(
                categories,
                papers
            )
        )

        # --------------------------------------------------------
        # Extract explicit limitation sentences
        # --------------------------------------------------------

        explicit_gaps = []

        for paper in papers:

            texts = self._get_paper_texts(
                paper
            )

            for text in texts:

                if not text:
                    continue

                sentences = re.split(
                    r"(?<=[.!?])\s+",
                    str(text)
                )

                for sentence in sentences:

                    sentence = sentence.strip()

                    if (
                        sentence
                        and self._is_limitation_or_gap_text(
                            sentence.lower()
                        )
                    ):

                        explicit_gaps.append(
                            sentence
                        )

        # --------------------------------------------------------
        # Remove duplicates
        # --------------------------------------------------------

        explicit_gaps = list(
            dict.fromkeys(
                explicit_gaps
            )
        )

        # --------------------------------------------------------
        # Combine
        # --------------------------------------------------------

        final_gaps = []

        for gap in synthesized:

            if gap not in final_gaps:

                final_gaps.append(
                    gap
                )

        for gap in explicit_gaps:

            if gap not in final_gaps:

                final_gaps.append(
                    gap
                )

        # --------------------------------------------------------
        # Always provide a useful fallback if evidence exists
        # --------------------------------------------------------

        if not final_gaps and papers:

            final_gaps.append(
                "The analyzed literature indicates "
                "that further research is required "
                "to address unresolved limitations, "
                "improve evaluation, and validate "
                "existing approaches in broader "
                "real-world settings."
            )

        return final_gaps[:10]

    # ============================================================
    # LIMITATION / GAP DETECTION
    # ============================================================

    def _is_limitation_or_gap_text(
        self,
        text
    ):

        if not text:
            return False

        lower = str(text).lower()

        gap_terms = [

            "challenge",
            "challenges",

            "limitation",
            "limitations",

            "lack of",
            "lack",

            "remain",
            "remains",

            "future work",
            "future research",

            "further research",
            "further work",

            "research gap",
            "research gaps",

            "difficult",
            "difficulty",

            "problem",
            "problems",

            "issue",
            "issues",

            "unresolved",

            "vulnerability",
            "vulnerabilities",

            "security",

            "scalability",

            "evaluation",

            "benchmark",

            "misalignment",

            "hallucination",

            "verification",

            "coordination",

            "retrieval",

            "grounding",

            "knowledge freshness",

            "continual learning",

            "interpretability",

            "explainability"
        ]

        return any(
            term in lower
            for term in gap_terms
        )

    # ============================================================
    # SYNTHESIZE CATEGORY GAPS
    # ============================================================

    def _synthesize_category_gaps(
        self,
        categories,
        papers
    ):

        gaps = []

        # --------------------------------------------------------
        # RAG: Retrieval
        # --------------------------------------------------------

        if categories["retrieval"]:

            gaps.append(
                "Retrieval quality and the ability "
                "to consistently retrieve relevant "
                "information for complex queries "
                "remain important research challenges."
            )

        # --------------------------------------------------------
        # RAG: Grounding
        # --------------------------------------------------------

        if categories["grounding"]:

            gaps.append(
                "Improved grounding, factuality, "
                "and reliable source attribution "
                "are required to reduce unsupported "
                "or incorrect generated information."
            )

        # --------------------------------------------------------
        # RAG: Hallucination
        # --------------------------------------------------------

        if categories["hallucination"]:

            gaps.append(
                "Hallucination and factual reliability "
                "remain unresolved challenges in "
                "current AI systems."
            )

        # --------------------------------------------------------
        # RAG: Knowledge freshness
        # --------------------------------------------------------

        if categories[
            "knowledge_freshness"
        ]:

            gaps.append(
                "Maintaining fresh and continuously "
                "updated knowledge remains a challenge "
                "for systems operating over changing "
                "information sources."
            )

        # --------------------------------------------------------
        # Evaluation
        # --------------------------------------------------------

        if categories["evaluation"]:

            gaps.append(
                "More robust and standardized "
                "evaluation and benchmarking "
                "methods are required."
            )

        # --------------------------------------------------------
        # Datasets
        # --------------------------------------------------------

        if categories["datasets"]:

            gaps.append(
                "Larger, more diverse, and "
                "domain-specific datasets are "
                "needed for reliable development "
                "and evaluation."
            )

        # --------------------------------------------------------
        # Models
        # --------------------------------------------------------

        if categories["models"]:

            gaps.append(
                "Current models and architectures "
                "still require improvements in "
                "reliability, adaptability, "
                "and generalization."
            )

        # --------------------------------------------------------
        # Coordination
        # --------------------------------------------------------

        if categories["coordination"]:

            gaps.append(
                "Reliable coordination and "
                "communication between multiple "
                "agents remains an open research "
                "challenge."
            )

        # --------------------------------------------------------
        # Security
        # --------------------------------------------------------

        if categories["security"]:

            gaps.append(
                "Security, privacy, trust, and "
                "robustness remain important "
                "unresolved challenges."
            )

        # --------------------------------------------------------
        # Scalability
        # --------------------------------------------------------

        if categories["scalability"]:

            gaps.append(
                "Scalability, computational cost, "
                "and efficient resource usage "
                "remain challenges for practical "
                "deployment."
            )

        # --------------------------------------------------------
        # Explainability
        # --------------------------------------------------------

        if categories["explainability"]:

            gaps.append(
                "Improved explainability and "
                "interpretability are required "
                "for reliable adoption of "
                "AI-based systems."
            )

        # --------------------------------------------------------
        # Reasoning
        # --------------------------------------------------------

        if categories["reasoning"]:

            gaps.append(
                "Current systems require stronger "
                "reasoning capabilities for complex "
                "multi-step tasks."
            )

        # --------------------------------------------------------
        # Memory
        # --------------------------------------------------------

        if categories["memory"]:

            gaps.append(
                "Reliable long-term memory and "
                "persistent context management "
                "remain open challenges."
            )

        # --------------------------------------------------------
        # Planning
        # --------------------------------------------------------

        if categories["planning"]:

            gaps.append(
                "More reliable autonomous planning "
                "and decision-making mechanisms "
                "are required."
            )

        # --------------------------------------------------------
        # Applications
        # --------------------------------------------------------

        if categories["applications"]:

            gaps.append(
                "Further validation in real-world "
                "applications and deployment "
                "environments is required."
            )

        # --------------------------------------------------------
        # General
        # --------------------------------------------------------

        if (
            categories["general"]
            and len(gaps) < 2
        ):

            gaps.append(
                "Further research is required "
                "to address unresolved limitations "
                "identified across the analyzed "
                "literature."
            )

        return gaps

    # ============================================================
    # EMERGING TOPICS
    # ============================================================

    def emerging_topics(self, papers):

        frequency = self.keyword_frequency(
            papers
        )

        return [
            keyword
            for keyword, count
            in frequency.items()
            if count >= 2
        ][:15]

    # ============================================================
    # RECOMMENDATIONS
    # ============================================================

    def recommendations(self, papers):

        recommendations = []

        trends = self.research_trends(
            papers
        )

        trends_lower = {
            trend.lower()
            for trend in trends
        }

        # Agentic AI

        if (
            "agentic" in trends_lower
            or "agent" in trends_lower
        ):

            recommendations.append(
                "Explore more reliable autonomous "
                "and multi-agent systems."
            )

        # Reasoning

        if "reasoning" in trends_lower:

            recommendations.append(
                "Improve reasoning capabilities "
                "through structured planning "
                "and verification."
            )

        # Benchmark

        if (
            "benchmark" in trends_lower
            or "benchmarks" in trends_lower
        ):

            recommendations.append(
                "Develop and evaluate systems "
                "using standardized benchmarks."
            )

        # Framework

        if (
            "framework" in trends_lower
            or "frameworks" in trends_lower
        ):

            recommendations.append(
                "Design more robust and "
                "generalizable AI frameworks."
            )

        # Memory

        if "memory" in trends_lower:

            recommendations.append(
                "Investigate reliable long-term "
                "memory mechanisms."
            )

        # Planning

        if "planning" in trends_lower:

            recommendations.append(
                "Improve autonomous planning "
                "and decision-making."
            )

        # Evaluation

        if "evaluation" in trends_lower:

            recommendations.append(
                "Improve standardized evaluation "
                "and benchmarking procedures."
            )

        # Security

        if (
            "security" in trends_lower
            or "privacy" in trends_lower
        ):

            recommendations.append(
                "Investigate stronger security, "
                "privacy, and trust mechanisms."
            )

        # RAG

        if (
            "rag" in trends_lower
            or "retrieval" in trends_lower
        ):

            recommendations.append(
                "Improve retrieval quality, "
                "grounding, hallucination "
                "mitigation, and knowledge "
                "freshness in RAG systems."
            )

        # Fallback

        if not recommendations:

            recommendations.append(
                "Investigate unexplored research "
                "directions identified across "
                "the analyzed papers."
            )

        return list(
            dict.fromkeys(
                recommendations
            )
        )