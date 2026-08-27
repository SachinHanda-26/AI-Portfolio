import axios from 'axios';

// API Base URL - In development, Vite proxies '/api'. In production, it uses the Render URL.
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30s — LLM responses can take a moment
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendChatMessage = async (message, sessionId) => {
  const { data } = await api.post('/chat', { message, sessionId });
  return data;
};

/**
 * Stream a chat message to the RAG assistant (SSE via fetch POST).
 */
export const streamChatMessage = async (message, sessionId, onChunk, onSources, onDone, onError) => {
  try {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, sessionId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep incomplete line in buffer

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6).trim();
          if (dataStr === '[DONE]') {
            onDone();
            return;
          }
          if (dataStr) {
            try {
              const data = JSON.parse(dataStr);
              if (data.type === 'sources') {
                onSources(data.sources, data.sessionId);
              } else if (data.type === 'content') {
                onChunk(data.content);
              } else if (data.type === 'error') {
                onError(new Error(data.message));
                return;
              }
            } catch (e) {
              console.warn('Failed to parse SSE JSON:', dataStr, e);
            }
          }
        }
      }
    }
    onDone();
  } catch (err) {
    onError(err);
  }
};

/**
 * Fetch suggested questions from the backend.
 * @returns {Promise<{suggestions: string[]}>}
 */
export const getSuggestions = async () => {
  const { data } = await api.get('/chat/suggestions');
  return data;
};

/**
 * Health check
 * @returns {Promise<{status: string, timestamp: string}>}
 */
export const checkHealth = async () => {
  const { data } = await api.get('/health');
  return data;
};

export default api;
