import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import anthropic
from backend.prompt_builder import build_character_prompt

load_dotenv()

app = FastAPI()
client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

# Hardcoded test character for today — dynamic config comes later
TEST_CHARACTER = {
    "name": "Priya",
    "personality_traits": ["friendly", "patient", "knowledgeable"],
    "tone": "warm and professional",
    "knowledge": "We are a SaaS billing platform. Plans range from ₹999 to ₹9999/month. Refunds processed within 7 business days.",
    "restrictions": "Don't discuss competitor pricing"
}

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    system_prompt = build_character_prompt(**TEST_CHARACTER)

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=500,
        system=system_prompt,
        messages=[{"role": "user", "content": request.message}]
    )

    return {"reply": response.content[0].text}
