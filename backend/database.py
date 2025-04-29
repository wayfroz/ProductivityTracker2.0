from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

Base = declarative_base()
engine = create_engine(os.getenv("DB_URL", "mysql+pymysql://your_username:your_password@localhost/db_name"))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
