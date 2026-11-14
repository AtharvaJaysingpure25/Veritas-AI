from retrieval.embedder import Embedder

embedder = Embedder()

print(embedder.model.device)

vector = embedder.encode(
    "TCP is a connection-oriented protocol."
)

print(len(vector))