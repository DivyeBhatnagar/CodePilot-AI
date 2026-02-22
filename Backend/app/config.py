from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # API Keys
    OPENAI_API_KEY: str = ""
    GITHUB_TOKEN: str = ""  # Optional - only needed if using GitHub models
    
    # Firebase
    FIREBASE_PROJECT_ID: str = ""
    FIREBASE_PRIVATE_KEY: str = ""
    FIREBASE_CLIENT_EMAIL: str = ""
    FIREBASE_CREDENTIALS_PATH: str = ""
    
    # Frontend
    FRONTEND_URL: str = "https://codepilotaii.vercel.app"
    
    # Server
    PORT: int = 8000
    
    # Environment
    ENVIRONMENT: str = "production"
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "allow"  # Allow extra fields

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
