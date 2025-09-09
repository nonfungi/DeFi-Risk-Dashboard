from pydantic import BaseModel
from typing import List, Optional

# Defines the basic structure for a protocol for data validation.
class ProtocolBase(BaseModel):
    name: str
    category: Optional[str] = None
    tvl: float
    url: Optional[str] = None
    logo: Optional[str] = None
    chains: Optional[List[str]] = None

# This schema is used when returning data from the API (includes the ID).
class Protocol(ProtocolBase):
    id: int

    class Config:
        from_attributes = True # Replaces orm_mode in Pydantic v2
