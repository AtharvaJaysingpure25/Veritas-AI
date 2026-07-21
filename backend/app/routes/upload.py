
from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Request
)
import os

from app.services.pdf_extractor import extract_text_from_pdf
from app.services.ocr_extractor import extract_text_from_image
from app.services.preprocess import clean_text
from app.core.limiter import limiter

router = APIRouter()

UPLOAD_DIR = "uploads"
MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 MB

ALLOWED_EXTENSIONS = (".pdf", ".png", ".jpg", ".jpeg")

ALLOWED_MIME_TYPES = {
    "application/pdf",
    "image/png",
    "image/jpeg"
}

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)


@router.post("/upload")
@limiter.limit("5/minute")
async def upload_file(
    request: Request,
    file: UploadFile = File(...)
):
    safe_filename = os.path.basename(file.filename)

    # ---------- Extension validation ----------
    if not safe_filename.lower().endswith(ALLOWED_EXTENSIONS):
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Only PDF/JPG/PNG allowed."
        )

    # ---------- MIME type validation ----------
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Invalid file content type"
        )

    contents = await file.read()

    # ---------- Empty file check ----------
    if len(contents) == 0:
        raise HTTPException(
            status_code=400,
            detail="Empty file uploaded"
        )

    # ---------- File size validation ----------
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File too large (max 20MB)"
        )

    file_path = os.path.join(UPLOAD_DIR, safe_filename)

    try:
        # ---------- Save temp file ----------
        with open(file_path, "wb") as f:
            f.write(contents)

        extracted_text = ""

        if safe_filename.lower().endswith(".pdf"):
            extracted_text = extract_text_from_pdf(file_path)

        elif safe_filename.lower().endswith(
            (".png", ".jpg", ".jpeg")
        ):
            extracted_text = extract_text_from_image(file_path)

        # ---------- Extraction validation ----------
        if not extracted_text or not extracted_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from file"
            )

        cleaned_text = clean_text(extracted_text)

        return {
            "filename": safe_filename,
            "total_characters": len(cleaned_text),
            "clean_text": cleaned_text,
            "verification_result": {
                "credibility_score": 84,
                "total_claims": 5,
                "verified": 3,
                "refuted": 1,
                "nei": 1,
                "claims": [
                    "Claim 1",
                    "Claim 2",
                    "Claim 3"
                ]
            }
        }

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

