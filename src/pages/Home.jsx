import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = ({ selectedBrand, products, handleAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedMessageVisible, setAddedMessageVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carrusel de imágenes (4 fotos con descripción)
  const offers = [
    { img: 'offer1.png', description: '¡Ofertas increíbles en móviles!', link: '#' },
    { img: 'offer2.png', description: 'Descuentos de hasta un 50%', link: '#' },
    { img: 'offer3.png', description: 'Compra 2 y llévate unos auriculares', link: '#' },
    { img: 'offer4.png', description: '¡Envío gratis en todos los pedidos!', link: '#' },
  ];

  // Función para cambiar la imagen del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(interval);
  }, [offers.length]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setAddedToCart(false);
    setAnimationClass('');
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
    };

    if (selectedProduct) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct]);

  const filteredProducts = selectedBrand
    ? products.filter((product) => product.brand === selectedBrand)
    : products;

  const handleAddToCartClick = (product) => {
    handleAddToCart(product);
    setAddedToCart(true);
    setAddedMessageVisible(true);
    setAnimationClass('cart-animation');

    setTimeout(() => {
      setAddedMessageVisible(false);
    }, 2000);
  };

  return (
    <div className="home-container">
      {/* Carrusel de ofertas */}
      <div className="carousel">
        <img src={require(`../assets/${offers[currentIndex].img}`)} alt="Oferta" />
        <p>{offers[currentIndex].description}</p>
      </div>

      {/* Cuadrícula de productos */}
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
      </div>

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
            <button
              onClick={() => handleAddToCartClick(selectedProduct)}
              className={`add-to-cart-button ${animationClass}`}
            >
              {addedToCart ? 'Añadido al carrito' : 'Añadir al carrito'}
            </button>

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
