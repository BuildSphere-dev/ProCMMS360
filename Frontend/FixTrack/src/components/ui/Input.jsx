import React from 'react';

const Input = ({ label, error, icon: Icon, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-text-secondary ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`w-full bg-bg-secondary border border-border-subtle rounded-lg px-4 py-2.5 text-text-primary focus:border-brand-primary focus:ring-4 focus:ring-brand-glow transition-all ${Icon ? 'pl-10' : ''} ${error ? 'border-status-error' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-status-error ml-1">{error}</span>}
    </div>
  );
};

export default Input;
