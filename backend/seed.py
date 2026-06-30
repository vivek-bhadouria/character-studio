from backend.database import init_db, create_character_db

init_db()

char_id = create_character_db(
    name="Priya",
    personality_traits=["friendly", "patient", "knowledgeable"],
    tone="warm and professional",
    knowledge="We are a SaaS billing platform. Plans range from ₹999 to ₹9999/month. Refunds processed within 7 business days.",
    restrictions="Don't discuss competitor pricing"
)

print(f"Priya created with ID: {char_id}")
