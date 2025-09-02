import requests
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import sys
import os

# این بخش به اسکریپت ما اجازه می‌دهد که فایل‌های database و models را پیدا کند
# دقیقاً همان کاری که در env.py انجام دادیم
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from database import SQLALCHEMY_DATABASE_URL
from models import Protocol

# ایجاد یک اتصال (Session) به پایگاه داده
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

def fetch_and_store_protocols():
    """
    داده‌ها را از API DeFiLlama دریافت کرده و در پایگاه داده ذخیره می‌کند.
    """
    print("Fetching protocols from DeFiLlama API...")

    # آدرس API برای دریافت لیست تمام پروتکل‌ها
    url = "https://api.llama.fi/protocols"

    try:
        # ارسال درخواست به API
        response = requests.get(url)
        response.raise_for_status()  # اگر خطایی رخ دهد (مثل 404 یا 500)، اینجا متوقف می‌شود

        protocols_data = response.json()
        print(f"Successfully fetched {len(protocols_data)} protocols.")

        count = 0
        for proto in protocols_data:
            # بررسی اینکه آیا پروتکل از قبل در پایگاه داده وجود دارد یا نه
            existing_protocol = db.query(Protocol).filter(Protocol.name == proto['name']).first()

            if not existing_protocol:
                # اگر وجود نداشت، یک رکورد جدید ایجاد کن
                new_protocol = Protocol(
                    name=proto['name'],
                    category=proto.get('category', 'N/A'), # اگر دسته‌بندی وجود نداشت، 'N/A' را قرار بده
                    tvl=proto.get('tvl', 0) # اگر TVL وجود نداشت، 0 را قرار بده
                )
                db.add(new_protocol)
                count += 1

        # ذخیره تمام تغییرات در پایگاه داده
        db.commit()
        print(f"Successfully added {count} new protocols to the database.")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from API: {e}")
    finally:
        # بستن اتصال به پایگاه داده
        db.close()

if __name__ == "__main__":
    fetch_and_store_protocols()