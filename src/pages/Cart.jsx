import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ cart, setCart }) => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Función para eliminar un producto del carrito
  const handleRemoveFromCart = (productId) => {
    const newCart = cart.filter((product) => product.id !== productId);
    setCart(newCart);
  };

  // Función para vaciar el carrito
  const handleClearCart = () => {
    setCart([]);
  };

  // Función para abrir el modal con los detalles del producto
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  // Función para cerrar el modal de producto
  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  // Función para abrir el modal de compra
  const openPurchaseModal = () => {
    setIsPurchaseModalOpen(true);
  };

  // Función para cerrar el modal de compra
  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
  };

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  // Calcular impuestos (IVA 21%)
  const calculateTax = () => {
    const total = parseFloat(calculateTotal());
    return ((total * 0.21)).toFixed(2);
  };

  // Calcular el envío (gratis si el total es > 999€)
  const calculateShipping = () => {
    const total = parseFloat(calculateTotal());
    return total > 999 ? "0.00" : "4.99";
  };

  // Total final con impuestos y envío
  const calculateFinalTotal = () => {
    const total = parseFloat(calculateTotal());
    const tax = parseFloat(calculateTax());
    const shipping = parseFloat(calculateShipping());
    return (total + tax + shipping).toFixed(2);
  };

  // Agregar event listener para la tecla Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePurchaseModal();
        closeProductModal();
      }
    };

    if (isPurchaseModalOpen || isProductModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPurchaseModalOpen, isProductModalOpen]);

  // Función para simular la finalización de la compra
  const handlePurchase = () => {
    // Aquí iría la lógica para procesar el pago
    alert("¡Gracias por tu compra! Tu pedido ha sido procesado.");
    setCart([]);
    closePurchaseModal();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Carrito de Compra</h1>
      
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-12 text-center">
          <div className="bg-gray-100 w-24 h-24 flex items-center justify-center rounded-full mb-6">
            <i className="fas fa-shopping-cart text-4xl text-gray-400"></i>
          </div>
          <p className="text-xl text-gray-600 mb-6">Tu carrito está vacío</p>
          <Link to="/" className="bg-primary hover:bg-accent text-white py-3 px-8 rounded-lg font-medium flex items-center gap-2 transition-colors">
            <i className="fas fa-shopping-bag"></i>
            Comenzar a comprar
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Productos</h2>
                <button 
                  onClick={handleClearCart} 
                  className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
                >
                  <i className="fas fa-trash-alt"></i> Vaciar carrito
                </button>
              </div>
            </div>
            <ul className="divide-y divide-gray-100">
              {cart.map((product, index) => (
                <motion.li 
                  key={`${product.id}-${index}`}
                  className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div 
                      className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg p-2 flex items-center justify-center cursor-pointer flex-shrink-0"
                      onClick={() => openProductModal(product)}
                    >
                      <img
                        src={require(`../assets/images/${product.image}`)}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = require('../assets/logo.png');
                        }}
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 
                        className="text-lg font-semibold text-gray-800 hover:text-primary cursor-pointer"
                        onClick={() => openProductModal(product)}
                      >
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-500 line-clamp-1 mb-2">{product.description}</p>
                      <div className="flex flex-wrap gap-3 mb-3">
                        {product.processor && (
                          <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            <i className="fas fa-microchip mr-1 text-gray-500"></i> {product.processor}
                          </span>
                        )}
                        {product.ram && (
                          <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            <i className="fas fa-memory mr-1 text-gray-500"></i> {product.ram}
                          </span>
                        )}
                        {product.storage && (
                          <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            <i className="fas fa-hdd mr-1 text-gray-500"></i> {product.storage}
                          </span>
                        )}
                      </div>
                      
                      {product.selectedColor && (
                        <p className="text-xs text-gray-600 mb-2">
                          Color: <span className="font-medium">{product.selectedColor}</span>
                        </p>
                      )}
                      
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xl font-bold text-primary">{product.price}€</p>
                        <motion.button 
                          onClick={() => handleRemoveFromCart(product.id)} 
                          className="text-red-500 hover:text-red-700 flex items-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Eliminar producto"
                        >
                          <i className="fas fa-trash-alt"></i> Eliminar
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Order Summary Card */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden h-fit sticky top-20">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                Resumen del Pedido
              </h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{calculateTotal()}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">IVA (21%)</span>
                  <span className="font-medium">{calculateTax()}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium">{calculateShipping() === "0.00" ? "Gratis" : `${calculateShipping()}€`}</span>
                </div>
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">Total</span>
                    <span className="font-bold text-primary text-lg">{calculateFinalTotal()}€</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <motion.button 
                  onClick={openPurchaseModal} 
                  className="w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fas fa-credit-card"></i> Finalizar compra
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de compra */}
      <AnimatePresence>
        {isPurchaseModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Finalizar Compra</h2>
                  <button 
                    onClick={closePurchaseModal} 
                    className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100"
                  >
                    <i className="fas fa-times text-gray-500"></i>
                  </button>
                </div>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800">Resumen de productos</h3>
                    <div className="divide-y divide-gray-100">
                      {cart.map((product, index) => (
                        <div key={index} className="py-3 flex items-center gap-4">
                          <div className="w-12 h-12 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                            <img 
                              src={require(`../assets/images/${product.image}`)} 
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                            {product.selectedColor && (
                              <p className="text-xs text-gray-500">Color: {product.selectedColor}</p>
                            )}
                          </div>
                          <p className="font-medium text-gray-900">{product.price}€</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{calculateTotal()}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">IVA (21%)</span>
                      <span>{calculateTax()}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Envío</span>
                      <span>{calculateShipping() === "0.00" ? "Gratis" : `${calculateShipping()}€`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 pt-2">
                      <span>Total</span>
                      <span>{calculateFinalTotal()}€</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <motion.button
                      onClick={handlePurchase}
                      className="w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className="fas fa-lock"></i> Pagar ahora
                    </motion.button>
                    <button 
                      onClick={closePurchaseModal}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium transition-colors"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal para mostrar detalles del producto */}
      <AnimatePresence>
        {isProductModalOpen && selectedProduct && (
          <motion.div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">{selectedProduct.name}</h2>
                  <button 
                    onClick={closeProductModal} 
                    className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100"
                  >
                    <i className="fas fa-times text-gray-500"></i>
                  </button>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                  <img
                    src={require(`../assets/images/${selectedProduct.image}`)}
                    alt={selectedProduct.name}
                    className="max-h-64 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = require('../assets/logo.png');
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600">{selectedProduct.description}</p>
                  
                  <div className="space-y-2">
                    {selectedProduct.processor && (
                      <div className="flex gap-2">
                        <span className="text-gray-600 font-medium">Procesador:</span>
                        <span>{selectedProduct.processor}</span>
                      </div>
                    )}
                    {selectedProduct.ram && (
                      <div className="flex gap-2">
                        <span className="text-gray-600 font-medium">RAM:</span>
                        <span>{selectedProduct.ram}</span>
                      </div>
                    )}
                    {selectedProduct.storage && (
                      <div className="flex gap-2">
                        <span className="text-gray-600 font-medium">Almacenamiento:</span>
                        <span>{selectedProduct.storage}</span>
                      </div>
                    )}
                    {selectedProduct.screenSize && (
                      <div className="flex gap-2">
                        <span className="text-gray-600 font-medium">Pantalla:</span>
                        <span>{selectedProduct.screenSize}"</span>
                      </div>
                    )}
                    {selectedProduct.battery && (
                      <div className="flex gap-2">
                        <span className="text-gray-600 font-medium">Batería:</span>
                        <span>{selectedProduct.battery}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{selectedProduct.price}€</span>
                      <span className="text-sm text-gray-500">En stock</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
