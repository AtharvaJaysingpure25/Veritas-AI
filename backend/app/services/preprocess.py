import re


def clean_text(text: str):
    # Remove multiple newlines
    text = re.sub(r"\n+", " ", text)

    # Remove multiple spaces
    text = re.sub(r"\s+", " ", text)

    # Trim
    text = text.strip()

    return text