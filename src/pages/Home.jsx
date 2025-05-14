import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = ({ selectedBrand, products, handleAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedMessageVisible, setAddedMessageVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterAnimating, setFilterAnimating] = useState(false);

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

  // Efecto para activar la animación cuando cambia el filtro
  useEffect(() => {
    setFilterAnimating(true);
    const timer = setTimeout(() => {
      setFilterAnimating(false);
    }, 800); // Duración de la animación
    
    return () => clearTimeout(timer);
  }, [selectedBrand, products]); // Se ejecuta cuando cambia la marca seleccionada o los productos (filtrados)
  const handleProductClick = (product) => {
    // Limpia estados previos antes de abrir el modal
    setAddedToCart(false);
    setAnimationClass('');
    setAddedMessageVisible(false);
    // Establece el producto seleccionado al final para activar el renderizado del modal
    setTimeout(() => {
      setSelectedProduct(product);
    }, 0);
  };  const closeModal = () => {
    // Primero eliminamos la clase loaded de la imagen para evitar problemas con la caché
    const modalImg = document.querySelector('.modal-content img');
    if (modalImg) {
      modalImg.classList.remove('loaded');
    }
    
    // Limpia los estados antes de cerrar
    setAnimationClass('');
    setAddedToCart(false);
    
    // Cerramos el modal con un pequeño retraso para permitir las animaciones
    setTimeout(() => {
      setSelectedProduct(null);
    }, 10);
  };  useEffect(() => {
    // Handler para evento de teclado
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && selectedProduct) {
        closeModal();
      }
    };

    // Añadir listener cuando el componente se monta
    document.addEventListener('keydown', handleKeyDown);

    // Limpiar listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct]);

  const filteredProducts = selectedBrand
    ? products.filter((product) => product.brand === selectedBrand)
    : products;  const handleAddToCartClick = (product, event) => {
    if (event) {
      event.stopPropagation();
    }
    
    handleAddToCart(product);
    setAddedToCart(true);
    setAddedMessageVisible(true);
    setAnimationClass('cart-animation');

    // Limpiar animación después de completarse
    const animationTimer = setTimeout(() => {
      setAnimationClass('');
      setAddedToCart(false);
    }, 1000);

    const messageTimer = setTimeout(() => {
      setAddedMessageVisible(false);
    }, 2000);

    // No es necesario devolver una función de limpieza aquí
    // ya que esto no está dentro de un useEffect
  };

  return (
    <div className="home-container">
      {/* Carrusel de ofertas */}
      <div className="carousel">
        <img src={require(`../assets/${offers[currentIndex].img}`)} alt="Oferta" />
        <p>{offers[currentIndex].description}</p>
      </div>

      {/* Cuadrícula de productos con animación */}
      <div className={`product-grid ${filterAnimating ? 'filter-animation' : ''}`}>
        {filteredProducts.length === 0 ? (
          <p>No se encontraron productos para esta marca.</p>
        ) : (
          filteredProducts.map((product, index) => {
            const imageSrc = require(`../assets/${product.image}`);
            return (              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product)}
                style={{ 
                  animationDelay: `${index * 0.05}s` 
                }}
              >
                <img 
                  src={imageSrc} 
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = require('../assets/logo.png');
                  }}
                />
                <h2>{product.name}</h2>
                <p><strong>{product.brand}</strong></p>
                <p>{product.description}</p>
                <p><strong>{product.price}€</strong></p>
              </div>
            );
          })
        )}
      </div>      {/* Modal de detalles del producto */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => closeModal()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => closeModal()}>&times;</button>            <div className="modal-image-container">
              <img 
                src={require(`../assets/${selectedProduct.image}`)} 
                alt={selectedProduct.name} 
                onLoad={(e) => e.target.classList.add('loaded')}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = require('../assets/logo.png');
                  e.target.classList.add('loaded');
                }}
              />
            </div>
            <div className="modal-details">
              <h2>{selectedProduct.name}</h2>
              <p className="product-description">{selectedProduct.description}</p>
              <p className="product-price">{selectedProduct.price}€</p>
                <div className="product-specs">
                <div className="spec-item">
                  <span className="spec-label">Marca</span>
                  <span className="spec-value">{selectedProduct.brand}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Procesador</span>
                  <span className="spec-value">{selectedProduct.processor || "No especificado"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">RAM</span>
                  <span className="spec-value">{selectedProduct.ram || "No especificado"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Almacenamiento</span>
                  <span className="spec-value">{selectedProduct.storage || "No especificado"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Pantalla</span>
                  <span className="spec-value">{selectedProduct.screenSize}"</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Tamaño</span>
                  <span className="spec-value">{selectedProduct.size}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Batería</span>
                  <span className="spec-value">{selectedProduct.battery || "No especificado"}</span>
                </div>                <div className="spec-item">
                  <span className="spec-label">Carga rápida</span>
                  <span className="spec-value">{selectedProduct.fastCharge ? `Sí (${selectedProduct.chargingSpeed})` : 'No'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Sistema operativo</span>
                  <span className="spec-value">{selectedProduct.os || "No especificado"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Resistencia al agua</span>
                  <span className="spec-value">{selectedProduct.waterResistant || "No especificado"}</span>
                </div>
              </div>
              
              {selectedProduct.colors && (
                <>
                  <div className="spec-item" style={{ gridColumn: "span 2", textAlign: "center" }}>
                    <span className="spec-label">Colores disponibles</span>
                    <div className="color-options">
                      {selectedProduct.colors.map((color, index) => {
                        // Convertir nombres de colores a códigos hexadecimales simples para mostrar
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
                        const colorCode = colorMap[color] || "#888888";
                        
                        return (
                          <div 
                            key={index} 
                            className={`color-option`}
                            title={color}
                            style={{ backgroundColor: colorCode, border: "1px solid #ccc" }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
                <div className="add-to-cart-section">
                <button
                  onClick={(e) => handleAddToCartClick(selectedProduct, e)}
                  className={`add-to-cart-button ${animationClass}`}
                >
                  <i className="fas fa-shopping-cart"></i>
                  {addedToCart ? 'Añadido al carrito' : 'Añadir al carrito'}
                </button>
              </div>
            </div>

            {addedMessageVisible && (
              <div className="added-message">
                <i className="fas fa-check-circle"></i>
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
