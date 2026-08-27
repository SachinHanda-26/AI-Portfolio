import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Brain, Code } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { personalInfo, professionalSummary, education } from '../../data/portfolioData';

export default function About() {
  const highlights = [
    {
      icon: Code,
      label: 'Full-Stack',
      detail: 'MERN Stack',
    },
    {
      icon: Brain,
      label: 'AI Engineering',
      detail: 'RAG · LangChain · Groq',
    },
    {
      icon: GraduationCap,
      label: 'B.Tech CSE',
      detail: `CGPA: ${education[0].score.replace('CGPA: ', '')}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      detail: personalInfo.location,
    },
  ];

  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <SectionHeading
          label="About Me"
          title="Who I Am"
          description="A quick snapshot of my background and what drives me."
        />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              {professionalSummary}
            </p>
            <p className="text-text-secondary leading-relaxed">
              I'm particularly interested in{' '}
              <span className="text-brand-300">Agentic AI</span>,{' '}
              <span className="text-brand-300">RAG</span>, and building
              intelligent applications that combine strong software engineering
              with practical AI capabilities.
            </p>
          </motion.div>

          {/* Right — Highlight cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="glass-card rounded-xl p-5 flex flex-col gap-3 hover:border-brand-400/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-600/15 flex items-center justify-center">
                    <Icon size={20} className="text-brand-400" />
                  </div>
                  <div>
                    <p className="text-text-primary font-semibold text-sm">
                      {item.label}
                    </p>
                    <p className="text-text-muted text-xs mt-0.5">{item.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
