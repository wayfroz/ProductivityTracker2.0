from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Student(Base):
    __tablename__ = 'students'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(100))  # Simplified for initial implementation
    
    tasks = relationship("Task", back_populates="student")