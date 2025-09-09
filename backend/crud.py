from sqlalchemy.orm import Session
from . import models

def get_protocols(db: Session, skip: int = 0, limit: int = 100):
    """
    Retrieve a list of protocols from the database with pagination.
    """
    return db.query(models.Protocol).offset(skip).limit(limit).all()

def get_protocol_by_id(db: Session, protocol_id: int):
    """
    Retrieve a single protocol by its ID.
    """
    return db.query(models.Protocol).filter(models.Protocol.id == protocol_id).first()
