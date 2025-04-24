from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.task import Task
from models.reminder import Reminder
from database import SessionLocal
from datetime import datetime
from schemas import TaskCreateRequest, ReminderCreateRequest

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/tasks")
def create_task(task: TaskCreateRequest, db: Session = Depends(get_db)):
    new_task = Task(
        title=task.title,
        due_date=task.due_date,
        student_id=task.student_id
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@router.get("/tasks/student/{student_id}")
def get_tasks(student_id: int, db: Session = Depends(get_db)):
    tasks = db.query(Task).filter(Task.student_id == student_id).all()
    if not tasks:
        return []
    return tasks

@router.put("/tasks/{task_id}")
def update_task(task_id: int, task: TaskCreateRequest, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db_task.title = task.title
    db_task.due_date = task.due_date
    db_task.student_id = task.student_id

    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}

@router.post("/tasks/{task_id}/reminders")
def set_reminder(
    task_id: int,
    reminder: ReminderCreateRequest,
    db: Session = Depends(get_db)
):
    task = db.query(Task).get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    new_reminder = Reminder(
        reminder_time=reminder.reminder_time,
        task_id=task_id
    )
    db.add(new_reminder)
    db.commit()
    return {"message": f"Reminder set for {reminder.reminder_time}"}

@router.get("/tasks/{task_id}/reminders")
def get_reminders(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return db.query(Reminder).filter(Reminder.task_id == task_id).all()