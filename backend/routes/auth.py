from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models.student import Student
from schemas import SignupRequest, LoginRequest

router = APIRouter(prefix="/auth")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup(user: SignupRequest, db: Session = Depends(get_db)):
    if db.query(Student).filter(Student.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_student = Student(name=user.name, email=user.email, password=user.password)
    db.add(new_student)
    db.commit()
    return {"message": "User created successfully"}

@router.post("/login")
def login(user: LoginRequest, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.email == user.email).first()
    if not student or student.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}