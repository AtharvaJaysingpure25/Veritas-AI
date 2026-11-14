class ClaimDetector:

    subjective_words = [
        "think",
        "believe",
        "feel",
        "opinion",
        "maybe",
        "probably",
        "in my opinion", "in my view", "i'd say", "personally",
        "it seems", "it appears", "i'm not sure"
    ]

    def is_claim(self, sentence):

        sentence = sentence.lower()

        if len(sentence.split()) < 4:
            return False

        for word in self.subjective_words:

            if word in sentence:
                return False

        return True