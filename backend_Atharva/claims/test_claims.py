# # # # from sentence_splitter import SentenceSplitter
# # # # from claim_detector import ClaimDetector

# # # # detector = ClaimDetector()

# # # # samples = [
# # # #     "Earth revolves around the Sun.",
# # # #     "I think Earth is beautiful.",
# # # #     "Wow amazing.",
# # # #     "Water boils at 100 degrees Celsius."
# # # # ]

# # # # for s in samples:
# # # #     print(s, detector.is_claim(s))
# # # # text = """
# # # # Photosynthesis occurs in chloroplasts.
# # # # Plants release oxygen.
# # # # Water boils at 100°C. I am Atharva. I study in 3rd year at pict.
# # # # """

# # # # splitter = SentenceSplitter()

# # # # sentences = splitter.split(text)

# # # # print(sentences)
# # # # from atomic_claim_generator import AtomicClaimGenerator

# # # # generator = AtomicClaimGenerator()

# # # # sentence = (
# # # #     "Plants absorb carbon dioxide and release oxygen."
# # # # )

# # # # print(generator.generate(sentence))
# # # from pipeline import ClaimPipeline

# # # text = """
# # # Database designers familiar with relational databases and SQL might be tempted to go directly to implementation after
# # # they have produced a conceptual data model. However, such a direct transformation of the relational representation
# # # to SQL tables does not necessarily result in a database that has all the desirable properties: completeness, integrity,
# # # flexibility, efficiency and usability. A good conceptual data model is an essential first step towards a database with
# # # these properties, but that does not mean that the direct transformation to SQL tables automatically produces a good
# # # database. This first step will accurately represent the tables and constraints needed to satisfy the conceptual data model
# # # description, and so will satisfy the completeness and integrity requirements, but it may be inflexible or offer poor
# # # usability. The first design is then flexed to improve the quality of the database design. Flexing is a term that is intended
# # # to capture the simultaneous ideas of bending something for a different purpose and weakening aspects of it as it is ben
# # # """

# # # pipeline = ClaimPipeline()

# # # claims = pipeline.extract_claims(text)

# # # print(claims)
# # from atomic_claim_generator import (
# #     AtomicClaimGenerator
# # )

# # generator = AtomicClaimGenerator()

# # text = """
# # Plants absorb carbon dioxide and release oxygen.
# # """

# # claims = generator.generate(text)

# # print(claims)
# # from claims.pipeline import ClaimPipeline

# # pipeline = ClaimPipeline()

# # sample_text = """
# # Photosynthesis occurs in chloroplasts.

# # Plants absorb carbon dioxide and release oxygen.

# # I think biology is fascinating.

# # Water boils at 100 degrees Celsius.
# # """

# # claims = pipeline.extract_claims(
# #     sample_text
# # )

# # print("\nExtracted Claims:\n")

# # for idx, claim in enumerate(
# #         claims,
# #         start=1
# # ):
# #     print(f"{idx}. {claim}")
# from claims.atomic_claim_generator import (
#     AtomicClaimGenerator
# )

# generator = AtomicClaimGenerator()

# text = """
# Plants absorb carbon dioxide and release oxygen.
# """

# claims = generator.generate(text)

# print(claims)
from claims.pipeline import ClaimPipeline
pipeline = ClaimPipeline()

sample_text = """
Database designers familiar with relational databases and SQL might be tempted to go directly to implementation after
they have produced a conceptual data model. However, such a direct transformation of the relational representation
to SQL tables does not necessarily result in a database that has all the desirable properties: completeness, integrity,
flexibility, efficiency and usability. A good conceptual data model is an essential first step towards a database with
these properties, but that does not mean that the direct transformation to SQL tables automatically produces a good
database. This first step will accurately represent the tables and constraints needed to satisfy the conceptual data model
description, and so will satisfy the completeness and integrity requirements, but it may be inflexible or offer poor
usability. The first design is then flexed to improve the quality of the database design. Flexing is a term that is intended
to capture the simultaneous ideas of bending something for a different purpose and weakening aspects of it as it is bent.
"""

claims = pipeline.extract_claims(
    sample_text
)

print("\nExtracted Claims:\n")

for idx, claim in enumerate(
        claims,
        start=1
):
    print(f"{idx}. {claim}")