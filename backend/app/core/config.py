from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    GROQ_API_KEY: str
    GROQ_MODEL: str = "openai/gpt-oss-20b"
    MONGODB_URI: str
    HF_API_TOKEN: Optional[str] = None # No longer strictly required since we use local sentence-transformers, but good to keep if available
    CLIENT_URL: str = "http://localhost:5173" # For CORS
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
