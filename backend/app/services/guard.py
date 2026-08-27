import re

# Keywords indicating relevance to a portfolio / software engineering context
TECH_KEYWORDS = [
    'sachin', 'handa', 'portfolio', 'resume', 'cv', 'experience', 'education',
    'project', 'devtinder', 'cinemind', 'supportgenie', 'patent', 'hackathon',
    'skills', 'react', 'node', 'express', 'mongodb', 'mern', 'javascript',
    'python', 'ai', 'rag', 'langchain', 'langgraph', 'llm', 'groq', 'huggingface',
    'java', 'aws', 'cloud', 'github', 'linkedin', 'contact', 'hire', 'work',
    'achievement', 'strength', 'weakness', 'weakeness', 'goal', 'interview', 'cgc', 'landran',
    'job', 'full-time', 'fulltime', 'part-time', 'internship', 'intern', 'organization', 'company',
    'hello', 'hi', 'hey', 'who', 'what', 'why', 'how', 'ok', 'okay',
    'good', 'great', 'thanks', 'thank', 'awesome', 'nice', 'cool', 'perfect',
    'nothing', 'no', 'nope', 'none', 'bye', 'goodbye', 'quit', 'exit'
]

def is_query_relevant(query: str) -> bool:
    """
    Very lightweight heuristic guard.
    Returns True if the query appears relevant to the portfolio domain, False otherwise.
    """
    if len(query) > 500:
        return False # Too long, likely an injection or abuse

    query_lower = query.lower()
    
    # Check if any tech/portfolio keyword is in the query
    # We use word boundaries to avoid partial matches, except for basic terms
    for word in TECH_KEYWORDS:
        if word in query_lower:
            return True
            
    # If no keywords matched, we reject it as off-topic to save vector search and LLM calls.
    return False

def get_rejection_message() -> str:
    return "I am Sachin's AI assistant. I can only answer questions related to his portfolio, skills, projects, and professional experience. How can I help you with that?"
