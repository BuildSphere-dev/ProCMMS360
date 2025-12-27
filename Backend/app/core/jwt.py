from datetime import datetime, timedelta
from jose import jwt
import os
from typing import Final

_secret = os.getenv("JWT_SECRET_KEY")
if _secret is None:
    raise RuntimeError("JWT_SECRET_KEY is not set")

SECRET_KEY: Final[str] = _secret  # ✅ rebind as str

ALGORITHM: Final[str] = os.getenv("JWT_ALGORITHM", "HS256")
EXPIRE_MINUTES: Final[int] = int(os.getenv("JWT_EXPIRE_MINUTES", "60"))


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
