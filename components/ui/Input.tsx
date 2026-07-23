import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <input 
        className={`bg-dark-800 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors ${
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-dark-700 focus:border-gold-500 focus:ring-gold-500'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 animate-fade-in">{error}</span>}
    </div>
  );
};