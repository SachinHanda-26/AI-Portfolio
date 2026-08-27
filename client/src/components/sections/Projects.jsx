import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import { projects } from '../../data/portfolioData';

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <SectionHeading
          label="Projects"
          title="What I've Built"
          description="Hands-on projects spanning full-stack development and AI engineering."
        />

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="glass-card rounded-2xl p-6 md:p-8 hover:border-brand-400/15 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Project number */}
                <div className="hidden md:flex w-16 h-16 rounded-2xl bg-brand-600/10 border border-brand-500/15 items-center justify-center shrink-0">
                  <span className="text-2xl font-bold text-brand-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-brand-300 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-text-muted text-sm">
                      {project.subtitle}
                    </span>
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="brand">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {project.highlights.map((point, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-text-secondary text-sm leading-relaxed"
                      >
                        <ChevronRight
                          size={16}
                          className="text-brand-400 shrink-0 mt-0.5"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  <div className="flex gap-3 pt-2">
                    {project.github && project.github !== '#' ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-text-muted 
                          hover:text-brand-300 transition-colors"
                      >
                        <GithubIcon size={16} />
                        Source Code
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm text-text-muted/50">
                        <GithubIcon size={16} />
                        Code — coming soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
