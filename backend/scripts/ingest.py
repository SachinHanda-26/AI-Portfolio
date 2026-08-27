import os
import sys
import argparse

# Add backend directory to sys.path to allow importing from app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.utils.document_parser import parse_knowledge_json
from app.services.embeddings import get_embedding
from app.services.db import sync_chunks

def ingest_data(file_path: str):
    print(f"Loading data from {file_path}...")
    documents = parse_knowledge_json(file_path)
    
    print(f"Parsed {len(documents)} document chunks. Generating embeddings...")
    for doc in documents:
        doc['embedding'] = get_embedding(doc['content'])
        
    print("Clearing existing chunks in MongoDB...")
    sync_chunks.delete_many({})
    
    print(f"Inserting {len(documents)} chunks into MongoDB...")
    sync_chunks.insert_many(documents)
    
    print("Ingestion complete! Please ensure your Atlas Vector Search index 'vector_index' is configured correctly for 384 dimensions.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ingest knowledge.json into MongoDB Vector DB")
    parser.add_argument("--file", type=str, default="../server/src/rag/data/knowledge.json", help="Path to knowledge.json")
    args = parser.parse_args()
    
    ingest_data(args.file)
