from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.maintenance_request import MaintenanceRequest, RequestStatus
from app.models.equipment import Equipment
from app.schemas.maintenance_requests import MaintenanceRequestCreate
from app.core.auth import get_current_user
from app.models.user import User

router = APIRouter()


@router.post("/")
def create_request(
    payload: MaintenanceRequestCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    equipment = db.query(Equipment).filter(
        Equipment.id == payload.equipment_id,
        Equipment.is_scrapped == False
    ).first()

    if not equipment:
        raise HTTPException(404, "Equipment not found")

    request = MaintenanceRequest(
        request_number="REQ-TEMP",
        type=payload.type,
        subject=payload.subject,
        equipment_id=equipment.id,
        team_id=equipment.maintenance_team_id,
        created_by=user.id,
        scheduled_date=payload.scheduled_date,
        status=RequestStatus.New
    )

    db.add(request)
    db.commit()
    db.refresh(request)
    return request
