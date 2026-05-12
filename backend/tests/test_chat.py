"""Integration tests for the /api/chat/{session_id} endpoint."""

from unittest.mock import patch, MagicMock
from uuid import uuid4


FAKE_SESSION_ID = str(uuid4())


class TestChatEndpoint:
    @patch("backend.routers.chat.get_ai_response", return_value="Here is my feedback.")
    def test_successful_chat(self, mock_ai, client, mock_sb):
        mock_sb.table.return_value.select.return_value.eq.return_value.execute.return_value = MagicMock(
            data=[{"major": "Computer Science", "resume_text": "John Doe"}]
        )
        mock_sb.table.return_value.select.return_value.eq.return_value.order.return_value.execute.return_value = MagicMock(
            data=[]
        )

        resp = client.post(
            f"/api/chat/{FAKE_SESSION_ID}",
            json={"message": "Any tips?"},
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["role"] == "assistant"
        assert body["content"] == "Here is my feedback."

    def test_session_not_found(self, client, mock_sb):
        mock_sb.table.return_value.select.return_value.eq.return_value.execute.return_value = MagicMock(
            data=[]
        )

        resp = client.post(
            f"/api/chat/{uuid4()}",
            json={"message": "hello"},
        )
        assert resp.status_code == 404
        assert "not found" in resp.json()["detail"].lower()

    @patch("backend.routers.chat.get_ai_response", side_effect=Exception("timeout"))
    def test_ai_error_returns_500(self, mock_ai, client, mock_sb):
        mock_sb.table.return_value.select.return_value.eq.return_value.execute.return_value = MagicMock(
            data=[{"major": "Biology", "resume_text": "Jane Doe"}]
        )
        mock_sb.table.return_value.select.return_value.eq.return_value.order.return_value.execute.return_value = MagicMock(
            data=[]
        )

        resp = client.post(
            f"/api/chat/{FAKE_SESSION_ID}",
            json={"message": "review please"},
        )
        assert resp.status_code == 500
        assert "AI service error" in resp.json()["detail"]

    def test_missing_message_body(self, client, mock_sb):
        resp = client.post(f"/api/chat/{FAKE_SESSION_ID}", json={})
        assert resp.status_code == 422
