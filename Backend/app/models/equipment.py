from sqlalchemy import (
    Column, Integer, String, Boolean, Date, Enum, ForeignKey, DateTime
)
from sqlalchemy.sql import func
from app.database import Base
import enum


class EquipmentCategory(enum.Enum):
    Mechanical = "Mechanical"
    Electrical = "Electrical"
    IT = "IT"
    Vehicle = "Vehicle"
    Other = "Other"


class Equipment(Base):
    __tablename__ = "equipment"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    serial_number = Column(String, unique=True, nullable=False)

    category = Column(Enum(EquipmentCategory), nullable=False)

    department_id = Column(Integer, ForeignKey("departments.id"))
    assigned_employee_id = Column(Integer, ForeignKey("users.id"))
    maintenance_team_id = Column(Integer, ForeignKey("maintenance_teams.id"))
    default_technician_id = Column(Integer, ForeignKey("users.id"))

    purchase_date = Column(Date)
    warranty_expiry_date = Column(Date)
    location = Column(String)

    is_scrapped = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
