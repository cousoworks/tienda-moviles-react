import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-text">
        <h1>Sobre Nosotros</h1>
        <p>
          En nuestra tienda, estamos comprometidos con ofrecerte lo mejor en tecnología móvil. Nos apasiona ayudarte a encontrar el smartphone perfecto para ti, con información detallada y actualizada sobre los últimos modelos.
        </p>
        <p>
          Nuestro equipo está formado por expertos en tecnología, diseño y desarrollo web, trabajando cada día para brindarte la mejor experiencia de compra en línea.
        </p>
        <p>
          Nuestra historia comenzó hace más de 5 años, cuando un pequeño grupo de entusiastas de la tecnología decidió unir fuerzas para crear una plataforma única que ofreciera no solo productos de alta calidad, sino también un servicio excepcional. Empezamos con una pequeña tienda online, pero rápidamente nos dimos cuenta de que había una gran demanda de información confiable sobre móviles y tecnología.
        </p>
        <p>
          Con el paso del tiempo, nuestra comunidad creció y hoy somos uno de los referentes en el mundo de los smartphones.
        </p>
        <p>
          Nuestro equipo sigue creciendo, y nuestra misión no ha cambiado: queremos ayudarte a tomar las mejores decisiones sobre los dispositivos que más importan en tu vida diaria. Ya sea que busques el último modelo de smartphone o un consejo sobre qué accesorio es ideal para tu dispositivo, estamos aquí para ti.
        </p>
        <p>
          Además de ofrecerte productos de calidad, nos aseguramos de que nuestra web sea fácil de navegar y de que puedas encontrar lo que buscas de manera rápida y eficiente. Valoramos cada uno de nuestros clientes y trabajamos incansablemente para mejorar día tras día.
        </p>
        <p>
          Gracias por elegirnos. ¡Te esperamos con las mejores ofertas y novedades en tecnología móvil!
        </p>
      </div>
      <div className="about-us-image-container">
        <img src={require('../assets/backgroundabout.png')} alt="Imagen sobre nosotros" className="about-us-image" />
      </div>
    </div>
  );
};

export default AboutUs;
