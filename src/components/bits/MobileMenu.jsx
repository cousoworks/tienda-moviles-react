import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  brands = [], 
  onBrandSelect,
  isSubmenuOpen,
  toggleSubmenu
}) => {
  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 lg:hidden"
      initial="closed"
      animate="open"
      exit="closed"
      variants={menuVariants}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Menu content */}
      <motion.div 
        className="absolute top-0 right-0 h-full w-72 bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h3 className="font-bold text-lg">Menú</h3>
          <motion.button 
            className="w-8 h-8 flex items-center justify-center rounded-full"
            onClick={onClose}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-times"></i>
          </motion.button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-2">
          <motion.div variants={itemVariants} className="px-2">
            <div className="mb-2">
              <button 
                className="w-full flex justify-between items-center p-3 text-left rounded-lg hover:bg-gray-100"
                onClick={toggleSubmenu}
              >
                <span className="font-medium">Marcas</span>
                <i className={`fas fa-chevron-${isSubmenuOpen ? 'up' : 'down'} text-sm`}></i>
              </button>

              {/* Submenu for brands */}
              {isSubmenuOpen && (
                <div className="bg-gray-50 rounded-lg mt-1 overflow-hidden">
                  <button 
                    className="w-full p-3 pl-6 text-left text-sm hover:bg-gray-100 border-l-4 border-transparent hover:border-primary"
                    onClick={() => {
                      onBrandSelect('');
                      onClose();
                    }}
                  >
                    Todos los móviles
                  </button>
                  {brands.map((brand, index) => (
                    <button 
                      key={index}
                      className="w-full p-3 pl-6 text-left text-sm hover:bg-gray-100 border-l-4 border-transparent hover:border-primary"
                      onClick={() => {
                        onBrandSelect(brand);
                        onClose();
                      }}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="px-2">
            <Link 
              to="/about-us" 
              className="block p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              Nosotros
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="px-2">
            <Link 
              to="/shipping" 
              className="block p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              Envíos
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="px-2">
            <Link 
              to="/cart" 
              className="block p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              Carrito
            </Link>
          </motion.div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t">
          <Link 
            to="/contact" 
            className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-lg font-medium"
            onClick={onClose}
          >
            <i className="fas fa-envelope"></i>
            Contacto
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
