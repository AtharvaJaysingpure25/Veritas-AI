from pipeline.fact_check_pipeline import FactCheckPipeline
import json

pipeline = FactCheckPipeline()

text = """
Two devices are connected by a transmission medium (cable or air).
We need to know that the transmission medium does not carry bits; it carries electrical
or optical signals. So the bits received in a frame from the data-link layer are trans-
formed and sent through the transmission media, but we can think that the logical unit
between two physical layers in two devices is a bit. There are several protocols that
transform a bit to a signal.
"""

report = pipeline.run(text)

# Pretty print full report
print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)

print(json.dumps(report["summary"], indent=4))

# Print individual claim results
for result in report["claims"]:

    print("\n" + "=" * 80)

    print("CLAIM:")
    print(result["claim"])

    print("\nVERDICT:")
    print(result["verdict"])

    print("\nCONFIDENCE:")
    print(result["confidence"])

    print("\nTOP EVIDENCE:")

    for item in result["evidence"][:3]:
        print(f"- {item['text']}")

    if result["correction"]:

        print("\nCORRECTION:")
        print(result["correction"])

print("\n" + "=" * 80)
print("FULL JSON REPORT")
print("=" * 80)

print(json.dumps(report, indent=4))