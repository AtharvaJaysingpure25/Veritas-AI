from passlib.context import CryptContext
import re

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str):
    # bcrypt limitation: max 72 bytes
    if len(password.encode("utf-8")) > 72:
        raise ValueError("Password too long (max 72 bytes)")
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def is_strong_password(password: str):
    """
    Password Rules:
    - Minimum 8 characters
    - Maximum 72 bytes (bcrypt limit)
    - At least 1 uppercase
    - At least 1 lowercase
    - At least 1 digit
    - At least 1 special character
    """

    if len(password) < 8:
        return False, "Password must be at least 8 characters"

    if len(password.encode("utf-8")) > 72:
        return False, "Password too long (max 72 bytes)"

    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least 1 uppercase letter"

    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least 1 lowercase letter"

    if not re.search(r"[0-9]", password):
        return False, "Password must contain at least 1 number"

    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False, "Password must contain at least 1 special character"

    return True, "Strong password"