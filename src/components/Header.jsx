import React, { useEffect } from 'react';
import './Header.css';
import background from '../assets/background.png';

const Header = ({ setSelectedBrand }) => {
  useEffect(() => {
    const handleScroll = () => {
      const body = document.querySelector('body');
      if (window.scrollY > 50) {
        body.classList.add('scroll');
      } else {
        body.classList.remove('scroll');
      }
    };

    // Añadir el event listener al hacer scroll
    window.addEventListener('scroll', handleScroll);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className="header"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="logo">
          <h1>Tienda Móviles Blayne</h1>
        </div>
        <nav className="navbar">
          <button onClick={() => setSelectedBrand('Samsung')} className="nav-link">SAMSUNG</button>
          <button onClick={() => setSelectedBrand('Apple')} className="nav-link">IPHONE</button>
          <button onClick={() => setSelectedBrand('Xiaomi')} className="nav-link">XIAOMI</button>
          <button onClick={() => setSelectedBrand('OnePlus')} className="nav-link">ONEPLUS</button>
          <button onClick={() => setSelectedBrand('')} className="nav-link">TODOS</button>
        </nav>
      </header>

      <div className="sidebar" style={{ backgroundImage: `url(${background})` }}>
        <h3>Más Filtros</h3>
        <button>Precio</button>
        <button>Tamaño</button>
        <button>Pantalla</button>
      </div>
    </>
  );
};

export default Header;
