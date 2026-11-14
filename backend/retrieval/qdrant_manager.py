from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    VectorParams
)


class QdrantManager:

    def __init__(self):

        self.client = QdrantClient(
            host="localhost",
            port=6333
        )

        self.collection_name = "knowledge_base"

    def create_collection(self):

        collections = self.client.get_collections()

        existing = [
            c.name
            for c in collections.collections
        ]

        if self.collection_name not in existing:

            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=384,
                    distance=Distance.COSINE
                )
            )

            print("Collection created.")

        else:

            print("Collection already exists.")