from datetime import datetime
from uuid import UUID
from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    role: str
    content: str


class MessageOut(BaseModel):
    id: UUID
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True


class SessionSummary(BaseModel):
    id: UUID
    major: str
    resume_filename: str
    created_at: datetime

    class Config:
        from_attributes = True


class SessionDetail(BaseModel):
    id: UUID
    major: str
    resume_filename: str
    created_at: datetime
    messages: list[MessageOut]

    class Config:
        from_attributes = True


class UploadResponse(BaseModel):
    session_id: UUID
    major: str
    resume_filename: str
    initial_feedback: str
