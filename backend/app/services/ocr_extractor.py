import easyocr

# Load reader once when server starts
reader = easyocr.Reader(['en'])


def extract_text_from_image(image_path):
    results = reader.readtext(image_path)

    extracted_text = []

    for result in results:
        text = result[1]   # result format: (bbox, text, confidence)
        extracted_text.append(text)

    return " ".join(extracted_text)