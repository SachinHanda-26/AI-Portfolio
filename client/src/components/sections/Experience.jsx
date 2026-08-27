import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { workExperience, education } from '../../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/[0.015] to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Experience"
          title="Work & Education"
          description="Professional experience and academic background."
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Work experience */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-text-primary mb-6">
              <Briefcase size={20} className="text-brand-400" />
              Work Experience
            </h3>
            <div className="space-y-4">
              {workExperience.map((job, i) => (
                <motion.div
                  key={i}
                  className="glass-card rounded-xl p-6 hover:border-brand-400/20 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h4 className="font-semibold text-text-primary">
                        {job.role}
                      </h4>
                      <p className="text-brand-300 text-sm">{job.company}</p>
                    </div>
                    <span className="flex items-center gap-1 text-text-muted text-xs whitespace-nowrap">
                      <Calendar size={12} />
                      {job.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {job.highlights.map((point, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-text-secondary text-sm"
                      >
                        <ChevronRight
                          size={14}
                          className="text-brand-400 shrink-0 mt-0.5"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-text-primary mb-6">
              <Calendar size={20} className="text-accent-400" />
              Education
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[15px] top-6 bottom-6 w-px bg-surface-500/40" />

              <div className="space-y-6">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10 mt-1.5">
                      <div className={`w-[11px] h-[11px] rounded-full border-2 
                        ${i === 0
                          ? 'bg-accent-400 border-accent-400 shadow-lg shadow-accent-400/30'
                          : 'bg-surface-700 border-surface-500'
                        }`}
                      />
                    </div>

                    <div className="glass-card rounded-xl p-5 flex-1 hover:border-accent-500/20 transition-all duration-300">
                      <h4 className="font-semibold text-text-primary text-sm">
                        {edu.degree}
                      </h4>
                      <p className="text-text-muted text-xs mt-1">
                        {edu.institution}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-accent-400 text-xs font-medium">
                          {edu.score}
                        </span>
                        <span className="text-text-muted text-xs">
                          {edu.period}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
