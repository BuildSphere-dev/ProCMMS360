from app.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional
from datetime import date

from app.models.equipment import EquipmentCategory

router = APIRouter(prefix="/api", tags=["API"])

# =========================
# A. EQUIPMENT ROUTES (6)
# =========================

@router.post("/equipment")
def create_equipment(
    name: str,
    serial_number: str,
    category: EquipmentCategory,
    department_id: Optional[int] = None,
    assigned_employee_id: Optional[int] = None,
    maintenance_team_id: Optional[int] = None,
    default_technician_id: Optional[int] = None,
    purchase_date: Optional[date] = None,
    warranty_expiry_date: Optional[date] = None,
    location: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return {
        "message": "Equipment created",
        "data": {
            "name": name,
            "serial_number": serial_number,
            "category": category,
            "maintenance_team_id": maintenance_team_id,
            "default_technician_id": default_technician_id
        }
    }


@router.get("/equipment")
def list_equipment(db: Session = Depends(get_db)):
    return {"message": "List of equipment"}


@router.get("/equipment/{id}")
def get_equipment(id: int, db: Session = Depends(get_db)):
    return {"message": f"Equipment {id}"}


@router.put("/equipment/{id}")
def update_equipment(id: int, payload: dict, db: Session = Depends(get_db)):
    return {"message": f"Equipment {id} updated"}


@router.get("/equipment/{id}/maintenance-requests")
def equipment_maintenance_requests(id: int, db: Session = Depends(get_db)):
    return {"message": f"Maintenance requests for equipment {id}"}


@router.get("/equipment/{id}/maintenance-count")
def equipment_maintenance_count(id: int, db: Session = Depends(get_db)):
    return {"count": 0}


# =========================
# B. MAINTENANCE TEAMS (4)
# =========================

@router.post("/maintenance-teams")
def create_maintenance_team(
    name: str,
    description: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return {
        "message": "Maintenance team created",
        "data": {
            "name": name,
            "description": description
        }
    }


@router.get("/maintenance-teams")
def list_maintenance_teams(db: Session = Depends(get_db)):
    return {"message": "List of maintenance teams"}


@router.post("/maintenance-teams/{team_id}/members")
def add_team_member(
    team_id: int,
    user_id: int,
    db: Session = Depends(get_db)
):
    return {
        "message": "User added to maintenance team",
        "team_id": team_id,
        "user_id": user_id
    }


@router.delete("/maintenance-teams/{id}/members/{user_id}")
def remove_team_member(id: int, user_id: int, db: Session = Depends(get_db)):
    return {"message": f"User {user_id} removed from team {id}"}


# =========================
# C. MAINTENANCE REQUESTS (7)
# =========================

@router.post("/maintenance-requests")
def create_maintenance_request(payload: dict, db: Session = Depends(get_db)):
    return {"message": "Maintenance request created"}


@router.get("/maintenance-requests")
def list_maintenance_requests(db: Session = Depends(get_db)):
    return {"message": "List of maintenance requests"}


@router.put("/maintenance-requests/{id}/assign")
def assign_maintenance_request(id: int, payload: dict, db: Session = Depends(get_db)):
    return {"message": f"Request {id} assigned"}


@router.put("/maintenance-requests/{id}/start")
def start_maintenance_request(id: int, db: Session = Depends(get_db)):
    return {"message": f"Request {id} moved to In Progress"}


@router.put("/maintenance-requests/{id}/complete")
def complete_maintenance_request(id: int, db: Session = Depends(get_db)):
    return {"message": f"Request {id} marked Repaired"}


@router.put("/maintenance-requests/{id}/scrap")
def scrap_maintenance_request(id: int, db: Session = Depends(get_db)):
    return {"message": f"Request {id} scrapped & equipment flagged"}


@router.get("/maintenance-requests/kanban")
def maintenance_kanban_view(db: Session = Depends(get_db)):
    return {
        "new": [],
        "in_progress": [],
        "repaired": [],
        "scrap": []
    }
