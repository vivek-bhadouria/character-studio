import sqlite3
import uuid
import json

DB_PATH = "backend/characters.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS characters (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            personality_traits TEXT NOT NULL,
            tone TEXT NOT NULL,
            knowledge TEXT NOT NULL,
            restrictions TEXT
        )
    """)
    conn.commit()
    conn.close()

def create_character_db(name, personality_traits, tone, knowledge, restrictions=None):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    char_id = str(uuid.uuid4())[:8]
    cursor.execute(
        "INSERT INTO characters VALUES (?, ?, ?, ?, ?, ?)",
        (char_id, name, json.dumps(personality_traits), tone, knowledge, restrictions)
    )
    conn.commit()
    conn.close()
    return char_id

def get_character(char_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM characters WHERE id = ?", (char_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        return None
    return {
        "id": row[0],
        "name": row[1],
        "personality_traits": json.loads(row[2]),
        "tone": row[3],
        "knowledge": row[4],
        "restrictions": row[5]
    }

def seed_default_character():
    """Seeds Priya with a fixed ID. Deletes and recreates to pick up knowledge base changes."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    # Delete and recreate to pick up knowledge base changes
    cursor.execute("DELETE FROM characters WHERE id = 'priya-demo'")
    cursor.execute(
        "INSERT INTO characters VALUES (?, ?, ?, ?, ?, ?)",
        (
            "priya-demo",
            "Priya",
            json.dumps(["friendly", "patient", "knowledgeable", "professional"]),
            "warm and professional",
            """
COMPANY: BillEase — SaaS billing and invoicing platform for Indian businesses.

PLANS & PRICING:
- Starter Plan: ₹999/month — up to 3 users, 50 invoices/month, basic reporting, email support
- Growth Plan: ₹2,999/month — up to 10 users, unlimited invoices, advanced reporting, priority email support, GST filing integration
- Business Plan: ₹5,999/month — up to 25 users, unlimited invoices, API access, custom branding, phone + email support
- Enterprise Plan: ₹9,999/month — unlimited users, unlimited invoices, dedicated account manager, SLA guarantee, custom integrations
- Annual billing available with 20% discount on all plans

REFUND POLICY:
- Refunds processed within 7 business days
- Refund requests accepted within 30 days of purchase
- Annual plan refunds are prorated based on unused months
- No refunds after 30 days

FEATURES (all plans):
- GST-compliant invoicing
- Automatic payment reminders
- Multi-currency support
- Mobile app (iOS and Android)
- Bank reconciliation
- Customer payment portal

GETTING STARTED:
- Free 14-day trial available, no credit card required
- Setup takes under 30 minutes
- Onboarding support included for Growth plan and above
- Data import from Tally, Zoho Books, and QuickBooks supported

SUPPORT:
- Email: support@billease.in
- Phone support: Mon–Fri, 9am–6pm IST (Business and Enterprise plans)
- Help center: help.billease.in
- Average response time: 4 hours for email, immediate for phone
""",
            "Don't discuss competitor products or pricing. Don't make up features or pricing not listed above."
        )
    )
    conn.commit()
    conn.close()
