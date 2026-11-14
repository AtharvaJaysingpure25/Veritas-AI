from sentence_transformers import SentenceTransformer
import torch


class Embedder:

    def __init__(self):
        DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = SentenceTransformer(
            "BAAI/bge-small-en-v1.5",
            device=DEVICE
        )

    def encode(self, text):

        embedding = self.model.encode(
            text,
            normalize_embeddings=True
        )

        return embedding.tolist()