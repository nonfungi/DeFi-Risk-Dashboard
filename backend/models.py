from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.dialects.postgresql import ARRAY 
from .database import Base

class Protocol(Base):
    __tablename__ = "protocols"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    category = Column(String)
    tvl = Column(Float)
    
    # New fields
    url = Column(String, nullable=True)
    logo = Column(String, nullable=True)
    chains = Column(ARRAY(String), nullable=True)