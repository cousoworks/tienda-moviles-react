import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SearchBar = React.memo(({ 
  searchQuery = '', 
  onSearchChange, 
  placeholder = 'Buscar móviles...', 
  className = '',
  isMobile = false 
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);

  // Sync with external searchQuery changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    
    if (typeof onSearchChange === 'function') {
      onSearchChange(value);
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setLocalQuery('');
    if (typeof onSearchChange === 'function') {
      onSearchChange('');
    }
  };

  // Handle key press (Enter to search, Escape to clear)
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      handleClearSearch();
    }
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative flex items-center bg-white rounded-lg shadow-md border-2 transition-all duration-200 ${
        isFocused ? 'border-primary shadow-lg' : 'border-gray-200 hover:border-gray-300'
      } ${isMobile ? 'h-12' : 'h-10'}`}>
        
        {/* Search Icon */}
        <div className={`flex items-center justify-center ${isMobile ? 'w-12 h-12' : 'w-10 h-10'} text-gray-400`}>
          <i className={`fas fa-search ${isMobile ? 'text-base' : 'text-sm'}`}></i>
        </div>
        
        {/* Input Field */}
        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 ${
            isMobile ? 'text-base py-3' : 'text-sm py-2'
          }`}
        />
        
        {/* Clear Button */}
        {localQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClearSearch}
            className={`flex items-center justify-center ${isMobile ? 'w-12 h-12' : 'w-10 h-10'} text-gray-400 hover:text-gray-600 transition-colors`}
          >
            <i className={`fas fa-times ${isMobile ? 'text-base' : 'text-sm'}`}></i>
          </motion.button>
        )}
      </div>
      
      {/* Search Suggestions or Results Count (optional) */}
      {localQuery && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="absolute top-full left-0 right-0 mt-1 z-10"
        >
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
            <div className="text-xs text-gray-500 px-2 py-1">
              <i className="fas fa-search mr-1"></i>
              Buscando: "{localQuery}"
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
