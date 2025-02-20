import React from 'react';
import './Home.css';
import mobilesData from '../mobiles.json'; 


const Home = ({ selectedBrand }) => {
  // Filtrar los productos según la marca seleccionada
  const filteredProducts = selectedBrand
    ? mobilesData.filter((product) => product.brand === selectedBrand)
    : mobilesData;

  return (
    
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No se encontraron productos para esta marca.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={require(`../assets/${product.image}`)}
                alt={product.name}
              />
              <h2>{product.name}</h2>
              <p><strong>{product.brand}</strong></p>
              <p>{product.description}</p>
              <p><strong>${product.price}</strong></p>
            </div>
          ))
        )}
      </div>
  );
};

export default Home;
