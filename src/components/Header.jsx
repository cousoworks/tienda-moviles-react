import React, { useState, useEffect, useRef } from 'react';
import techLogo from '../assets/tech_mobile_logo.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ setSelectedBrand, setSortedProducts, cart = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const lastScrollTop = useRef(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Mejorar el manejo del scroll para evitar atascamientos
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        // Usar requestAnimationFrame para optimizar el rendimiento del scroll
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          
          // Ocultar/mostrar header basado en dirección del scroll
          if (scrollTop > lastScrollTop.current + 5 && scrollTop > 100) {
            // Scrolling down - hide header
            setIsHeaderVisible(false);
          } else if (scrollTop < lastScrollTop.current - 5 || scrollTop <= 50) {
            // Scrolling up or near top - show header
            setIsHeaderVisible(true);
          }
          
          lastScrollTop.current = scrollTop;
          ticking = false;
        });
        
        ticking = true;
      }
    };

    // Función para mostrar header cuando el mouse está en la parte superior
    const handleMouseMove = (e) => {
      if (e.clientY <= 50 && !isHeaderVisible) {
        setIsHeaderVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHeaderVisible]);

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
    // Crear referencias a los manejadores específicos para poder limpiarlos correctamente
    const handleResizeCleanup = () => {}; 
    const handleScrollCleanup = () => {};
    const handleClickOutsideCleanup = () => {};
    
    window.addEventListener('resize', handleResizeCleanup);
    window.addEventListener('scroll', handleScrollCleanup);
    document.addEventListener('mousedown', handleClickOutsideCleanup);
    
    return () => {
      // Limpieza específica de los manejadores
      window.removeEventListener('resize', handleResizeCleanup);
      window.removeEventListener('scroll', handleScrollCleanup);
      document.removeEventListener('mousedown', handleClickOutsideCleanup);
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
    // Detener el comportamiento predeterminado del enlace
    e.preventDefault();
    
    // Solo ejecutar la lógica en móvil
    if (window.innerWidth <= 768) {
      // Evitar propagación del evento
      e.stopPropagation();
      
      // Cambiar estado del submenú con un timeout para evitar problemas de sincronización
      setMobileSubmenuOpen(!mobileSubmenuOpen);
    }
  };

  // Cerrar menú móvil (por ejemplo, cuando se hace clic en un enlace)
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSubmenuOpen(false);
  };

  // Funciones para ordenar los productos
  // Función para manejar la apertura y cierre del menú
  // eslint-disable-next-line no-unused-vars
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
      <header className={`fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-[9998] transition-all duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">          <div className="h-12">
            <Link to="/" className="block h-full" onClick={() => handleBrandSelect('')}>
              <img src={techLogo} alt="Tech Mobile" className="h-full w-auto object-contain" />
            </Link>
          </div>
          
          {/* Botón hamburguesa para dispositivos móviles */}
          <button 
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Menú principal"
          >
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 my-1 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>

          {/* Navegación principal - visible en escritorio, oculta en móvil */}
          <nav className={`absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent md:flex md:items-center transform transition-all duration-300 shadow-md md:shadow-none
            ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 md:translate-y-0 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto'}`}>
            
            <div className="relative group" ref={dropdownRef}>
              {/* En desktop al pasar el cursor se despliega el menú, en móvil al hacer clic se alterna */}
              <Link 
                to="#" 
                className="block px-5 py-3 md:py-2 text-gray-800 md:text-sm font-medium hover:text-primary border-b md:border-b-0 md:mr-6"
                onClick={toggleMobileSubmenu}
              >
                MARCAS
                <i className={`fas fa-chevron-down ml-2 text-xs transform transition-transform duration-300 ${mobileSubmenuOpen ? 'rotate-180' : ''}`}></i>
              </Link>
              <ul className={`md:absolute md:top-full md:left-0 bg-white w-full md:w-48 md:shadow-lg md:rounded-md md:py-1 overflow-hidden transition-all duration-300 
                ${mobileSubmenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 md:group-hover:max-h-80 opacity-0 md:group-hover:opacity-100'}`}>
                <li 
                  onClick={() => handleBrandSelect('')}
                  className="px-5 py-2.5 md:py-2 hover:bg-gray-50 hover:text-primary cursor-pointer text-sm"
                >
                  TODOS
                </li>
                <li 
                  onClick={() => handleBrandSelect('Samsung')}
                  className="px-5 py-2.5 md:py-2 hover:bg-gray-50 hover:text-primary cursor-pointer text-sm"
                >
                  SAMSUNG
                </li>
                <li 
                  onClick={() => handleBrandSelect('Apple')}
                  className="px-5 py-2.5 md:py-2 hover:bg-gray-50 hover:text-primary cursor-pointer text-sm"
                >
                  IPHONE
                </li>
                <li 
                  onClick={() => handleBrandSelect('Xiaomi')}
                  className="px-5 py-2.5 md:py-2 hover:bg-gray-50 hover:text-primary cursor-pointer text-sm"
                >
                  XIAOMI
                </li>
                <li 
                  onClick={() => handleBrandSelect('OnePlus')}
                  className="px-5 py-2.5 md:py-2 hover:bg-gray-50 hover:text-primary cursor-pointer text-sm"
                >
                  ONEPLUS
                </li>
                <li 
                  onClick={() => handleBrandSelect('Google')}
                  className="px-5 py-2.5 md:py-2 hover:bg-gray-50 hover:text-primary cursor-pointer text-sm"
                >
                  GOOGLE
                </li>
                <li 
                  onClick={() => handleBrandSelect('Oppo')}
                  className="px-5 py-2.5 md:py-2 hover:bg-gray-50 hover:text-primary cursor-pointer text-sm"
                >
                  OPPO
                </li>
                <li 
                  onClick={() => handleBrandSelect('Vivo')}
                  className="px-5 py-2.5 md:py-2 hover:bg-gray-50 hover:text-primary cursor-pointer text-sm"
                >
                  VIVO
                </li>
                <li 
                  onClick={() => handleBrandSelect('Realme')}
                  className="px-5 py-2.5 md:py-2 hover:bg-gray-50 hover:text-primary cursor-pointer text-sm"
                >
                  REALME
                </li>
              </ul>
            </div>
            
            <Link 
              to="/about-us" 
              className="block px-5 py-3 md:py-2 text-gray-800 md:text-sm font-medium hover:text-primary border-b md:border-b-0 md:mr-6"
              onClick={() => {scrollToTop(); closeMobileMenu();}}
            >
              NOSOTROS
            </Link>
            
            <Link 
              to="/shipping" 
              className="block px-5 py-3 md:py-2 text-gray-800 md:text-sm font-medium hover:text-primary border-b md:border-b-0 md:mr-6"
              onClick={() => {scrollToTop(); closeMobileMenu();}}
            >
              ENVÍOS
            </Link>
            
            <Link 
              to="/cart" 
              className="block px-5 py-3 md:py-2 text-gray-800 md:text-sm font-medium hover:text-primary relative"
              onClick={() => {scrollToTop(); closeMobileMenu();}}
            >              <i className="fas fa-shopping-cart mr-2"></i>
              CARRITO
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.span 
                    key="cart-badge"
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-primary text-white rounded-full"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1 
                    }}
                    transition={{ 
                      duration: 0.3,
                      type: "spring",
                      stiffness: 200 
                    }}
                  >
                    {cart.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Espacio para que el contenido no quede bajo el header fijo */}
      <div className="h-[72px]"></div>
      
      {/* Sidebar derecho eliminado */}
    </>
  );
};

export default Header;
