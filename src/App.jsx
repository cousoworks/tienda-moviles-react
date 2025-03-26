import React, { useState, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Shipping from './pages/Shipping';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import mobilesData from './mobiles.json';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Componente envolvente para las rutas con animación
function AnimatedRoutes({ sortedProducts, selectedBrand, handleAddToCart, cart, setCart }) {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
  <CSSTransition nodeRef={nodeRef} key={location.pathname} classNames="page" timeout={300}>
    <div ref={nodeRef}>
      <Routes location={location}>
        <Route path="/" element={<Home selectedBrand={selectedBrand} products={sortedProducts} handleAddToCart={handleAddToCart} />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </div>
  </CSSTransition>
</TransitionGroup>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortedProducts, setSortedProducts] = useState(mobilesData);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <div className="app">
        <Header setSelectedBrand={setSelectedBrand} setSortedProducts={setSortedProducts} />
        <div className="container">
          <div className="main-content">
            <AnimatedRoutes
              sortedProducts={sortedProducts}
              selectedBrand={selectedBrand}
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
