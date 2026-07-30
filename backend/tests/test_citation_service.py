from app.services.citation_analysis_service import CitationAnalysisService

service = CitationAnalysisService()

result = service.analyze_citations("Agentic AI")

print(result)