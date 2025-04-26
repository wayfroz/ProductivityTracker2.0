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

# Reminder creation schema
class ReminderCreateRequest(BaseModel):
    reminder_time: datetime
