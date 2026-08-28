import { Mail, Heart, Code } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { personalInfo } from '../../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-500/20 bg-surface-800/50">
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <Code size={16} className="text-white" />
            </div>
            <span className="font-bold text-text-primary">
              Sachin<span className="text-brand-400">.dev</span>
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-600/50 
                rounded-lg transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-600/50 
                rounded-lg transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-600/50 
                rounded-lg transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-text-muted text-sm flex items-center gap-1">
            © {currentYear} {personalInfo.name}. Built with
            <Heart size={14} className="text-brand-400" />
            & AI
          </p>
        </div>
      </div>
    </footer>
  );
}
