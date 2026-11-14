from retrieval.ingest import Ingestor
print("Starting ingestion...")
ingestor = Ingestor()

ingestor.ingest(
    "datasets/computer_networks/facts.json"
)