import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png';  // Importa el logo desde la carpeta assets

const Footer = () => {
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
            <li><a href="/envios">Envíos</a></li>
            <li><a href="/metodos-pago">Métodos de pago</a></li>
            <li><a href="/devoluciones">Devoluciones</a></li>
            <li><a href="/plazos">Plazos</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-footer">
        <p>© 2025 Blayne Shop | Diseñado por Blayneraptor</p>
        <p><a href="/aviso-legal">Aviso Legal</a> | <a href="/politica-privacidad">Política de privacidad</a> | <a href="/politica-cookies">Política de Cookies</a></p>
      </div>
    </footer>
  );
};

export default Footer;
