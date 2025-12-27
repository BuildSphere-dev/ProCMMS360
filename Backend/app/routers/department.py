from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from Backend.app.core.auth import get_current_user
from app.database import get_db
from app.models.department import Department
from app.schemas.department import DepartmentCreate, DepartmentRead

router = APIRouter(
    dependencies=[Depends(get_current_user)]
)

@router.post("/", response_model=DepartmentRead)
def create_department(
    payload: DepartmentCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(Department).filter(
        Department.name == payload.name
    ).first()

    if existing:
        raise HTTPException(400, "Department already exists")

    dept = Department(name=payload.name)
    db.add(dept)
    db.commit()
    db.refresh(dept)
    return dept


@router.get("/", response_model=list[DepartmentRead])
def list_departments(db: Session = Depends(get_db)):
    return db.query(Department).all()