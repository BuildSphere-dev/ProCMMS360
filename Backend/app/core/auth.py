from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt, JWTError
import os
from typing import Final

from app.database import get_db
from app.models.user import User, UserRole

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

_secret = os.getenv("JWT_SECRET_KEY")
if _secret is None:
    raise RuntimeError("JWT_SECRET_KEY is not set")

SECRET_KEY: Final[str] = _secret
ALGORITHM: Final[str] = os.getenv("JWT_ALGORITHM", "HS256")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).get(int(user_id))
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


def require_role(*roles: UserRole):
    def checker(user: User = Depends(get_current_user)):
        if user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return user
    return checker
