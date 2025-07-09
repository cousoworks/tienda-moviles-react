import React, { useState, useEffect, useRef, Suspense, lazy, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Carousel from '../components/bits/Carousel';
import FilterBar from '../components/bits/FilterBar';
import Pagination from '../components/bits/Pagination';
import SearchBar from '../components/bits/SearchBar';
import { debounce } from '../utils/performance';

// Lazy load the ProductModal since it's only used when needed
const ProductModal = lazy(() => import('../components/ProductModal'));

const Home = ({ products, handleAddToCart, selectedBrand, setSelectedBrand }) => {
  // Ref para la sección de productos
  const productsRef = useRef(null);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedMessageVisible, setAddedMessageVisible] = useState(false);  
  const [animationClass, setAnimationClass] = useState('');
  // Removed unused currentIndex state
  const [filterAnimating, setFilterAnimating] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [priceOrder, setPriceOrder] = useState(null);
  const [sizeOrder, setSizeOrder] = useState(null);
  const [screenOrder, setScreenOrder] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false); // Can be false, 'filters', or 'search'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Carrusel de imágenes
  const offers = [
    { img: 'offer1.png', description: '¡Ofertas increíbles en móviles!', link: '#' },
    { img: 'offer2.png', description: 'Descuentos de hasta un 50%', link: '#' },
    { img: 'offer3.png', description: 'Compra 2 y llévate unos auriculares', link: '#' },
    { img: 'offer4.png', description: '¡Envío gratis en todos los pedidos!', link: '#' },
  ];

  // Function to scroll to products section
  const scrollToProducts = useCallback(() => {
    if (productsRef.current) {
      // Get header height for better positioning
      const headerHeight = 80; // Approximate header height
      const offsetTop = productsRef.current.offsetTop - headerHeight;
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Only scroll if user is not already near the products section
      if (Math.abs(currentScrollTop - offsetTop) > 100) {
        window.scrollTo({ 
          top: Math.max(0, offsetTop), // Ensure we don't scroll above the page
          behavior: 'smooth' 
        });
      }
    }
  }, []);

  // Handle filter changes with debouncing for better performance
  const handleFilterChangeCore = useCallback((filters) => {
    // Check if there is a brand filter
    const brandFilter = filters.find(filter => filter.startsWith('brand:'));
    
    if (brandFilter) {
      // Extract the brand value
      const brandValue = brandFilter.split(':')[1];
      setSelectedBrand(brandValue);
    } else {
      // If no brand filter, clear the brand selection
      setSelectedBrand('');
    }
    
    // Update all other filters
    const otherFilters = filters.filter(filter => !filter.startsWith('brand:'));
    setActiveFilters(otherFilters);
    
    // Animate the change
    setFilterAnimating(true);
    setTimeout(() => {
      setFilterAnimating(false);
    }, 400);
    
    // Scroll to products section after a short delay to allow for state updates
    setTimeout(() => {
      scrollToProducts();
    }, 100);
  }, [setSelectedBrand, scrollToProducts]);

  // Create debounced version
  const handleFilterChange = useMemo(
    () => debounce(handleFilterChangeCore, 300),
    [handleFilterChangeCore]
  );

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedBrand('');
    setSelectedColor(null);
    setPriceOrder(null);
    setSizeOrder(null);
    setScreenOrder(null);
    setSearchQuery(''); // Clear search as well
    
    // Scroll to products section
    setTimeout(() => {
      scrollToProducts();
    }, 100);
  };

  // Handle search query changes with debouncing
  const handleSearchChangeCore = useCallback((query) => {
    setSearchQuery(query);
    
    // Scroll to products section after a short delay
    setTimeout(() => {
      scrollToProducts();
    }, 100);
  }, [scrollToProducts]);

  // Create debounced version for search
  const handleSearchChange = useMemo(
    () => debounce(handleSearchChangeCore, 300),
    [handleSearchChangeCore]
  );

  // Filter products based on selected brand, active filters, and search query
  const filteredProducts = products.filter(product => {
    // Apply search filter first
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const searchableFields = [
        product.name,
        product.brand,
        product.description,
        product.processor
      ].join(' ').toLowerCase();
      
      if (!searchableFields.includes(query)) {
        return false;
      }
    }
    
    // Only apply brand filter if a specific brand is selected
    if (selectedBrand && selectedBrand !== '' && product.brand !== selectedBrand) {
      return false;
    }
    
    // Apply active filters
    if (activeFilters.length > 0) {
      return activeFilters.every(filter => {
        const [category, value] = filter.split(':');
        
        switch (category) {
          case 'brand':
            if (value === 'all') return true;
            return product.brand === value;
            
          case 'price':
            if (value === 'under-500' && product.price >= 500) return false;
            if (value === '500-800' && (product.price < 500 || product.price >= 800)) return false;
            if (value === '800-1000' && (product.price < 800 || product.price >= 1000)) return false;
            if (value === '1000-1200' && (product.price < 1000 || product.price >= 1200)) return false;
            if (value === 'over-1200' && product.price < 1200) return false;
            return true;
          
          case 'screenSize':
            if (value === 'compact' && product.screenSize >= 6) return false;
            if (value === 'medium' && (product.screenSize < 6 || product.screenSize > 6.5)) return false;
            if (value === 'large' && product.screenSize <= 6.5) return false;
            return true;
          
          case 'ram':
            // Extract numeric value from ram field (e.g., "8GB" -> "8")
            const productRamValue = parseInt(product.ram);
            const filterRamValue = parseInt(value.replace('gb', ''));
            return productRamValue === filterRamValue;
          
          case 'storage':
            // Handle both GB and TB storage
            if (value === '1tb') {
              return product.storage && (product.storage.includes('1TB') || product.storage.includes('1 TB'));
            } else {
              const filterStorageValue = parseInt(value.replace('gb', ''));
              const productStorageValue = parseInt(product.storage);
              return productStorageValue === filterStorageValue;
            }
          
          case 'camera':
            if (!product.camera || !product.camera.main) return false;
            const mainCameraMp = parseInt(product.camera.main);
            
            if (value === 'under-12mp') return mainCameraMp < 12;
            if (value === '12-48mp') return mainCameraMp >= 12 && mainCameraMp < 48;
            if (value === '48-108mp') return mainCameraMp >= 48 && mainCameraMp < 108;
            if (value === 'over-108mp') return mainCameraMp >= 108;
            return true;
          
          case 'features':
            // Since the current data doesn't have these specific fields, 
            // we'll check based on description or other available data
            if (value === 'fastCharge') {
              return product.description && (
                product.description.includes('fast') || 
                product.description.includes('Fast') ||
                product.description.includes('charging') ||
                product.description.includes('SuperVOOC') ||
                product.description.includes('67W') ||
                product.description.includes('100W')
              );
            }
            if (value === 'waterResistant') {
              return product.description && (
                product.description.includes('water') ||
                product.description.includes('IP68') ||
                product.description.includes('IP67')
              );
            }
            if (value === 'latest') {
              // Consider phones with recent processors as latest
              return product.processor && (
                product.processor.includes('Gen 3') ||
                product.processor.includes('Gen 2') ||
                product.processor.includes('A17') ||
                product.processor.includes('A16')
              );
            }
            if (value === '5g') {
              // Most modern phones have 5G, assume true for newer processors
              return product.processor && (
                product.processor.includes('Snapdragon') ||
                product.processor.includes('A1') ||
                product.processor.includes('Tensor')
              );
            }
            if (value === 'promotion') {
              // Check if the price is significantly lower (could indicate promotion)
              return product.price < 600; // Simple heuristic for promotion
            }
            if (value === 'dualSim') {
              return product.description && (
                product.description.includes('Dual SIM') ||
                product.description.includes('dual sim') ||
                product.description.includes('eSIM')
              );
            }
            if (value === 'wirelessCharge') {
              return product.description && (
                product.description.includes('wireless') ||
                product.description.includes('Wireless') ||
                product.description.includes('MagSafe') ||
                product.description.includes('Qi')
              );
            }
            return true;
            
          // Removed duplicate case 'brand' as it's already handled above
          
          default:
            return true;
        }
      });
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by price
    if (priceOrder === 'asc') {
      return a.price - b.price;
    } else if (priceOrder === 'desc') {
      return b.price - a.price;
    }
    
    // Sort by size
    if (sizeOrder === 'asc') {
      const [aWidth] = a.size.split(' x ');
      const [bWidth] = b.size.split(' x ');
      return parseFloat(aWidth) - parseFloat(bWidth);
    } else if (sizeOrder === 'desc') {
      const [aWidth] = a.size.split(' x ');
      const [bWidth] = b.size.split(' x ');
      return parseFloat(bWidth) - parseFloat(aWidth);
    }
    
    // Sort by screen size
    if (screenOrder === 'asc') {
      return a.screenSize - b.screenSize;
    } else if (screenOrder === 'desc') {
      return b.screenSize - a.screenSize;
    }
    
    return 0;
  });
  
  // Calculate pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Reset to page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand, activeFilters, searchQuery]);
  
  // Scroll to products when brand changes from navbar
  useEffect(() => {
    if (selectedBrand) {
      setTimeout(() => {
        scrollToProducts();
      }, 100);
    }
  }, [selectedBrand, scrollToProducts]);
  
  // Removed the carousel interval effect since the Carousel component handles this internally now

  // Efecto para activar la animación cuando cambia el filtro
  useEffect(() => {
    setFilterAnimating(true);
    const timer = setTimeout(() => {
      setFilterAnimating(false);
    }, 800); // Duración de la animación
    
    return () => clearTimeout(timer);
  }, [selectedBrand, activeFilters, searchQuery]); // Se ejecuta cuando cambian los filtros o búsqueda

  // Handle product click
  const handleProductClick = (product) => {
    // Limpia estados previos antes de abrir el modal
    setAddedToCart(false);
    setAnimationClass('');
    setAddedMessageVisible(false);
    setSelectedColor(null);
    setSelectedProduct(product);
  };

  // Handle closing the product modal
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Add product to cart
  const addToCart = () => {
    if (selectedProduct) {
      // Add the selected color if any
      const productToAdd = selectedColor
        ? { ...selectedProduct, selectedColor }
        : selectedProduct;
      
      handleAddToCart(productToAdd);
      
      // Show animation and message
      setAddedToCart(true);
      setAnimationClass('added-to-cart');
      setAddedMessageVisible(true);
      
      // Hide message after delay
      setTimeout(() => {
        setAnimationClass('');
        setAddedToCart(false);
      }, 1000);

      setTimeout(() => {
        setAddedMessageVisible(false);
      }, 2000);
    }
  };

  // Sort by price
  const sortByPrice = () => {
    setPriceOrder(priceOrder === 'desc' ? 'asc' : 'desc');
    setSizeOrder(null);
    setScreenOrder(null);
    
    // Scroll to products section
    setTimeout(() => {
      scrollToProducts();
    }, 100);
  };

  // Sort by size
  const sortBySize = () => {
    setSizeOrder(sizeOrder === 'desc' ? 'asc' : 'desc');
    setPriceOrder(null);
    setScreenOrder(null);
    
    // Scroll to products section
    setTimeout(() => {
      scrollToProducts();
    }, 100);
  };

  // Sort by screen size
  const sortByScreenSize = () => {
    setScreenOrder(screenOrder === 'desc' ? 'asc' : 'desc');
    setPriceOrder(null);
    setSizeOrder(null);
    
    // Scroll to products section
    setTimeout(() => {
      scrollToProducts();
    }, 100);
  };

  // Toggle mobile filters visibility
  const toggleMobileFilters = () => {
    setMobileFilterOpen(prev => prev === 'filters' ? false : 'filters');
  };

  // Pagination functions
  const goToPage = (page) => {
    setCurrentPage(page);
    // Scroll to products section when changing pages
    setTimeout(() => {
      scrollToProducts();
    }, 100);
  };

  // Render carousel item
  const renderCarouselItem = (offer, index) => {
    // Special styling for the first offer (index 0)
    const isFirstOffer = index === 0;
    
    return (
      <div className="w-full h-full relative">
        {/* Conditional gradient overlay - lighter for first offer */}
        <div className={`absolute inset-0 z-10 ${
          isFirstOffer 
            ? "bg-gradient-to-b from-white/20 via-transparent to-transparent" 
            : "bg-gradient-to-r from-black/70 via-black/40 to-transparent"
        }`}></div>
        
        {/* Content positioning - different for first offer */}
        <div className={`w-full h-full relative z-20 ${
          isFirstOffer 
            ? "flex flex-col justify-start items-center pt-8" 
            : "flex items-center"
        }`}>
          <div className="w-full h-full absolute inset-0">
            <img 
              src={require(`../assets/${offer.img}`)} 
              alt={`Oferta ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Text and button container - positioned differently for first offer */}
          <div className={isFirstOffer 
            ? "px-6 md:px-12 max-w-md text-center" 
            : "px-6 md:px-12 max-w-md"
          }>
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
              isFirstOffer 
                ? "text-black drop-shadow-sm" 
                : "text-white drop-shadow-md"
            }`}>
              {offer.description}
            </h2>
            <motion.button 
              className={`px-6 py-2.5 rounded-lg font-medium shadow-lg inline-flex items-center gap-2 transition-colors ${
                isFirstOffer
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-white text-primary hover:bg-primary hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver oferta <i className="fas fa-arrow-right"></i>
            </motion.button>
          </div>
        </div>
      </div>
    );
  };
    // Define brand filter categories
  const brandCategories = [
    { id: 'all', name: 'Todos', icon: 'fas fa-mobile-alt' },
    { id: 'Samsung', name: 'Samsung', icon: 'fas fa-mobile-alt' },
    { id: 'Apple', name: 'iPhone', icon: 'fab fa-apple' },
    { id: 'Xiaomi', name: 'Xiaomi', icon: 'fas fa-mobile' },
    { id: 'OnePlus', name: 'OnePlus', icon: 'fas fa-mobile-alt' },
    { id: 'Google', name: 'Google', icon: 'fab fa-google' },
    { id: 'Oppo', name: 'Oppo', icon: 'fas fa-mobile-alt' },
    { id: 'Vivo', name: 'Vivo', icon: 'fas fa-mobile' },
    { id: 'Realme', name: 'Realme', icon: 'fas fa-mobile-alt' },
  ];
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero Banner with Carousel */}
      <section className="mb-8">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <Carousel
            items={offers}
            renderItem={renderCarouselItem}
            interval={4000}
            className="w-full aspect-[21/9] md:aspect-[21/7]"
          />
        </div>
      </section>
      
      {/* Search Bar Section */}
      <section className="mb-6">
        <div className="max-w-2xl mx-auto">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            placeholder="Buscar móviles por nombre, marca, procesador..."
            className="w-full"
            isMobile={false}
          />
        </div>
      </section>
      
      {/* Main content layout with sidebar */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 order-2 md:order-1">
          <div className="sticky top-20 bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <h2 className="font-bold text-lg mb-4 border-b border-gray-100 pb-3 text-gray-800 flex items-center">
              <i className="fas fa-filter text-blue-500 mr-2"></i>
              Filtros</h2>
            <FilterBar
              priceOrder={priceOrder}
              sizeOrder={sizeOrder}
              screenOrder={screenOrder}
              sortByPrice={sortByPrice}
              sortBySize={sortBySize}
              sortByScreenSize={sortByScreenSize}
              filterCategories={brandCategories}
              onFilterChange={handleFilterChange}
              activeFilters={[...(selectedBrand ? [`brand:${selectedBrand}`] : []), ...activeFilters]}
              onClearFilters={clearAllFilters}
              compact={true}
              mobileFiltersOpen={mobileFilterOpen === 'filters'}
              onToggleMobileFilters={toggleMobileFilters}
            />
          </div>
        </div>
        
        {/* Main content area */}
        <div className="w-full md:w-3/4 lg:w-4/5 order-1 md:order-2">
          {/* Category Title */}
          <section className="mb-6" ref={productsRef}>
            <motion.div 
              className="flex items-center justify-between border-b border-gray-200 pb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {searchQuery ? (
                    <>Resultados para: "{searchQuery}"</>
                  ) : selectedBrand ? (
                    `Móviles ${selectedBrand}`
                  ) : (
                    'Todos los móviles'
                  )}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {searchQuery ? (
                    `${totalProducts} resultado${totalProducts !== 1 ? 's' : ''} encontrado${totalProducts !== 1 ? 's' : ''}`
                  ) : (
                    'Encuentra el smartphone perfecto para ti'
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
                  {totalProducts} productos{totalPages > 1 && ` (Página ${currentPage} de ${totalPages})`}
                </span>
                
                {/* Mobile Search and Filter - Improved */}
                <div className="md:hidden flex items-center gap-3">
                  {/* Mobile Search Toggle */}
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-200 hover:border-primary/30 transition-all duration-200"
                    onClick={() => setMobileFilterOpen(prev => prev === 'search' ? false : 'search')}
                  >
                    <i className="fas fa-search text-primary"></i>
                    <span className="text-sm font-medium text-gray-700">Buscar</span>
                  </motion.button>
                  
                  {/* Mobile Filter Toggle */}
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-200 hover:border-primary/30 transition-all duration-200"
                    onClick={() => setMobileFilterOpen(prev => prev === 'filters' ? false : 'filters')}
                  >
                    <i className="fas fa-sliders-h text-primary"></i>
                    <span className="text-sm font-medium text-gray-700">Filtros</span>
                    {(activeFilters.length > 0 || selectedBrand) && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                      >
                        {activeFilters.length + (selectedBrand ? 1 : 0)}
                      </motion.span>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Products Grid */}
          <section>
            <motion.div 
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`}              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate={filterAnimating ? "hidden" : "show"}
            >
              {totalProducts === 0 ? (
                <motion.div 
                  className="col-span-full flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <i className={`text-4xl text-gray-300 mb-4 ${searchQuery ? 'fas fa-search' : 'fas fa-filter'}`}></i>
                  <p className="text-gray-500 text-lg mb-2">
                    {searchQuery 
                      ? `No se encontraron móviles que coincidan con "${searchQuery}"`
                      : 'No se encontraron productos que coincidan con tus filtros'
                    }
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    {searchQuery 
                      ? 'Prueba con otros términos de búsqueda'
                      : 'Prueba otras opciones o limpia los filtros'
                    }
                  </p>
                  <div className="flex gap-2">
                    {searchQuery && (
                      <motion.button 
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2"
                        onClick={() => handleSearchChange('')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <i className="fas fa-times-circle"></i>
                        Limpiar búsqueda
                      </motion.button>
                    )}
                    <motion.button 
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium flex items-center gap-2"
                      onClick={clearAllFilters}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-refresh"></i>
                      {searchQuery ? 'Limpiar todo' : 'Limpiar filtros'}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                currentProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id}
                    product={product} 
                    onClick={() => handleProductClick(product)}
                    index={index}
                  />
                ))
              )}
            </motion.div>
          </section>
          
          {/* Mobile Search Modal - Improved */}
          <AnimatePresence>
            {mobileFilterOpen === 'search' && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                  onClick={() => setMobileFilterOpen(false)}
                />
                
                {/* Search Modal Content */}
                <motion.div
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-100%" }}
                  transition={{ 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 300,
                    duration: 0.4 
                  }}
                  className="md:hidden fixed inset-x-0 top-0 bottom-auto bg-gradient-to-br from-white to-gray-50 shadow-2xl z-50 p-5 rounded-b-2xl"
                  style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1.5rem)' }}
                >
                  {/* Search Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <i className="fas fa-search text-primary"></i>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Buscar móviles</h3>
                    </div>
                    <motion.button 
                      onClick={() => setMobileFilterOpen(false)}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                    >
                      <i className="fas fa-times text-gray-500"></i>
                    </motion.button>
                  </div>
                  
                  {/* Mobile Search Bar */}
                  <div className="mb-6">
                    <SearchBar
                      searchQuery={searchQuery}
                      onSearchChange={handleSearchChange}
                      placeholder="Buscar por nombre, marca, procesador..."
                      className="w-full"
                      isMobile={true}
                    />
                  </div>
                  
                  {/* Quick Search Suggestions */}
                  <div>
                    <p className="text-sm text-gray-600 mb-4 font-medium">Búsquedas populares:</p>
                    <div className="flex flex-wrap gap-3">
                      {['iPhone', 'Samsung', 'Xiaomi', 'OnePlus', 'Galaxy', 'Snapdragon'].map((suggestion) => (
                        <motion.button
                          key={suggestion}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            handleSearchChange(suggestion);
                            setMobileFilterOpen(false);
                          }}
                          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-50 hover:border-primary/30 transition-all duration-200 font-medium shadow-sm"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalProducts}
            itemsPerPage={productsPerPage}
            onPageChange={goToPage}
            className="mt-8"
          />
        </div>
      </div>
      
      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <Suspense fallback={
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            </div>
          }>
            <ProductModal
              product={selectedProduct}
              onClose={closeProductModal}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              onAddToCart={addToCart}
              addedToCart={addedToCart}
              addedMessageVisible={addedMessageVisible}
              animationClass={animationClass}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
