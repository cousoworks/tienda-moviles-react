import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProductCard = React.memo(({ product, onClick, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const imageSrc = require(`../assets/images/${product.image}`);
  
  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.3) // Cap delay at 0.3s for better UX
      }}
      whileHover={{ y: -4 }}    >
      {/* Image container with badges */}
      <div className="relative pt-[75%] bg-gray-50">
        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
          {product.fastCharge && (
            <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <i className="fas fa-bolt text-yellow-300"></i> Carga Rápida
            </span>
          )}
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Nuevo
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button 
            className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-eye"></i>
          </motion.button>
        </div>

        {/* Product image */}
        <img 
          src={imageSrc} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = require('../assets/logo.png');
          }}
        />
      </div>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-primary">{product.brand}</h3>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className={`text-xs ${i < Math.floor(4 + Math.random()) ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'}`}
                ></i>
              ))}
            </div>
          </div>
          <h2 className="font-bold text-gray-800 mb-1 truncate">{product.name}</h2>
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        </div>
        
        {/* Specs preview */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3">
          <div className="flex items-center text-xs text-gray-600">
            <i className="fas fa-microchip mr-1 text-gray-400"></i>
            <span className="truncate">{product.processor || "---"}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <i className="fas fa-memory mr-1 text-gray-400"></i>
            <span>{product.ram || "---"}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <i className="fas fa-hdd mr-1 text-gray-400"></i>
            <span>{product.storage || "---"}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <i className="fas fa-mobile-alt mr-1 text-gray-400"></i>
            <span>{product.screenSize}"</span>
          </div>
        </div>

        {/* Price and action */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="text-lg font-bold text-gray-900">{product.price}€</div>          <motion.button
            className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:bg-accent transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              // Call the handleAddToCart function passed via props
              if (window.handleAddToCart) {
                window.handleAddToCart(product);
              }
            }}
            aria-label="Añadir al carrito"
          >
            <i className="fas fa-shopping-cart text-sm"></i>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

export default ProductCard;
