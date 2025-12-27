from fastapi import Depends, HTTPException, status
from app.models.user import User, UserRole
from sqlalchemy.orm import Session
from app.database import get_db


# TEMP AUTH (replace with JWT later)
def get_current_user(db: Session = Depends(get_db)) -> User:
    user = db.query(User).first()
    if not user:
        raise HTTPException(status_code=401, detail="Unauthenticated")
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
