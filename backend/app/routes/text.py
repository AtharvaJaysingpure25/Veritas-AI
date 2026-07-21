
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from app.services.preprocess import clean_text
from app.core.limiter import limiter

router = APIRouter()

MAX_TEXT_LENGTH = 50000


class TextRequest(BaseModel):
    text: str


@router.post("/text-input")
@limiter.limit("20/minute")
def process_text(request: Request, data: TextRequest):

    # ---------- Empty text check ----------
    if not data.text or not data.text.strip():
        raise HTTPException(
            status_code=400,
            detail="Text input cannot be empty"
        )

    # ---------- Max length check ----------
    if len(data.text) > MAX_TEXT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Text too large (max {MAX_TEXT_LENGTH} characters)"
        )

    cleaned_text = clean_text(data.text)

    claims = [
        sentence.strip()
        for sentence in cleaned_text.split(".")
        if sentence.strip()
    ]

    total_claims = len(claims)

    verified = int(total_claims * 0.7)
    refuted = int(total_claims * 0.2)
    nei = total_claims - verified - refuted

    return {
        "total_characters": len(cleaned_text),
        "clean_text": cleaned_text,
        "verification_result": {
            "credibility_score": 84,
            "total_claims": total_claims,
            "verified": verified,
            "refuted": refuted,
            "nei": nei,
            "claims": claims[:20]
        }
    }

