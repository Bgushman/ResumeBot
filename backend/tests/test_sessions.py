"""Integration tests for the /api/sessions endpoints."""

from datetime import datetime
from unittest.mock import MagicMock
from uuid import uuid4


FAKE_ID = str(uuid4())
NOW = datetime.utcnow().isoformat()


class TestListSessions:
    def test_returns_list(self, client, mock_sb):
        mock_sb.table.return_value.select.return_value.order.return_value.execute.return_value = MagicMock(
            data=[
                {"id": FAKE_ID, "major": "Computer Science", "resume_filename": "r.pdf", "created_at": NOW},
            ]
        )
        resp = client.get("/api/sessions")
        assert resp.status_code == 200
        body = resp.json()
        assert isinstance(body, list)
        assert len(body) == 1
        assert body[0]["major"] == "Computer Science"

    def test_empty_list(self, client, mock_sb):
        mock_sb.table.return_value.select.return_value.order.return_value.execute.return_value = MagicMock(
            data=[]
        )
        resp = client.get("/api/sessions")
        assert resp.status_code == 200
        assert resp.json() == []


class TestGetSession:
    def test_found(self, client, mock_sb):
        mock_sb.table.return_value.select.return_value.eq.return_value.execute.return_value = MagicMock(
            data=[{"id": FAKE_ID, "major": "Business", "resume_filename": "b.pdf", "created_at": NOW}]
        )
        mock_sb.table.return_value.select.return_value.eq.return_value.order.return_value.execute.return_value = MagicMock(
            data=[
                {"id": str(uuid4()), "role": "assistant", "content": "feedback", "created_at": NOW},
            ]
        )

        resp = client.get(f"/api/sessions/{FAKE_ID}")
        assert resp.status_code == 200
        body = resp.json()
        assert body["major"] == "Business"
        assert len(body["messages"]) == 1

    def test_not_found(self, client, mock_sb):
        mock_sb.table.return_value.select.return_value.eq.return_value.execute.return_value = MagicMock(
            data=[]
        )
        resp = client.get(f"/api/sessions/{uuid4()}")
        assert resp.status_code == 404


class TestDeleteSession:
    def test_delete_success(self, client, mock_sb):
        mock_sb.table.return_value.delete.return_value.eq.return_value.execute.return_value = MagicMock(
            data=[{"id": FAKE_ID}]
        )
        resp = client.delete(f"/api/sessions/{FAKE_ID}")
        assert resp.status_code == 200
        assert resp.json()["detail"] == "Session deleted."

    def test_delete_not_found(self, client, mock_sb):
        mock_sb.table.return_value.delete.return_value.eq.return_value.execute.return_value = MagicMock(
            data=[]
        )
        resp = client.delete(f"/api/sessions/{uuid4()}")
        assert resp.status_code == 404
