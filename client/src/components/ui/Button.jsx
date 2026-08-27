import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/20 hover:shadow-brand-500/30',
  secondary:
    'glass hover:border-brand-400/30 text-text-primary',
  ghost:
    'bg-transparent hover:bg-surface-600 text-text-secondary hover:text-text-primary',
  accent:
    'bg-accent-500 hover:bg-accent-400 text-surface-900 shadow-lg shadow-accent-500/20',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-medium 
    transition-all duration-200 cursor-pointer
    ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
