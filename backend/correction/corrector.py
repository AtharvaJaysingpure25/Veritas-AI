from llm.client import LLMClient
from correction.prompts import CORRECTION_PROMPT


class Corrector:

    def __init__(self):

        self.llm = LLMClient()

    def correct(
        self,
        claim,
        verdict,
        evidence
    ):

        if verdict == "SUPPORTED":
            return None

        prompt = CORRECTION_PROMPT.format(
            claim=claim,
            verdict=verdict,
            evidence=evidence
        )

        response = self.llm.generate(
            prompt
        )

        return response