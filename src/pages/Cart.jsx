import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [animateItems, setAnimateItems] = useState(false);

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

  // Animación al cargar la página
  useEffect(() => {
    setAnimateItems(true);
  }, []);

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
    <div className="cart-container">
      <h1>Carrito de Compra</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <p>Tu carrito está vacío</p>
          <Link to="/" className="start-shopping-button">
            <i className="fas fa-shopping-bag"></i>
            Comenzar a comprar
          </Link>
        </div>
      ) : (
        <div>
          <ul>
            {cart.map((product, index) => (
              <li 
                key={`${product.id}-${index}`} 
                className="cart-item"
                style={{"--item-index": index}}
              >
                <img
                  src={require(`../assets/${product.image}`)}
                  alt={product.name}
                  className="cart-item-image"
                  onClick={() => openProductModal(product)}
                />
                <div className="cart-item-details">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="item-specs">
                    {product.processor && (
                      <span className="item-spec">
                        <i className="fas fa-microchip"></i> {product.processor}
                      </span>
                    )}
                    {product.ram && (
                      <span className="item-spec">
                        <i className="fas fa-memory"></i> {product.ram}
                      </span>
                    )}
                    {product.storage && (
                      <span className="item-spec">
                        <i className="fas fa-hdd"></i> {product.storage}
                      </span>
                    )}
                  </div>
                  <p><strong>{product.price}€</strong></p>
                </div>
                <button 
                  onClick={() => handleRemoveFromCart(product.id)} 
                  className="remove-button"
                  aria-label="Eliminar producto"
                >
                  <i className="fas fa-times"></i>
                </button>
              </li>
            ))}
          </ul>
          
          <div className="cart-total">
            <h3>
              Resumen del Pedido
              <span className="total-amount">{calculateFinalTotal()}€</span>
            </h3>
            
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{calculateTotal()}€</span>
              </div>
              <div className="summary-row">
                <span>IVA (21%)</span>
                <span>{calculateTax()}€</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span>{calculateShipping() === "0.00" ? "Gratis" : `${calculateShipping()}€`}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{calculateFinalTotal()}€</span>
              </div>
            </div>
          </div>
          
          <div className="cart-buttons">
            <button onClick={handleClearCart} className="clear-cart-button">
              <i className="fas fa-trash"></i> Vaciar carrito
            </button>
            <button onClick={openPurchaseModal} className="purchase-button">
              <i className="fas fa-credit-card"></i> Finalizar compra
            </button>
          </div>
        </div>
      )}

      {/* Modal de compra */}
      {isPurchaseModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Finalizar Compra</h2>
            
            <div className="purchase-summary">
              {cart.map((product, index) => (
                <div key={index} className="purchase-item">
                  <span className="purchase-item-name">{product.name}</span>
                  <span className="purchase-item-price">{product.price}€</span>
                </div>
              ))}
              
              <div className="purchase-total">
                <span className="purchase-total-label">Total:</span>
                <span className="purchase-total-price">{calculateFinalTotal()}€</span>
              </div>
            </div>
            
            <div className="modal-buttons">
              <button onClick={closePurchaseModal} className="close-modal-button">
                Volver
              </button>
              <button onClick={handlePurchase} className="pay-button">
                <i className="fas fa-lock"></i> Pagar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para mostrar detalles del producto */}
      {isProductModalOpen && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedProduct.name}</h2>
            <img
              src={require(`../assets/${selectedProduct.image}`)}
              alt={selectedProduct.name}
            />
            <p>{selectedProduct.description}</p>
            
            <div className="product-details">
              {selectedProduct.processor && (
                <p><strong>Procesador:</strong> {selectedProduct.processor}</p>
              )}
              {selectedProduct.ram && (
                <p><strong>RAM:</strong> {selectedProduct.ram}</p>
              )}
              {selectedProduct.storage && (
                <p><strong>Almacenamiento:</strong> {selectedProduct.storage}</p>
              )}
              {selectedProduct.camera && (
                <p><strong>Cámara principal:</strong> {selectedProduct.camera.main}</p>
              )}
              {selectedProduct.battery && (
                <p><strong>Batería:</strong> {selectedProduct.battery}</p>
              )}
              <p><strong>Precio:</strong> {selectedProduct.price}€</p>
            </div>
            
            <button onClick={closeProductModal} className="close-modal-button">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
