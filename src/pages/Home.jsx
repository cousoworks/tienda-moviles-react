import React, { useState } from 'react';
import './Home.css';

const Home = ({ selectedBrand, products, handleAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);  // Estado para manejar el mensaje de confirmación
  const [addedMessageVisible, setAddedMessageVisible] = useState(false);  // Estado para mostrar el mensaje de añadido al carrito
  const [animationClass, setAnimationClass] = useState('');  // Estado para manejar la animación del carrito

  // Función para abrir el modal con los detalles del producto
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setAddedToCart(false);  // Resetear el mensaje de "añadido al carrito" cuando se abre un nuevo producto
    setAnimationClass('');  // Resetear la animación cuando se cambia de producto
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Filtrar productos por marca seleccionada
  const filteredProducts = selectedBrand
    ? products.filter((product) => product.brand === selectedBrand)
    : products;

  // Función para añadir al carrito con animación
  const handleAddToCartClick = (product) => {
    handleAddToCart(product);  // Añadir el producto al carrito
    setAddedToCart(true);  // Mostrar mensaje de "Añadido al carrito"
    setAddedMessageVisible(true);  // Mostrar el mensaje de añadido al carrito
    setAnimationClass('cart-animation');  // Activar la animación de movimiento hacia el carrito

    // Resetear el mensaje después de un tiempo (2 segundos)
    setTimeout(() => {
      setAddedMessageVisible(false);  // Desaparecer el mensaje después de 2 segundos
    }, 2000);  
  };

  return (
    <div className="product-grid">
      {filteredProducts.length === 0 ? (
        <p>No se encontraron productos para esta marca.</p>
      ) : (
        filteredProducts.map((product) => {
          const imageSrc = require(`../assets/${product.image}`);

          return (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <img src={imageSrc} alt={product.name} />
              <h2>{product.name}</h2>
              <p><strong>{product.brand}</strong></p>
              <p>{product.description}</p>
              <p><strong>{product.price}€</strong></p>
            </div>
          );
        })
      )}

      {/* Modal de detalles del producto */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>X</button>
            <img src={require(`../assets/${selectedProduct.image}`)} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p><strong>Marca:</strong> {selectedProduct.brand}</p>
            <p><strong>Descripción:</strong> {selectedProduct.description}</p>
            <p><strong>Precio:</strong> {selectedProduct.price}€</p>
            <p><strong>Tamaño:</strong> {selectedProduct.size}</p>
            <p><strong>Pantalla:</strong> {selectedProduct.screenSize}"</p>

            {/* Botón para añadir al carrito */}
            <button
              onClick={() => handleAddToCartClick(selectedProduct)}
              className={`add-to-cart-button ${animationClass}`}
            >
              {addedToCart ? 'Añadido al carrito' : 'Añadir al carrito'}
            </button>

            {/* Mensaje de confirmación cuando se añada al carrito */}
            {addedMessageVisible && (
              <div className="added-message">
                <p>¡Producto añadido al carrito!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
