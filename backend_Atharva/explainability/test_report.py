from explainability.report_generator import ReportGenerator

sample_results = [
    {
        "claim": "TCP is a connection-oriented protocol.",
        "verdict": "SUPPORTED",
        "confidence": 0.98,
        "evidence": [],
        "correction": None
    },
    {
        "claim": "UDP establishes a connection before transmission.",
        "verdict": "REFUTED",
        "confidence": 0.97,
        "evidence": [],
        "correction": "UDP is connectionless."
    }
]

generator = ReportGenerator()

report = generator.generate(sample_results)

print(report)