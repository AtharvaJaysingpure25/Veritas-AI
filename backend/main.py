from fastapi import FastAPI
from api.routes import router

app = FastAPI(
    title="EduGuard AI",
    version="1.0"
)

@app.get("/")
def home():
    return {
        "message": "EduGuard AI Backend is running 🚀"
    }

app.include_router(router)