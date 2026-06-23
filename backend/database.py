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

def create_character(name, personality_traits, tone, knowledge, restrictions=None):
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
