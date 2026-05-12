from openai import OpenAI
from ..config import settings

client = OpenAI(
    api_key=settings.GEMINI_API_KEY,
    base_url=settings.AI_BASE_URL,
)


def get_ai_response(messages: list[dict]) -> str:
    response = client.chat.completions.create(
        model=settings.AI_MODEL,
        messages=messages,
    )
    return response.choices[0].message.content
