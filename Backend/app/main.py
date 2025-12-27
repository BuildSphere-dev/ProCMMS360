from fastapi import FastAPI
from app.database import Base, engine
from app.models import *

from app.routers import equipment, teams, maintenance_request

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FixTrack API")

app.include_router(equipment.router, prefix="/api/equipment", tags=["Equipment"])
app.include_router(teams.router, prefix="/api/maintenance-teams", tags=["Teams"])
app.include_router(
    maintenance_request.router,
    prefix="/api/maintenance_request",
    tags=["Maintenance Requests"]
)

@app.get("/")
def health():
    return {"status": "ok"}
