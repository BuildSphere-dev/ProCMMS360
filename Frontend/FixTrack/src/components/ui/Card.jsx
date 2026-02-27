import React from 'react';

const Card = ({ children, title, subtitle, icon: Icon, className = '', glass = false }) => {
  return (
    <div className={`rounded-xl border border-border-subtle p-6 transition-all ${glass ? 'glass' : 'bg-bg-secondary'} ${className}`}>
      {(title || subtitle || Icon) && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 rounded-lg bg-bg-tertiary text-brand-primary">
                <Icon size={20} />
              </div>
            )}
            <div>
              {title && <h3 className="text-lg font-semibold">{title}</h3>}
              {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
