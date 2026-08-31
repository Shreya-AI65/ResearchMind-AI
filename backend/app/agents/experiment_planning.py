"""
Experiment Planning Agent

Purpose:
Generates research experiment plans based on detected
research areas, research gaps, trends, and recommendations.

The agent provides:
- Dataset recommendations
- Baseline model recommendations
- Evaluation metrics
- Hardware requirements
- Validation strategies
- Experimental workflow
- Gap-specific recommendations
"""

from collections import OrderedDict


class ExperimentPlanningAgent:

    def __init__(self):

        self.agent_name = "Experiment Planning Agent"
        self.status = "Initialized"

    # ============================================================
    # DATASET RECOMMENDATIONS
    # ============================================================

    def suggest_datasets(self, research_areas):

        datasets = {

            "Artificial Intelligence": [
                "OpenML",
                "Kaggle Datasets",
                "UCI Machine Learning Repository"
            ],

            "Machine Learning": [
                "UCI Machine Learning Repository",
                "OpenML",
                "Kaggle Datasets"
            ],

            "Deep Learning": [
                "ImageNet",
                "CIFAR-10",
                "CIFAR-100"
            ],

            "Natural Language Processing": [
                "GLUE",
                "SQuAD",
                "WikiText"
            ],

            "Computer Vision": [
                "ImageNet",
                "COCO",
                "Pascal VOC"
            ],

            "Healthcare AI": [
                "MIMIC-III",
                "CheXpert",
                "NIH Chest X-ray"
            ],

            "Agentic AI": [
                "AgentBench",
                "GAIA Benchmark",
                "OpenAI Evals",
                "HotpotQA",
                "Hugging Face Datasets"
            ],

            "Multi-Agent Systems": [
                "AgentBench",
                "Multi-Agent Benchmark",
                "GAIA Benchmark",
                "OpenAI Evals"
            ],

            "Retrieval-Augmented Generation": [
                "BEIR",
                "MS MARCO",
                "Natural Questions",
                "TriviaQA",
                "HotpotQA"
            ],

            "Scientific Document Intelligence": [
                "PubMed Central",
                "arXiv Dataset",
                "S2ORC",
                "CORD-19"
            ],

            "General Artificial Intelligence": [
                "OpenML",
                "Hugging Face Datasets",
                "Kaggle Datasets"
            ]
        }

        suggested = []

        for area in research_areas or []:

            if not area:
                continue

            area = str(area).strip()

            suggested.extend(
                datasets.get(area, [])
            )

        return sorted(set(suggested))

    # ============================================================
    # BASELINE MODEL RECOMMENDATIONS
    # ============================================================

    def suggest_baseline_models(self, research_areas):

        models = {

            "Artificial Intelligence": [
                "Random Forest",
                "Support Vector Machine",
                "XGBoost"
            ],

            "Machine Learning": [
                "Decision Tree",
                "Random Forest",
                "Logistic Regression"
            ],

            "Deep Learning": [
                "CNN",
                "ResNet",
                "Transformer"
            ],

            "Natural Language Processing": [
                "BERT",
                "RoBERTa",
                "GPT"
            ],

            "Computer Vision": [
                "YOLO",
                "ResNet",
                "Vision Transformer"
            ],

            "Healthcare AI": [
                "CNN",
                "DenseNet",
                "U-Net"
            ],

            "Agentic AI": [
                "Single-Agent LLM",
                "ReAct",
                "LangGraph",
                "CrewAI",
                "AutoGen"
            ],

            "Multi-Agent Systems": [
                "Single-Agent LLM",
                "ReAct",
                "AutoGen",
                "CrewAI",
                "LangGraph"
            ],

            "Retrieval-Augmented Generation": [
                "Vanilla RAG",
                "Naive RAG",
                "BM25 Retrieval",
                "Dense Retrieval RAG",
                "Hybrid Search RAG"
            ],

            "Scientific Document Intelligence": [
                "BM25",
                "Dense Retrieval",
                "BERT",
                "RoBERTa",
                "Transformer"
            ],

            "General Artificial Intelligence": [
                "Random Forest",
                "XGBoost",
                "Transformer"
            ]
        }

        suggested = []

        for area in research_areas or []:

            if not area:
                continue

            area = str(area).strip()

            suggested.extend(
                models.get(area, [])
            )

        return sorted(set(suggested))

    # ============================================================
    # EVALUATION METRICS
    # ============================================================

    def suggest_evaluation_metrics(
        self,
        research_areas=None,
        research_gap_report=None
    ):

        metrics = OrderedDict()

        # General metrics

        metrics["general"] = [
            "Accuracy",
            "Precision",
            "Recall",
            "F1-Score"
        ]

        # RAG-specific

        if self._contains_area(
            research_areas,
            "Retrieval-Augmented Generation"
        ):

            metrics["rag"] = [
                "Retrieval Precision",
                "Retrieval Recall",
                "Context Relevance",
                "Answer Relevance",
                "Faithfulness",
                "Groundedness"
            ]

        # Multi-agent / Agentic AI

        if (
            self._contains_area(
                research_areas,
                "Multi-Agent Systems"
            )
            or
            self._contains_area(
                research_areas,
                "Agentic AI"
            )
        ):

            metrics["agent"] = [
                "Task Success Rate",
                "Planning Accuracy",
                "Tool-Use Accuracy",
                "Agent Coordination Score"
            ]

        # Scientific document intelligence

        if self._contains_area(
            research_areas,
            "Scientific Document Intelligence"
        ):

            metrics["document"] = [
                "ROUGE",
                "BLEU",
                "BERTScore",
                "Retrieval Accuracy"
            ]

        # ROC-AUC is useful for classification

        metrics["classification"] = [
            "ROC-AUC"
        ]

        return list(
            dict.fromkeys(
                metric
                for group in metrics.values()
                for metric in group
            )
        )

    # ============================================================
    # HARDWARE REQUIREMENTS
    # ============================================================

    def suggest_hardware(self, research_areas=None):

        areas = {
            str(area).lower()
            for area in research_areas or []
            if area
        }

        # Default hardware

        hardware = {
            "cpu": "Intel Core i7 / AMD Ryzen 7",
            "ram": "16 GB",
            "gpu": "NVIDIA RTX 3060 or better",
            "storage": "100 GB SSD"
        }

        # RAG / document workloads

        if (
            "retrieval-augmented generation"
            in areas
            or
            "scientific document intelligence"
            in areas
        ):

            hardware["ram"] = "32 GB"
            hardware["storage"] = "200 GB SSD"

        # Multi-agent / Agentic workloads

        if (
            "agentic ai"
            in areas
            or
            "multi-agent systems"
            in areas
        ):

            hardware["ram"] = "32 GB"
            hardware["gpu"] = "NVIDIA RTX 3060 / RTX 4060 or better"

        return hardware

    # ============================================================
    # VALIDATION STRATEGY
    # ============================================================

    def validation_strategy(
        self,
        research_areas=None
    ):

        strategy = [
            "Train-Test Split",
            "K-Fold Cross Validation",
            "Hyperparameter Tuning",
            "Statistical Significance Testing"
        ]

        if (
            self._contains_area(
                research_areas,
                "Retrieval-Augmented Generation"
            )
            or
            self._contains_area(
                research_areas,
                "Scientific Document Intelligence"
            )
        ):

            strategy.extend([
                "Retrieval Evaluation",
                "Answer Quality Evaluation"
            ])

        if (
            self._contains_area(
                research_areas,
                "Agentic AI"
            )
            or
            self._contains_area(
                research_areas,
                "Multi-Agent Systems"
            )
        ):

            strategy.extend([
                "Task Success Evaluation",
                "Agent Coordination Evaluation",
                "Tool-Use Evaluation"
            ])

        return list(
            dict.fromkeys(strategy)
        )

    # ============================================================
    # EXPERIMENTAL WORKFLOW
    # ============================================================

    def experimental_workflow(
        self,
        research_areas=None
    ):

        if (
            self._contains_area(
                research_areas,
                "Retrieval-Augmented Generation"
            )
        ):

            return [
                "Collect Knowledge Documents",
                "Preprocess and Chunk Documents",
                "Build Document Index",
                "Configure Retrieval System",
                "Retrieve Relevant Context",
                "Generate Grounded Response",
                "Evaluate Retrieval Quality",
                "Evaluate Answer Quality",
                "Compare Baseline and Proposed RAG",
                "Analyze Errors",
                "Draw Conclusions"
            ]

        if (
            self._contains_area(
                research_areas,
                "Multi-Agent Systems"
            )
            or
            self._contains_area(
                research_areas,
                "Agentic AI"
            )
        ):

            return [
                "Define Research Task",
                "Select Agent Architecture",
                "Configure Individual Agents",
                "Configure Agent Communication",
                "Execute Multi-Agent Workflow",
                "Evaluate Task Success",
                "Evaluate Planning",
                "Evaluate Tool Usage",
                "Evaluate Agent Coordination",
                "Compare Baseline and Proposed System",
                "Analyze Errors",
                "Draw Conclusions"
            ]

        return [
            "Collect Dataset",
            "Preprocess Data",
            "Split Dataset",
            "Train Baseline Models",
            "Train Proposed Model",
            "Evaluate Performance",
            "Compare Results",
            "Analyze Errors",
            "Perform Statistical Validation",
            "Draw Conclusions"
        ]

    # ============================================================
    # GAP-SPECIFIC EXPERIMENT RECOMMENDATIONS
    # ============================================================

    def gap_based_recommendations(
        self,
        research_gap_report
    ):

        recommendations = []

        gap_categories = (
            research_gap_report.get(
                "gap_categories",
                {}
            )
            or {}
        )

        # Dataset gap

        if gap_categories.get("datasets"):

            recommendations.append(
                "Evaluate the proposed approach "
                "on larger and more diverse datasets."
            )

        # Retrieval gap

        if gap_categories.get("retrieval"):

            recommendations.append(
                "Compare BM25, dense retrieval, "
                "and hybrid retrieval methods."
            )

        # Grounding gap

        if gap_categories.get("grounding"):

            recommendations.append(
                "Evaluate source attribution, "
                "faithfulness, and groundedness."
            )

        # Hallucination gap

        if gap_categories.get("hallucination"):

            recommendations.append(
                "Measure hallucination frequency "
                "and introduce factuality verification."
            )

        # Knowledge freshness

        if gap_categories.get(
            "knowledge_freshness"
        ):

            recommendations.append(
                "Evaluate system performance using "
                "recently updated knowledge sources."
            )

        # Evaluation gap

        if gap_categories.get("evaluation"):

            recommendations.append(
                "Use standardized benchmarks and "
                "multiple evaluation metrics."
            )

        # Coordination gap

        if gap_categories.get("coordination"):

            recommendations.append(
                "Compare centralized and decentralized "
                "multi-agent coordination strategies."
            )

        # Security gap

        if gap_categories.get("security"):

            recommendations.append(
                "Evaluate robustness against prompt "
                "injection, adversarial inputs, "
                "and unauthorized tool usage."
            )

        # Scalability gap

        if gap_categories.get("scalability"):

            recommendations.append(
                "Measure computational cost, latency, "
                "resource consumption, and scalability."
            )

        # Explainability

        if gap_categories.get("explainability"):

            recommendations.append(
                "Evaluate explanation quality, "
                "transparency, and interpretability."
            )

        # Reasoning

        if gap_categories.get("reasoning"):

            recommendations.append(
                "Evaluate multi-step reasoning using "
                "complex benchmark tasks."
            )

        # Memory

        if gap_categories.get("memory"):

            recommendations.append(
                "Evaluate long-term memory and "
                "persistent context management."
            )

        # Planning

        if gap_categories.get("planning"):

            recommendations.append(
                "Evaluate long-horizon planning and "
                "decision-making performance."
            )

        # Applications

        if gap_categories.get("applications"):

            recommendations.append(
                "Validate the system in realistic "
                "real-world deployment scenarios."
            )

        if not recommendations:

            recommendations.append(
                "Conduct experiments covering "
                "performance, reliability, scalability, "
                "and real-world applicability."
            )

        return list(
            dict.fromkeys(
                recommendations
            )
        )

    # ============================================================
    # MAIN PLAN GENERATION
    # ============================================================

    def generate_plan(
        self,
        research_gap_report
    ):

        research_gap_report = (
            research_gap_report or {}
        )

        research_areas = (
            research_gap_report.get(
                "research_areas",
                []
            )
            or []
        )

        return {

            "research_areas":
                research_areas,

            "recommended_datasets":
                self.suggest_datasets(
                    research_areas
                ),

            "baseline_models":
                self.suggest_baseline_models(
                    research_areas
                ),

            "evaluation_metrics":
                self.suggest_evaluation_metrics(
                    research_areas,
                    research_gap_report
                ),

            "hardware_requirements":
                self.suggest_hardware(
                    research_areas
                ),

            "validation_strategy":
                self.validation_strategy(
                    research_areas
                ),

            "experimental_workflow":
                self.experimental_workflow(
                    research_areas
                ),

            "gap_based_recommendations":
                self.gap_based_recommendations(
                    research_gap_report
                )
        }

    # ============================================================
    # HELPER
    # ============================================================

    def _contains_area(
        self,
        research_areas,
        target
    ):

        if not research_areas:
            return False

        target = target.lower()

        return any(
            str(area).strip().lower() == target
            for area in research_areas
            if area
        )