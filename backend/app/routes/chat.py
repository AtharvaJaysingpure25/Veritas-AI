from fastapi import APIRouter, HTTPException, Depends
from app.database.connection import SessionLocal
from app.database.models import Chat
from app.database.schemas import ChatCreate
from app.dependencies.auth import get_current_user

router = APIRouter()


@router.post("/chat")
def create_chat(
    data: ChatCreate,
    current_user: dict = Depends(get_current_user)
):
    db = SessionLocal()

    new_chat = Chat(
        user_id=current_user["user_id"],
        title=data.title,
        input_type=data.input_type,
        extracted_text=data.extracted_text,
        verification_result=data.verification_result
    )

    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)
    db.close()

    return {
        "message": "Chat created successfully",
        "chat_id": new_chat.id
    }


@router.get("/chat")
def get_user_chats(
    current_user: dict = Depends(get_current_user)
):
    db = SessionLocal()

    chats = (
        db.query(Chat)
        .filter(Chat.user_id == current_user["user_id"])
        .order_by(Chat.created_at.desc())
        .all()
    )

    result = [
        {
            "id": chat.id,
            "title": chat.title,
            "input_type": chat.input_type,
            "created_at": chat.created_at
        }
        for chat in chats
    ]

    db.close()
    return result


@router.get("/chat/details/{chat_id}")
def get_chat(
    chat_id: int,
    current_user: dict = Depends(get_current_user)
):
    db = SessionLocal()

    chat = (
        db.query(Chat)
        .filter(
            Chat.id == chat_id,
            Chat.user_id == current_user["user_id"]
        )
        .first()
    )

    if not chat:
        db.close()
        raise HTTPException(status_code=404, detail="Chat not found")

    result = {
        "id": chat.id,
        "title": chat.title,
        "input_type": chat.input_type,
        "extracted_text": chat.extracted_text,
        "verification_result": chat.verification_result,
        "created_at": chat.created_at
    }

    db.close()
    return result


@router.delete("/chat/{chat_id}")
def delete_chat(
    chat_id: int,
    current_user: dict = Depends(get_current_user)
):
    db = SessionLocal()

    chat = (
        db.query(Chat)
        .filter(
            Chat.id == chat_id,
            Chat.user_id == current_user["user_id"]
        )
        .first()
    )

    if not chat:
        db.close()
        raise HTTPException(status_code=404, detail="Chat not found")

    db.delete(chat)
    db.commit()
    db.close()

    return {"message": "Chat deleted successfully"}