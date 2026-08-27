import { useEffect, useState } from 'react';
import { Bot, User, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_COLORS = {
  personal: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
  education: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  skills: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  projects: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  experience: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
  achievements: 'bg-pink-500/15 text-pink-300 border-pink-500/25',
  personality: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
};

export default function ChatMessage({ message, isNew = false }) {
  const isBot = message.role === 'assistant';
  const isError = message.isError || false;
  const isOffTopic = message.offTopic || false;
  const [showSources, setShowSources] = useState(false);

  const displayedText = message.content;
  const hasSources = isBot && message.sources && message.sources.length > 0;

  return (
    <motion.div
      className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
          isBot
            ? isOffTopic
              ? 'bg-amber-500/20 text-amber-400'
              : 'bg-brand-600/20 text-brand-400'
            : 'bg-accent-500/20 text-accent-400'
        }`}
      >
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </div>

      {/* Bubble + Sources */}
      <div className={`flex flex-col gap-1.5 max-w-[82%] ${isBot ? '' : 'items-end'}`}>
        {/* Main bubble */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isBot
              ? isError
                ? 'bg-red-500/10 text-red-300 rounded-tl-md border border-red-500/20'
                : isOffTopic
                ? 'bg-amber-500/10 text-amber-200 rounded-tl-md border border-amber-500/20'
                : 'bg-surface-600/50 text-text-primary rounded-tl-md'
              : 'bg-brand-600/20 text-text-primary rounded-tr-md'
          }`}
        >
          {displayedText}
        </div>

        {/* Source citations — collapsible */}
        {hasSources && (
          <div className="w-full">
            <button
              onClick={() => setShowSources((p) => !p)}
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-brand-400
                transition-colors group"
            >
              <BookOpen size={11} className="group-hover:text-brand-400 transition-colors" />
              <span>{message.sources.length} source{message.sources.length > 1 ? 's' : ''}</span>
              {showSources ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>

            <AnimatePresence>
              {showSources && (
                <motion.div
                  className="flex flex-wrap gap-1.5 mt-1.5"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {message.sources.map((src, i) => {
                    const colorClass =
                      CATEGORY_COLORS[src.category] ||
                      'bg-surface-600/50 text-text-muted border-surface-500/30';
                    return (
                      <span
                        key={i}
                        className={`text-xs px-2 py-0.5 rounded-full border ${colorClass}`}
                      >
                        {src.title}
                      </span>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
