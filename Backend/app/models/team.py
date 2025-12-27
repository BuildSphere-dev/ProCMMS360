from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class MaintenanceTeam(Base):
    __tablename__ = "maintenance_teams"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String)


class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True)
    team_id = Column(Integer, ForeignKey("maintenance_teams.id", ondelete="CASCADE"))
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
