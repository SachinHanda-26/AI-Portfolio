export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-surface-600 text-text-secondary border-surface-500/50',
    brand: 'bg-brand-600/15 text-brand-300 border-brand-500/20',
    accent: 'bg-accent-500/15 text-accent-400 border-accent-500/20',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
        border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
