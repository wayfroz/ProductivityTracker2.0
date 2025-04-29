from pydantic import BaseModel
from datetime import datetime

# User signup schema
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

# User login schema
class LoginRequest(BaseModel):
    email: str
    password: str

# Task creation schema
class TaskCreateRequest(BaseModel):
    title: str
    due_date: datetime
    student_id: int

# Task update schema
class TaskUpdateRequest(BaseModel):
    title: str
    due_date: datetime

# Reminder creation schema
class ReminderCreateRequest(BaseModel):
    reminder_time: datetime

# Response schema for student‐wide reminder
class ReminderResponse(BaseModel):
    id:            int
    task_id:       int
    reminder_time: datetime
    task_title:    str

    class Config:
        orm_mode = True
