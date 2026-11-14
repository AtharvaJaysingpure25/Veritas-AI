from retrieval.embedder import Embedder
from retrieval.qdrant_manager import QdrantManager


class Retriever:

    def __init__(self):
        self.embedder = Embedder()
        self.qdrant = QdrantManager()

    def retrieve(self, claim, top_k=5):

        query_vector = self.embedder.encode(claim)

        results = self.qdrant.client.query_points(
            collection_name=self.qdrant.collection_name,
            query=query_vector,
            limit=top_k
        ).points

        evidence = []

        for result in results:
            evidence.append({
                "score": result.score,
                "text": result.payload["text"]
            })

        return evidence