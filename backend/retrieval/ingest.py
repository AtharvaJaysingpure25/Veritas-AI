import json

from qdrant_client.models import PointStruct

from retrieval.embedder import Embedder
from retrieval.qdrant_manager import (
    QdrantManager
)


class Ingestor:

    def __init__(self):

        self.embedder = Embedder()

        self.qdrant = QdrantManager()

    def ingest(self, json_path):

        self.qdrant.create_collection()

        with open(json_path, "r") as f:

            data = json.load(f)

        points = []

        for item in data:

            vector = self.embedder.encode(
                item["text"]
            )

            points.append(
                PointStruct(
                    id=item["id"],
                    vector=vector,
                    payload={
                        "text": item["text"]
                    }
                )
            )

        self.qdrant.client.upsert(
            collection_name=
            self.qdrant.collection_name,

            points=points
        )

        print(
            f"{len(points)} facts inserted."
        )