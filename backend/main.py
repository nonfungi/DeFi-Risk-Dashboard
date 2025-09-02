from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import List

# Import our custom modules
import crud
import models
import schemas
from database import SessionLocal, engine

# This line is not strictly necessary since we use Alembic for migrations,
# but it ensures tables are created on first run if they don't exist.
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DeFi Risk Dashboard API",
    description="API for accessing DeFi protocol risk and data.",
    version="0.1.0"
)

# Dependency: Manages database sessions.
# This function creates a new database session for each request
# and ensures it's closed afterward.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the DeFi Risk Dashboard Backend!"}


# API Endpoint to read protocols
@app.get("/protocols/", response_model=List[schemas.Protocol], tags=["Protocols"])
def read_protocols(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve a list of DeFi protocols from the database.
    """
    protocols = crud.get_protocols(db, skip=skip, limit=limit)
    return protocols