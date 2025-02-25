import React from 'react';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  // Función para eliminar un producto del carrito
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));  // Filtramos el carrito para eliminar el producto por su id
  };

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

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
                <img src={require(`../assets/${product.image}`)} alt={product.name} className="cart-item-image" />
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
    </div>
  );
};

export default Cart;
