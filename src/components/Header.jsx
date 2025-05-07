import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import logoGif from '../assets/logo.gif';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = ({ setSelectedBrand, setSortedProducts }) => {
  const [priceOrder, setPriceOrder] = useState('desc');
  const [sizeOrder, setSizeOrder] = useState('desc');
  const [screenOrder, setScreenOrder] = useState('desc');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const lastScrollTop = useRef(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Ocultar/mostrar header con umbral de 50px
      if (scrollTop > lastScrollTop.current && scrollTop > 50) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollTop.current = scrollTop;
    };

    // Cerrar el menú al hacer clic fuera de él
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cierra el menú móvil cuando se cambia de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        setMobileSubmenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  // Prevenir errores de comunicación asíncrona
  useEffect(() => {
    return () => {
      // Limpieza de posibles manejadores de eventos pendientes
      const allEventListeners = ['click', 'touchstart', 'mousedown', 'resize', 'scroll'];
      allEventListeners.forEach(event => {
        window.removeEventListener(event, () => {});
      });
    };
  }, []);

  // Función para hacer scroll hacia la parte superior con animación
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle menú móvil - optimizado para prevenir posibles errores asíncronos
  const toggleMobileMenu = () => {
    setTimeout(() => {
      setMobileMenuOpen(prevState => !prevState);
      if (mobileMenuOpen) {
        setMobileSubmenuOpen(false);
      }
    }, 0);
  };

  // Toggle submenu móvil (MARCAS) - con mejor manejo de eventos
  const toggleMobileSubmenu = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      e.stopPropagation(); // Prevenir posible propagación del evento
      setTimeout(() => {
        setMobileSubmenuOpen(prevState => !prevState);
      }, 0);
      return false;
    }
  };

  // Cerrar menú móvil (por ejemplo, cuando se hace clic en un enlace)
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSubmenuOpen(false);
  };

  // Funciones para ordenar los productos
  const sortByPrice = () => {
    const newOrder = priceOrder === 'desc' ? 'asc' : 'desc';
    setPriceOrder(newOrder);
    setSortedProducts((prevProducts) =>
      [...prevProducts].sort((a, b) =>
        newOrder === 'desc' ? b.price - a.price : a.price - b.price
      )
    );
  };

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
  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  // Función para seleccionar marca y redirigir a inicio si estamos en otra página
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setMenuOpen(false);
    setMobileMenuOpen(false);
    setMobileSubmenuOpen(false);
    
    // Si no estamos en la página de inicio, redirigir a ella
    if (location.pathname !== '/') {
      navigate('/');
    }
    
    scrollToTop();
  };

  return (
    <>
      <header className={`header ${isHeaderVisible ? '' : 'hidden'}`}>
        <div className="logo">
          <Link to="/" className="logo-link" onClick={() => handleBrandSelect('')}>
            <img src={logoGif} alt="Logo" />
          </Link>
        </div>
        
        {/* Botón hamburguesa para dispositivos móviles */}
        <button 
          className={`hamburger-menu ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Menú principal"
        >
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </button>

        {/* Navegación principal - visible en escritorio, oculta en móvil */}
        <nav className={`navbar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className={`dropdown ${mobileSubmenuOpen ? 'mobile-submenu-open' : ''}`} ref={dropdownRef}>
            {/* En desktop al pasar el cursor se despliega el menú, en móvil al hacer clic se alterna */}
            <Link to="#" className="nav-link" onClick={(e) => {
              e.preventDefault();
              if (window.innerWidth <= 768) {
                toggleMobileSubmenu(e);
              }
            }}>
              MARCAS
            </Link>
            <ul className={`dropdown-menu ${mobileSubmenuOpen ? 'mobile-visible' : ''}`}>
              <li onClick={() => handleBrandSelect('')}>TODOS</li>
              <li onClick={() => handleBrandSelect('Samsung')}>SAMSUNG</li>
              <li onClick={() => handleBrandSelect('Apple')}>IPHONE</li>
              <li onClick={() => handleBrandSelect('Xiaomi')}>XIAOMI</li>
              <li onClick={() => handleBrandSelect('OnePlus')}>ONEPLUS</li>
            </ul>
          </div>
          <Link to="/about-us" className="nav-link" onClick={() => {scrollToTop(); closeMobileMenu();}}>NOSOTROS</Link>
          <Link to="/shipping" className="nav-link" onClick={() => {scrollToTop(); closeMobileMenu();}}>ENVÍOS</Link>
          <Link to="/cart" className="nav-link" onClick={() => {scrollToTop(); closeMobileMenu();}}>CARRITO</Link>
        </nav>
      </header>

      <div className={`sidebar ${mobileMenuOpen ? 'mobile-visible' : ''}`}>
        <div className="sidebar-separator"></div>
        <h3>Filtros</h3>
        <div className="filter-buttons">
          <button onClick={sortByPrice}>
            Precio {priceOrder === 'desc' ? '↓' : '↑'}
          </button>
          <button onClick={sortBySize}>
            Tamaño {sizeOrder === 'desc' ? '↓' : '↑'}
          </button>
          <button onClick={sortByScreenSize}>
            Pantalla {screenOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
