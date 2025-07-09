import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const FilterBar = ({
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

  // Hide underlying app content when mobile filter drawer is open
  useEffect(() => {
    document.body.classList.toggle('mobile-filters-open', mobileFiltersOpen);
    return () => {
      document.body.classList.remove('mobile-filters-open');
    };
  }, [mobileFiltersOpen]);

  // Define filter options
  const filterOptions = {
    price: [
      { value: 'under-500', label: 'Menos de €500', count: 12 },
      { value: '500-800', label: '€500 - €800', count: 18 },
      { value: '800-1000', label: '€800 - €1000', count: 15 },
      { value: '1000-1200', label: '€1000 - €1200', count: 8 },
      { value: 'over-1200', label: 'Más de €1200', count: 6 }
    ],
    screenSize: [
      { value: 'compact', label: 'Compacto (< 6")', count: 8 },
      { value: 'medium', label: 'Mediano (6" - 6.5")', count: 25 },
      { value: 'large', label: 'Grande (> 6.5")', count: 16 }
    ],
    ram: [
      { value: '4gb', label: '4GB', count: 5 },
      { value: '6gb', label: '6GB', count: 12 },
      { value: '8gb', label: '8GB', count: 20 },
      { value: '12gb', label: '12GB', count: 8 },
      { value: '16gb', label: '16GB', count: 4 }
    ],
    storage: [
      { value: '64gb', label: '64GB', count: 3 },
      { value: '128gb', label: '128GB', count: 15 },
      { value: '256gb', label: '256GB', count: 18 },
      { value: '512gb', label: '512GB', count: 12 },
      { value: '1tb', label: '1TB', count: 5 }
    ],
    camera: [
      { value: 'under-12mp', label: 'Menos de 12MP', count: 4 },
      { value: '12-48mp', label: '12MP - 48MP', count: 22 },
      { value: '48-108mp', label: '48MP - 108MP', count: 20 },
      { value: 'over-108mp', label: 'Más de 108MP', count: 8 }
    ],
    features: [
      { value: 'fastCharge', label: 'Carga rápida', count: 35 },
      { value: 'waterResistant', label: 'Resistente al agua', count: 28 },
      { value: 'latest', label: 'Últimos modelos', count: 15 },
      { value: '5g', label: '5G', count: 32 },
      { value: 'promotion', label: 'En oferta', count: 12 },
      { value: 'dualSim', label: 'Dual SIM', count: 24 },
      { value: 'wirelessCharge', label: 'Carga inalámbrica', count: 18 }
    ]
  };

  // Handle filter toggle
  const handleFilterToggle = (category, value) => {
    const filterKey = `${category}:${value}`;
    let newFilters = [...activeFilters];
    
    if (newFilters.includes(filterKey)) {
      newFilters = newFilters.filter(f => f !== filterKey);
    } else {
      newFilters.push(filterKey);
    }
    
    onFilterChange(newFilters);
  };

  // Check if filter is active
  const isFilterActive = (category, value) => {
    return activeFilters.includes(`${category}:${value}`);
  };

  // Get active filters summary
  const getActiveFiltersSummary = () => {
    const summary = [];
    activeFilters.forEach(filter => {
      const [category, value] = filter.split(':');
      if (filterOptions[category]) {
        const option = filterOptions[category].find(opt => opt.value === value);
        if (option) {
          summary.push({
            category,
            value,
            label: option.label,
            fullFilter: filter
          });
        }
      }
    });
    return summary;
  };

  // Remove specific filter
  const removeFilter = (filterToRemove) => {
    const newFilters = activeFilters.filter(f => f !== filterToRemove);
    onFilterChange(newFilters);
  };

  // Desktop Filter Bar - Con filtros adicionales
  const DesktopFilterBar = () => (
    <div className="space-y-5 filter-scrollbar overflow-y-auto pb-4">
      {/* Active Filters Summary */}
      {activeFilters.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-blue-900 flex items-center">
              <i className="fas fa-check-circle text-blue-500 mr-2"></i>
              Filtros activos
            </h3>
            <button
              onClick={onClearFilters}
              className="text-sm text-blue-700 hover:text-blue-900 font-medium hover:underline transition-colors"
            >
              Limpiar todo
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {getActiveFiltersSummary().map((filter) => (
              <div
                key={filter.fullFilter}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span>{filter.label}</span>
                <button
                  onClick={() => removeFilter(filter.fullFilter)}
                  className="hover:bg-white/30 rounded-full p-1 transition-colors ml-1"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Brand Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
          <i className="fas fa-mobile-alt text-blue-500"></i>
          Marcas
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {filterCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterToggle('brand', category.id)}
              className={`p-3 rounded-lg border-2 flex items-center gap-3 transition-all duration-200 hover:shadow-sm ${
                isFilterActive('brand', category.id) 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-transparent' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
              }`}
            >
              <i className={`${category.icon} text-lg ${isFilterActive('brand', category.id) ? 'text-white' : 'text-blue-500'}`}></i>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
          <i className="fas fa-euro-sign text-blue-500"></i>
          Precio
        </h3>
        <div className="space-y-2">
          {filterOptions.price.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterToggle('price', option.value)}
              className={`w-full p-3 rounded-lg border-2 flex items-center justify-between transition-all duration-200 ${
                isFilterActive('price', option.value)
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-transparent shadow-sm' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
              }`}
            >
              <span>{option.label}</span>
              <span className={`text-xs ${isFilterActive('price', option.value) ? 'opacity-90' : 'opacity-70'}`}>({option.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Screen Size Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
          <i className="fas fa-expand text-blue-500"></i>
          Tamaño de pantalla
        </h3>
        <div className="space-y-2">
          {filterOptions.screenSize.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterToggle('screenSize', option.value)}
              className={`w-full p-3 rounded-lg border-2 flex items-center justify-between transition-all duration-200 ${
                isFilterActive('screenSize', option.value)
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-transparent shadow-sm' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
              }`}
            >
              <span>{option.label}</span>
              <span className={`text-xs ${isFilterActive('screenSize', option.value) ? 'opacity-90' : 'opacity-70'}`}>({option.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* RAM Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
          <i className="fas fa-memory text-blue-500"></i>
          Memoria RAM
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {filterOptions.ram.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterToggle('ram', option.value)}
              className={`p-3 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                isFilterActive('ram', option.value)
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-transparent shadow-sm' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting Options */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
          <i className="fas fa-sort text-blue-500"></i>
          Ordenar por
        </h3>
        <div className="space-y-2">
          <button
            onClick={sortByPrice}
            className={`w-full p-3 rounded-lg border-2 flex items-center justify-between transition-all duration-200 ${
              priceOrder ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-transparent shadow-sm' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300'
            }`}
          >
            <span>Precio</span>
            {priceOrder && (
              <i className={`fas fa-arrow-${priceOrder === 'asc' ? 'up' : 'down'} transition-transform`}></i>
            )}
          </button>
          <button
            onClick={sortBySize}
            className={`w-full p-3 rounded-lg border-2 flex items-center justify-between transition-all duration-200 ${
              sizeOrder ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-transparent shadow-sm' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300'
            }`}
          >
            <span>Tamaño</span>
            {sizeOrder && (
              <i className={`fas fa-arrow-${sizeOrder === 'asc' ? 'up' : 'down'} transition-transform`}></i>
            )}
          </button>
          <button
            onClick={sortByScreenSize}
            className={`w-full p-3 rounded-lg border-2 flex items-center justify-between transition-all duration-200 ${
              screenOrder ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-transparent shadow-sm' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300'
            }`}
          >
            <span>Pantalla</span>
            {screenOrder && (
              <i className={`fas fa-arrow-${screenOrder === 'asc' ? 'up' : 'down'} transition-transform`}></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile Filter Drawer - Hamburger Style
  const MobileFilterDrawer = () => ReactDOM.createPortal(
    <div
      className="filter-drawer-overlay"
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '2147483647',
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // make backdrop more opaque
        display: 'block',
        boxSizing: 'border-box',
        pointerEvents: 'auto',
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        onClick={onToggleMobileFilters}
      />
      
      {/* Filter Drawer */}
      <div
        className="filter-drawer-panel"
        style={{
          position: 'fixed', // fix to viewport to avoid stacking context issues
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          width: '100vw', // full viewport width for mobile
          // removed maxWidth to allow full coverage
          height: '100vh',
          backgroundColor: 'rgb(255, 255, 255)',
          boxShadow: '2px 0 20px rgba(0, 0, 0, 0.1)',
          overflowY: 'auto',
          transform: 'translateX(0)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: '2147483647',
          display: 'block',
          boxSizing: 'border-box',
          pointerEvents: 'auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 20px 15px',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: 'rgb(255, 255, 255)',
            position: 'sticky',
            top: '0',
            zIndex: '2147483647',
            display: 'block',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ 
              all: 'unset',
              display: 'revert',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1f2937',
            }}>
              Filtros
            </h2>
            <button
              onClick={onToggleMobileFilters}
              style={{
                all: 'unset',
                display: 'revert',
                boxSizing: 'border-box',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                cursor: 'pointer',
                textAlign: 'center',
                lineHeight: '32px',
              }}
            >
              <i style={{ fontSize: '14px', color: '#6b7280' }} className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '20px',
            display: 'block',
            boxSizing: 'border-box',
          }}
        >
          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div
              style={{
                all: 'unset',
                display: 'revert',
                boxSizing: 'border-box',
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '20px',
                border: '1px solid #dbeafe',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ 
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1e40af',
                }}>
                  Filtros activos ({activeFilters.length})
                </span>
                <button
                  onClick={onClearFilters}
                  style={{
                    all: 'unset',
                    display: 'revert',
                    fontSize: '12px',
                    color: '#1d4ed8',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  Limpiar todo
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {getActiveFiltersSummary().map((filter) => (
                  <div
                    key={filter.fullFilter}
                    style={{
                      all: 'unset',
                      display: 'revert',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>{filter.label}</span>
                    <button
                      onClick={() => removeFilter(filter.fullFilter)}
                      style={{
                        all: 'unset',
                        display: 'revert',
                        marginLeft: '4px',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        textAlign: 'center',
                        lineHeight: '16px',
                      }}
                    >
                      <i style={{ fontSize: '10px' }} className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Brand Filters */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ 
              all: 'unset',
              display: 'revert',
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
              alignItems: 'center',
              gap: '8px',
            }}>
              <i style={{ color: '#3b82f6', marginRight: '8px' }} className="fas fa-mobile-alt"></i>
              Marcas
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleFilterToggle('brand', category.id)}
                  style={{
                    all: 'unset',
                    display: 'revert',
                    boxSizing: 'border-box',
                    padding: '12px',
                    borderRadius: '8px',
                    border: `2px solid ${isFilterActive('brand', category.id) ? '#3b82f6' : '#e5e7eb'}`,
                    backgroundColor: isFilterActive('brand', category.id) ? '#3b82f6' : 'white',
                    color: isFilterActive('brand', category.id) ? 'white' : '#374151',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <i style={{ marginRight: '8px' }} className={category.icon}></i>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filters */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ 
              all: 'unset',
              display: 'revert',
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
            }}>
              <i style={{ color: '#3b82f6', marginRight: '8px' }} className="fas fa-euro-sign"></i>
              Precio
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {filterOptions.price.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterToggle('price', option.value)}
                  style={{
                    all: 'unset',
                    display: 'revert',
                    boxSizing: 'border-box',
                    padding: '12px',
                    borderRadius: '8px',
                    border: `2px solid ${isFilterActive('price', option.value) ? '#3b82f6' : '#e5e7eb'}`,
                    backgroundColor: isFilterActive('price', option.value) ? '#3b82f6' : 'white',
                    color: isFilterActive('price', option.value) ? 'white' : '#374151',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{option.label}</span>
                  <span style={{ fontSize: '12px', opacity: '0.8' }}>({option.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Screen Size Filters */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ 
              all: 'unset',
              display: 'revert',
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
            }}>
              <i style={{ color: '#3b82f6', marginRight: '8px' }} className="fas fa-expand"></i>
              Tamaño de pantalla
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {filterOptions.screenSize.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterToggle('screenSize', option.value)}
                  style={{
                    all: 'unset',
                    display: 'revert',
                    boxSizing: 'border-box',
                    padding: '12px',
                    borderRadius: '8px',
                    border: `2px solid ${isFilterActive('screenSize', option.value) ? '#3b82f6' : '#e5e7eb'}`,
                    backgroundColor: isFilterActive('screenSize', option.value) ? '#3b82f6' : 'white',
                    color: isFilterActive('screenSize', option.value) ? 'white' : '#374151',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{option.label}</span>
                  <span style={{ fontSize: '12px', opacity: '0.8' }}>({option.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* RAM Filters */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ 
              all: 'unset',
              display: 'revert',
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
            }}>
              <i style={{ color: '#3b82f6', marginRight: '8px' }} className="fas fa-memory"></i>
              Memoria RAM
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {filterOptions.ram.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterToggle('ram', option.value)}
                  style={{
                    all: 'unset',
                    display: 'revert',
                    boxSizing: 'border-box',
                    padding: '12px',
                    borderRadius: '8px',
                    border: `2px solid ${isFilterActive('ram', option.value) ? '#3b82f6' : '#e5e7eb'}`,
                    backgroundColor: isFilterActive('ram', option.value) ? '#3b82f6' : 'white',
                    color: isFilterActive('ram', option.value) ? 'white' : '#374151',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Storage Filters */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ 
              all: 'unset',
              display: 'revert',
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
            }}>
              <i style={{ color: '#3b82f6', marginRight: '8px' }} className="fas fa-hdd"></i>
              Almacenamiento
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {filterOptions.storage.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterToggle('storage', option.value)}
                  style={{
                    all: 'unset',
                    display: 'revert',
                    boxSizing: 'border-box',
                    padding: '12px',
                    borderRadius: '8px',
                    border: `2px solid ${isFilterActive('storage', option.value) ? '#3b82f6' : '#e5e7eb'}`,
                    backgroundColor: isFilterActive('storage', option.value) ? '#3b82f6' : 'white',
                    color: isFilterActive('storage', option.value) ? 'white' : '#374151',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Features Filters */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ 
              all: 'unset',
              display: 'revert',
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
            }}>
              <i style={{ color: '#3b82f6', marginRight: '8px' }} className="fas fa-star"></i>
              Características
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {filterOptions.features.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterToggle('features', option.value)}
                  style={{
                    all: 'unset',
                    display: 'revert',
                    boxSizing: 'border-box',
                    padding: '12px',
                    borderRadius: '8px',
                    border: `2px solid ${isFilterActive('features', option.value) ? '#3b82f6' : '#e5e7eb'}`,
                    backgroundColor: isFilterActive('features', option.value) ? '#3b82f6' : 'white',
                    color: isFilterActive('features', option.value) ? 'white' : '#374151',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{option.label}</span>
                  <span style={{ fontSize: '12px', opacity: '0.8' }}>({option.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sorting Options */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ 
              all: 'unset',
              display: 'revert',
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
            }}>
              <i style={{ color: '#3b82f6', marginRight: '8px' }} className="fas fa-sort"></i>
              Ordenar por
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              <button
                onClick={sortByPrice}
                style={{
                  all: 'unset',
                  display: 'revert',
                  boxSizing: 'border-box',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `2px solid ${priceOrder ? '#3b82f6' : '#e5e7eb'}`,
                  backgroundColor: priceOrder ? '#3b82f6' : 'white',
                  color: priceOrder ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>Precio</span>
                {priceOrder && (
                  <i className={`fas fa-arrow-${priceOrder === 'asc' ? 'up' : 'down'}`}></i>
                )}
              </button>
              <button
                onClick={sortBySize}
                style={{
                  all: 'unset',
                  display: 'revert',
                  boxSizing: 'border-box',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `2px solid ${sizeOrder ? '#3b82f6' : '#e5e7eb'}`,
                  backgroundColor: sizeOrder ? '#3b82f6' : 'white',
                  color: sizeOrder ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>Tamaño</span>
                {sizeOrder && (
                  <i className={`fas fa-arrow-${sizeOrder === 'asc' ? 'up' : 'down'}`}></i>
                )}
              </button>
              <button
                onClick={sortByScreenSize}
                style={{
                  all: 'unset',
                  display: 'revert',
                  boxSizing: 'border-box',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `2px solid ${screenOrder ? '#3b82f6' : '#e5e7eb'}`,
                  backgroundColor: screenOrder ? '#3b82f6' : 'white',
                  color: screenOrder ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>Pantalla</span>
                {screenOrder && (
                  <i className={`fas fa-arrow-${screenOrder === 'asc' ? 'up' : 'down'}`}></i>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '15px 20px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            position: 'sticky',
            bottom: '0',
            zIndex: '2147483647',
            display: 'block',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onClearFilters}
              style={{
                all: 'unset',
                display: 'revert',
                boxSizing: 'border-box',
                flex: 1,
                padding: '12px 16px',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              Limpiar filtros
            </button>
            <button
              onClick={onToggleMobileFilters}
              style={{
                all: 'unset',
                display: 'revert',
                boxSizing: 'border-box',
                flex: 1,
                padding: '12px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );

  // Main render
  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="hidden md:block max-h-[calc(100vh-8rem)] overflow-y-auto filter-scrollbar pr-1">
        <DesktopFilterBar />
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <MobileFilterDrawer />
      )}
    </>
  );
};

export default FilterBar;
