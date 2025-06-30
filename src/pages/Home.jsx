import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Carousel, FilterBar, Pagination } from '../components/bits';

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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
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

  // Handle filter changes
  const handleFilterChange = (filters) => {
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
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedBrand('');
    setSelectedColor(null);
    setPriceOrder(null);
    setSizeOrder(null);
    setScreenOrder(null);
    
    // Scroll to products section
    setTimeout(() => {
      scrollToProducts();
    }, 100);
  };

  // Filter products based on selected brand and active filters
  const filteredProducts = products.filter(product => {
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
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand, activeFilters]);
  
  // Scroll to products when brand changes from navbar
  useEffect(() => {
    if (selectedBrand) {
      setTimeout(() => {
        scrollToProducts();
      }, 100);
    }
  }, [selectedBrand]);
  
  // Removed the carousel interval effect since the Carousel component handles this internally now

  // Efecto para activar la animación cuando cambia el filtro
  useEffect(() => {
    setFilterAnimating(true);
    const timer = setTimeout(() => {
      setFilterAnimating(false);
    }, 800); // Duración de la animación
    
    return () => clearTimeout(timer);
  }, [selectedBrand, activeFilters]); // Se ejecuta cuando cambian los filtros

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
    setMobileFilterOpen(!mobileFilterOpen);
  };

  // Pagination functions
  const goToPage = (page) => {
    setCurrentPage(page);
    // Scroll to products section when changing pages
    setTimeout(() => {
      scrollToProducts();
    }, 100);
  };

  // Function to scroll to products section
  const scrollToProducts = () => {
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
      
      {/* Main content layout with sidebar */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/4 lg:w-1/5 order-2 md:order-1">
          <div className="sticky top-20 bg-white rounded-lg shadow-md p-4">
            <h2 className="font-bold text-lg mb-4 border-b pb-2">Filtros</h2>
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
                  {selectedBrand ? `Móviles ${selectedBrand}` : 'Todos los móviles'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Encuentra el smartphone perfecto para ti
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
                  {totalProducts} productos{totalPages > 1 && ` (Página ${currentPage} de ${totalPages})`}
                </span>
                <div className="md:hidden">
                  <button 
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600"
                    onClick={toggleMobileFilters}
                  >
                    <i className="fas fa-filter"></i>
                  </button>
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
                  <i className="fas fa-filter text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500 text-lg mb-2">No se encontraron productos que coincidan con tus filtros</p>
                  <p className="text-gray-400 text-sm mb-4">Prueba otras opciones o limpia los filtros</p>
                  <motion.button 
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium flex items-center gap-2"
                    onClick={clearAllFilters}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-times-circle"></i>
                    Limpiar filtros
                  </motion.button>
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
