from fastapi import FastAPI
from database import engine, Base
from routes import tasks

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(tasks.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Productivity Tracking System"}
