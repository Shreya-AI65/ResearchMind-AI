from app.services.report_generation_service import (
    ReportGenerationService
)

service = ReportGenerationService()

print("=" * 70)
print("REPORT GENERATION PIPELINE TEST")
print("=" * 70)

query = "Agentic AI"

result = service.generate_report(query)

print(result)