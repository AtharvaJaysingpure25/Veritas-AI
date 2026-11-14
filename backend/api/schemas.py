from pydantic import BaseModel


class VerifyRequest(BaseModel):
    text: str


class VerifyResponse(BaseModel):
    summary: dict
    claims: list