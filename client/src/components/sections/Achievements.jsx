import { motion } from 'framer-motion';
import { Trophy, Award, BookOpen, Medal } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { achievements } from '../../data/portfolioData';

// Map achievement keywords to icons
function getIcon(title) {
  if (title.includes('Patent')) return Award;
  if (title.includes('Hackathon') || title.includes('Winner')) return Trophy;
  if (title.includes('LeetCode') || title.includes('Problems')) return Medal;
  return BookOpen;
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-24">
      <div className="section-container">
        <SectionHeading
          label="Achievements"
          title="Milestones & Certifications"
          description="Key accomplishments and certifications earned along the way."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((item, i) => {
            const Icon = getIcon(item.title);
            return (
              <motion.div
                key={i}
                className="glass-card rounded-xl p-5 hover:border-brand-400/20 
                  transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: 0.06 * i }}
              >
                <div className="w-10 h-10 rounded-lg bg-brand-600/10 flex items-center justify-center mb-3 
                  group-hover:bg-brand-600/20 transition-colors">
                  <Icon size={20} className="text-brand-400" />
                </div>
                <h4 className="text-sm font-medium text-text-primary leading-snug mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-text-muted">{item.date}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
