import React, { useState } from 'react';

import './Footer.css';
import logo from '../assets/logo.png';
import paymentMethodsImage from '../assets/payment-methods.png';
import returnsImage from '../assets/returns-image.png';
import deadlinesImage from '../assets/deadlines-image.png';
import shippingImage from '../assets/shipping-image.png';  // Imagen para los envíos

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReturnsModalOpen, setIsReturnsModalOpen] = useState(false);
  const [isDeadlinesModalOpen, setIsDeadlinesModalOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);  // Estado para el modal de envíos

  const openPaymentModal = (e) => {
    e.preventDefault();
    setIsPaymentModalOpen(true);
  };

  const openReturnsModal = (e) => {
    e.preventDefault();
    setIsReturnsModalOpen(true);
  };

  const openDeadlinesModal = (e) => {
    e.preventDefault();
    setIsDeadlinesModalOpen(true);
  };

  const openShippingModal = (e) => {
    e.preventDefault();
    setIsShippingModalOpen(true);  // Abre el modal de envíos
  };

  const closeModal = () => {
    setIsPaymentModalOpen(false);
    setIsReturnsModalOpen(false);
    setIsDeadlinesModalOpen(false);
    setIsShippingModalOpen(false);  // Cierra el modal de envíos
  };

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
            <li><a href="/" onClick={openShippingModal}>Envíos</a></li> {/* Cambiado de Link a un <a> para abrir el modal */}
            <li><a href="/" onClick={openPaymentModal}>Métodos de pago</a></li>
            <li><a href="/" onClick={openReturnsModal}>Devoluciones</a></li>
            <li><a href="/" onClick={openDeadlinesModal}>Plazos</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-footer">
        <p>© {currentYear} Blayne Shop | Diseñado por Blayneraptor</p>
      </div>

      {/* Modal para Métodos de pago */}
      {isPaymentModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>X</button>
            <img src={paymentMethodsImage} alt="Métodos de pago" className="payment-methods-image" />
          </div>
        </div>
      )}

      {/* Modal para Devoluciones */}
      {isReturnsModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>X</button>
            <h1>Devoluciones</h1>
            <p>
              En Blayne Shop queremos que estés completamente satisfecho con tu compra. Si no estás feliz con el producto, puedes devolverlo dentro de los 30 días siguientes a la recepción del pedido.
            </p>
            <img src={returnsImage} alt="Devoluciones" className="returns-image" />
          </div>
        </div>
      )}

      {/* Modal para Plazos */}
      {isDeadlinesModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>X</button>
            <h1>Plazos de Entrega</h1>
            <p>
              El tiempo estimado de entrega varía según el método de envío seleccionado: de 1 a 7 días hábiles, dependiendo de tu ubicación.
            </p>
            <img src={deadlinesImage} alt="Plazos de entrega" className="returns-image" />
          </div>
        </div>
      )}

  {/* Modal para Envíos */}
{isShippingModalOpen && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={closeModal}>X</button>
      <h1>Opciones de Envío</h1>
      <div>
        <p><strong>Envío Estándar:</strong> 3-5 días hábiles.</p>
        <p><strong>Envío Exprés:</strong> 1-2 días hábiles.</p>
        <p><strong>Envío Internacional:</strong> 5-10 días hábiles.</p>
      </div>
      <h2>Precios de Envío</h2>
      <div>
        <p><strong>Envío Estándar:</strong> Desde 5€.</p>
        <p><strong>Envío Exprés:</strong> Desde 10€.</p>
        <p><strong>Envío Internacional:</strong> Desde 20€.</p>
      </div>
      <img src={shippingImage} alt="Envíos" className="returns-image" />
    </div>
  </div>
      )}
    </footer>
  );
};

export default Footer;
