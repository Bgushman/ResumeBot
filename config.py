from pathlib import Path

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

# Load from repo root first, then backend/.env (overrides) so uvicorn cwd does not matter.
_ROOT = Path(__file__).resolve().parent.parent
_BACKEND = Path(__file__).resolve().parent
load_dotenv(_ROOT / ".env")
load_dotenv(_BACKEND / ".env", override=True)


class Settings(BaseSettings):
    """Supabase: use project URL + service role key (Settings → API), not a Postgres URI."""

    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str
    GEMINI_API_KEY: str
    AI_MODEL: str = "gemini-2.5-flash"
    AI_BASE_URL: str = "https://generativelanguage.googleapis.com/v1beta/openai"
    UPLOAD_DIR: str = "./uploads"
    MAX_UPLOAD_SIZE_MB: int = 5

    model_config = SettingsConfigDict(env_file_encoding="utf-8", extra="ignore")


settings = Settings()
