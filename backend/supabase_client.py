import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client

# Explicitly point to backend/.env regardless of working directory
load_dotenv(Path(__file__).parent / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
