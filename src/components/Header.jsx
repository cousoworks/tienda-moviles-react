import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import logoGif from '../assets/logo.gif';  // Importa el GIF del logo
import separadorImg from '../assets/separador.png';
import { Link } from 'react-router-dom';  // Importar Link para navegación

const Header = ({ setSelectedBrand, setSortedProducts }) => {
  const [priceOrder, setPriceOrder] = useState('desc'); // Orden de precio
  const [sizeOrder, setSizeOrder] = useState('desc'); // Orden de tamaño
  const [screenOrder, setScreenOrder] = useState('desc'); // Orden de pantalla
  const [menuOpen, setMenuOpen] = useState(false); // Estado para abrir/cerrar el menú desplegable
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // Estado para ocultar el header
  const lastScrollTop = useRef(0);  // Usamos useRef en lugar de una variable normal

  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.current && scrollTop > 50) {
        setIsHeaderVisible(false); // Oculta el header al hacer scroll hacia abajo
      } else {
        setIsHeaderVisible(true); // Muestra el header al hacer scroll hacia arriba
      }

      lastScrollTop.current = scrollTop; // Actualizamos el valor de lastScrollTop
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);  // Solo se ejecuta una vez al montar el componente

  // Función para hacer scroll hacia la parte superior
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para ordenar los productos por precio
  const sortByPrice = () => {
    const newOrder = priceOrder === 'desc' ? 'asc' : 'desc';
    setPriceOrder(newOrder);
    setSortedProducts((prevProducts) =>
      [...prevProducts].sort((a, b) =>
        newOrder === 'desc' ? b.price - a.price : a.price - b.price
      )
    );
  };

  // Función para ordenar los productos por tamaño
  const sortBySize = () => {
    const newOrder = sizeOrder === 'desc' ? 'asc' : 'desc';
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
    const newOrder = screenOrder === 'desc' ? 'asc' : 'desc';
    setScreenOrder(newOrder);
    setSortedProducts((prevProducts) =>
      [...prevProducts].sort((a, b) =>
        newOrder === 'desc' ? b.screenSize - a.screenSize : a.screenSize - b.screenSize
      )
    );
  };

  // Función para manejar la apertura y cierre del menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className={`header ${isHeaderVisible ? '' : 'hidden'}`}>
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={logoGif} alt="Logo" />
          </Link>
        </div>
        <nav className="navbar">
          <div 
            className="nav-link dropdown"
            onClick={toggleMenu} // Usar toggleMenu aquí
          >
            <Link to="/" className="nav-link">
              MARCAS
            </Link>
            {menuOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => setSelectedBrand('')}>TODOS</li>
                <li onClick={() => setSelectedBrand('Samsung')}>SAMSUNG</li>
                <li onClick={() => setSelectedBrand('Apple')}>IPHONE</li>
                <li onClick={() => setSelectedBrand('Xiaomi')}>XIAOMI</li>
                <li onClick={() => setSelectedBrand('OnePlus')}>ONEPLUS</li>
              </ul>
            )}
          </div>
          <Link to="/about-us" className="nav-link" onClick={scrollToTop}>NOSOTROS</Link>
          <Link to="/shipping" className="nav-link" onClick={scrollToTop}>ENVIOS</Link>
          <Link to="/cart" className="nav-link" onClick={scrollToTop}>CARRITO</Link>
        </nav>
      </header>

      <div className="sidebar">
        <img src={separadorImg} alt="Separador" className="sidebar-separator" />
        <h3>Filtrar por:</h3>
        <button onClick={sortByPrice}>Precio</button>
        <button onClick={sortBySize}>Tamaño</button>
        <button onClick={sortByScreenSize}>Pantalla</button>
      </div>
    </>
  );
};

export default Header;
