from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

MAX_PASSWORD_LENGTH = 72


def _normalize_password(password: str) -> str:
    """
    bcrypt only supports up to 72 bytes.
    We truncate safely to avoid runtime crash.
    """
    return password[:MAX_PASSWORD_LENGTH]


def hash_password(password: str) -> str:
    password = _normalize_password(password)
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    plain = _normalize_password(plain)
    return pwd_context.verify(plain, hashed)
