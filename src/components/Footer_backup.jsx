import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Company Info */}
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-4">
                <img src={logo} alt="Tech Mobile" className="h-16" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Tech Mobile</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Tech Mobile: tu aliado tecnológico para los últimos smartphones y accesorios móviles. 
                Calidad garantizada y atención personalizada.
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-facebook-f text-lg"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-twitter text-lg"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-youtube text-lg"></i>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold mb-4 text-white">Contacto</h3>
              <div className="space-y-3 text-gray-400 text-sm">
                <div className="flex items-center justify-center lg:justify-start">
                  <i className="fas fa-map-marker-alt mr-3 text-primary"></i>
                  <span>Calle Principal 123, Madrid, España</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <i className="fas fa-phone mr-3 text-primary"></i>
                  <span>+34 900 123 456</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <i className="fas fa-envelope mr-3 text-primary"></i>
                  <span>info@techmobile.es</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <i className="fas fa-clock mr-3 text-primary"></i>
                  <span>Lun - Vie: 9:00 - 20:00</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold mb-4 text-white">Servicios</h3>
              <div className="space-y-2">
                <Link to="/info#envios" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Envíos y Entregas
                </Link>
                <Link to="/info#devoluciones" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Devoluciones
                </Link>
                <Link to="/info#garantia" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Garantía
                </Link>
                <Link to="/info#soporte" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Soporte Técnico
                </Link>
                <Link to="/info#financiacion" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Financiación
                </Link>
              </div>
            </div>

            {/* Corporate Links */}
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold mb-4 text-white">Enlaces de Interés</h3>
              <div className="space-y-2">
                <Link to="/info#empresa" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Sobre Nosotros
                </Link>
                <Link to="/info#trabajo" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Trabaja con Nosotros
                </Link>
                <Link to="/info#sostenibilidad" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Sostenibilidad
                </Link>
                <Link to="/info#privacidad" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Política de Privacidad
                </Link>
                <Link to="/info#terminos" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Términos y Condiciones
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-lg font-semibold mb-3 text-white">Suscríbete a nuestro Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">
                Recibe las últimas ofertas y novedades en tu email
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Suscribirse
                </button>
              </div>
            </div>
          </div>

          {/* Payment Methods & Certifications */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">Métodos de pago seguros</p>
              <div className="flex justify-center items-center space-x-6 opacity-60">
                <i className="fab fa-cc-visa text-3xl"></i>
                <i className="fab fa-cc-mastercard text-3xl"></i>
                <i className="fab fa-cc-paypal text-3xl"></i>
                <i className="fab fa-apple-pay text-3xl"></i>
                <i className="fab fa-google-pay text-3xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Tech Mobile. Todos los derechos reservados. | 
              <Link to="/info#privacidad" className="hover:text-white transition-colors ml-1">
                Política de Privacidad
              </Link> | 
              <Link to="/info#cookies" className="hover:text-white transition-colors ml-1">
                Política de Cookies
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
