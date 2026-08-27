import { Sparkles, Brain, HelpCircle, GraduationCap, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const ICONS = [Sparkles, Brain, HelpCircle, GraduationCap, Trophy];

const defaultSuggestions = [
  "What are Sachin's strongest skills?",
  "Tell me about SupportGenie AI",
  "Why should we hire Sachin?",
  "What is Sachin's educational background?",
  "Tell me about his hackathon achievement",
];

export default function SuggestedQuestions({ onSelect, suggestions }) {
  const items = suggestions?.length ? suggestions : defaultSuggestions;

  return (
    <div className="space-y-2 px-1">
      <p className="text-xs text-text-muted font-medium px-1 flex items-center gap-1.5">
        <Sparkles size={10} className="text-brand-400" />
        Try asking:
      </p>
      <div className="flex flex-col gap-1.5">
        {items.map((q, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.button
              key={i}
              onClick={() => onSelect(q)}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs text-text-secondary
                bg-surface-700/40 border border-surface-500/20 rounded-xl
                hover:border-brand-500/30 hover:text-brand-300 hover:bg-brand-600/5
                transition-all duration-200 cursor-pointer group"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.06 * i }}
              whileHover={{ x: 3 }}
            >
              <Icon
                size={12}
                className="text-brand-500/60 group-hover:text-brand-400 transition-colors shrink-0"
              />
              {q}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
