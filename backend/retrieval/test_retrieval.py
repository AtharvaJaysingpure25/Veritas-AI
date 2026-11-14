from retrieval.retriever import Retriever

retriever = Retriever()

test_claims = [
    "TCP is a connection oriented protocol",
    "UDP establishes a connection before transmission",
    "The OSI model contains seven layers",
    "HTTP runs over TCP"
]

for claim in test_claims:

    print("\n" + "=" * 80)
    print("CLAIM:", claim)
    print("=" * 80)

    results = retriever.retrieve(
        claim,
        top_k=5
    )

    for idx, result in enumerate(results, start=1):

        print(
            f"{idx}. "
            f"Score: {result['score']:.4f}"
        )

        print(result["text"])
        print()