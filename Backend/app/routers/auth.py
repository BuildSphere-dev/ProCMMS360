from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import cast
from app.database import get_db
from app.models.user import User, UserRole
from app.core.jwt import create_access_token
from app.core.security import hash_password, verify_password
from app.core.auth import get_current_user
from app.schemas.auth import SignupRequest, LoginRequest
from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter(tags=["Auth"])


@router.post("/signup")
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(400, "Email already registered")

    user = User(
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
        role=UserRole.employee
    )
    db.add(user)
    db.commit()
    return {"message": "User created successfully"}


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, cast(str,user.password_hash)):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.id})
    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.post("/logout")
def logout(_: User = Depends(get_current_user)):
    return {"message": "Logged out successfully"}