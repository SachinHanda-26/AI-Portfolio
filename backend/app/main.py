from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.chat_routes import router as chat_router
from app.core.config import settings

app = FastAPI(title="Sachin AI Portfolio API", version="1.0.0")

# Allow CORS for development frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CLIENT_URL, "http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api/chat")

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Python FastAPI backend is running!"}
