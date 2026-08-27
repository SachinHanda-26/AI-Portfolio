import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const MAX_CHARS = 500;

export default function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }, [input]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const charsLeft = MAX_CHARS - input.length;
  const nearLimit = charsLeft <= 50;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-3 border-t border-surface-500/20 bg-surface-800/50"
    >
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          id="chat-input"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Sachin's skills, projects, experience..."
          disabled={disabled}
          className="w-full bg-surface-600/50 border border-surface-500/30 rounded-xl 
            px-4 py-2.5 text-sm text-text-primary placeholder-text-muted
            focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20
            focus:shadow-[0_0_12px_rgba(99,102,241,0.15)]
            disabled:opacity-50 transition-all resize-none leading-relaxed"
        />
        {/* Char counter — only shows when approaching limit */}
        {nearLimit && (
          <span
            className={`absolute bottom-2 right-3 text-[10px] tabular-nums ${
              charsLeft <= 10 ? 'text-red-400' : 'text-text-muted'
            }`}
          >
            {charsLeft}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="p-2.5 bg-brand-600 hover:bg-brand-500 active:scale-95
          disabled:bg-surface-600 disabled:text-text-muted 
          rounded-xl text-white transition-all duration-150
          disabled:cursor-not-allowed shadow-sm hover:shadow-brand-600/25 hover:shadow-lg"
        aria-label="Send message"
      >
        <Send size={18} />
      </button>
    </form>
  );
}
