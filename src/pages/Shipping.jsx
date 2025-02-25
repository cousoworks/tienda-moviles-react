import React from 'react';
import './Shipping.css';

const Shipping = () => {
  return (
    <div className="shipping-container">
      <h1>Envíos</h1>
      <p>
        Ofrecemos múltiples opciones de envío para que puedas recibir tus productos de forma rápida y segura.
      </p>

      <h2>Opciones de Envío</h2>
      <ul>
        <li><strong>Envío Estándar:</strong> 3-5 días hábiles.</li>
        <li><strong>Envío Exprés:</strong> 1-2 días hábiles.</li>
        <li><strong>Envío Internacional:</strong> 5-10 días hábiles, dependiendo de tu ubicación.</li>
      </ul>

      <h2>Precios de Envío</h2>
      <p>El precio de envío se calculará al finalizar la compra, dependiendo de tu ubicación y el método de envío elegido.</p>

      <h2>¿Tienes preguntas?</h2>
      <p>Si tienes alguna duda sobre los envíos, no dudes en contactarnos a través de nuestro formulario de contacto.</p>
    </div>
  );
};

export default Shipping;
