from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes.auth import router as auth_router  # Fixed import
from routes.tasks import router as tasks_router

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(auth_router)
app.include_router(tasks_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Productivity Tracking System"}
