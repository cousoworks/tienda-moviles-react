import React, { useState } from 'react';

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
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="Logo Móvil Center" className="h-16 mb-4" />
        </div>
        <div className="flex flex-col">
          <h4>Datos de contacto</h4>
          <p><strong>Dirección:</strong> C/ Trafalgar Law 20, Madrid</p>
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
      </div>      <div className="footer-footer">
        <p>© {currentYear} Tech Mobile | Todos los derechos reservados</p>
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
            <h1>Devoluciones</h1>            <p>
              En Tech Mobile queremos que estés completamente satisfecho con tu compra. Si no estás feliz con el producto, puedes devolverlo dentro de los 30 días siguientes a la recepción del pedido.
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
