import React from 'react';
import './Home.css';

const Home = ({ selectedBrand, products }) => {
  // Filtrar los productos según la marca seleccionada
  const filteredProducts = selectedBrand
    ? products.filter((product) => product.brand === selectedBrand)
    : products;

  return (
    <div className="product-grid">
      {filteredProducts.length === 0 ? (
        <p>No se encontraron productos para esta marca.</p>
      ) : (
        filteredProducts.map((product) => {
          // Si las imágenes se importan de manera estática, usa el nombre de la imagen
          const imageSrc = require(`../assets/${product.image}`);

          return (
            <div key={product.id} className="product-card">
              <img
                src={imageSrc}
                alt={product.name}
              />
              <h2>{product.name}</h2>
              <p><strong>{product.brand}</strong></p>
              <p>{product.description}</p>
              <p><strong>${product.price}</strong></p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
