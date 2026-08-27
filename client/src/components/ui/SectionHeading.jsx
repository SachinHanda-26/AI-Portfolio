import { motion } from 'framer-motion';

export default function SectionHeading({
  label,
  title,
  description,
  align = 'center',
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <motion.div
      className={`mb-16 max-w-2xl ${alignment}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      {label && (
        <p className="text-accent-400 font-mono text-sm tracking-widest uppercase mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
