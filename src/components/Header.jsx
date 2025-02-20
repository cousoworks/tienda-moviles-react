import React, { useState, useEffect } from 'react';
import './Header.css';
import logoGif from '../assets/logo.gif';  // Importa el GIF del logo

const Header = ({ setSelectedBrand, setSortedProducts }) => {
  const [priceOrder, setPriceOrder] = useState('desc'); // Orden de precio
  const [sizeOrder, setSizeOrder] = useState('desc'); // Orden de tamaño
  const [screenOrder, setScreenOrder] = useState('desc'); // Orden de pantalla

  useEffect(() => {
    const handleScroll = () => {
      const body = document.querySelector('body');
      if (window.scrollY > 50) {
        body.classList.add('scroll');
      } else {
        body.classList.remove('scroll');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para ordenar los productos por precio
  const sortByPrice = () => {
    const newOrder = priceOrder === 'desc' ? 'asc' : 'desc'; // Alternar entre ascendente y descendente
    setPriceOrder(newOrder);

    setSortedProducts((prevProducts) =>
      [...prevProducts].sort((a, b) =>
        newOrder === 'desc' ? b.price - a.price : a.price - b.price
      )
    );
  };

  // Función para ordenar los productos por tamaño
  const sortBySize = () => {
    const newOrder = sizeOrder === 'desc' ? 'asc' : 'desc'; // Alternar entre ascendente y descendente
    setSizeOrder(newOrder);

    setSortedProducts((prevProducts) =>
      [...prevProducts].sort((a, b) =>
        newOrder === 'desc'
          ? parseFloat(b.size.split(' x ')[0]) - parseFloat(a.size.split(' x ')[0])
          : parseFloat(a.size.split(' x ')[0]) - parseFloat(b.size.split(' x ')[0])
      )
    );
  };

  // Función para ordenar los productos por tamaño de pantalla
  const sortByScreenSize = () => {
    const newOrder = screenOrder === 'desc' ? 'asc' : 'desc'; // Alternar entre ascendente y descendente
    setScreenOrder(newOrder);

    setSortedProducts((prevProducts) =>
      [...prevProducts].sort((a, b) =>
        newOrder === 'desc' ? b.screenSize - a.screenSize : a.screenSize - b.screenSize
      )
    );
  };

  return (
    <>
      <header className="header">
  <div className="logo">
    <img src={logoGif} alt="Logo" /> {/* Muestra el logo GIF */}
  </div>
  <nav className="navbar">
    <button onClick={() => setSelectedBrand('')} className="nav-link">TODOS</button>
    <button onClick={() => setSelectedBrand('Samsung')} className="nav-link">SAMSUNG</button>
    <button onClick={() => setSelectedBrand('Apple')} className="nav-link">IPHONE</button>
    <button onClick={() => setSelectedBrand('Xiaomi')} className="nav-link">XIAOMI</button>
    <button onClick={() => setSelectedBrand('OnePlus')} className="nav-link">ONEPLUS</button>

  </nav>
</header>

<div className="sidebar">
  <h3>Filtrar por:</h3>
  <button onClick={sortByPrice}>Precio</button>
  <button onClick={sortBySize}>Tamaño</button>
  <button onClick={sortByScreenSize}>Pantalla</button>
</div>

    </>
  );
};

export default Header;
