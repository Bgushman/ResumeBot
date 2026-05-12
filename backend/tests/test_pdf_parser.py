"""Unit tests for the PDF parser service."""

import os
import tempfile
from unittest.mock import MagicMock, patch

import pytest

from backend.services.pdf_parser import extract_text_from_pdf


class TestExtractTextFromPdf:
    def test_returns_stripped_text(self):
        mock_page = MagicMock()
        mock_page.get_text.return_value = "  Hello World  "

        mock_doc = MagicMock()
        mock_doc.__iter__ = lambda self: iter([mock_page])

        with patch("backend.services.pdf_parser.fitz") as mock_fitz:
            mock_fitz.open.return_value = mock_doc
            result = extract_text_from_pdf("/fake/path.pdf")

        assert result == "Hello World"
        mock_doc.close.assert_called_once()

    def test_multi_page(self):
        page1 = MagicMock()
        page1.get_text.return_value = "Page 1 "
        page2 = MagicMock()
        page2.get_text.return_value = "Page 2"

        mock_doc = MagicMock()
        mock_doc.__iter__ = lambda self: iter([page1, page2])

        with patch("backend.services.pdf_parser.fitz") as mock_fitz:
            mock_fitz.open.return_value = mock_doc
            result = extract_text_from_pdf("/fake/path.pdf")

        assert result == "Page 1 Page 2"

    def test_empty_pdf(self):
        mock_page = MagicMock()
        mock_page.get_text.return_value = "   "

        mock_doc = MagicMock()
        mock_doc.__iter__ = lambda self: iter([mock_page])

        with patch("backend.services.pdf_parser.fitz") as mock_fitz:
            mock_fitz.open.return_value = mock_doc
            result = extract_text_from_pdf("/fake/path.pdf")

        assert result == ""

    def test_calls_fitz_open_with_path(self):
        mock_doc = MagicMock()
        mock_doc.__iter__ = lambda self: iter([])

        with patch("backend.services.pdf_parser.fitz") as mock_fitz:
            mock_fitz.open.return_value = mock_doc
            extract_text_from_pdf("/some/resume.pdf")

        mock_fitz.open.assert_called_once_with("/some/resume.pdf")
