from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from app.core.config import settings

# Async client for FastAPI routes
client = AsyncIOMotorClient(settings.MONGODB_URI)
db = client.get_database("test")
chunks_collection = db.get_collection("chunks")
conversations_collection = db.get_collection("conversations")

# Sync client for ingestion script
sync_client = MongoClient(settings.MONGODB_URI)
sync_db = sync_client.get_database("test")
sync_chunks = sync_db.get_collection("chunks")

async def get_db():
    return db
