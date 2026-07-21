from pydantic import BaseModel, EmailStr


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ChatCreate(BaseModel):
    title: str
    input_type: str
    extracted_text: str
    verification_result: str | None = None