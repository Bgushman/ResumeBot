from uuid import UUID
from fastapi import APIRouter, HTTPException, Depends
from supabase import Client

from ..supabase_client import get_supabase
from ..schemas import ChatRequest, ChatResponse
from ..services.ai_service import get_ai_response
from ..services.prompts import get_system_prompt

router = APIRouter()


@router.post("/chat/{session_id}", response_model=ChatResponse)
def chat(
    session_id: UUID,
    request: ChatRequest,
    sb: Client = Depends(get_supabase),
):
    sres = (
        sb.table("sessions")
        .select("major, resume_text")
        .eq("id", str(session_id))
        .execute()
    )
    if not sres.data:
        raise HTTPException(status_code=404, detail="Session not found.")
    session = sres.data[0]

    mres = (
        sb.table("messages")
        .select("role, content")
        .eq("session_id", str(session_id))
        .order("created_at")
        .execute()
    )
    messages_rows = mres.data or []

    system_prompt = get_system_prompt(session["major"], session["resume_text"])
    messages = [{"role": "system", "content": system_prompt}]

    for msg in messages_rows:
        messages.append({"role": msg["role"], "content": msg["content"]})

    messages.append({"role": "user", "content": request.message})

    try:
        ai_response = get_ai_response(messages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

    sb.table("messages").insert(
        [
            {
                "session_id": str(session_id),
                "role": "user",
                "content": request.message,
            },
            {
                "session_id": str(session_id),
                "role": "assistant",
                "content": ai_response,
            },
        ]
    ).execute()

    return ChatResponse(role="assistant", content=ai_response)
