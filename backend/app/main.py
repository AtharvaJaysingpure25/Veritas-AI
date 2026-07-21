from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.core.limiter import limiter
from app.routes import upload, text, auth, chat
from app.database.connection import engine, Base

Base.metadata.create_all(bind=engine)

# ---------------- RATE LIMITER ----------------


app = FastAPI(title="Verify IT Backend")

app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler
)

# IMPORTANT
app.add_middleware(SlowAPIMiddleware)

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- ROUTES ----------------
app.include_router(upload.router)
app.include_router(text.router)
app.include_router(auth.router)
app.include_router(chat.router)


@app.get("/")
def home():
    return {"message": "Veritas AI backend running"}