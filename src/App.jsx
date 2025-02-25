import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Shipping from './pages/Shipping';
import Cart from './pages/Cart';
import mobilesData from './mobiles.json';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]);  // Estado para el carrito
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortedProducts, setSortedProducts] = useState(mobilesData);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);  // Añadir el producto al carrito
  };

  return (
    <Router>
      <div className="app">
        <Header setSelectedBrand={setSelectedBrand} setSortedProducts={setSortedProducts} />
        <div className="container">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home selectedBrand={selectedBrand} products={sortedProducts} handleAddToCart={handleAddToCart} />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} /> {/* Pasar setCart */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
