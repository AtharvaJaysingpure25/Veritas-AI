import json

from llm.client import LLMClient
from llm.prompts.atomic_claim_prompt import (
    ATOMIC_CLAIM_PROMPT
)


class AtomicClaimGenerator:

    def __init__(self):
        self.llm = LLMClient()

    
    # def generate(self, text):

    #     prompt = ATOMIC_CLAIM_PROMPT.format(
    #         text=text
    #     )

    #     response = self.llm.generate(prompt)

    #     try:
    #         claims = json.loads(response)

    #         if isinstance(claims, list):
    #             return claims

    #     except Exception:
    #         pass

    #     return []
    def generate(self, text):

        prompt = ATOMIC_CLAIM_PROMPT.format(
            text=text
        )

        response = self.llm.generate(prompt)

        try:

            data = json.loads(response)

            if isinstance(data, list):
                return data

            if isinstance(data, dict):

                if "claims" in data:
                    return data["claims"]

        except Exception:
            pass

        return []