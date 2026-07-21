from fastapi import APIRouter, HTTPException, Request
from app.database.connection import SessionLocal
from app.database.models import User
from app.utils.jwt_handler import create_access_token
from app.database.schemas import SignupRequest, LoginRequest
from app.utils.security import (
    hash_password,
    verify_password,
    is_strong_password
)
from app.core.limiter import limiter

router = APIRouter()


@router.post("/signup")
@limiter.limit("3/minute", error_message="Too many signup attempts. Try again later.")
def signup(request: Request, data: SignupRequest):
    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:
        db.close()
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    valid, message = is_strong_password(data.password)

    if not valid:
        db.close()
        raise HTTPException(
            status_code=400,
            detail=message
        )

    try:
        hashed_password = hash_password(data.password)
    except ValueError as e:
        db.close()
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    new_user = User(
        name=data.name,
        email=data.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.close()

    return {
        "message": "User created successfully",
        "user_id": new_user.id
    }


@router.post("/login")
@limiter.limit("5/minute", error_message="Too many login attempts. Wait a minute.")
def login(request: Request, data: LoginRequest):
    db = SessionLocal()

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(data.password, user.password):
        db.close()
        raise HTTPException(
            status_code=401,
            detail="Wrong password"
        )

    token = create_access_token({
        "user_id": user.id,
        "email": user.email
    })

    db.close()

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "token": token
    }