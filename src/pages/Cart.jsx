import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);  // Estado para controlar el modal de compra
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);  // Estado para controlar el modal de producto
  const [selectedProduct, setSelectedProduct] = useState(null);  // Estado para guardar el producto seleccionado

  // Función para eliminar un producto del carrito
  const handleRemoveFromCart = (productId) => {
    const newCart = cart.filter((product) => product.id !== productId);
    setCart(newCart);  // Actualizar el estado del carrito
  };

  // Función para vaciar el carrito
  const handleClearCart = () => {
    setCart([]);  // Vaciar el carrito
  };

  // Función para abrir el modal con los detalles del producto
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  // Función para cerrar el modal de producto
  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);  // Limpiar el producto seleccionado
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

  // Agregar un event listener para la tecla Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePurchaseModal();  // Cerrar el modal cuando presionamos Escape
      }
    };

    if (isPurchaseModalOpen || isProductModalOpen) {
      // Solo agregar el listener si algún modal está abierto
      window.addEventListener("keydown", handleKeyDown);
    } else {
      // Eliminar el listener cuando los modales se cierran
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPurchaseModalOpen, isProductModalOpen]);  // Dependencias para activar/desactivar el listener

  return (
    <div className="cart-container">
      <h1>Carrito de la Compra</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cart.map((product) => (
              <li key={product.id} className="cart-item">
                <img
                  src={require(`../assets/${product.image}`)}
                  alt={product.name}
                  className="cart-item-image"
                  onClick={() => openProductModal(product)}  // Abrir modal al hacer clic en la imagen
                />
                <div className="cart-item-details">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p><strong>{product.price}€</strong></p>
                </div>
                <button onClick={() => handleRemoveFromCart(product.id)} className="remove-button">
                  X
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: {calculateTotal()}€</h3>
          </div>
        </div>
      )}

      {/* Contenedor para los botones */}
      <div className="cart-buttons">
        {/* Botón para eliminar todos los productos del carrito */}
        <button onClick={handleClearCart} className="clear-cart-button">
          Eliminar todo
        </button>

        {/* Botón de realizar compra */}
        <button onClick={openPurchaseModal} className="purchase-button">
          Realizar compra
        </button>
      </div>

      {/* Modal de compra */}
      {isPurchaseModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Resumen de la Compra</h2>
            <ul>
              {cart.map((product) => (
                <li key={product.id}>
                  <p>{product.name} - {product.price}€</p>
                </li>
              ))}
            </ul>
            <p><strong>Total: {calculateTotal()}€</strong></p>
            <div className="modal-buttons">
              <button onClick={closePurchaseModal} className="close-modal-button">Volver atrás</button>
              <button className="pay-button">Pagar</button>
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
              className="modal-image"
            />
            <p>{selectedProduct.description}</p>
            <p><strong>{selectedProduct.price}€</strong></p>
            <button onClick={closeProductModal} className="close-modal-button">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
