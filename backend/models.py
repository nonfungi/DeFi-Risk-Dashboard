from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.dialects.postgresql import ARRAY # این رو اضافه می‌کنیم
from .database import Base

class Protocol(Base):
    __tablename__ = "protocols"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    category = Column(String)
    tvl = Column(Float)
    
    # --- فیلدهای جدید ---
    url = Column(String, nullable=True) # لینک وبسایت پروتکل
    logo = Column(String, nullable=True) # لینک لوگوی پروتکل
    chains = Column(ARRAY(String), nullable=True) # لیستی از بلاک‌چین‌هایی که پروتکل روی اونها فعاله