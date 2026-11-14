from fastapi import APIRouter

from api.schemas import VerifyRequest
from pipeline.fact_check_pipeline import FactCheckPipeline

router = APIRouter()

pipeline = FactCheckPipeline()


@router.post("/verify")
def verify_text(request: VerifyRequest):

    result = pipeline.run(request.text)

    return result