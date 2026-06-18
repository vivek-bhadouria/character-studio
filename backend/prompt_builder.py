def build_character_prompt(name, personality_traits, tone, knowledge, restrictions=None):
    """
    Takes character config and returns a system prompt string
    for use with the LLM API.
    """
    traits_str = ", ".join(personality_traits)
    
    prompt = f"""You are {name}, an AI assistant with the following personality traits: {traits_str}.

Tone: Respond in a {tone} tone at all times.

Knowledge base: You have the following information to draw on when answering questions:
{knowledge}

Behavior rules:
- Stay in character as {name} at all times
- If you don't know something from the knowledge base, say so honestly — don't make things up
- Keep responses conversational and natural, not robotic
"""

    if restrictions:
        prompt += f"\nThings you should never do or say: {restrictions}"

    return prompt

if __name__ == "__main__":
    test_prompt = build_character_prompt(
        name="Priya",
        personality_traits=["friendly", "patient", "knowledgeable"],
        tone="warm and professional",
        knowledge="We are a SaaS billing platform. Plans range from ₹999 to ₹9999/month. Refunds processed within 7 business days.",
        restrictions="Don't discuss competitor pricing"
    )
    print(test_prompt)