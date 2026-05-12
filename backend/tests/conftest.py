import os
import tempfile
from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("SUPABASE_URL", "https://fake.supabase.co")
os.environ.setdefault("SUPABASE_SERVICE_ROLE_KEY", "fake-key")
os.environ.setdefault("GEMINI_API_KEY", "fake-gemini-key")

from backend.main import app
from backend.config import settings
from backend.supabase_client import get_supabase


@pytest.fixture()
def mock_sb():
    mock = MagicMock()
    app.dependency_overrides[get_supabase] = lambda: mock
    yield mock
    app.dependency_overrides.clear()


@pytest.fixture(autouse=True)
def _upload_dir(tmp_path):
    """Point UPLOAD_DIR at a temp directory so file writes succeed in tests."""
    original = settings.UPLOAD_DIR
    settings.UPLOAD_DIR = str(tmp_path / "uploads")
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    yield
    settings.UPLOAD_DIR = original


@pytest.fixture()
def client(mock_sb):
    return TestClient(app)


@pytest.fixture()
def raw_client():
    """TestClient without any dependency overrides (for health check, etc.)."""
    return TestClient(app)
