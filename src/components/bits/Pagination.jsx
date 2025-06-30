import React from 'react';
import { motion } from 'framer-motion';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage,
  onPageChange,
  className = ''
}) => {
  if (totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    onPageChange(page);
  };

  return (
    <motion.div 
      className={`space-y-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2">
        {/* Previous button */}
        <motion.button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg font-medium transition-colors ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-primary hover:bg-primary hover:text-white'
          }`}
          whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
          whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
        >
          <i className="fas fa-chevron-left mr-1"></i>
          Anterior
        </motion.button>
        
        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isCurrentPage = page === currentPage;
            
            // Show only a subset of pages for better UX
            const showPage = 
              page === 1 || 
              page === totalPages || 
              (page >= currentPage - 2 && page <= currentPage + 2);
            
            if (!showPage) {
              // Show ellipsis
              if (page === currentPage - 3 || page === currentPage + 3) {
                return (
                  <span key={page} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            }
            
            return (
              <motion.button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  isCurrentPage
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={!isCurrentPage ? { scale: 1.05 } : {}}
                whileTap={!isCurrentPage ? { scale: 0.95 } : {}}
              >
                {page}
              </motion.button>
            );
          })}
        </div>
        
        {/* Next button */}
        <motion.button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg font-medium transition-colors ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-primary hover:bg-primary hover:text-white'
          }`}
          whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
          whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
        >
          Siguiente
          <i className="fas fa-chevron-right ml-1"></i>
        </motion.button>
      </div>
      
      {/* Page info */}
      <div className="text-center text-sm text-gray-500">
        Mostrando {startIndex + 1}-{Math.min(endIndex, totalItems)} de {totalItems} productos
      </div>
    </motion.div>
  );
};

export default Pagination;
