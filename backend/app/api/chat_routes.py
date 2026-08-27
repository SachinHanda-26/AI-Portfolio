import uuid
import json
import hashlib
from fastapi import APIRouter, Request
from sse_starlette.sse import EventSourceResponse
from app.models.schemas import ChatRequest
from app.services.rag_pipeline import run_rag_pipeline
from app.services.db import get_db

router = APIRouter()

@router.post("")
async def ask_question(request: Request, body: ChatRequest):
    sid = body.sessionId or str(uuid.uuid4())
    
    async def sse_generator():
        try:
            stream, sources = await run_rag_pipeline(body.message)
            
            # Send sources first
            yield {
                "data": json.dumps({"type": "sources", "sources": sources, "sessionId": sid})
            }
            
            full_answer = ""
            # Yield chunks as they arrive
            async for chunk in stream:
                full_answer += chunk
                yield {
                    "data": json.dumps({"type": "content", "content": chunk})
                }
            
            # Send completion signal
            yield {
                "data": "[DONE]"
            }
            
            # Background task: Save to MongoDB
            try:
                db = await get_db()
                ip_str = request.client.host if request.client else "unknown"
                ip_hash = hashlib.sha256(ip_str.encode()).hexdigest()[:16]
                
                await db.conversations.update_one(
                    {"sessionId": sid},
                    {
                        "$setOnInsert": {
                            "sessionId": sid,
                            "ipHash": ip_hash,
                            "userAgent": request.headers.get("user-agent", "")
                        },
                        "$push": {
                            "messages": {
                                "$each": [
                                    {"role": "user", "content": body.message},
                                    {"role": "assistant", "content": full_answer}
                                ]
                            }
                        }
                    },
                    upsert=True
                )
            except Exception as e:
                print(f"[DB] Conversation logging skipped: {e}")
                
        except Exception as e:
            print(f"[SSE] Error in generator: {e}")
            yield {
                "data": json.dumps({"type": "error", "message": "Streaming interrupted."})
            }

    return EventSourceResponse(sse_generator())

@router.get("/suggestions")
async def get_suggestions():
    return {
        "suggestions": [
            "What are Sachin's strongest technical skills?",
            "Tell me about the SupportGenie AI project",
            "Why should we hire Sachin?",
            "What is Sachin's educational background?",
            "Tell me about his hackathon win",
        ]
    }
