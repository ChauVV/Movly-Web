import React from 'react';

export const Button = ({ children, className = '', disabled = false, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors ${disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
        } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}; 