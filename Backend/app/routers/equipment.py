from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.equipment import Equipment
from app.models.maintenance_request import MaintenanceRequest, RequestStatus
from app.schemas.equipment import EquipmentCreate,  EquipmentUpdate
from app.core.auth import get_current_user
from app.core.swagger import oauth2_scheme
from fastapi import APIRouter, Depends

router = APIRouter(
    dependencies=[
        Depends(get_current_user)
    ],
    # 👇 THIS MAKES SWAGGER SHOW 🔒
    responses={401: {"description": "Unauthorized"}},
)


@router.post("/")
def create_equipment(payload: EquipmentCreate, db: Session = Depends(get_db)):
    equipment = Equipment(**payload.dict())
    db.add(equipment)
    db.commit()
    db.refresh(equipment)
    return equipment


@router.get("/")
def list_equipment(
    department_id: int | None = None,
    assigned_employee_id: int | None = None,
    maintenance_team_id: int | None = None,
    is_scrapped: bool | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Equipment)
    if department_id is not None:
        query = query.filter(Equipment.department_id == department_id)
    if assigned_employee_id is not None:
        query = query.filter(Equipment.assigned_employee_id == assigned_employee_id)
    if maintenance_team_id is not None:
        query = query.filter(Equipment.maintenance_team_id == maintenance_team_id)
    if is_scrapped is not None:
        query = query.filter(Equipment.is_scrapped == is_scrapped)

    return query.all()


@router.get("/{equipment_id}")
def get_equipment(equipment_id: int, db: Session = Depends(get_db)):
    eq = db.query(Equipment).get(equipment_id)
    if not eq:
        raise HTTPException(404, "Equipment not found")
    return eq


@router.put("/{equipment_id}")
def update_equipment(
    equipment_id: int,
    payload: EquipmentUpdate,   # ✅ CORRECT SCHEMA
    db: Session = Depends(get_db)
):
    eq = db.query(Equipment).filter(Equipment.id == equipment_id).first()
    if not eq:
        raise HTTPException(404, "Equipment not found")

    update_data = payload.dict(exclude_unset=True)

    for field, value in update_data.items():
        setattr(eq, field, value)

    db.commit()
    db.refresh(eq)
    return eq


@router.get("/{equipment_id}/maintenance-requests")
def equipment_requests(equipment_id: int, db: Session = Depends(get_db)):
    return db.query(MaintenanceRequest).filter(
        MaintenanceRequest.equipment_id == equipment_id
    ).all()


@router.get("/{equipment_id}/maintenance-count")
def equipment_open_count(equipment_id: int, db: Session = Depends(get_db)):
    count = db.query(MaintenanceRequest).filter(
        MaintenanceRequest.equipment_id == equipment_id,
        MaintenanceRequest.status.in_([RequestStatus.New, RequestStatus.In_Progress])
    ).count()
    return {"count": count}
