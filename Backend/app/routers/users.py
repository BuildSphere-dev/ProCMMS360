from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User

router = APIRouter()


@router.get("/")
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.get("/{id}")
def get_user(id: int, db: Session = Depends(get_db)):
    return db.query(User).get(id)
