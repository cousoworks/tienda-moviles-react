import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>Sobre Nosotros</h1>
      <p>
        Somos un equipo apasionado por la tecnología y los smartphones. Nuestra misión es ofrecer información detallada y actualizada sobre los últimos modelos de teléfonos móviles para ayudar a los usuarios a tomar decisiones informadas.
      </p>
      <p>
        Nuestro equipo está compuesto por expertos en diseño, desarrollo web y tecnología móvil, y trabajamos constantemente para mejorar nuestra plataforma.
      </p>

      {/* Imagen suelta abajo de la descripción */}
      <img src={require('../assets/backgroundabout.png')} alt="Imagen sobre nosotros" className="about-us-image" />

    </div>
  );
};

export default AboutUs;
