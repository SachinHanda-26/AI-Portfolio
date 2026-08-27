import re
from typing import List, Dict
import json

def chunk_text(text: str, max_chars: int = 800, overlap: int = 100) -> List[str]:
    """
    Splits text into chunks of ~max_chars with a specified overlap.
    Splits on sentence boundaries when possible.
    """
    if len(text) <= max_chars:
        return [text]

    chunks = []
    # Split by common sentence endings followed by whitespace
    sentences = re.split(r'(?<=[.!?])\s+', text)
    
    current_chunk = ""
    for sentence in sentences:
        if len(current_chunk) + len(sentence) + 1 > max_chars and len(current_chunk) > 0:
            chunks.append(current_chunk.strip())
            # carry over overlap
            current_chunk = current_chunk[-overlap:] + " " + sentence
        else:
            current_chunk = (current_chunk + " " + sentence).strip()
            
    if current_chunk.strip():
        chunks.append(current_chunk.strip())
        
    return chunks

def parse_knowledge_json(file_path: str) -> List[Dict]:
    """
    Parse a pre-structured knowledge.json file directly into document objects.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    documents = []
    for item in data:
        # Some items might be too long, so we chunk their content
        chunks = chunk_text(item['content'])
        for i, chunk in enumerate(chunks):
            documents.append({
                "chunkId": f"{item['id']}-chunk-{i}",
                "docId": item['id'],
                "category": item.get('category', 'general'),
                "title": item.get('title', ''),
                "content": chunk,
            })
    return documents
