import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {  
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col items-center">
      <motion.div 
        className="bg-white shadow-lg rounded-2xl p-8 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sobre Tech Mobile</h1>
        <p className="text-gray-600 mb-4">
          En Tech Mobile, estamos comprometidos con ofrecerte lo mejor en tecnología móvil. Nos apasiona ayudarte a encontrar el smartphone perfecto para ti, con información detallada y actualizada sobre los últimos modelos.
        </p>
        <p className="text-gray-600 mb-4">
          Nuestro equipo está formado por expertos en tecnología, diseño y desarrollo web, trabajando cada día para brindarte la mejor experiencia de compra en línea.
        </p>
        <p className="text-gray-600 mb-4">
          Nuestra historia comenzó hace más de 5 años, cuando un pequeño grupo de entusiastas de la tecnología decidió unir fuerzas para crear una plataforma única que ofreciera no solo productos de alta calidad, sino también un servicio excepcional. Empezamos con Tech Mobile como una pequeña tienda online, pero rápidamente nos dimos cuenta de que había una gran demanda de información confiable sobre móviles y tecnología.
        </p>
        <p className="text-gray-600 mb-4">
          Con el paso del tiempo, nuestra comunidad creció y hoy somos uno de los referentes en el mundo de los smartphones.
        </p>
        <p className="text-gray-600 mb-4">
          Nuestro equipo sigue creciendo, y nuestra misión no ha cambiado: queremos ayudarte a tomar las mejores decisiones sobre los dispositivos que más importan en tu vida diaria. Ya sea que busques el último modelo de smartphone o un consejo sobre qué accesorio es ideal para tu dispositivo, estamos aquí para ti.
        </p>
        <p className="text-gray-600 mb-4">
          Además de ofrecerte productos de calidad, nos aseguramos de que nuestra web sea fácil de navegar y de que puedas encontrar lo que buscas de manera rápida y eficiente. Valoramos cada uno de nuestros clientes y trabajamos incansablemente para mejorar día tras día.
        </p>
        <p className="text-gray-600">
          Gracias por elegirnos. ¡Te esperamos con las mejores ofertas y novedades en tecnología móvil!
        </p>
      </motion.div>
      
      <motion.div 
        className="mt-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <img 
          src={require('../assets/backgroundabout.png')} 
          alt="Imagen sobre nosotros" 
          className="w-full h-auto rounded-2xl shadow-lg object-cover" 
        />
      </motion.div>
    </div>
  );
};

export default AboutUs;
