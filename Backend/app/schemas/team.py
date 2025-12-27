from pydantic import BaseModel
from typing import Optional


class TeamCreate(BaseModel):
    name: str
    description: Optional[str] = None


class TeamMemberAdd(BaseModel):
    user_id: int
