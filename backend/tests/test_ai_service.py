"""Unit tests for the AI service."""

from unittest.mock import MagicMock, patch

from backend.services.ai_service import get_ai_response


class TestGetAiResponse:
    def test_returns_content(self):
        mock_choice = MagicMock()
        mock_choice.message.content = "Great resume!"

        mock_response = MagicMock()
        mock_response.choices = [mock_choice]

        with patch("backend.services.ai_service.client") as mock_client:
            mock_client.chat.completions.create.return_value = mock_response
            result = get_ai_response([{"role": "user", "content": "hi"}])

        assert result == "Great resume!"

    def test_passes_messages_to_api(self):
        mock_choice = MagicMock()
        mock_choice.message.content = "response"
        mock_response = MagicMock()
        mock_response.choices = [mock_choice]

        messages = [
            {"role": "system", "content": "You are helpful."},
            {"role": "user", "content": "Review my resume"},
        ]

        with patch("backend.services.ai_service.client") as mock_client:
            mock_client.chat.completions.create.return_value = mock_response
            get_ai_response(messages)

            call_kwargs = mock_client.chat.completions.create.call_args
            assert call_kwargs.kwargs["messages"] == messages

    def test_propagates_exception(self):
        with patch("backend.services.ai_service.client") as mock_client:
            mock_client.chat.completions.create.side_effect = Exception("API down")
            try:
                get_ai_response([{"role": "user", "content": "hi"}])
                assert False, "Should have raised"
            except Exception as e:
                assert "API down" in str(e)
