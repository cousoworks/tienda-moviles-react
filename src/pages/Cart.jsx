import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para controlar el modal
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
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);  // Limpiar el producto seleccionado
  };

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  // Agregar un event listener para la tecla Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();  // Cerrar el modal cuando presionamos Escape
      }
    };

    if (isModalOpen) {
      // Solo agregar el listener si el modal está abierto
      window.addEventListener("keydown", handleKeyDown);
    } else {
      // Eliminar el listener cuando el modal se cierra
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      // Limpiar el listener al desmontar el componente
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);  // Dependencia en isModalOpen para activar/desactivar el listener

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
                  onClick={() => openModal(product)}  // Abrir modal al hacer clic en la imagen
                />
                <div className="cart-item-details">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p><strong>{product.price}€</strong></p>
                </div>
                <button onClick={() => handleRemoveFromCart(product.id)} className="remove-button">
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: {calculateTotal()}€</h3>
          </div>
        </div>
      )}

      {/* Botón para eliminar todos los productos del carrito */}
      <button onClick={handleClearCart} className="clear-cart-button">
        Eliminar todo
      </button>

      {/* Modal para mostrar detalles del producto */}
      {isModalOpen && selectedProduct && (
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
            <button onClick={closeModal} className="close-modal-button">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
