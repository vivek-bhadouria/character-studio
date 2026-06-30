import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import anthropic
from backend.prompt_builder import build_character_prompt
from backend.database import init_db, create_character_db, get_character, seed_default_character

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

# Initialize DB on startup
init_db()
seed_default_character()

@app.get("/health")
def health():
    return {"status": "ok"}

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = []

class CharacterRequest(BaseModel):
    name: str
    personality_traits: List[str]
    tone: str
    knowledge: str
    restrictions: Optional[str] = None

@app.post("/character")
def create_new_character(request: CharacterRequest):
    if not request.knowledge.strip():
        raise HTTPException(status_code=400, detail="Knowledge base cannot be empty")
    if not request.name.strip():
        raise HTTPException(status_code=400, detail="Character name is required")

    char_id = create_character_db(
        name=request.name,
        personality_traits=request.personality_traits,
        tone=request.tone,
        knowledge=request.knowledge,
        restrictions=request.restrictions
    )
    return {
        "id": char_id,
        "chat_url": f"/chat/{char_id}",
        "message": f"Character '{request.name}' created successfully"
    }

@app.get("/character/{character_id}")
def get_character_details(character_id: str):
    character = get_character(character_id)
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")
    return {
        "id": character["id"],
        "name": character["name"],
        "tone": character["tone"],
        "personality_traits": character["personality_traits"]
    }

@app.post("/chat/{character_id}")
def chat(character_id: str, request: ChatRequest):
    character = get_character(character_id)
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")

    system_prompt = build_character_prompt(
        name=character["name"],
        personality_traits=character["personality_traits"],
        tone=character["tone"],
        knowledge=character["knowledge"],
        restrictions=character["restrictions"]
    )

    messages = [{"role": m.role, "content": m.content} for m in request.history]
    messages.append({"role": "user", "content": request.message})

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=500,
        system=system_prompt,
        messages=messages
    )

    return {"reply": response.content[0].text}
