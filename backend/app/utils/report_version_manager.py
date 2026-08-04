"""
Report Version Manager

Maintains version numbers for generated reports.
"""

import json
import os


class ReportVersionManager:

    def __init__(self):

        self.version_file = "generated_reports/report_versions.json"

        os.makedirs("generated_reports", exist_ok=True)

        if not os.path.exists(self.version_file):
            with open(self.version_file, "w") as file:
                json.dump({}, file)

    def get_next_version(self, topic: str):

        with open(self.version_file, "r") as file:
            versions = json.load(file)

        version = versions.get(topic, 0) + 1
        versions[topic] = version

        with open(self.version_file, "w") as file:
            json.dump(versions, file, indent=4)

        return version