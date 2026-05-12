import os
import uuid
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from supabase import Client

from ..supabase_client import get_supabase
from ..config import settings
from ..schemas import UploadResponse
from ..services.pdf_parser import extract_text_from_pdf
from ..services.ai_service import get_ai_response
from ..services.prompts import SUPPORTED_MAJORS, get_system_prompt

router = APIRouter()


@router.post("/upload", response_model=UploadResponse)
async def upload_resume(
    file: UploadFile = File(...),
    major: str = Form(...),
    sb: Client = Depends(get_supabase),
):
    if major not in SUPPORTED_MAJORS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported major. Choose from: {', '.join(SUPPORTED_MAJORS)}",
        )

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")

    content = await file.read()
    if len(content) > settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds {settings.MAX_UPLOAD_SIZE_MB}MB limit.",
        )

    filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(settings.UPLOAD_DIR, filename)
    with open(file_path, "wb") as f:
        f.write(content)

    try:
        resume_text = extract_text_from_pdf(file_path)
    except Exception:
        os.remove(file_path)
        raise HTTPException(status_code=400, detail="Failed to parse PDF file.")

    if not resume_text.strip():
        os.remove(file_path)
        raise HTTPException(
            status_code=400, detail="Could not extract text from PDF. Is it scanned?"
        )

    ins = (
        sb.table("sessions")
        .insert(
            {
                "major": major,
                "resume_filename": file.filename,
                "resume_text": resume_text,
            }
        )
        .execute()
    )
    if not ins.data:
        os.remove(file_path)
        raise HTTPException(status_code=500, detail="Failed to create session.")
    session_id = ins.data[0]["id"]

    system_prompt = get_system_prompt(major, resume_text)
    try:
        initial_feedback = get_ai_response(
            [
                {"role": "system", "content": system_prompt},
                {
                    "role": "user",
                    "content": "Please review my resume and provide detailed feedback.",
                },
            ]
        )
    except Exception as e:
        sb.table("sessions").delete().eq("id", str(session_id)).execute()
        os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

    sb.table("messages").insert(
        {
            "session_id": str(session_id),
            "role": "assistant",
            "content": initial_feedback,
        }
    ).execute()

    return UploadResponse(
        session_id=session_id,
        major=major,
        resume_filename=file.filename,
        initial_feedback=initial_feedback,
    )
