import json
import os
from datetime import datetime


class ReportHistoryManager:

    def __init__(self):

        self.history_file = "generated_reports/report_history.json"

        os.makedirs("generated_reports", exist_ok=True)

        if not os.path.exists(self.history_file):

            with open(self.history_file, "w") as file:
                json.dump([], file)

    def save_history(
        self,
        topic,
        pdf_file,
        docx_file,
        markdown_file
    ):
        print("Saving report history...")

        with open(self.history_file, "r") as file:
            history = json.load(file)

        history.append({

            "research_topic": topic,

            "generated_at":
                datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

            "pdf":
                os.path.basename(pdf_file),

            "docx":
                os.path.basename(docx_file),

            "markdown":
                os.path.basename(markdown_file)

        })

        with open(self.history_file, "w") as file:
            json.dump(history, file, indent=4)