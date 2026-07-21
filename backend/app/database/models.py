from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.sql import func
from app.database.connection import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, index=True)

    # Which user owns this chat
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Chat title shown in sidebar/history
    title = Column(String, nullable=False)

    # Input source: pdf / image / text / url
    input_type = Column(String, nullable=False)

    # Extracted raw text from OCR / PDF / text input
    extracted_text = Column(Text, nullable=False)

    # Full verification result JSON stored as string
    verification_result = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())