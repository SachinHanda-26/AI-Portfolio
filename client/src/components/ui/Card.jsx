import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hover = true,
  glow = false,
  ...props
}) {
  return (
    <motion.div
      className={`glass-card rounded-2xl p-6 
        ${hover ? 'hover:border-brand-400/20 hover:-translate-y-1' : ''} 
        ${glow ? 'glow-brand' : ''} 
        transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
