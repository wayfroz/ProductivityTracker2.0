from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Reminder(Base):
    __tablename__ = 'reminders'
    
    id = Column(Integer, primary_key=True)
    reminder_time = Column(DateTime)
    task_id = Column(Integer, ForeignKey('tasks.id'))
    
    task = relationship("Task", back_populates="reminders")