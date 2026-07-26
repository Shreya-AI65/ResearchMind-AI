class ExperimentPlanningAgent:

    def __init__(self):
        self.agent_name = "Experiment Planning Agent"
        self.status = "Initialized"

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
        }

        suggested = []

        for area in research_areas:
            suggested.extend(
                datasets.get(area, [])
            )

        return sorted(list(set(suggested)))

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
            ]
        }

        suggested = []

        for area in research_areas:
            suggested.extend(
                models.get(area, [])
            )

        return sorted(list(set(suggested)))

    def suggest_evaluation_metrics(self):

        return [
            "Accuracy",
            "Precision",
            "Recall",
            "F1-Score",
            "ROC-AUC"
        ]

    def suggest_hardware(self):

        return {
            "cpu": "Intel Core i7 / AMD Ryzen 7",
            "ram": "16 GB",
            "gpu": "NVIDIA RTX 3060 or better",
            "storage": "100 GB SSD"
        }

    def validation_strategy(self):

        return [
            "Train-Test Split",
            "K-Fold Cross Validation",
            "Hyperparameter Tuning",
            "Statistical Significance Testing"
        ]

    def experimental_workflow(self):

        return [
            "Collect Dataset",
            "Preprocess Data",
            "Train Baseline Models",
            "Train Proposed Model",
            "Evaluate Performance",
            "Compare Results",
            "Analyze Errors",
            "Draw Conclusions"
        ]

    def generate_plan(self, research_gap_report):

        research_areas = research_gap_report.get(
            "research_areas",
            []
        )

        return {

            "research_areas": research_areas,

            "recommended_datasets":
                self.suggest_datasets(research_areas),

            "baseline_models":
                self.suggest_baseline_models(research_areas),

            "evaluation_metrics":
                self.suggest_evaluation_metrics(),

            "hardware_requirements":
                self.suggest_hardware(),

            "validation_strategy":
                self.validation_strategy(),

            "experimental_workflow":
                self.experimental_workflow()
        }