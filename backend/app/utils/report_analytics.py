"""
Report Analytics Utility

Generates useful statistics about a generated report.
"""


class ReportAnalytics:

    @staticmethod
    def generate(
        report,
        execution_time,
        token_usage,
        compression,
        pdf_file,
        docx_file,
        markdown_file
    ):

        analytics = {

            "execution_time_seconds": execution_time,

            "total_sections": len(report),

            "token_usage": token_usage,

            "compression": compression,

            "generated_files": {
                "pdf": pdf_file,
                "docx": docx_file,
                "markdown": markdown_file
            },

            "quality": report.get("quality", {})

        }

        return analytics