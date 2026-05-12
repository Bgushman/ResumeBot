from functools import lru_cache

from supabase import Client, create_client

from .config import settings


@lru_cache
def _client() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)


def get_supabase() -> Client:
    return _client()
