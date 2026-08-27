import { useState, useCallback, useRef } from 'react';
import { streamChatMessage, getSuggestions } from '../services/api';

// Generate a stable session ID for the lifetime of this browser tab
function generateSessionId() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    "Hi! I'm Sachin's AI assistant, powered by RAG. I can answer questions about his skills, projects, experience, education, and more. What would you like to know?",
  sources: [],
};

export function useChat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Stable session ID — persists for the tab lifetime
  const sessionIdRef = useRef(generateSessionId());

  /**
   * Send a message and append the response.
   */
  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);

    // Append user message immediately, and an empty assistant message
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: trimmed, sources: [] },
      { role: 'assistant', content: '', sources: [], isStreaming: true }
    ]);
    setIsLoading(true);

    try {
      await streamChatMessage(
        trimmed,
        sessionIdRef.current,
        (chunk) => {
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = { ...newMessages[newMessages.length - 1] };
            if (lastMessage.role === 'assistant') {
              lastMessage.content += chunk;
            }
            newMessages[newMessages.length - 1] = lastMessage;
            return newMessages;
          });
        },
        (sources, sid) => {
          if (sid) sessionIdRef.current = sid;
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = { ...newMessages[newMessages.length - 1] };
            if (lastMessage.role === 'assistant') {
              lastMessage.sources = sources;
            }
            newMessages[newMessages.length - 1] = lastMessage;
            return newMessages;
          });
        },
        () => {
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = { ...newMessages[newMessages.length - 1] };
            if (lastMessage.role === 'assistant') {
              lastMessage.isStreaming = false;
            }
            newMessages[newMessages.length - 1] = lastMessage;
            return newMessages;
          });
          setIsLoading(false);
        },
        (err) => {
          const errorMsg = err.message || 'Sorry, I had trouble connecting. Please try again.';
          setError(errorMsg);
          setMessages((prev) => {
             const newMessages = [...prev];
             const lastMessage = { ...newMessages[newMessages.length - 1] };
             if (lastMessage.role === 'assistant' && lastMessage.isStreaming) {
                 lastMessage.content = errorMsg;
                 lastMessage.isError = true;
                 lastMessage.isStreaming = false;
             }
             newMessages[newMessages.length - 1] = lastMessage;
             return newMessages;
          });
          setIsLoading(false);
        }
      );
    } catch (err) {
      setIsLoading(false);
    }
  }, [isLoading]);

  /**
   * Load suggestions from the backend on first open.
   */
  const loadSuggestions = useCallback(async () => {
    if (suggestions.length > 0) return;
    try {
      const data = await getSuggestions();
      setSuggestions(data.suggestions || []);
    } catch {
      // Silently fail — hardcoded defaults in SuggestedQuestions will show
    }
  }, [suggestions.length]);

  /**
   * Reset conversation.
   */
  const resetChat = useCallback(() => {
    sessionIdRef.current = generateSessionId();
    setMessages([WELCOME_MESSAGE]);
    setError(null);
    setSuggestions([]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    suggestions,
    sendMessage,
    loadSuggestions,
    resetChat,
  };
}
