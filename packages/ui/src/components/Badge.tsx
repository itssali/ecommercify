import React, { HTMLAttributes, ReactNode } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";
  
  const variantClasses = {
    primary: "bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100",
    secondary: "bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-100",
    success: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    danger: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
    glass: "glass-button text-gray-800 dark:text-white backdrop-blur-sm"
  };
  
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1"
  };
  
  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}; 