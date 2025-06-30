import React from 'react';
import ReactDOM from 'react-dom/client'; // Correcto para React 18+
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/main.css';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('No se encontró el elemento con id "root"');
}
