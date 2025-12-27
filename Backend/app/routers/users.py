from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
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
        role=role
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
