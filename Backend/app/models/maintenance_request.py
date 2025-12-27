from sqlalchemy import (
    Column, Integer, String, Enum, ForeignKey,
    Date, DateTime, Numeric
)
from sqlalchemy.sql import func
from app.database import Base
import enum


class RequestType(enum.Enum):
    Corrective = "Corrective"
    Preventive = "Preventive"


class RequestStatus(enum.Enum):
    New = "New"
    In_Progress = "In Progress"
    Repaired = "Repaired"
    Scrap = "Scrap"


class MaintenanceRequest(Base):
    __tablename__ = "maintenance_requests"

    id = Column(Integer, primary_key=True)
    request_number = Column(String, unique=True, nullable=False)

    type = Column(Enum(RequestType), nullable=False)
    subject = Column(String, nullable=False)
    description = Column(String)

    equipment_id = Column(Integer, ForeignKey("equipment.id"), nullable=False)
    team_id = Column(Integer, ForeignKey("maintenance_teams.id"), nullable=False)
    assigned_technician_id = Column(Integer, ForeignKey("users.id"))

    status = Column(Enum(RequestStatus), default=RequestStatus.New)

    scheduled_date = Column(Date)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    duration_hours = Column(Numeric(5, 2))

    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
