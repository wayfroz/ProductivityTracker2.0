# Productivity Tracking System

A full-stack application for managing tasks and reminders, built with FastAPI (Python) backend and Angular frontend.

## Security Notice (For Educational Purposes Only)
   ⚠️ This implementation contains intentional security shortcomings for academic demonstration:  
   - Passwords stored in plaintext  
   - No HTTPS enforcement  
   - Simplified authentication  
   **DO NOT USE IN PRODUCTION**

## Features
- User authentication (Signup/Login)
- Task creation with due dates
- Reminder management
- RESTful API endpoints
- MySQL database integration

## Prerequisites
- Python 3.10+
- MySQL Server 8.0+
- Git

## Installation

1. Clone Repository
	a. clone https://github.com/wayfroz/ProductivityTracker2.0
	b. cd productivity-app

2. Database Setup
	a. mysql -u root -p
	b. CREATE DATABASE productivity_db;
	   CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
	   GRANT ALL PRIVILEGES ON productivity_db.* TO 'your_username'@'localhost';
           FLUSH PRIVILEGES;
	   EXIT;

3. Backend Setup
	a. cd backend
	b. cp .env.example .env  # Update credentials in .env
	c. python -m venv venv
	   source venv/bin/activate  # Linux/Mac
	   venv\Scripts\activate     # Windows
	d. pip install -r requirements.txt

## Running the Application

1. Start Backend
	a. cd backend
	b. uvicorn main:app --reload

# API Docs: http://localhost:8000/docs
# Base URL: http://localhost:8000

## API Endpoints

1. Authentication
	# Signup
	curl -X POST "http://localhost:8000/auth/signup" \
	-H "Content-Type: application/json" \
	-d '{"name":"Test User", "email":"test@school.edu", "password":"123"}'

	# Login
	curl -X POST "http://localhost:8000/auth/login" \
	-H "Content-Type: application/json" \
	-d '{"email":"test@school.edu", "password":"123"}'

2. Tasks
	# Create Task
	curl -X POST "http://localhost:8000/tasks" \
	-H "Content-Type: application/json" \
	-d '{"title":"Final Project", "due_date":"2024-12-15T09:00:00", "student_id":1}'

	# Get Tasks by Student
	curl "http://localhost:8000/tasks/student/1"

3. Reminders
	# Set Reminder
	curl -X POST "http://localhost:8000/tasks/1/reminders" \
	-H "Content-Type: application/json" \
	-d '{"reminder_time":"2024-12-14T18:00:00"}'

	# Get Reminders
	curl "http://localhost:8000/tasks/1/reminders"