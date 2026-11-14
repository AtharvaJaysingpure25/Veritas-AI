from correction.corrector import Corrector

corrector = Corrector()

claim = (
    "UDP establishes a connection before transmission."
)

evidence = (
    "User Datagram Protocol (UDP) is a connectionless protocol that transmits datagrams without a logical connection."
)

result = corrector.correct(
    claim=claim,
    verdict="REFUTED",
    evidence=evidence
)

print(result)