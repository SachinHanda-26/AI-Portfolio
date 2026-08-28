import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { personalInfo } from '../../data/portfolioData';

export default function Contact() {
  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: null,
    },
  ];

  const socialLinks = [
    {
      Icon: GithubIcon,
      label: 'GitHub',
      href: personalInfo.github,
    },
    {
      Icon: LinkedinIcon,
      label: 'LinkedIn',
      href: personalInfo.linkedin,
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-600/[0.02] to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Contact"
          title="Let's Connect"
          description="Interested in working together or have a question? Reach out!"
        />

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Contact info */}
          <div className="glass-card rounded-2xl p-8 space-y-6">
            <div className="space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-600/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-brand-600/15 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-brand-400" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">{item.label}</p>
                      <p className="text-text-primary font-medium text-sm">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="border-t border-surface-500/20" />

            {/* Social + CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-3">
                {socialLinks.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass rounded-lg 
                      text-sm text-text-secondary hover:text-text-primary 
                      hover:border-brand-400/20 transition-all"
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                ))}
              </div>

              <Button
                variant="primary"
                href={`mailto:${personalInfo.email}`}
              >
                <Send size={16} />
                Send Email
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
