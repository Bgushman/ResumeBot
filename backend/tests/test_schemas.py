"""Unit tests for Pydantic schemas."""

from datetime import datetime
from uuid import uuid4

import pytest
from pydantic import ValidationError

from backend.schemas import (
    ChatRequest,
    ChatResponse,
    MessageOut,
    SessionSummary,
    SessionDetail,
    UploadResponse,
)


class TestChatRequest:
    def test_valid(self):
        r = ChatRequest(message="Hello")
        assert r.message == "Hello"

    def test_empty_string_accepted(self):
        r = ChatRequest(message="")
        assert r.message == ""

    def test_missing_message_raises(self):
        with pytest.raises(ValidationError):
            ChatRequest()


class TestChatResponse:
    def test_valid(self):
        r = ChatResponse(role="assistant", content="Hi there")
        assert r.role == "assistant"
        assert r.content == "Hi there"


class TestMessageOut:
    def test_valid(self):
        uid = uuid4()
        now = datetime.utcnow()
        m = MessageOut(id=uid, role="user", content="test", created_at=now)
        assert m.id == uid
        assert m.role == "user"

    def test_from_dict(self):
        uid = uuid4()
        now = datetime.utcnow()
        m = MessageOut.model_validate(
            {"id": str(uid), "role": "assistant", "content": "ok", "created_at": now.isoformat()}
        )
        assert m.id == uid


class TestSessionSummary:
    def test_valid(self):
        s = SessionSummary(
            id=uuid4(),
            major="Computer Science",
            resume_filename="resume.pdf",
            created_at=datetime.utcnow(),
        )
        assert s.major == "Computer Science"


class TestSessionDetail:
    def test_with_messages(self):
        uid = uuid4()
        now = datetime.utcnow()
        msg = MessageOut(id=uuid4(), role="assistant", content="feedback", created_at=now)
        s = SessionDetail(
            id=uid,
            major="Biology",
            resume_filename="bio.pdf",
            created_at=now,
            messages=[msg],
        )
        assert len(s.messages) == 1
        assert s.messages[0].content == "feedback"

    def test_empty_messages(self):
        s = SessionDetail(
            id=uuid4(),
            major="Business",
            resume_filename="biz.pdf",
            created_at=datetime.utcnow(),
            messages=[],
        )
        assert s.messages == []


class TestUploadResponse:
    def test_valid(self):
        u = UploadResponse(
            session_id=uuid4(),
            major="Data Science",
            resume_filename="ds.pdf",
            initial_feedback="Looks good!",
        )
        assert u.initial_feedback == "Looks good!"
