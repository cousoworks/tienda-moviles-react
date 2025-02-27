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
        <li><strong>Envío Estándar:</strong> 3-5 días hábiles. Este es el método de envío más económico y adecuado para aquellos que no tienen prisa.</li>
        <li><strong>Envío Exprés:</strong> 1-2 días hábiles. Ideal si necesitas tu pedido con urgencia. Este servicio tiene un costo adicional.</li>
        <li><strong>Envío Internacional:</strong> 5-10 días hábiles, dependiendo de tu ubicación. Este servicio es para aquellos clientes fuera del país. Los costos pueden variar según la distancia y el peso del paquete.</li>
      </ul>

      <h2>Precios de Envío</h2>
      <p>El precio de envío se calculará al finalizar la compra, dependiendo de tu ubicación y el método de envío elegido. A continuación, algunos ejemplos de precios:</p>
      <ul>
        <li><strong>Envío Estándar:</strong> Desde 5€, dependiendo del peso y destino.</li>
        <li><strong>Envío Exprés:</strong> Desde 10€, dependiendo del peso y destino.</li>
        <li><strong>Envío Internacional:</strong> Desde 20€, dependiendo del país y las tarifas aduaneras.</li>
      </ul>

      <h2>Seguimiento de tu Pedido</h2>
      <p>Una vez que tu pedido haya sido enviado, recibirás un número de seguimiento por correo electrónico. Puedes usar este número para verificar el estado de tu envío en línea.</p>

      <h2>Política de Envíos</h2>
      <p>Realizamos envíos a nivel nacional e internacional. Todos los pedidos se procesan dentro de 1-2 días hábiles. Sin embargo, debido a factores externos como el clima o problemas logísticos, el tiempo de entrega puede variar.</p>

      <h2>¿Tienes preguntas?</h2>
      <p>Si tienes alguna duda sobre los envíos, no dudes en contactarnos enviándonos un correo electrónico a soporte@blayneshop.com. Estamos aquí para ayudarte.</p>
    </div>
  );
};

export default Shipping;
