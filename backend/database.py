from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

Base = declarative_base()
engine = create_engine(os.getenv("DB_URL", "mysql+pymysql://app_user:temp_password@localhost/productivity_db"))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
