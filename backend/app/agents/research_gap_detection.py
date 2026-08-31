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
- Research recommendations
- Research direction validation
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
                "recommendation_validation": [],
                "summary": {
                    "dominant_area": None,
                    "top_trend": None,
                    "future_work_items": 0,
                    "research_gap_count": 0,
                    "validated_recommendation_count": 0
                }
            }

        distribution = self.research_area_distribution(papers)

        trends = self.research_trends(papers)

        future_work = self.detect_future_work(papers)

        gap_categories = self.gap_categories(papers)

        research_gaps = self.detect_research_gaps(papers)

        emerging_topics = self.emerging_topics(papers)

        recommendations = self.recommendations(papers)

        recommendation_validation = (
            self.validate_research_directions(
                papers,
                recommendations,
                research_gaps,
                future_work,
                emerging_topics
            )
        )

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

            "recommendation_validation":
                recommendation_validation,

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
                    len(research_gaps),

                "validated_recommendation_count":
                    len(
                        recommendation_validation
                    )
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
                "logical reasoning",
                "reasoning"
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
                "planning ability",
                "planning"
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

        categories = self.gap_categories(
            papers
        )

        synthesized = (
            self._synthesize_category_gaps(
                categories,
                papers
            )
        )

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

        explicit_gaps = list(
            dict.fromkeys(
                explicit_gaps
            )
        )

        final_gaps = []

        for gap in synthesized:

            if gap not in final_gaps:
                final_gaps.append(gap)

        for gap in explicit_gaps:

            if gap not in final_gaps:
                final_gaps.append(gap)

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

        if categories["retrieval"]:

            gaps.append(
                "Retrieval quality and the ability "
                "to consistently retrieve relevant "
                "information for complex queries "
                "remain important research challenges."
            )

        if categories["grounding"]:

            gaps.append(
                "Improved grounding, factuality, "
                "and reliable source attribution "
                "are required to reduce unsupported "
                "or incorrect generated information."
            )

        if categories["hallucination"]:

            gaps.append(
                "Hallucination and factual reliability "
                "remain unresolved challenges in "
                "current AI systems."
            )

        if categories["knowledge_freshness"]:

            gaps.append(
                "Maintaining fresh and continuously "
                "updated knowledge remains a challenge "
                "for systems operating over changing "
                "information sources."
            )

        if categories["evaluation"]:

            gaps.append(
                "More robust and standardized "
                "evaluation and benchmarking "
                "methods are required."
            )

        if categories["datasets"]:

            gaps.append(
                "Larger, more diverse, and "
                "domain-specific datasets are "
                "needed for reliable development "
                "and evaluation."
            )

        if categories["models"]:

            gaps.append(
                "Current models and architectures "
                "still require improvements in "
                "reliability, adaptability, "
                "and generalization."
            )

        if categories["coordination"]:

            gaps.append(
                "Reliable coordination and "
                "communication between multiple "
                "agents remains an open research "
                "challenge."
            )

        if categories["security"]:

            gaps.append(
                "Security, privacy, trust, and "
                "robustness remain important "
                "unresolved challenges."
            )

        if categories["scalability"]:

            gaps.append(
                "Scalability, computational cost, "
                "and efficient resource usage "
                "remain challenges for practical "
                "deployment."
            )

        if categories["explainability"]:

            gaps.append(
                "Improved explainability and "
                "interpretability are required "
                "for reliable adoption of "
                "AI-based systems."
            )

        if categories["reasoning"]:

            gaps.append(
                "Current systems require stronger "
                "reasoning capabilities for complex "
                "multi-step tasks."
            )

        if categories["memory"]:

            gaps.append(
                "Reliable long-term memory and "
                "persistent context management "
                "remain open challenges."
            )

        if categories["planning"]:

            gaps.append(
                "More reliable autonomous planning "
                "and decision-making mechanisms "
                "are required."
            )

        if categories["applications"]:

            gaps.append(
                "Further validation in real-world "
                "applications and deployment "
                "environments is required."
            )

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

        papers = papers or []

        if not papers:

            return [
                "Analyze research papers first to generate "
                "evidence-based research recommendations."
            ]

        # --------------------------------------------------------
        # Collect evidence
        # --------------------------------------------------------

        trends = self.research_trends(papers)

        trends_lower = {
            trend.lower()
            for trend in trends
        }

        emerging_topics = self.emerging_topics(
            papers
        )

        emerging_lower = {
            topic.lower()
            for topic in emerging_topics
        }

        future_work = self.detect_future_work(
            papers
        )

        future_text = " ".join(
            future_work
        ).lower()

        gap_categories = self.gap_categories(
            papers
        )

        research_areas = self.detect_research_areas(
            papers
        )

        research_areas_lower = {
            area.lower()
            for area in research_areas
        }

        # --------------------------------------------------------
        # Agentic AI / Multi-Agent Systems
        # --------------------------------------------------------

        if any(
            term in trends_lower
            for term in [
                "agentic",
                "agent",
                "multi-agent",
                "multi-agent systems"
            ]
        ) or any(
            "agentic ai" in area
            or "multi-agent" in area
            or "multi agent" in area
            for area in research_areas_lower
        ):

            recommendations.append(
                "Explore more reliable autonomous "
                "and multi-agent systems with improved "
                "coordination and task execution."
            )

        # --------------------------------------------------------
        # Coordination
        # --------------------------------------------------------

        if gap_categories.get("coordination"):

            recommendations.append(
                "Investigate improved inter-agent "
                "communication and coordination mechanisms "
                "for reliable multi-agent task execution."
            )

        # --------------------------------------------------------
        # Reasoning
        # --------------------------------------------------------

        if (
            "reasoning" in trends_lower
            or "reasoning" in emerging_lower
            or "reasoning" in future_text
            or gap_categories.get("reasoning")
        ):

            recommendations.append(
                "Improve reasoning capabilities through "
                "structured planning, multi-step inference, "
                "and verification mechanisms."
            )

        # --------------------------------------------------------
        # Planning
        # --------------------------------------------------------

        if (
            "planning" in trends_lower
            or "planning" in emerging_lower
            or "planning" in future_text
            or gap_categories.get("planning")
        ):

            recommendations.append(
                "Investigate more reliable autonomous "
                "planning and task decomposition techniques."
            )

        # --------------------------------------------------------
        # Memory
        # --------------------------------------------------------

        if (
            "memory" in trends_lower
            or "memory" in emerging_lower
            or "memory" in future_text
            or gap_categories.get("memory")
        ):

            recommendations.append(
                "Investigate long-term memory mechanisms "
                "for maintaining context across complex "
                "research and reasoning tasks."
            )

        # --------------------------------------------------------
        # RAG / Retrieval
        # --------------------------------------------------------

        if (
            "rag" in trends_lower
            or "retrieval" in trends_lower
            or "retrieval-augmented generation"
            in trends_lower
            or gap_categories.get("retrieval")
        ):

            recommendations.append(
                "Improve retrieval quality and document "
                "selection for complex research queries."
            )

        # --------------------------------------------------------
        # Grounding
        # --------------------------------------------------------

        if gap_categories.get("grounding"):

            recommendations.append(
                "Strengthen source grounding and citation "
                "verification to improve factual reliability."
            )

        # --------------------------------------------------------
        # Hallucination
        # --------------------------------------------------------

        if gap_categories.get("hallucination"):

            recommendations.append(
                "Develop stronger hallucination detection "
                "and factual verification mechanisms."
            )

        # --------------------------------------------------------
        # Knowledge Freshness
        # --------------------------------------------------------

        if gap_categories.get(
            "knowledge_freshness"
        ):

            recommendations.append(
                "Investigate mechanisms for continuously "
                "updating knowledge from recent information sources."
            )

        # --------------------------------------------------------
        # Evaluation / Benchmarking
        # --------------------------------------------------------

        if (
            "benchmark" in trends_lower
            or "benchmarks" in trends_lower
            or "evaluation" in trends_lower
            or gap_categories.get("evaluation")
        ):

            recommendations.append(
                "Evaluate proposed approaches using "
                "standardized benchmarks and reproducible "
                "evaluation protocols."
            )

        # --------------------------------------------------------
        # Dataset gaps
        # --------------------------------------------------------

        if gap_categories.get("datasets"):

            recommendations.append(
                "Use larger, more diverse, and domain-specific "
                "datasets to improve model generalization "
                "and reliability."
            )

        # --------------------------------------------------------
        # Model limitations
        # --------------------------------------------------------

        if gap_categories.get("models"):

            recommendations.append(
                "Compare stronger model architectures and "
                "established baselines to identify improvements "
                "in reliability and generalization."
            )

        # --------------------------------------------------------
        # Security
        # --------------------------------------------------------

        if (
            "security" in trends_lower
            or "privacy" in trends_lower
            or gap_categories.get("security")
        ):

            recommendations.append(
                "Investigate stronger security, privacy, "
                "trust, and adversarial robustness mechanisms."
            )

        # --------------------------------------------------------
        # Scalability
        # --------------------------------------------------------

        if gap_categories.get("scalability"):

            recommendations.append(
                "Optimize computational cost and resource "
                "usage to improve scalability for practical deployment."
            )

        # --------------------------------------------------------
        # Explainability
        # --------------------------------------------------------

        if gap_categories.get("explainability"):

            recommendations.append(
                "Improve explainability and interpretability "
                "to support transparent and trustworthy AI systems."
            )

        # --------------------------------------------------------
        # Applications / Deployment
        # --------------------------------------------------------

        if gap_categories.get("applications"):

            recommendations.append(
                "Validate the proposed approaches in realistic "
                "real-world environments to assess scalability "
                "and practical usability."
            )

        # --------------------------------------------------------
        # Framework
        # --------------------------------------------------------

        if (
            "framework" in trends_lower
            or "frameworks" in trends_lower
            or "framework" in emerging_lower
            or "framework" in future_text
        ):

            recommendations.append(
                "Design more robust, modular, and scalable "
                "AI frameworks for practical research applications."
            )

        # --------------------------------------------------------
        # Knowledge Graph
        # --------------------------------------------------------

        if (
            "knowledge" in trends_lower
            or "graph" in trends_lower
            or "knowledge graph" in emerging_lower
        ):

            recommendations.append(
                "Investigate knowledge-enhanced approaches "
                "for improved information representation "
                "and reasoning."
            )

        # --------------------------------------------------------
        # Scientific Document Intelligence
        # --------------------------------------------------------

        if any(
            "scientific document intelligence"
            in area
            or "document intelligence"
            in area
            for area in research_areas_lower
        ):

            recommendations.append(
                "Improve scientific document understanding "
                "using structure-aware extraction, "
                "citation analysis, and domain-specific models."
            )

        # --------------------------------------------------------
        # Machine Learning
        # --------------------------------------------------------

        if (
            "machine learning"
            in research_areas_lower
        ):

            recommendations.append(
                "Compare proposed approaches with strong "
                "machine learning baselines using consistent "
                "evaluation metrics."
            )

        # --------------------------------------------------------
        # Computer Vision
        # --------------------------------------------------------

        if (
            "computer vision"
            in research_areas_lower
        ):

            recommendations.append(
                "Evaluate computer vision approaches across "
                "diverse datasets and challenging real-world "
                "conditions to improve generalization."
            )

        # --------------------------------------------------------
        # Future Work Based Recommendation
        # --------------------------------------------------------

        if future_work:

            recommendations.append(
                "Prioritize future research directions identified "
                "across the analyzed papers and validate them "
                "through controlled experiments."
            )

        # --------------------------------------------------------
        # Remove duplicates
        # --------------------------------------------------------

        recommendations = list(
            dict.fromkeys(
                recommendations
            )
        )

        # --------------------------------------------------------
        # Limit output
        # --------------------------------------------------------

        recommendations = recommendations[:10]

        # --------------------------------------------------------
        # Final fallback
        # --------------------------------------------------------

        if not recommendations:

            dominant_area = (
                research_areas[0]
                if research_areas
                else "the identified research area"
            )

            recommendations.append(
                f"Investigate unexplored research directions "
                f"in {dominant_area} based on the limitations, "
                f"future work, and trends identified across "
                f"the analyzed literature."
            )

        return recommendations

    # ============================================================
    # RESEARCH DIRECTION VALIDATION
    # ============================================================

    def validate_research_directions(
        self,
        papers,
        recommendations,
        research_gaps=None,
        future_work=None,
        emerging_topics=None
    ):
        """
        Validate whether recommendations are supported by:

        1. Research gaps
        2. Future work
        3. Emerging topics
        4. Research methodology

        Returns a structured validation report for each
        recommendation.
        """

        papers = papers or []

        recommendations = recommendations or []

        research_gaps = (
            research_gaps
            if research_gaps is not None
            else self.detect_research_gaps(papers)
        )

        future_work = (
            future_work
            if future_work is not None
            else self.detect_future_work(papers)
        )

        emerging_topics = (
            emerging_topics
            if emerging_topics is not None
            else self.emerging_topics(papers)
        )

        results = []

        for recommendation in recommendations:

            if not recommendation:
                continue

            evidence = (
                self._recommendation_evidence(
                    recommendation,
                    papers,
                    research_gaps,
                    future_work,
                    emerging_topics
                )
            )

            score = sum(
                1
                for value in evidence.values()
                if value
            )

            if score >= 3:
                validation_status = "Strongly Supported"

            elif score == 2:
                validation_status = "Supported"

            elif score == 1:
                validation_status = "Partially Supported"

            else:
                validation_status = "Weakly Supported"

            results.append({

                "recommendation":
                    recommendation,

                "validation_status":
                    validation_status,

                "evidence_score":
                    score,

                "evidence": evidence
            })

        return results

    # ============================================================
    # RECOMMENDATION EVIDENCE
    # ============================================================

    def _recommendation_evidence(
        self,
        recommendation,
        papers,
        research_gaps,
        future_work,
        emerging_topics
    ):
        """
        Determine whether a recommendation is connected
        to the major evidence sources.
        """

        recommendation_text = (
            str(recommendation)
            .lower()
        )

        gap_text = " ".join(
            str(item)
            for item in research_gaps or []
        ).lower()

        future_text = " ".join(
            str(item)
            for item in future_work or []
        ).lower()

        emerging_text = " ".join(
            str(item)
            for item in emerging_topics or []
        ).lower()

        methodology_text = self._get_methodology_text(
            papers
        ).lower()

        evidence = {

            "research_gaps":
                self._has_keyword_overlap(
                    recommendation_text,
                    gap_text
                ),

            "future_work":
                self._has_keyword_overlap(
                    recommendation_text,
                    future_text
                ),

            "emerging_topics":
                self._has_keyword_overlap(
                    recommendation_text,
                    emerging_text
                ),

            "methodology":
                self._methodology_supports_recommendation(
                    recommendation_text,
                    methodology_text
                )
        }

        return evidence

    # ============================================================
    # METHODOLOGY TEXT
    # ============================================================

    def _get_methodology_text(self, papers):

        methodology = []

        for paper in papers or []:

            value = paper.get("methodology")

            if not value:
                continue

            if isinstance(value, list):

                methodology.extend(
                    str(item)
                    for item in value
                    if item
                )

            elif isinstance(value, dict):

                methodology.extend(
                    str(item)
                    for item in value.values()
                    if item
                )

            else:

                methodology.append(
                    str(value)
                )

        return " ".join(methodology)

    # ============================================================
    # KEYWORD OVERLAP
    # ============================================================

    def _has_keyword_overlap(
        self,
        recommendation_text,
        evidence_text
    ):
        """
        Checks whether meaningful research concepts from
        a recommendation appear in the supporting evidence.
        """

        if not recommendation_text:
            return False

        if not evidence_text:
            return False

        keywords = [

            "retrieval",
            "grounding",
            "hallucination",
            "factual",
            "citation",
            "knowledge",
            "freshness",
            "evaluation",
            "benchmark",
            "dataset",
            "model",
            "architecture",
            "coordination",
            "multi-agent",
            "agent",
            "reasoning",
            "planning",
            "memory",
            "security",
            "privacy",
            "trust",
            "scalability",
            "computational",
            "explainability",
            "interpretability",
            "deployment",
            "application",
            "framework",
            "knowledge graph",
            "document",
            "machine learning",
            "computer vision"
        ]

        for keyword in keywords:

            if (
                keyword in recommendation_text
                and keyword in evidence_text
            ):

                return True

        return False

    # ============================================================
    # METHODOLOGY VALIDATION
    # ============================================================

    def _methodology_supports_recommendation(
        self,
        recommendation_text,
        methodology_text
    ):
        """
        Determines whether the methodology of the analyzed
        papers is related to the proposed research direction.

        This does not claim that the methodology proves a gap.
        It only checks whether the recommendation is relevant
        to the methods used in the literature.
        """

        if not recommendation_text:
            return False

        if not methodology_text:
            return False

        methodology_keywords = {

            "retrieval": [
                "retrieval",
                "retriever",
                "search",
                "document"
            ],

            "grounding": [
                "grounding",
                "source",
                "citation",
                "retrieval augmented",
                "rag"
            ],

            "hallucination": [
                "hallucination",
                "generation",
                "language model",
                "llm"
            ],

            "evaluation": [
                "evaluation",
                "benchmark",
                "metric",
                "experiment",
                "test"
            ],

            "dataset": [
                "dataset",
                "training data",
                "data"
            ],

            "model": [
                "model",
                "architecture",
                "transformer",
                "llm"
            ],

            "coordination": [
                "multi-agent",
                "multi agent",
                "agent communication",
                "coordination",
                "collaboration"
            ],

            "agent": [
                "agent",
                "autonomous",
                "multi-agent"
            ],

            "reasoning": [
                "reasoning",
                "inference",
                "logical"
            ],

            "planning": [
                "planning",
                "task decomposition",
                "decision"
            ],

            "memory": [
                "memory",
                "context",
                "long-term"
            ],

            "security": [
                "security",
                "privacy",
                "adversarial",
                "attack"
            ],

            "scalability": [
                "scalability",
                "computational",
                "resource",
                "efficiency"
            ],

            "explainability": [
                "explainability",
                "interpretability",
                "transparency"
            ],

            "deployment": [
                "deployment",
                "production",
                "real-world",
                "application"
            ],

            "framework": [
                "framework",
                "pipeline",
                "architecture"
            ],

            "document": [
                "document",
                "pdf",
                "scientific paper",
                "text extraction"
            ],

            "computer vision": [
                "image",
                "vision",
                "object detection",
                "cnn",
                "visual"
            ],

            "machine learning": [
                "machine learning",
                "classification",
                "regression",
                "training",
                "prediction"
            ]
        }

        for concept, terms in methodology_keywords.items():

            recommendation_mentions_concept = (
                concept in recommendation_text
            )

            if not recommendation_mentions_concept:

                recommendation_mentions_concept = any(
                    term in recommendation_text
                    for term in terms
                )

            if not recommendation_mentions_concept:
                continue

            if any(
                term in methodology_text
                for term in terms
            ):

                return True

        return False