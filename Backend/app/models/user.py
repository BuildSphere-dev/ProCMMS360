from sqlalchemy import Column, Integer, String, Enum, Boolean, DateTime
from datetime import datetime
import enum
from app.database import Base


class UserRole(str, enum.Enum):
    employee = "employee"
    technician = "technician"
    manager = "manager"
    admin = "admin"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)  # ✅ IMPORTANT
    role = Column(Enum(UserRole), default=UserRole.employee)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
