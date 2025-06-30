import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modal component with animations and backdrop
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Function to call when modal is closed
 * @param {ReactNode} props.children - Modal content
 * @param {string} [props.title] - Modal title
 * @param {string} [props.size='md'] - Modal size (sm, md, lg, xl, full)
 * @param {boolean} [props.closeOnEsc=true] - Whether to close on Escape key
 * @param {boolean} [props.closeOnBackdropClick=true] - Whether to close on backdrop click
 * @param {string} [props.className] - Additional CSS class for modal content
 */
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  closeOnEsc = true,
  closeOnBackdropClick = true,
  className = '',
}) => {
  // Size based classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (closeOnEsc && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore scroll when modal is closed
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnEsc]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnBackdropClick ? onClose : undefined}
          />
          
          {/* Modal Container */}
          <motion.div
            className={`relative z-10 w-full ${sizeClasses[size] || sizeClasses.md} ${className}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 300
            }}
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              {/* Header with title and close button */}
              {title && (
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    aria-label="Close"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Modal content */}
              <div className={!title ? 'pt-4' : ''}>
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

// Helper components for modal structure
export const ModalBody = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export const ModalFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 ${className}`}>
    {children}
  </div>
);
