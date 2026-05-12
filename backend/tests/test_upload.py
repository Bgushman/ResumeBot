"""Integration tests for the /api/upload endpoint."""

import io
from unittest.mock import patch, MagicMock
from uuid import uuid4


FAKE_SESSION_ID = str(uuid4())


class TestUploadEndpoint:
    def _post_upload(self, client, filename="resume.pdf", major="Computer Science", content=b"%PDF-fake"):
        return client.post(
            "/api/upload",
            files={"file": (filename, io.BytesIO(content), "application/pdf")},
            data={"major": major},
        )

    def test_reject_unsupported_major(self, client):
        resp = self._post_upload(client, major="Underwater Basket Weaving")
        assert resp.status_code == 400
        assert "Unsupported major" in resp.json()["detail"]

    def test_reject_non_pdf(self, client):
        resp = client.post(
            "/api/upload",
            files={"file": ("notes.txt", io.BytesIO(b"hello"), "text/plain")},
            data={"major": "Computer Science"},
        )
        assert resp.status_code == 400
        assert "PDF" in resp.json()["detail"]

    def test_reject_oversized_file(self, client, mock_sb):
        big_content = b"x" * (6 * 1024 * 1024)
        resp = self._post_upload(client, content=big_content)
        assert resp.status_code == 400
        assert "size" in resp.json()["detail"].lower()

    @patch("backend.routers.upload.get_ai_response", return_value="Looks great!")
    @patch("backend.routers.upload.extract_text_from_pdf", return_value="John Doe\nEngineer")
    def test_successful_upload(self, mock_pdf, mock_ai, client, mock_sb):
        mock_sb.table.return_value.insert.return_value.execute.return_value = MagicMock(
            data=[{"id": FAKE_SESSION_ID}]
        )

        resp = self._post_upload(client)
        assert resp.status_code == 200
        body = resp.json()
        assert body["session_id"] == FAKE_SESSION_ID
        assert body["major"] == "Computer Science"
        assert body["initial_feedback"] == "Looks great!"

    @patch("backend.routers.upload.extract_text_from_pdf", return_value="")
    def test_empty_pdf_text_rejected(self, mock_pdf, client, mock_sb):
        resp = self._post_upload(client)
        assert resp.status_code == 400
        assert "extract text" in resp.json()["detail"].lower()

    @patch("backend.routers.upload.extract_text_from_pdf", side_effect=Exception("corrupt"))
    def test_pdf_parse_failure(self, mock_pdf, client, mock_sb):
        resp = self._post_upload(client)
        assert resp.status_code == 400
        assert "parse" in resp.json()["detail"].lower()

    @patch("backend.routers.upload.get_ai_response", side_effect=Exception("Gemini down"))
    @patch("backend.routers.upload.extract_text_from_pdf", return_value="Resume text")
    def test_ai_failure_rolls_back(self, mock_pdf, mock_ai, client, mock_sb):
        mock_sb.table.return_value.insert.return_value.execute.return_value = MagicMock(
            data=[{"id": FAKE_SESSION_ID}]
        )

        resp = self._post_upload(client)
        assert resp.status_code == 500
        assert "AI service error" in resp.json()["detail"]
