from claims.pipeline import ClaimPipeline
from retrieval.retriever import Retriever
from verifier.verifier import Verifier
from correction.corrector import Corrector
from explainability.report_generator import ReportGenerator


class FactCheckPipeline:

    def __init__(self):

        self.claim_pipeline = ClaimPipeline()
        self.retriever = Retriever()
        self.verifier = Verifier()
        self.corrector = Corrector()
        self.report_generator = ReportGenerator()

    def run(self, text):

        claims = self.claim_pipeline.extract_claims(text)

        results = []

        for claim in claims:

            evidence_list = self.retriever.retrieve(
                claim,
                top_k=5
            )

            if not evidence_list:

                results.append(
                    {
                        "claim": claim,
                        "verdict": "NOT ENOUGH INFO",
                        "confidence": 0.0,
                        "evidence": [],
                        "correction": None
                    }
                )

                continue

            best_evidence = evidence_list[0]["text"]

            verdict = self.verifier.verify(
                claim,
                best_evidence
            )

            evidence_text = "\n".join(
                [
                    item["text"]
                    for item in evidence_list
                ]
            )

            correction = self.corrector.correct(
                claim=claim,
                verdict=verdict["verdict"],
                evidence=evidence_text
            )

            results.append(
                {
                    "claim": claim,
                    "verdict": verdict["verdict"],
                    "confidence": verdict["confidence"],
                    "evidence": evidence_list,
                    "correction": correction
                }
            )

        report = self.report_generator.generate(results)

        return report