import React from 'react';

const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const variants = {
    neutral: 'bg-bg-tertiary text-text-secondary',
    success: 'bg-status-success/10 text-status-success border border-status-success/20',
    error: 'bg-status-error/10 text-status-error border border-status-error/20',
    warning: 'bg-status-warning/10 text-status-warning border border-status-warning/20',
    info: 'bg-status-info/10 text-status-info border border-status-info/20',
    brand: 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
