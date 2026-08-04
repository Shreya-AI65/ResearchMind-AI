"""
Report History Manager

Stores information about every generated report.
"""

import json
import os
from datetime import datetime


class ReportHistoryManager:

    def __init__(self):

        self.history_file = "generated_reports/report_history.json"

        os.makedirs("generated_reports", exist_ok=True)

        if not os.path.exists(self.history_file):

            with open(
                self.history_file,
                "w",
                encoding="utf-8"
            ) as file:

                json.dump([], file, indent=4)

    # --------------------------------------------------
    # Get Next Version
    # --------------------------------------------------

    def get_next_version(
        self,
        topic
    ):

        with open(
            self.history_file,
            "r",
            encoding="utf-8"
        ) as file:

            history = json.load(file)

        versions = [

            report.get("version", 1)

            for report in history

            if report.get(
                "research_topic",
                ""
            ).lower() == topic.lower()

        ]

        if not versions:
            return 1

        return max(versions) + 1

    # --------------------------------------------------
    # Save Report History
    # --------------------------------------------------

    def save_history(
        self,
        topic,
        version,
        pdf_path,
        docx_path,
        markdown_path
    ):

        print("Saving report history...")

        with open(
            self.history_file,
            "r",
            encoding="utf-8"
        ) as file:

            history = json.load(file)

        history.append({

            "research_topic": topic,

            "version": version,

            "generated_at":
                datetime.now().strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),

            "pdf":
                os.path.basename(pdf_path),

            "docx":
                os.path.basename(docx_path),

            "markdown":
                os.path.basename(markdown_path)

        })

        with open(
            self.history_file,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                history,
                file,
                indent=4
            )

        return True

    # --------------------------------------------------
    # Get Complete History
    # --------------------------------------------------

    def get_history(self):

        with open(
            self.history_file,
            "r",
            encoding="utf-8"
        ) as file:

            return json.load(file)