import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'glass';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  fullWidth = false,
  variant = 'default',
  className = '',
  id,
  ...props
}, ref) => {
  // Generate random ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseInputClasses = "block text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    default: "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500",
    glass: "glass-button text-gray-800 dark:text-white placeholder-gray-500 border border-white/20"
  };
  
  const inputSizeClasses = leftIcon && rightIcon 
    ? "pl-10 pr-10" 
    : leftIcon 
      ? "pl-10" 
      : rightIcon 
        ? "pr-10" 
        : "px-4";
  
  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "";
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={`${baseInputClasses} ${variantClasses[variant]} ${inputSizeClasses} py-2 ${errorClasses} ${widthClass} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
      
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600 dark:text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}); 