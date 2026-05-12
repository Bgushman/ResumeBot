from uuid import UUID
from fastapi import APIRouter, HTTPException, Depends
from supabase import Client

from ..supabase_client import get_supabase
from ..schemas import SessionSummary, SessionDetail, MessageOut

router = APIRouter()


@router.get("/sessions", response_model=list[SessionSummary])
def list_sessions(sb: Client = Depends(get_supabase)):
    res = (
        sb.table("sessions")
        .select("id, major, resume_filename, created_at")
        .order("created_at", desc=True)
        .execute()
    )
    rows = res.data or []
    return [SessionSummary.model_validate(r) for r in rows]


@router.get("/sessions/{session_id}", response_model=SessionDetail)
def get_session(session_id: UUID, sb: Client = Depends(get_supabase)):
    sres = (
        sb.table("sessions")
        .select("id, major, resume_filename, created_at")
        .eq("id", str(session_id))
        .execute()
    )
    if not sres.data:
        raise HTTPException(status_code=404, detail="Session not found.")
    session = sres.data[0]

    mres = (
        sb.table("messages")
        .select("id, role, content, created_at")
        .eq("session_id", str(session_id))
        .order("created_at")
        .execute()
    )
    msg_rows = mres.data or []
    messages = [MessageOut.model_validate(m) for m in msg_rows]

    return SessionDetail.model_validate({**session, "messages": messages})


@router.delete("/sessions/{session_id}")
def delete_session(session_id: UUID, sb: Client = Depends(get_supabase)):
    res = sb.table("sessions").delete().eq("id", str(session_id)).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Session not found.")
    return {"detail": "Session deleted."}
