from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.team import TeamMember
from app.models.user import User


def user_in_team(db: Session, user: User, team_id: int):
    exists = (
        db.query(TeamMember)
        .filter(
            TeamMember.team_id == team_id,
            TeamMember.user_id == user.id
        )
        .first()
    )

    if not exists:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User not part of this maintenance team"
        )
