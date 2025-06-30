import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mobilesData from '../../phones.json';

const FilterBar = React.memo(({ 
  priceOrder, 
  sizeOrder, 
  screenOrder, 
  sortByPrice, 
  sortBySize, 
  sortByScreenSize,
  filterCategories = [],
  onFilterChange,
  activeFilters = [],
  onClearFilters,
  compact = false,
  mobileFiltersOpen = false,
  onToggleMobileFilters
}) => {
  // State for expanded sections
  const [expandedSection, setExpandedSection] = useState(null);
  // Remove internal mobileFiltersOpen state - use external prop
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    screenSize: [],
    ram: [],
    storage: [],
    features: [],
    camera: []
  });
  
  // Calculate product counts for each filter option
  const getProductCountsByFilter = (filterType, filterValue) => {
    switch(filterType) {
      case 'brand':
        if (filterValue === 'all') {
          return mobilesData.length;
        }
        return mobilesData.filter(product => product.brand === filterValue).length;
      
      case 'ram':
        // Extract numeric value from ram field and match with filter
        const filterRamValue = parseInt(filterValue.replace('gb', ''));
        return mobilesData.filter(product => {
          const productRamValue = parseInt(product.ram);
          return productRamValue === filterRamValue;
        }).length;
      
      case 'storage':
        // Handle both GB and TB storage
        if (filterValue === '1tb') {
          return mobilesData.filter(product => 
            product.storage && (product.storage.includes('1TB') || product.storage.includes('1 TB'))
          ).length;
        } else {
          const filterStorageValue = parseInt(filterValue.replace('gb', ''));
          return mobilesData.filter(product => {
            const productStorageValue = parseInt(product.storage);
            return productStorageValue === filterStorageValue;
          }).length;
        }
      
      case 'screenSize':
        if (filterValue === 'compact') {
          return mobilesData.filter(product => product.screenSize < 6).length;
        } else if (filterValue === 'medium') {
          return mobilesData.filter(product => product.screenSize >= 6 && product.screenSize <= 6.5).length;
        } else if (filterValue === 'large') {
          return mobilesData.filter(product => product.screenSize > 6.5).length;
        }
        return 0;
      
      case 'price':
        if (filterValue === 'under-500') {
          return mobilesData.filter(product => product.price < 500).length;
        } else if (filterValue === '500-800') {
          return mobilesData.filter(product => product.price >= 500 && product.price < 800).length;
        } else if (filterValue === '800-1000') {
          return mobilesData.filter(product => product.price >= 800 && product.price < 1000).length;
        } else if (filterValue === '1000-1200') {
          return mobilesData.filter(product => product.price >= 1000 && product.price < 1200).length;
        } else if (filterValue === 'over-1200') {
          return mobilesData.filter(product => product.price >= 1200).length;
        }
        return 0;
        
      case 'camera':
        return mobilesData.filter(product => {
          if (!product.camera || !product.camera.main) return false;
          const mainCameraMp = parseInt(product.camera.main);
          
          if (filterValue === 'under-12mp') return mainCameraMp < 12;
          if (filterValue === '12-48mp') return mainCameraMp >= 12 && mainCameraMp < 48;
          if (filterValue === '48-108mp') return mainCameraMp >= 48 && mainCameraMp < 108;
          if (filterValue === 'over-108mp') return mainCameraMp >= 108;
          return false;
        }).length;
        
      case 'features':
        return mobilesData.filter(product => {
          if (filterValue === 'fastCharge') {
            return product.description && (
              product.description.includes('fast') || 
              product.description.includes('Fast') ||
              product.description.includes('charging') ||
              product.description.includes('SuperVOOC') ||
              product.description.includes('67W') ||
              product.description.includes('100W')
            );
          } else if (filterValue === 'waterResistant') {
            return product.description && (
              product.description.includes('water') ||
              product.description.includes('IP68') ||
              product.description.includes('IP67')
            );
          } else if (filterValue === 'latest') {
            return product.processor && (
              product.processor.includes('Gen 3') ||
              product.processor.includes('Gen 2') ||
              product.processor.includes('A17') ||
              product.processor.includes('A16')
            );
          } else if (filterValue === '5g') {
            return product.processor && (
              product.processor.includes('Snapdragon') ||
              product.processor.includes('A1') ||
              product.processor.includes('Tensor')
            );
          } else if (filterValue === 'dualSim') {
            return product.description && (
              product.description.includes('Dual SIM') ||
              product.description.includes('dual sim') ||
              product.description.includes('eSIM')
            );
          } else if (filterValue === 'wirelessCharge') {
            return product.description && (
              product.description.includes('wireless') ||
              product.description.includes('Wireless') ||
              product.description.includes('MagSafe') ||
              product.description.includes('Qi')
            );
          }
          return false;
        }).length;
        
      default:
        return 0;
    }
  };
  
  // Re-sync with external active filters when they change
  useEffect(() => {
    if (activeFilters && activeFilters.length > 0) {
      const newState = { price: [], screenSize: [], ram: [], storage: [], features: [], camera: [] };
      
      activeFilters.forEach(filter => {
        const [category, id] = filter.split(':');
        if (newState[category]) {
          newState[category].push(id);
        }
      });
      
      setSelectedFilters(newState);
    } else {
      setSelectedFilters({ price: [], screenSize: [], ram: [], storage: [], features: [], camera: [] });
    }
  }, [activeFilters]);
  
  // Effect to check if we're in compact mode
  useEffect(() => {
    if (compact) {
      // In compact mode, close all sections by default
      setExpandedSection(null);
    }
  }, [compact]);
  // We're handling compact mode directly in the className conditions
  // eslint-disable-next-line no-unused-vars
  const getCompactStyles = () => {
    if (!compact) return {};
    
    return {
      container: "text-sm",
      header: "py-2 px-2",
      title: "text-base",
      section: "py-2",
      sectionTitle: "text-xs mb-2", 
      grid: "grid-cols-1 gap-1",
      button: "px-2 py-1 text-xs"
    };
  };
  
  // Price ranges
  const priceRanges = [
    { id: 'under-500', name: 'Menos de 500€', min: 0, max: 499 },
    { id: '500-800', name: '500€ - 800€', min: 500, max: 799 },
    { id: '800-1000', name: '800€ - 1000€', min: 800, max: 999 },
    { id: '1000-1200', name: '1000€ - 1200€', min: 1000, max: 1199 },
    { id: 'over-1200', name: 'Más de 1200€', min: 1200, max: Infinity }
  ];
  
  // Screen size ranges
  const screenSizes = [
    { id: 'compact', name: 'Compacto (<6")', value: '<6' },
    { id: 'medium', name: 'Medio (6"-6.5")', value: '6-6.5' },
    { id: 'large', name: 'Grande (>6.5")', value: '>6.5' },
  ];
  
  // Storage options
  const storageOptions = [
    { id: '128gb', name: '128 GB', value: '128 GB' },
    { id: '256gb', name: '256 GB', value: '256 GB' },
    { id: '512gb', name: '512 GB', value: '512 GB' },
    { id: '1tb', name: '1 TB', value: '1 TB' },
  ];
  
  // RAM options
  const ramOptions = [
    { id: '4gb', name: '4 GB', value: '4 GB' },
    { id: '6gb', name: '6 GB', value: '6 GB' },
    { id: '8gb', name: '8 GB', value: '8 GB' },
    { id: '12gb', name: '12 GB', value: '12 GB' },
    { id: '16gb', name: '16 GB', value: '16 GB' },
  ];
  
  // Camera options
  const cameraOptions = [
    { id: 'under-12mp', name: 'Hasta 12 MP', value: '<12' },
    { id: '12-48mp', name: '12-48 MP', value: '12-48' },
    { id: '48-108mp', name: '48-108 MP', value: '48-108' },
    { id: 'over-108mp', name: 'Más de 108 MP', value: '>108' },
  ];
  
  // Features
  const features = [
    { id: 'fastCharge', name: 'Carga Rápida', icon: 'fas fa-bolt' },
    { id: 'waterResistant', name: 'Resistente al Agua', icon: 'fas fa-tint' },
    { id: 'latest', name: 'Último Modelo', icon: 'fas fa-star' },
    { id: 'promotion', name: 'En Promoción', icon: 'fas fa-tags' },
    { id: '5g', name: 'Conectividad 5G', icon: 'fas fa-wifi' },
    { id: 'dualSim', name: 'Dual SIM', icon: 'fas fa-sim-card' },
    { id: 'wirelessCharge', name: 'Carga Inalámbrica', icon: 'fas fa-charging-station' }
  ];
  
  // Helper to toggle expanded section
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Handler for filter changes
  const handleFilterChange = (category, id, isActive) => {
    // Update internal state
    const newFilters = { ...selectedFilters };
    
    if (isActive) {
      // Add filter
      if (!newFilters[category].includes(id)) {
        newFilters[category] = [...newFilters[category], id];
      }
    } else {
      // Remove filter
      newFilters[category] = newFilters[category].filter(item => item !== id);
    }
    
    setSelectedFilters(newFilters);
    
    // Convert to format expected by parent and call callback
    const activeFiltersList = [];
    Object.entries(newFilters).forEach(([category, values]) => {
      values.forEach(value => {
        activeFiltersList.push(`${category}:${value}`);
      });
    });
    
    if (typeof onFilterChange === 'function') {
      onFilterChange(activeFiltersList);
    }
  };

  // Toggle mobile filters - use external function
  const toggleMobileFilters = () => {
    if (typeof onToggleMobileFilters === 'function') {
      onToggleMobileFilters();
    }
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSelectedFilters({ price: [], screenSize: [], ram: [], storage: [], features: [], camera: [] });
    if (typeof onClearFilters === 'function') {
      onClearFilters();
    }
  };
  
  // Count total active filters
  const totalActiveFilters = Object.values(selectedFilters).reduce(
    (sum, filters) => sum + filters.length, 0
  );

  // Check if filter is active
  const isFilterActive = (category, id) => {
    return selectedFilters[category]?.includes(id);
  };

  return (
    <div className="relative">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <motion.button 
          onClick={toggleMobileFilters}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-md border-2 border-transparent hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <i className="fas fa-filter text-primary"></i>
            <span className="font-medium">Filtros</span>
            {totalActiveFilters > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {totalActiveFilters}
              </motion.span>
            )}
          </div>
          <motion.i 
            animate={{ rotate: mobileFiltersOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="fas fa-chevron-down"
          ></motion.i>
        </motion.button>
      </div>

      {/* Mobile Filter Modal/Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 mobile-filter-backdrop z-40"
              onClick={toggleMobileFilters}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                duration: 0.4 
              }}
              className="md:hidden fixed inset-x-0 bottom-0 top-20 bg-white rounded-t-xl shadow-2xl z-50 flex flex-col mobile-filter-modal"
            >
              {/* Modal Header */}
              <div className="mobile-filter-header flex items-center justify-between p-4 border-b border-gray-200 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <i className="fas fa-filter text-primary"></i>
                  <h3 className="text-lg font-semibold">Filtros</h3>
                  {totalActiveFilters > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center filter-badge"
                    >
                      {totalActiveFilters}
                    </motion.span>
                  )}
                </div>
                <motion.button 
                  onClick={toggleMobileFilters}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors filter-button"
                >
                  <i className="fas fa-times text-gray-500"></i>
                </motion.button>
              </div>

              {/* Scrollable Filter Content */}
              <div className="flex-1 overflow-y-auto mobile-filter-content p-4 space-y-4 filter-scrollbar">
                {/* Clear filters button when filters are active */}
                {totalActiveFilters > 0 && (
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">
                      {totalActiveFilters} {totalActiveFilters === 1 ? 'filtro activo' : 'filtros activos'}
                    </span>
                    <button 
                      onClick={handleClearFilters}
                      className="text-xs text-primary hover:text-primary-dark flex items-center gap-1"
                    >
                      <i className="fas fa-times"></i>
                      Limpiar todos
                    </button>
                  </div>
                )}

                {/* Mobile Filter Content - Same as Desktop */}
                {renderFilterContent(true)}
              </div>

              {/* Modal Footer with Actions */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-3">
                  <motion.button 
                    onClick={handleClearFilters}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors filter-button"
                  >
                    <i className="fas fa-times mr-2"></i>
                    Limpiar
                  </motion.button>
                  <motion.button 
                    onClick={toggleMobileFilters}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 mobile-apply-button text-white rounded-lg font-medium transition-all filter-button"
                  >
                    <i className="fas fa-check mr-2"></i>
                    Aplicar Filtros
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Desktop Filter Content */}
      <div className="hidden md:block space-y-4 max-h-screen overflow-y-auto filter-scrollbar">
        {/* Clear filters button when filters are active */}
        {totalActiveFilters > 0 && (
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600">
              {totalActiveFilters} {totalActiveFilters === 1 ? 'filtro activo' : 'filtros activos'}
            </span>
            <button 
              onClick={handleClearFilters}
              className="text-xs text-primary hover:text-primary-dark flex items-center gap-1"
            >
              <i className="fas fa-times"></i>
              Limpiar todos
            </button>
          </div>
        )}
        
        {renderFilterContent(false)}
      </div>
    </div>
  );

  // Helper function to render filter content (shared between mobile and desktop)
  function renderFilterContent(isMobile = false) {
    return (
      <>
        {/* Brand Filters */}
        <div>
          <h4 className="font-medium text-sm text-gray-600 mb-3">Marcas</h4>
          <div className={`grid ${compact ? 'grid-cols-1' : isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-1'} gap-2`}>
            {filterCategories.filter(category => category.id !== 'all').map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (typeof onFilterChange === 'function') {
                    // If this filter is active, we're deselecting it
                    if (activeFilters.includes(`brand:${category.id}`)) {
                      onFilterChange(activeFilters.filter(filter => filter !== `brand:${category.id}`));
                    } else {
                      // Remove any other brand filters and add this one
                      const nonBrandFilters = activeFilters.filter(filter => !filter.startsWith('brand:'));
                      onFilterChange([...nonBrandFilters, `brand:${category.id}`]);
                    }
                  }
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 filter-button transition-all ${isMobile ? 'min-h-[44px] px-4 py-3' : ''}
                  ${activeFilters.includes(`brand:${category.id}`) 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <i className={`${category.icon}`}></i>
                {category.name}
                <span className={`${isMobile ? 'text-xs' : 'ml-auto text-xs'} text-gray-500 ${isMobile ? 'bg-white bg-opacity-20 px-2 py-1 rounded-full' : ''}`}>
                  {getProductCountsByFilter('brand', category.id)}
                </span>
              </motion.button>
            ))}
            
            {/* "All" button for brands */}
            <motion.button
              key="all-brands"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (typeof onFilterChange === 'function') {
                  // Remove any brand filters
                  const nonBrandFilters = activeFilters.filter(filter => !filter.startsWith('brand:'));
                  onFilterChange(nonBrandFilters);
                }
              }}
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 filter-button transition-all ${isMobile ? 'min-h-[44px] px-4 py-3' : ''}
                ${!activeFilters.some(filter => filter.startsWith('brand:')) 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <i className="fas fa-tags"></i>
              Todas las Marcas
              <span className={`${isMobile ? 'text-xs' : 'ml-auto text-xs'} text-gray-500 ${isMobile ? 'bg-white bg-opacity-20 px-2 py-1 rounded-full' : ''}`}>
                {getProductCountsByFilter('brand', 'all')}
              </span>
            </motion.button>
          </div>
        </div>
        
        {/* Sort controls */}
        <div className="pt-2">
          <h4 className="font-medium text-sm text-gray-600 mb-3">Ordenar por</h4>
          <div className="flex flex-wrap gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={sortByPrice}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 filter-button transition-all ${isMobile ? 'min-h-[40px] px-4 py-2' : ''}
                ${priceOrder ? 'bg-primary bg-opacity-10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Precio
              {priceOrder && (
                <i className={`fas fa-sort-${priceOrder === 'asc' ? 'up' : 'down'} ml-1`}></i>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={sortBySize}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 filter-button transition-all ${isMobile ? 'min-h-[40px] px-4 py-2' : ''}
                ${sizeOrder ? 'bg-primary bg-opacity-10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Tamaño
              {sizeOrder && (
                <i className={`fas fa-sort-${sizeOrder === 'asc' ? 'up' : 'down'} ml-1`}></i>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={sortByScreenSize}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 filter-button transition-all ${isMobile ? 'min-h-[40px] px-4 py-2' : ''}
                ${screenOrder ? 'bg-primary bg-opacity-10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Pantalla
              {screenOrder && (
                <i className={`fas fa-sort-${screenOrder === 'asc' ? 'up' : 'down'} ml-1`}></i>
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Price range */}
        <div className="pt-2">
          <button 
            className="w-full flex items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-primary mb-3"
            onClick={() => toggleSection('price')}
          >
            <span className="flex items-center">
              <i className="fas fa-euro-sign mr-2 text-gray-500"></i>
              Rango de Precio
            </span>
            <i className={`fas fa-chevron-${expandedSection === 'price' ? 'up' : 'down'} text-xs`}></i>
          </button>
          
          <AnimatePresence>
            {expandedSection === 'price' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-2 space-y-2">
                  {priceRanges.map((range) => (
                    <label 
                      key={range.id}
                      className={`filter-option flex items-center cursor-pointer rounded-md p-3 transition-colors ${isFilterActive('price', range.id) 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'hover:bg-gray-50 text-gray-700'} ${isMobile ? 'min-h-[44px]' : ''}`}
                    >
                      <input
                        type="checkbox"
                        className={`filter-checkbox w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary ${isMobile ? 'w-5 h-5' : ''}`}
                        checked={isFilterActive('price', range.id)}
                        onChange={(e) => handleFilterChange('price', range.id, e.target.checked)}
                      />
                      <span className={`ml-3 text-sm flex-1 ${isFilterActive('price', range.id) ? 'text-primary font-medium' : 'text-gray-700'}`}>{range.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {getProductCountsByFilter('price', range.id)}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Screen Size */}
        <div className="pt-2">
          <button 
            className="w-full flex items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-primary mb-3"
            onClick={() => toggleSection('screen')}
          >
            <span className="flex items-center">
              <i className="fas fa-mobile-alt mr-2 text-gray-500"></i>
              Tamaño de Pantalla
            </span>
            <i className={`fas fa-chevron-${expandedSection === 'screen' ? 'up' : 'down'} text-xs`}></i>
          </button>
          
          <AnimatePresence>
            {expandedSection === 'screen' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-2 space-y-2">
                  {screenSizes.map((size) => (
                    <label 
                      key={size.id}
                      className={`filter-option flex items-center cursor-pointer rounded-md p-3 transition-colors ${isFilterActive('screenSize', size.id) 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'hover:bg-gray-50 text-gray-700'} ${isMobile ? 'min-h-[44px]' : ''}`}
                    >
                      <input
                        type="checkbox"
                        className={`filter-checkbox w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary ${isMobile ? 'w-5 h-5' : ''}`}
                        checked={isFilterActive('screenSize', size.id)}
                        onChange={(e) => handleFilterChange('screenSize', size.id, e.target.checked)}
                      />
                      <span className={`ml-3 text-sm flex-1 ${isFilterActive('screenSize', size.id) ? 'text-primary font-medium' : 'text-gray-700'}`}>{size.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {getProductCountsByFilter('screenSize', size.id)}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* RAM */}
        <div className="pt-2">
          <button 
            className="w-full flex items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-primary mb-3"
            onClick={() => toggleSection('ram')}
          >
            <span className="flex items-center">
              <i className="fas fa-memory mr-2 text-gray-500"></i>
              Memoria RAM
            </span>
            <i className={`fas fa-chevron-${expandedSection === 'ram' ? 'up' : 'down'} text-xs`}></i>
          </button>
          
          <AnimatePresence>
            {expandedSection === 'ram' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-2 space-y-2">
                  {ramOptions.map((option) => (
                    <label 
                      key={option.id}
                      className={`filter-option flex items-center cursor-pointer rounded-md p-3 transition-colors ${isFilterActive('ram', option.id) 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'hover:bg-gray-50 text-gray-700'} ${isMobile ? 'min-h-[44px]' : ''}`}
                    >
                      <input
                        type="checkbox"
                        className={`filter-checkbox w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary ${isMobile ? 'w-5 h-5' : ''}`}
                        checked={isFilterActive('ram', option.id)}
                        onChange={(e) => handleFilterChange('ram', option.id, e.target.checked)}
                      />
                      <span className={`ml-3 text-sm flex-1 ${isFilterActive('ram', option.id) ? 'text-primary font-medium' : 'text-gray-700'}`}>{option.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {getProductCountsByFilter('ram', option.id)}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Storage */}
        <div className="pt-2">
          <button 
            className="w-full flex items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-primary mb-3"
            onClick={() => toggleSection('storage')}
          >
            <span className="flex items-center">
              <i className="fas fa-hdd mr-2 text-gray-500"></i>
              Almacenamiento
            </span>
            <i className={`fas fa-chevron-${expandedSection === 'storage' ? 'up' : 'down'} text-xs`}></i>
          </button>
          
          <AnimatePresence>
            {expandedSection === 'storage' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-2 space-y-2">
                  {storageOptions.map((option) => (
                    <label 
                      key={option.id}
                      className={`filter-option flex items-center cursor-pointer rounded-md p-3 transition-colors ${isFilterActive('storage', option.id) 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'hover:bg-gray-50 text-gray-700'} ${isMobile ? 'min-h-[44px]' : ''}`}
                    >
                      <input
                        type="checkbox"
                        className={`filter-checkbox w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary ${isMobile ? 'w-5 h-5' : ''}`}
                        checked={isFilterActive('storage', option.id)}
                        onChange={(e) => handleFilterChange('storage', option.id, e.target.checked)}
                      />
                      <span className={`ml-3 text-sm flex-1 ${isFilterActive('storage', option.id) ? 'text-primary font-medium' : 'text-gray-700'}`}>{option.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {getProductCountsByFilter('storage', option.id)}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Features */}
        <div className="pt-2">
          <button 
            className="w-full flex items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-primary mb-3"
            onClick={() => toggleSection('features')}
          >
            <span className="flex items-center">
              <i className="fas fa-star mr-2 text-gray-500"></i>
              Características
            </span>
            <i className={`fas fa-chevron-${expandedSection === 'features' ? 'up' : 'down'} text-xs`}></i>
          </button>
          
          <AnimatePresence>
            {expandedSection === 'features' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-2 space-y-2">
                  {features.map((feature) => (
                    <label 
                      key={feature.id}
                      className={`filter-option flex items-center cursor-pointer rounded-md p-3 transition-colors ${isFilterActive('features', feature.id) 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'hover:bg-gray-50 text-gray-700'} ${isMobile ? 'min-h-[44px]' : ''}`}
                    >
                      <input
                        type="checkbox"
                        className={`filter-checkbox w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary ${isMobile ? 'w-5 h-5' : ''}`}
                        checked={isFilterActive('features', feature.id)}
                        onChange={(e) => handleFilterChange('features', feature.id, e.target.checked)}
                      />
                      <span className={`ml-3 text-sm flex items-center gap-2 flex-1 ${isFilterActive('features', feature.id) ? 'text-primary font-medium' : 'text-gray-700'}`}>
                        <i className={`${feature.icon} text-gray-500`}></i> {feature.name}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {getProductCountsByFilter('features', feature.id)}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Camera options */}
        <div className="pt-2">
          <button 
            className="w-full flex items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-primary mb-3"
            onClick={() => toggleSection('camera')}
          >
            <span className="flex items-center">
              <i className="fas fa-camera mr-2 text-gray-500"></i>
              Cámara
            </span>
            <i className={`fas fa-chevron-${expandedSection === 'camera' ? 'up' : 'down'} text-xs`}></i>
          </button>
          
          <AnimatePresence>
            {expandedSection === 'camera' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-2 space-y-2">
                  {cameraOptions.map((option) => (
                    <label 
                      key={option.id}
                      className={`filter-option flex items-center cursor-pointer rounded-md p-3 transition-colors ${isFilterActive('camera', option.id) 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'hover:bg-gray-50 text-gray-700'} ${isMobile ? 'min-h-[44px]' : ''}`}
                    >
                      <input
                        type="checkbox"
                        className={`filter-checkbox w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary ${isMobile ? 'w-5 h-5' : ''}`}
                        checked={isFilterActive('camera', option.id)}
                        onChange={(e) => handleFilterChange('camera', option.id, e.target.checked)}
                      />
                      <span className={`ml-3 text-sm flex-1 ${isFilterActive('camera', option.id) ? 'text-primary font-medium' : 'text-gray-700'}`}>{option.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {getProductCountsByFilter('camera', option.id)}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  }
});

export default FilterBar;
