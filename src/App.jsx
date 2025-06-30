import React, { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import phonesData from './phones.json';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Lazy load components for code splitting
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Cart = lazy(() => import('./pages/Cart'));
const InfoPage = lazy(() => import('./pages/InfoPage'));

// Componente con transición suave
function SmoothRoutes({ sortedProducts, selectedBrand, setSelectedBrand, handleAddToCart, cart, setCart }) {
  const location = useLocation();
  
  return (
    <div className="transition-opacity duration-300 ease-in-out">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      }>
        <Routes location={location}>
          <Route path="/" element={<Home selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} products={sortedProducts} handleAddToCart={handleAddToCart} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortedProducts, setSortedProducts] = useState(phonesData);
  
  // Using useCallback to prevent recreation of the function on every render
  const handleAddToCart = useCallback((product) => {
    // Update cart state
    setCart(prevCart => [...prevCart, product]);
    // Make this function globally available for the ProductCard
    window.handleAddToCart = handleAddToCart;
  }, []);

  // Make the function globally available on component mount
  React.useEffect(() => {
    window.handleAddToCart = handleAddToCart;
    return () => {
      delete window.handleAddToCart;
    };
  }, [handleAddToCart]);
  
  // Update sorted products when the selectedBrand changes
  useEffect(() => {
    if (selectedBrand) {
      // Filter products by the selected brand
      const filteredProducts = phonesData.filter(product => product.brand === selectedBrand);
      setSortedProducts(filteredProducts);
    } else {
      // If no brand is selected, show all products
      setSortedProducts(phonesData);
    }
  }, [selectedBrand]);
  
  return (
    <Router>
      <div className="app min-h-screen flex flex-col bg-background">
        <Header 
          setSelectedBrand={setSelectedBrand} 
          setSortedProducts={setSortedProducts} 
          cart={cart} 
        />
        <div className="flex-grow w-full">
          <div className="main-content mx-auto">
            <SmoothRoutes
              sortedProducts={sortedProducts}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              handleAddToCart={handleAddToCart}
              cart={cart}
              setCart={setCart}
            />
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
