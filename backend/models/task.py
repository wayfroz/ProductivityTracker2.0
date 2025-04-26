from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Task(Base):
    __tablename__ = 'tasks'
    
    id = Column(Integer, primary_key=True)
    title = Column(String(100))
    due_date = Column(DateTime)
    status = Column(String(20), default='pending')
    student_id = Column(Integer, ForeignKey('students.id'))
    
    student = relationship("Student", back_populates="tasks")
    reminders = relationship("Reminder", back_populates="task")