from pydantic import BaseModel

# Defines the basic structure for a protocol.
# It's used as a base for other schemas to avoid repetition.
class ProtocolBase(BaseModel):
    name: str
    category: str | None = None # This field can be optional (nullable)
    tvl: float

# This schema is used when reading/returning data from the API.
# It inherits from ProtocolBase and adds the 'id'.
class Protocol(ProtocolBase):
    id: int

    # Pydantic's orm_mode will tell the Pydantic model to read the data
    # even if it is not a dict, but an ORM model (or any other arbitrary object with attributes).
    class Config:
        from_attributes = True