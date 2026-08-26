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
                "ImageNet",
                "COCO",
                "OpenML"
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
                "COCO",
                "Pascal VOC",
                "ImageNet"
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
                "Hugging Face Datasets",
                "HotpotQA"
            ],

            "Multi-Agent Systems": [
                "Multi-Agent Benchmark",
                "AgentBench",
                "GAIA Benchmark",
                "OpenAI Evals"
            ],

            "RAG": [
                "HotpotQA",
                "Natural Questions",
                "TriviaQA",
                "BEIR",
                "MS MARCO"
            ],

            "Retrieval-Augmented Generation": [
                "HotpotQA",
                "Natural Questions",
                "TriviaQA",
                "BEIR",
                "MS MARCO"
            ],

            "Scientific Document Intelligence": [
                "arXiv Dataset",
                "S2ORC",
                "PubMed",
                "CORD-19"
            ]
        }

        suggested = []

        for area in research_areas:

            suggested.extend(
                datasets.get(area, [])
            )

        return sorted(
            list(set(suggested))
        )

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

            # ----------------------------------------------------
            # Agentic AI
            # ----------------------------------------------------

            "Agentic AI": [
                "Single-Agent LLM",
                "ReAct",
                "AutoGen",
                "LangGraph",
                "CrewAI"
            ],

            # ----------------------------------------------------
            # Multi-Agent Systems
            # ----------------------------------------------------

            "Multi-Agent Systems": [
                "Single-Agent LLM",
                "ReAct",
                "AutoGen",
                "CrewAI",
                "LangGraph"
            ],

            # ----------------------------------------------------
            # RAG
            # ----------------------------------------------------

            "RAG": [
                "Vanilla RAG",
                "BM25 Retrieval",
                "Dense Retrieval RAG",
                "Hybrid Search RAG",
                "Naive RAG"
            ],

            # ----------------------------------------------------
            # Alternative name
            # ----------------------------------------------------

            "Retrieval-Augmented Generation": [
                "Vanilla RAG",
                "BM25 Retrieval",
                "Dense Retrieval RAG",
                "Hybrid Search RAG",
                "Naive RAG"
            ],

            # ----------------------------------------------------
            # Scientific Document Intelligence
            # ----------------------------------------------------

            "Scientific Document Intelligence": [
                "TF-IDF",
                "BERT",
                "SciBERT",
                "Longformer",
                "LayoutLM"
            ]
        }

        suggested = []

        for area in research_areas:

            suggested.extend(
                models.get(area, [])
            )

        return sorted(
            list(set(suggested))
        )

    # ============================================================
    # EVALUATION METRICS
    # ============================================================

    def suggest_evaluation_metrics(
        self,
        research_areas=None
    ):

        research_areas = research_areas or []

        metrics = [
            "Accuracy",
            "Precision",
            "Recall",
            "F1-Score",
            "ROC-AUC"
        ]

        areas_lower = {
            area.lower()
            for area in research_areas
        }

        # RAG-specific metrics

        if (
            "rag" in areas_lower
            or
            "retrieval-augmented generation"
            in areas_lower
        ):

            metrics.extend([
                "Retrieval Precision",
                "Retrieval Recall",
                "Context Relevance",
                "Answer Relevance",
                "Faithfulness",
                "Groundedness"
            ])

        # Agent-specific metrics

        if (
            "agentic ai" in areas_lower
            or
            "multi-agent systems"
            in areas_lower
        ):

            metrics.extend([
                "Task Success Rate",
                "Planning Accuracy",
                "Tool-Use Accuracy",
                "Agent Coordination Score"
            ])

        # Scientific document intelligence

        if (
            "scientific document intelligence"
            in areas_lower
        ):

            metrics.extend([
                "Extraction Accuracy",
                "Document Classification F1",
                "Entity Recognition F1"
            ])

        return sorted(
            list(set(metrics))
        )

    # ============================================================
    # HARDWARE
    # ============================================================

    def suggest_hardware(self):

        return {

            "cpu":
                "Intel Core i7 / AMD Ryzen 7",

            "ram":
                "16 GB",

            "gpu":
                "NVIDIA RTX 3060 or better",

            "storage":
                "100 GB SSD"
        }

    # ============================================================
    # VALIDATION STRATEGY
    # ============================================================

    def validation_strategy(self):

        return [

            "Train-Test Split",

            "K-Fold Cross Validation",

            "Hyperparameter Tuning",

            "Statistical Significance Testing"
        ]

    # ============================================================
    # EXPERIMENTAL WORKFLOW
    # ============================================================

    def experimental_workflow(
        self,
        research_areas=None
    ):

        workflow = [

            "Define Research Problem",

            "Collect Dataset",

            "Preprocess Data",

            "Configure Baseline Models",

            "Train / Execute Baseline Models",

            "Train / Execute Proposed Approach",

            "Evaluate Performance",

            "Compare Results",

            "Analyze Errors",

            "Perform Ablation Analysis",

            "Draw Conclusions"
        ]

        areas_lower = {
            area.lower()
            for area in (
                research_areas or []
            )
        }

        # RAG-specific workflow

        if (
            "rag" in areas_lower
            or
            "retrieval-augmented generation"
            in areas_lower
        ):

            workflow = [

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

        # Agent-specific workflow

        elif (
            "agentic ai" in areas_lower
            or
            "multi-agent systems"
            in areas_lower
        ):

            workflow = [

                "Define Research Task",

                "Configure Baseline Agent",

                "Configure Proposed Agent System",

                "Define Agent Roles",

                "Execute Tasks",

                "Evaluate Task Success",

                "Evaluate Agent Coordination",

                "Measure Tool-Use Performance",

                "Compare Baseline and Proposed System",

                "Analyze Errors",

                "Draw Conclusions"
            ]

        return workflow

    # ============================================================
    # GENERATE EXPERIMENT PLAN
    # ============================================================

    def generate_plan(
        self,
        research_gap_report
    ):

        research_areas = (
            research_gap_report.get(
                "research_areas",
                []
            )
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
                    research_areas
                ),

            "hardware_requirements":
                self.suggest_hardware(),

            "validation_strategy":
                self.validation_strategy(),

            "experimental_workflow":
                self.experimental_workflow(
                    research_areas
                )
        }