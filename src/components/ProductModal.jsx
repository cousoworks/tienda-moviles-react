import React from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

const ProductModal = ({ 
  product, 
  onClose, 
  selectedColor,
  setSelectedColor,
  onAddToCart,
  addedToCart,
  addedMessageVisible,
  animationClass 
}) => {
  if (!product) return null;

  // Color mapping
  const colorMap = {
    "Black": "#000000",
    "White": "#FFFFFF",
    "Titanium Black": "#2F2F2F",
    "Titanium Gray": "#808080",
    "Titanium Violet": "#8A2BE2",
    "Titanium Yellow": "#FFD700",
    "Onyx Black": "#0F0F0F",
    "Marble Gray": "#a9a9a9",
    "Cobalt Violet": "#7851a9",
    "Amber Yellow": "#FFBF00",
    "Phantom Black": "#000000",
    "Cream": "#FFFDD0",
    "Green": "#00A86B",
    "Lavender": "#E6E6FA",
    "Blue": "#0000FF",
    "Natural Titanium": "#878681",
    "Blue Titanium": "#0F52BA",
    "White Titanium": "#F8F8FF",
    "Ceramic Black": "#0C0C0C",
    "Ceramic White": "#FFFFF0",
    "Ceramic Blue": "#2E5894",
    "Light Green": "#90EE90",
    "Flowy Emerald": "#50C878",
    "Silky Black": "#191919",
    "Cool Blue": "#0892D0",
    "Iron Gray": "#43464B",
    "Eternal Green": "#006400",
    "Titan Black": "#0A0A0A",
    "Sonic Black": "#0C090A",
    "Galactic Silver": "#C0C0C0"
  };

  const modalContent = (
    <motion.div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <motion.div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ 
          type: "spring",
          damping: 25,
          stiffness: 300
        }}
        style={{ zIndex: 10000 }}
      >
        <motion.button 
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-800 text-3xl z-[10001]"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close modal"
          style={{ zIndex: 10001 }}
        >
          &times;
        </motion.button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <motion.div 
            className="relative flex flex-col"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative aspect-square bg-gray-50 p-4 rounded-xl flex items-center justify-center mb-4">
              <img 
                src={require(`../assets/images/${product.image}`)} 
                alt={product.name} 
                className="w-full h-full object-contain transition-opacity duration-300 opacity-100"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = require('../assets/logo.png');
                }}
              />
            </div>

            {/* Device highlights */}
            <div className="flex flex-wrap gap-2 mt-2">
              {product.fastCharge && (
                <div className="flex items-center gap-1.5 bg-blue-100 text-blue-700 py-1.5 px-3 rounded-full text-sm">
                  <i className="fas fa-bolt text-yellow-500"></i>
                  <span>Carga Rápida {product.chargingSpeed}</span>
                </div>
              )}
              {product.waterResistant && (
                <div className="flex items-center gap-1.5 bg-cyan-100 text-cyan-700 py-1.5 px-3 rounded-full text-sm">
                  <i className="fas fa-tint"></i>
                  <span>{product.waterResistant}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-gray-100 text-gray-700 py-1.5 px-3 rounded-full text-sm">
                <i className="fas fa-mobile-alt"></i>
                <span>{product.screenSize}"</span>
              </div>
            </div>
          </motion.div>
          
          <div className="flex flex-col gap-5">
            <motion.div
              className="space-y-2"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
              <div className="inline-block bg-primary text-white text-sm font-medium py-1 px-3 rounded-md">{product.brand}</div>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-3xl font-bold text-primary mt-2">{product.price}€</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-x-4 gap-y-3 mt-2 border-t border-b border-gray-100 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500">Procesador</span>
                <span className="text-sm text-gray-800">{product.processor || "No especificado"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500">RAM</span>
                <span className="text-sm text-gray-800">{product.ram || "No especificado"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500">Almacenamiento</span>
                <span className="text-sm text-gray-800">{product.storage || "No especificado"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500">Pantalla</span>
                <span className="text-sm text-gray-800">{product.screenSize}"</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500">Tamaño</span>
                <span className="text-sm text-gray-800">{product.size}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500">Batería</span>
                <span className="text-sm text-gray-800">{product.battery || "No especificado"}</span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-xs font-semibold text-gray-500">Sistema operativo</span>
                <span className="text-sm text-gray-800">{product.os || "No especificado"}</span>
              </div>
            </motion.div>
            
            {product.colors && product.colors.length > 0 && (
              <motion.div 
                className="mt-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-md font-semibold mb-2">Colores disponibles</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {product.colors.map((color, index) => {
                    const colorCode = colorMap[color] || "#888888";
                    
                    return (
                      <motion.div 
                        key={index} 
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 shadow-sm flex items-center justify-center overflow-hidden
                          ${selectedColor === color ? 'ring-2 ring-offset-2 ring-primary' : 'border-gray-200'}`}
                        title={color}
                        onClick={() => setSelectedColor(color)}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-full h-full" style={{ backgroundColor: colorCode }}></div>
                      </motion.div>
                    );
                  })}
                </div>
                {selectedColor && (
                  <div className="text-sm text-gray-700 mt-1">
                    Color seleccionado: <span className="font-medium">{selectedColor}</span>
                  </div>
                )}
              </motion.div>
            )}

            <div className="mt-4">
              <motion.button
                onClick={onAddToCart}
                className={`w-full py-3 px-4 ${product.colors && product.colors.length > 0 && !selectedColor 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-primary hover:bg-accent'} 
                  text-white rounded-lg font-medium flex items-center justify-center gap-2 shadow-sm
                  ${animationClass === 'cart-animation' ? 'animate-pulse' : ''}`}
                disabled={product.colors && product.colors.length > 0 && !selectedColor}
                whileHover={product.colors && product.colors.length > 0 && !selectedColor ? {} : { scale: 1.03 }}
                whileTap={product.colors && product.colors.length > 0 && !selectedColor ? {} : { scale: 0.97 }}
              >
                <i className="fas fa-shopping-cart"></i>
                {addedToCart ? 'Añadido al carrito' : 'Añadir al carrito'}
                {product.colors && product.colors.length > 0 && !selectedColor && 
                  ' (Selecciona un color)'}
              </motion.button>
            </div>
          </div>
        </div>

        {addedMessageVisible && (
          <motion.div 
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <i className="fas fa-check-circle text-lg"></i>
            <p>¡Producto añadido al carrito!{selectedColor ? ` (${selectedColor})` : ''}</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
  
  // Render modal using Portal to ensure it's outside normal DOM tree
  return createPortal(modalContent, document.body);
};

export default ProductModal;
