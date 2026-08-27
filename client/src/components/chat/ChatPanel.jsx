import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Loader2, RotateCcw, Zap } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';

export default function ChatPanel({ isOpen, onClose }) {
  const { messages, isLoading, suggestions, sendMessage, loadSuggestions, resetChat } = useChat();
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new messages or loading state change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  // Load suggestions when panel first opens
  useEffect(() => {
    if (isOpen) loadSuggestions();
  }, [isOpen, loadSuggestions]);

  const showSuggestions = messages.length <= 1 && !isLoading;
  const lastMessageIdx = messages.length - 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Chat panel */}
          <motion.div
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50
              w-full md:w-[420px] h-[85vh] md:h-[620px] md:max-h-[82vh]
              flex flex-col
              bg-surface-800 md:rounded-2xl border border-surface-500/20
              shadow-2xl shadow-surface-900/80 overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* ── Header ───────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-surface-500/20
              bg-gradient-to-r from-surface-700/60 to-surface-800/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9">
                  <div className="w-9 h-9 rounded-xl bg-brand-600/20 flex items-center justify-center">
                    <Bot size={18} className="text-brand-400" />
                  </div>
                  {/* Live dot */}
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 
                    rounded-full border-2 border-surface-800 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">Ask My AI</h3>
                  <p className="text-xs text-text-muted">RAG-powered · Always grounded</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="p-2 hover:bg-surface-600/50 rounded-lg transition-colors 
                    text-text-muted hover:text-text-primary"
                  aria-label="Reset conversation"
                  title="New conversation"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-surface-600/50 rounded-lg transition-colors 
                    text-text-muted hover:text-text-primary"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ── Messages ─────────────────────────────────────────────── */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0
                scrollbar-thin scrollbar-thumb-surface-600 scrollbar-track-transparent"
            >
              {messages.map((msg, i) => (
                <ChatMessage
                  key={i}
                  message={msg}
                  isNew={i === lastMessageIdx && msg.role === 'assistant'}
                />
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-600/20 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-brand-400" />
                  </div>
                  <div className="bg-surface-600/50 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-2">
                    {/* Bouncing dots */}
                    {[0, 1, 2].map((n) => (
                      <motion.span
                        key={n}
                        className="w-1.5 h-1.5 bg-brand-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, delay: n * 0.15, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Suggested questions — before first user message */}
              {showSuggestions && (
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <SuggestedQuestions onSelect={sendMessage} suggestions={suggestions} />
                </motion.div>
              )}
            </div>

            {/* ── Input ────────────────────────────────────────────────── */}
            <div className="shrink-0">
              <ChatInput onSend={sendMessage} disabled={isLoading} />
            </div>

            {/* ── Powered by footer ─────────────────────────────────────── */}
            <div className="shrink-0 flex items-center justify-center gap-1.5 py-1.5
              border-t border-surface-500/10 bg-surface-900/30">
              <Zap size={10} className="text-brand-500/60" />
              <span className="text-[10px] text-text-muted/60">
                Powered by Groq · MongoDB Atlas Vector Search
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
