from pydantic import BaseModel
from typing import Optional
from datetime import date
from app.models.maintenance_request import RequestType


class MaintenanceRequestCreate(BaseModel):
    type: RequestType
    equipment_id: int
    subject: str
    scheduled_date: Optional[date] = None
