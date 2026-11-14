import spacy

nlp = spacy.load("en_core_web_sm")


class SentenceSplitter:

    def split(self, text):

        doc = nlp(text)

        return [
            sent.text.strip()
            for sent in doc.sents
        ]