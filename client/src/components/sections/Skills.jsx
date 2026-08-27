import { motion } from 'framer-motion';
import {
  Code, Brain, Server, Database, Cpu, Wrench,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import { technicalSkills, softSkills } from '../../data/portfolioData';

const categoryIcons = {
  Languages: Code,
  'AI Frameworks': Brain,
  Technologies: Server,
  Databases: Database,
  'Core CS': Cpu,
  Tools: Wrench,
};

export default function Skills() {
  const categories = Object.entries(technicalSkills);

  return (
    <section id="skills" className="py-24 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-600/[0.02] to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Skills"
          title="Technical Arsenal"
          description="Technologies and tools I work with to build full-stack and AI applications."
        />

        {/* Technical skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {categories.map(([category, skills], i) => {
            const Icon = categoryIcons[category] || Code;
            return (
              <motion.div
                key={category}
                className="glass-card rounded-xl p-6 hover:border-brand-400/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-600/15 flex items-center justify-center">
                    <Icon size={20} className="text-brand-400" />
                  </div>
                  <h3 className="font-semibold text-text-primary">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="brand">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Soft skills */}
        <motion.div
          className="glass-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-semibold text-text-primary mb-4">Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <Badge key={skill} variant="accent">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
