from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.models.maintenance_request import (
    MaintenanceRequest,
    RequestStatus,
)
from app.models.equipment import Equipment
from app.schemas.maintenance_requests import MaintenanceRequestCreate

router = APIRouter()


@router.post("/")
def create_request(payload: MaintenanceRequestCreate, db: Session = Depends(get_db)):
    eq = db.query(Equipment).get(payload.equipment_id)
    if not eq or eq.is_scrapped:
        raise HTTPException(400, "Invalid equipment")

    req = MaintenanceRequest(
        request_number=f"REQ-{int(datetime.utcnow().timestamp())}",
        type=payload.type,
        subject=payload.subject,
        equipment_id=eq.id,
        team_id=eq.maintenance_team_id,
        scheduled_date=payload.scheduled_date,
    )
    db.add(req)
    db.commit()
    db.refresh(req)
    return req


@router.get("/")
def list_requests(
    status: RequestStatus | None = None,
    team_id: int | None = None,
    equipment_id: int | None = None,
    assigned_technician_id: int | None = None,
    type: str | None = None,
    db: Session = Depends(get_db)
):
    q = db.query(MaintenanceRequest)
    if status:
        q = q.filter(MaintenanceRequest.status == status)
    if team_id:
        q = q.filter(MaintenanceRequest.team_id == team_id)
    if equipment_id:
        q = q.filter(MaintenanceRequest.equipment_id == equipment_id)
    if assigned_technician_id:
        q = q.filter(MaintenanceRequest.assigned_technician_id == assigned_technician_id)
    if type:
        q = q.filter(MaintenanceRequest.type == type)
    return q.all()


@router.put("/{id}/assign")
def assign_request(id: int, technician_id: int, db: Session = Depends(get_db)):
    req = db.query(MaintenanceRequest).get(id)
    req.assigned_technician_id = technician_id
    db.commit()
    return {"message": "Assigned"}


@router.put("/{id}/start")
def start_request(id: int, db: Session = Depends(get_db)):
    req = db.query(MaintenanceRequest).get(id)
    req.status = RequestStatus.In_Progress
    req.start_time = datetime.utcnow()
    db.commit()
    return {"message": "Started"}


@router.put("/{id}/complete")
def complete_request(id: int, db: Session = Depends(get_db)):
    req = db.query(MaintenanceRequest).get(id)
    req.status = RequestStatus.Repaired
    req.end_time = datetime.utcnow()
    db.commit()
    return {"message": "Completed"}


@router.put("/{id}/scrap")
def scrap_request(id: int, db: Session = Depends(get_db)):
    req = db.query(MaintenanceRequest).get(id)
    req.status = RequestStatus.Scrap
    req.equipment.is_scrapped = True
    db.commit()
    return {"message": "Scrapped"}


@router.get("/kanban")
def kanban(db: Session = Depends(get_db)):
    return {
        "New": db.query(MaintenanceRequest).filter(MaintenanceRequest.status == RequestStatus.New).all(),
        "In Progress": db.query(MaintenanceRequest).filter(MaintenanceRequest.status == RequestStatus.In_Progress).all(),
        "Repaired": db.query(MaintenanceRequest).filter(MaintenanceRequest.status == RequestStatus.Repaired).all(),
        "Scrap": db.query(MaintenanceRequest).filter(MaintenanceRequest.status == RequestStatus.Scrap).all(),
    }


@router.get("/calendar")
def calendar(start_date: str, end_date: str, db: Session = Depends(get_db)):
    return db.query(MaintenanceRequest).filter(
        MaintenanceRequest.scheduled_date.between(start_date, end_date),
        MaintenanceRequest.type == "Preventive"
    ).all()
