import { motion } from 'framer-motion';
import { ArrowDown, MessageSquare, FileText, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { personalInfo } from '../../data/portfolioData';
import profilePic from '../../assets/profile.jpg'; // We will save the image as profile.jpg or profile.png depending on its type

export default function Hero({ onChatToggle }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/8 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/6 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 section-container text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
            bg-brand-600/10 border border-brand-500/20 text-brand-300 text-sm font-medium">
            <Sparkles size={14} />
            Open to opportunities
          </span>
        </motion.div>

        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-brand-400 to-accent-500">
            <img 
              src={profilePic} 
              alt={personalInfo.name} 
              className="w-full h-full object-cover rounded-full border-4 border-background"
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          <p className="text-accent-400 font-mono text-sm tracking-widest uppercase">
            {personalInfo.tagline}
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Building intelligent applications with the MERN stack and AI.
          This portfolio is powered by{' '}
          <span className="text-brand-300 font-medium">RAG</span> — ask my AI
          assistant anything about me.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onChatToggle}
          >
            <MessageSquare size={20} />
            Ask My AI
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href="#projects"
          >
            <FileText size={20} />
            View Projects
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs font-mono">Scroll</span>
            <ArrowDown size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
