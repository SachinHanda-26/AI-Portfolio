import os
import torch
# Limit threads to reduce memory usage on Render's 512MB free tier
torch.set_num_threads(1)

from sentence_transformers import SentenceTransformer

# Initialize the model once
# all-MiniLM-L6-v2 is fast, small (90MB), and effective for RAG
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(text: str) -> list[float]:
    """
    Generates a 384-dimensional embedding vector for the given text.
    """
    # encode returns a numpy array, we convert it to a flat python list
    embedding = model.encode(text)
    return embedding.tolist()
