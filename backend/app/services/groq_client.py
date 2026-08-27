from groq import AsyncGroq
from app.core.config import settings

# Initialize Groq async client
client = AsyncGroq(api_key=settings.GROQ_API_KEY)

async def stream_groq_completion(messages: list[dict]):
    """
    Calls the Groq API and yields an async generator of string chunks.
    """
    stream = await client.chat.completions.create(
        messages=messages,
        model=settings.GROQ_MODEL,
        temperature=0.3,
        max_tokens=512,
        top_p=0.9,
        stream=True,
    )
    
    async for chunk in stream:
        if chunk.choices[0].delta.content:
            yield chunk.choices[0].delta.content
