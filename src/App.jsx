import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';

const App = () => {
  const [selectedBrand, setSelectedBrand] = useState(''); // Para filtrar productos

  return (
    
    <div className="app">
      <Header setSelectedBrand={setSelectedBrand} />
      <div className="container">
        <div className="main-content">
          <Home selectedBrand={selectedBrand} />
        </div>
      </div>
    </div>
  );
};

export default App;
