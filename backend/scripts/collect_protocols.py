import requests
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import sys
import os

# This allows our script to find the 'backend' package
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from backend.database import SQLALCHEMY_DATABASE_URL
from backend.models import Protocol

# Create a new session to the database
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

def fetch_and_store_protocols():
    """
    Fetches protocol data from the DeFiLlama API and stores/updates it in the database.
    """
    print("Fetching protocols from DeFiLlama API...")
    url = "https://api.llama.fi/protocols"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Stop if there's an HTTP error

        protocols_data = response.json()
        print(f"Successfully fetched {len(protocols_data)} protocols.")

        new_protocols_count = 0
        updated_protocols_count = 0

        for proto in protocols_data:
            # Check if the protocol already exists in the database
            existing_protocol = db.query(Protocol).filter(Protocol.name == proto['name']).first()

            if existing_protocol:
                # If it exists, update its fields
                existing_protocol.category = proto.get('category', 'N/A')
                existing_protocol.tvl = proto.get('tvl', 0)
                existing_protocol.url = proto.get('url')
                existing_protocol.logo = proto.get('logo')
                existing_protocol.chains = proto.get('chains')
                updated_protocols_count += 1
            else:
                # If it does not exist, create a new record
                new_protocol = Protocol(
                    name=proto['name'],
                    category=proto.get('category', 'N/A'),
                    tvl=proto.get('tvl', 0),
                    url=proto.get('url'),
                    logo=proto.get('logo'),
                    chains=proto.get('chains')
                )
                db.add(new_protocol)
                new_protocols_count += 1
        
        # Commit all the changes to the database
        db.commit()
        print(f"Successfully added {new_protocols_count} new protocols.")
        print(f"Successfully updated {updated_protocols_count} existing protocols.")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from API: {e}")
        db.rollback() # Rollback changes if an error occurs
    finally:
        # Close the database session
        db.close()

if __name__ == "__main__":
    fetch_and_store_protocols()
