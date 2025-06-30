import React from 'react';
import { motion } from 'framer-motion';

/**
 * Button component with customizable styling and animations
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant (primary, secondary, outline)
 * @param {string} [props.size='md'] - Button size (sm, md, lg)
 * @param {boolean} [props.fullWidth=false] - Whether button should take full width
 * @param {ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {string} [props.className] - Additional CSS class
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  children, 
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  // Style classes based on variant
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-accent',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    outline: 'bg-transparent text-primary border border-primary hover:bg-gray-100'
  };

  // Style classes based on size
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };

  return (
    <motion.button
      className={`
        btn 
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${fullWidth ? 'w-full' : ''}
        rounded-md font-medium transition-all duration-200
        flex items-center justify-center gap-2
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={!disabled ? onClick : undefined}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
