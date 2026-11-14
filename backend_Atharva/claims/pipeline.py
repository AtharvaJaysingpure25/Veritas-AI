from claims.sentence_splitter import SentenceSplitter
from claims.claim_detector import ClaimDetector
from claims.atomic_claim_generator import AtomicClaimGenerator


class ClaimPipeline:

    def __init__(self):
        self.splitter = SentenceSplitter()
        self.detector = ClaimDetector()
        self.generator = AtomicClaimGenerator()

    def extract_claims(self, text):

        sentences = self.splitter.split(text)

        factual_sentences = []

        for sentence in sentences:

            if self.detector.is_claim(sentence):
                factual_sentences.append(sentence)
        #     #to be deleted
        #     print(f"\nSentence: {sentence}")

        # if self.detector.is_claim(sentence):
        #     print("-> CLAIM")
        #     factual_sentences.append(sentence)
        # else:
        #     print("-> NOT CLAIM")
        #     #to be deleted
        combined_text = "\n".join(factual_sentences)

        claims = self.generator.generate(combined_text)

        return claims