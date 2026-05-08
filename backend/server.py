from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import re
import resend
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import List, Optional
from datetime import datetime, timezone
import uuid


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
DESTINATION_EMAIL = os.environ.get('DESTINATION_EMAIL', '')

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------- Models ----------
class QuoteRequestIn(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    email: EmailStr
    phone: str = Field(..., min_length=6, max_length=30)
    service: str = Field(..., min_length=2, max_length=60)
    message: str = Field(..., min_length=10, max_length=2000)
    # Honeypot anti-spam field — must be empty
    website: Optional[str] = Field(default="", max_length=200)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[^\d+]", "", v)
        if not re.fullmatch(r"\+?\d{6,20}", cleaned):
            raise ValueError("Invalid phone number")
        return v.strip()

    @field_validator("name", "service", "message")
    @classmethod
    def strip_text(cls, v: str) -> str:
        return v.strip()


class QuoteRequestOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: str
    service: str
    message: str
    created_at: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "CCTV API online"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


def _build_email_html(payload: QuoteRequestIn, request_id: str, ts: str) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#0a0a0a;padding:24px;color:#fff;">
      <tr><td>
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#121212;border:1px solid #262626;">
          <tr><td style="padding:24px;border-bottom:1px solid #262626;">
            <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#FF3B30;">New Quote Request</div>
            <div style="font-size:22px;font-weight:800;margin-top:4px;">{payload.name}</div>
            <div style="font-size:12px;color:#a1a1aa;margin-top:4px;">Reference: {request_id} · {ts}</div>
          </td></tr>
          <tr><td style="padding:24px;">
            <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#e4e4e7;">
              <tr><td style="color:#a1a1aa;width:120px;">Email</td><td>{payload.email}</td></tr>
              <tr><td style="color:#a1a1aa;">Phone</td><td>{payload.phone}</td></tr>
              <tr><td style="color:#a1a1aa;">Service</td><td>{payload.service}</td></tr>
              <tr><td style="color:#a1a1aa;vertical-align:top;">Message</td><td style="white-space:pre-wrap;">{payload.message}</td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:16px 24px;border-top:1px solid #262626;font-size:11px;color:#71717a;">
            Sent from your CCTV website quote form.
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def _send_quote_email(payload: QuoteRequestIn, request_id: str, ts: str) -> Optional[str]:
    if not resend.api_key or not DESTINATION_EMAIL:
        logger.warning("Resend not configured; skipping email send.")
        return None
    params = {
        "from": SENDER_EMAIL,
        "to": [DESTINATION_EMAIL],
        "reply_to": payload.email,
        "subject": f"New CCTV Quote Request — {payload.name} ({payload.service})",
        "html": _build_email_html(payload, request_id, ts),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        return result.get("id") if isinstance(result, dict) else None
    except Exception as e:
        logger.error(f"Resend send failed: {e}")
        return None


@api_router.post("/quote", response_model=QuoteRequestOut)
async def create_quote(payload: QuoteRequestIn, request: Request):
    # Honeypot — silently reject if filled
    if payload.website:
        logger.info("Honeypot triggered; rejecting submission.")
        raise HTTPException(status_code=400, detail="Invalid submission")

    request_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    ts_iso = now.isoformat()

    doc = {
        "id": request_id,
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "service": payload.service,
        "message": payload.message,
        "created_at": ts_iso,
        "ip": request.client.host if request.client else None,
        "email_id": None,
        "email_sent": False,
    }

    email_id = await _send_quote_email(payload, request_id, ts_iso)
    if email_id:
        doc["email_id"] = email_id
        doc["email_sent"] = True

    await db.quote_requests.insert_one(doc)

    return QuoteRequestOut(
        id=request_id,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        service=payload.service,
        message=payload.message,
        created_at=ts_iso,
    )


@api_router.get("/quotes", response_model=List[QuoteRequestOut])
async def list_quotes():
    items = await db.quote_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return [
        QuoteRequestOut(
            id=i["id"],
            name=i["name"],
            email=i["email"],
            phone=i["phone"],
            service=i["service"],
            message=i["message"],
            created_at=i["created_at"],
        )
        for i in items
    ]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
