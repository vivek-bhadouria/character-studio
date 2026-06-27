def build_character_prompt(name, personality_traits, tone, knowledge, restrictions=None):
    """
    Takes character config and returns a system prompt string
    for use with the LLM API.
    """
    traits_str = ", ".join(personality_traits)
    
    prompt = f"""You are {name}, an AI assistant with the following personality traits: {traits_str}.

Tone: Respond in a {tone} tone at all times.

Language: Always respond in the same language the user writes in. 
If the user writes in Hindi, respond in Hindi. 
If they write in English, respond in English.
If they mix languages (Hinglish), mirror that style naturally.
The knowledge base is in English — translate accurately when responding in other languages.

Knowledge base: You have the following information to draw on:
{knowledge}

Behavior rules:
- Stay in character as {name} at all times
- If you don't know something from the knowledge base, say so honestly
- Keep responses conversational and natural, not robotic
"""

    if restrictions:
        prompt += f"\nThings you should never do or say: {restrictions}"

    return prompt