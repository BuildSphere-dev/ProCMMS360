from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.models.user import UserRole


# =========================
# Base User Schema
# =========================

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: UserRole
    avatar_url: Optional[str] = None
    is_active: bool = True


# =========================
# Create User (POST)
# =========================

class UserCreate(UserBase):
    pass


# =========================
# Read User (Response)
# =========================

class UserRead(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True   # SQLAlchemy → Pydantic
