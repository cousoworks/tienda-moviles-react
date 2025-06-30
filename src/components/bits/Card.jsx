import React from 'react';
import { motion } from 'framer-motion';

/**
 * Card component with hover animations and customizable styling
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Card content
 * @param {boolean} [props.hoverable=true] - Whether card has hover animation
 * @param {boolean} [props.elevated=false] - Whether card has shadow by default
 * @param {string} [props.className] - Additional CSS class
 */
const Card = ({ 
  children, 
  hoverable = true, 
  elevated = false,
  className = '', 
  ...props 
}) => {
  return (
    <motion.div
      className={`
        bg-white rounded-lg 
        ${elevated ? 'shadow-md' : 'border border-gray-200'} 
        overflow-hidden
        ${className}
      `}
      whileHover={hoverable ? { 
        y: -4,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

// Export additional components for card structure
export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`p-4 border-b border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '', ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`p-4 border-t border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardSubtitle = ({ children, className = '', ...props }) => (
  <h4 className={`text-sm font-medium text-gray-500 mt-1 ${className}`} {...props}>
    {children}
  </h4>
);
