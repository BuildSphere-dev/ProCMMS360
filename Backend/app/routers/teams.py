from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.team import MaintenanceTeam, TeamMember
from app.schemas.team import TeamCreate, TeamMemberAdd

router = APIRouter()


@router.post("/")
def create_team(payload: TeamCreate, db: Session = Depends(get_db)):
    team = MaintenanceTeam(**payload.dict())
    db.add(team)
    db.commit()
    db.refresh(team)
    return team


@router.get("/")
def list_teams(db: Session = Depends(get_db)):
    return db.query(MaintenanceTeam).all()


@router.post("/{team_id}/members")
def add_member(team_id: int, payload: TeamMemberAdd, db: Session = Depends(get_db)):
    member = TeamMember(team_id=team_id, user_id=payload.user_id)
    db.add(member)
    db.commit()
    return {"message": "Member added"}


@router.delete("/{team_id}/members/{user_id}")
def remove_member(team_id: int, user_id: int, db: Session = Depends(get_db)):
    db.query(TeamMember).filter(
        TeamMember.team_id == team_id,
        TeamMember.user_id == user_id
    ).delete()
    db.commit()
    return {"message": "Member removed"}
