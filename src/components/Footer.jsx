import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png';  // Importa el logo desde la carpeta assets

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Obtiene el año actual

  return (
    <footer className="footer-container">
      <div className="footer-info">
        <div className="footer-logo">
          <img src={logo} alt="Logo Móvil Center" className="footer-logo-image" />
        </div>
        <div className="footer-contact">
          <h4>Datos de contacto</h4>
          <p><strong>Dirección:</strong> C/ Avenida Loveless, Madrid</p>
          <p><strong>Teléfono de contacto:</strong> 999 999 999</p>
        </div>
        <div className="footer-links">
          <h4>Enlaces de interés</h4>
          <ul>
            <li><a href="/">Envíos</a></li>
            <li><a href="/">Métodos de pago</a></li>
            <li><a href="/">Devoluciones</a></li>
            <li><a href="/">Plazos</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-footer">
        <p>© {currentYear} Blayne Shop | Diseñado por Blayneraptor</p>
      </div>
    </footer>
  );
};

export default Footer;
