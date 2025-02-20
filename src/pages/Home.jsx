import React, { useState } from 'react';
import './Home.css';

const Home = ({ selectedBrand, products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Función para abrir el modal con los detalles del producto
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Filtrar productos por marca seleccionada
  const filteredProducts = selectedBrand
    ? products.filter((product) => product.brand === selectedBrand)
    : products;

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
            <p><strong>Precio:</strong> ${selectedProduct.price}</p>
            <p><strong>Tamaño:</strong> {selectedProduct.size}</p>
            <p><strong>Pantalla:</strong> {selectedProduct.screenSize}"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
