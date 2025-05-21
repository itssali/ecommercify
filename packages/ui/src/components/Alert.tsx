import React, { HTMLAttributes, ReactNode } from 'react';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'glass';
  title?: string;
  icon?: ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  icon,
  onClose,
  className = '',
  ...props
}) => {
  const baseClasses = "relative rounded-lg p-4";
  
  const variantClasses = {
    info: "bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100",
    success: "bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-100",
    warning: "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100",
    error: "bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-100",
    glass: "glass text-gray-800 dark:text-white"
  };
  
  const borderClasses = {
    info: "border-l-4 border-blue-400 dark:border-blue-500",
    success: "border-l-4 border-green-400 dark:border-green-500",
    warning: "border-l-4 border-yellow-400 dark:border-yellow-500",
    error: "border-l-4 border-red-400 dark:border-red-500",
    glass: ""
  };
  
  const titleClasses = {
    info: "text-blue-800 dark:text-blue-100",
    success: "text-green-800 dark:text-green-100",
    warning: "text-yellow-800 dark:text-yellow-100",
    error: "text-red-800 dark:text-red-100",
    glass: "text-gray-900 dark:text-white"
  };
  
  const iconColor = {
    info: "text-blue-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    error: "text-red-500",
    glass: "text-gray-500 dark:text-gray-300"
  };
  
  return (
    <div
      role="alert"
      className={`${baseClasses} ${variantClasses[variant]} ${borderClasses[variant]} ${className}`}
      {...props}
    >
      {onClose && (
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      )}
      
      <div className="flex">
        {icon && (
          <div className={`flex-shrink-0 mr-3 ${iconColor[variant]}`}>
            {icon}
          </div>
        )}
        
        <div>
          {title && (
            <h3 className={`text-sm font-medium mb-1 ${titleClasses[variant]}`}>
              {title}
            </h3>
          )}
          <div className="text-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}; 