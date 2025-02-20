import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import mobilesData from './mobiles.json';  // Asegúrate de importar el archivo JSON

const App = () => {
  const [selectedBrand, setSelectedBrand] = useState('');  // Para filtrar productos
  const [sortedProducts, setSortedProducts] = useState(mobilesData);  // Para manejar productos ordenados

  return (
    <div className="app">
      <Header setSelectedBrand={setSelectedBrand} setSortedProducts={setSortedProducts} />
      <div className="container">
        <div className="main-content">
          <Home selectedBrand={selectedBrand} products={sortedProducts} />
        </div>
      </div>
    </div>
  );
};

export default App;
