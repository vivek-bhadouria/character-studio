from backend.supabase_client import supabase
import uuid
import json

def create_character_db(name, personality_traits, tone, knowledge, restrictions=None, user_id=None):
    char_id = str(uuid.uuid4())[:8]
    supabase.table("characters").insert({
        "id": char_id,
        "user_id": user_id,
        "name": name,
        "personality_traits": personality_traits,
        "tone": tone,
        "knowledge": knowledge,
        "restrictions": restrictions
    }).execute()
    return char_id

def get_character(char_id):
    result = supabase.table("characters").select("*").eq("id", char_id).execute()
    if not result.data:
        return None
    row = result.data[0]
    return {
        "id": row["id"],
        "name": row["name"],
        "personality_traits": row["personality_traits"],
        "tone": row["tone"],
        "knowledge": row["knowledge"],
        "restrictions": row["restrictions"]
    }

def seed_default_character():
    existing = supabase.table("characters").select("id").eq("id", "priya-demo").execute()
    if not existing.data:
        supabase.table("characters").insert({
            "id": "priya-demo",
            "user_id": None,
            "name": "Priya",
            "personality_traits": ["friendly", "patient", "knowledgeable", "professional"],
            "tone": "warm and professional",
            "knowledge": "COMPANY: BillEase - SaaS billing and invoicing platform for Indian businesses. PLANS: Starter 999/month, Growth 2999/month, Business 5999/month, Enterprise 9999/month. Annual billing 20% discount. REFUNDS: processed within 7 business days, accepted within 30 days. FEATURES: GST-compliant invoicing, payment reminders, multi-currency, mobile app, bank reconciliation. FREE TRIAL: 14 days no credit card. SUPPORT: support@billease.in, phone Mon-Fri 9am-6pm IST for Business/Enterprise.",
            "restrictions": "Don't discuss competitor products or pricing. Don't make up features or pricing not listed above."
        }).execute()

def init_db():
    # No longer needed - Supabase tables already exist
    pass
