from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database import Base


class MaintenanceLog(Base):
    __tablename__ = "maintenance_logs"

    id = Column(Integer, primary_key=True)
    request_id = Column(Integer, ForeignKey("maintenance_requests.id", ondelete="CASCADE"))

    action = Column(String)
    old_status = Column(String)
    new_status = Column(String)

    performed_by = Column(Integer, ForeignKey("users.id"))
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    notes = Column(String)
