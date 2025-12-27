from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, UserRole
from app.core.auth import get_current_user

router = APIRouter(
    dependencies=[Depends(get_current_user)]
)


@router.get("/")
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.get("/{id}")
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(User).get(id)
    if not user:
        raise HTTPException(404, "User not found")
    return user


@router.post("/")
def create_user(
    name: str,
    email: str,
    role: str = "employee",
    db: Session = Depends(get_db)
):
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(400, "User already exists")

    user = User(
        name=name,
        email=email,
        role=UserRole(role),
        password_hash="dummy"   # 👈 REQUIRED FIX
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
