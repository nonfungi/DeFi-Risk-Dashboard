from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

# 1. Import the CORS middleware
from fastapi.middleware.cors import CORSMiddleware

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DeFi Risk Dashboard API",
    description="API for accessing DeFi protocol risk and data.",
    version="0.1.0"
)

# 2. Define the list of allowed origins
origins = [
    "http://localhost:3000", # The address of your Next.js frontend
    "http://10.102.37.150:3000"
    
]

# 3. Add the middleware to your app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)

# ... the rest of your file remains the same ...

# Dependency
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


# API Endpoint to read a single protocol
@app.get("/protocols/{protocol_id}", response_model=schemas.Protocol, tags=["Protocols"])
def read_protocol(protocol_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a single protocol by its ID.
    """
    db_protocol = crud.get_protocol_by_id(db, protocol_id=protocol_id)
    if db_protocol is None:
        raise HTTPException(status_code=404, detail="Protocol not found")
    return db_protocol


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)