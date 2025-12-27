from fastapi import FastAPI
from app.database import Base, engine
from app.models import *

from app.routers import (
    equipment,
    teams,
    maintenance_request,
    users,
    auth,
)

app = FastAPI(title="FixTrack API")

@app.on_event("startup")
def startup_db():
    Base.metadata.create_all(bind=engine)

app.get("/")(lambda: {"status": "ok"})

app.include_router(equipment.router, prefix="/api/equipment", tags=["Equipment"])
app.include_router(teams.router, prefix="/api/maintenance-teams", tags=["Teams"])
app.include_router(maintenance_request.router, prefix="/api/maintenance-requests", tags=["Maintenance Requests"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
