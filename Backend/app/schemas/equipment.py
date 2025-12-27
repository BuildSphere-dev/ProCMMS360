from pydantic import BaseModel
from typing import Optional
from datetime import date
from app.models.equipment import EquipmentCategory


class EquipmentCreate(BaseModel):
    name: str
    serial_number: str
    category: EquipmentCategory
    department_id: Optional[int] = None
    assigned_employee_id: Optional[int] = None
    maintenance_team_id: Optional[int] = None
    default_technician_id: Optional[int] = None
    purchase_date: Optional[date] = None
    warranty_expiry_date: Optional[date] = None
    location: Optional[str] = None
