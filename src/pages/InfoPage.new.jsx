import React, { useEffect } from 'react';

import paymentMethodsImage from '../assets/payment-methods.png';
import returnsImage from '../assets/returns-image.png';
import deadlinesImage from '../assets/deadlines-image.png';
import shippingImage from '../assets/shipping-image.png';

const InfoPage = () => {
  // Scroll to section based on URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Información Corporativa - Tech Mobile
          </h1>

          {/* Tabla de contenidos */}
          <section className="mb-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Índice de Contenidos</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Servicios</h3>
                <ul className="space-y-1 text-sm">
                  <li><a href="#envios" className="text-primary hover:underline">• Envíos y Entregas</a></li>
                  <li><a href="#pagos" className="text-primary hover:underline">• Métodos de Pago</a></li>
                  <li><a href="#devoluciones" className="text-primary hover:underline">• Devoluciones</a></li>
                  <li><a href="#garantia" className="text-primary hover:underline">• Garantía</a></li>
                  <li><a href="#soporte" className="text-primary hover:underline">• Soporte Técnico</a></li>
                  <li><a href="#financiacion" className="text-primary hover:underline">• Financiación</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Enlaces de Interés</h3>
                <ul className="space-y-1 text-sm">
                  <li><a href="#empresa" className="text-primary hover:underline">• Información Corporativa</a></li>
                  <li><a href="#trabajo" className="text-primary hover:underline">• Trabaja con Nosotros</a></li>
                  <li><a href="#sostenibilidad" className="text-primary hover:underline">• Sostenibilidad</a></li>
                  <li><a href="#privacidad" className="text-primary hover:underline">• Política de Privacidad</a></li>
                  <li><a href="#terminos" className="text-primary hover:underline">• Términos y Condiciones</a></li>
                  <li><a href="#cookies" className="text-primary hover:underline">• Política de Cookies</a></li>
                </ul>
              </div>
            </div>
          </section>

          {/* SERVICIOS */}
          
          {/* Envíos y Entregas */}
          <section id="envios" className="mb-12 scroll-mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-primary pb-2 flex items-center">
              <i className="fas fa-shipping-fast text-primary mr-3"></i>
              Envíos y Entregas
            </h2>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Ofrecemos múltiples opciones de envío para que recibas tus productos de forma rápida y segura.
                </p>
                
                <h3 className="text-lg font-medium text-gray-700 mb-3">Opciones de Envío</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Envío Estándar (3-5 días):</strong> Gratuito para pedidos superiores a 50€</li>
                  <li><strong>Envío Exprés (1-2 días):</strong> 5.95€ - Ideal para compras urgentes</li>
                  <li><strong>Recogida en Tienda:</strong> Gratuito - Disponible en 24-48 horas</li>
                  <li><strong>Envío Internacional:</strong> Consulta tarifas según destino</li>
                </ul>
                
                <p className="text-sm text-gray-500">
                  Todos los envíos incluyen seguro y número de seguimiento. 
                  Los pedidos realizados antes de las 14:00h se procesan el mismo día.
                </p>
              </div>
              
              <img src={shippingImage} alt="Opciones de envío" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>
          </section>

          {/* Métodos de Pago */}
          <section id="pagos" className="mb-12 scroll-mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-primary pb-2 flex items-center">
              <i className="fas fa-credit-card text-primary mr-3"></i>
              Métodos de Pago
            </h2>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Aceptamos múltiples formas de pago para tu comodidad y seguridad.
                </p>
                
                <h3 className="text-lg font-medium text-gray-700 mb-3">Formas de Pago Aceptadas</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Tarjetas de Crédito/Débito:</strong> Visa, Mastercard, American Express</li>
                  <li><strong>Pagos Digitales:</strong> PayPal, Apple Pay, Google Pay</li>
                  <li><strong>Transferencia Bancaria:</strong> Para pedidos superiores a 500€</li>
                  <li><strong>Financiación:</strong> Sin intereses hasta 24 meses</li>
                  <li><strong>Pago en Tienda:</strong> Efectivo o tarjeta en nuestras tiendas físicas</li>
                </ul>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    🔒 Todos los pagos están protegidos con cifrado SSL y autenticación 3D Secure
                  </p>
                </div>
              </div>
              
              <img src={paymentMethodsImage} alt="Métodos de pago seguros" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>
          </section>

          {/* Devoluciones */}
          <section id="devoluciones" className="mb-12 scroll-mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-primary pb-2 flex items-center">
              <i className="fas fa-undo-alt text-primary mr-3"></i>
              Política de Devoluciones
            </h2>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Queremos que estés completamente satisfecho con tu compra. Por eso ofrecemos una política de devoluciones flexible.
                </p>
                
                <h3 className="text-lg font-medium text-gray-700 mb-3">Condiciones de Devolución</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>14 días naturales</strong> para devoluciones sin preguntas</li>
                  <li>Productos en perfecto estado y embalaje original</li>
                  <li>Devolución gratuita en tiendas físicas</li>
                  <li>Recogida a domicilio con coste de 3.95€</li>
                  <li>Reembolso en 3-5 días hábiles tras recepción</li>
                </ul>
                
                <p className="text-sm text-gray-500">
                  Los accesorios y fundas tienen devolución gratuita durante 30 días completos.
                </p>
              </div>
              
              <img src={returnsImage} alt="Proceso de devoluciones" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>
          </section>

          {/* Garantía */}
          <section id="garantia" className="mb-12 scroll-mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-primary pb-2 flex items-center">
              <i className="fas fa-shield-alt text-primary mr-3"></i>
              Garantía
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Todos nuestros dispositivos incluyen garantía oficial del fabricante.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Cobertura de Garantía</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>24 meses</strong> de garantía oficial del fabricante</li>
                    <li>Defectos de fabricación y componentes</li>
                    <li>Sustitución inmediata durante los primeros 15 días</li>
                    <li>Reparación en servicio técnico autorizado</li>
                    <li>Dispositivo de sustitución durante reparaciones</li>
                    <li>Extensión de garantía hasta 36 meses disponible</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Garantía Plus</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Cobertura contra daños accidentales</li>
                    <li>Protección contra rotura de pantalla</li>
                    <li>Daños por líquidos</li>
                    <li>Cobertura contra robo</li>
                    <li>Servicio técnico prioritario</li>
                    <li>Sustitución en 24-48h</li>
                  </ul>
                </div>
              </div>
              
              <img src={deadlinesImage} alt="Servicio de garantía" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>
          </section>

          {/* Soporte Técnico */}
          <section id="soporte" className="mb-12 scroll-mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-primary pb-2 flex items-center">
              <i className="fas fa-headset text-primary mr-3"></i>
              Soporte Técnico
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Nuestro equipo de soporte técnico está disponible para ayudarte con cualquier consulta o problema.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <i className="fas fa-phone text-primary text-2xl mb-2"></i>
                  <h3 className="font-medium text-gray-700 mb-2">Teléfono</h3>
                  <p className="text-sm">900 123 456</p>
                  <p className="text-xs text-gray-500">Lun-Vie 9:00-20:00</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <i className="fas fa-comments text-primary text-2xl mb-2"></i>
                  <h3 className="font-medium text-gray-700 mb-2">Chat Online</h3>
                  <p className="text-sm">Disponible 24/7</p>
                  <p className="text-xs text-gray-500">Respuesta inmediata</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <i className="fas fa-envelope text-primary text-2xl mb-2"></i>
                  <h3 className="font-medium text-gray-700 mb-2">Email</h3>
                  <p className="text-sm">soporte@techmobile.es</p>
                  <p className="text-xs text-gray-500">Respuesta en 2-4h</p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-700 mb-3">Servicios de Soporte</h3>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Configuración inicial y transferencia de datos</li>
                <li>Instalación de aplicaciones y actualizaciones</li>
                <li>Resolución de problemas técnicos</li>
                <li>Asesoramiento en uso y funciones avanzadas</li>
                <li>Backup y recuperación de datos</li>
                <li>Optimización de rendimiento</li>
              </ul>
            </div>
          </section>

          {/* Financiación */}
          <section id="financiacion" className="mb-12 scroll-mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-primary pb-2 flex items-center">
              <i className="fas fa-calculator text-primary mr-3"></i>
              Financiación
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Hacemos que la tecnología sea accesible para todos con nuestras opciones de financiación flexibles.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    <i className="fas fa-percentage text-primary mr-2"></i>
                    Sin Intereses
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>3 meses: Para compras desde 100€</li>
                    <li>6 meses: Para compras desde 300€</li>
                    <li>12 meses: Para compras desde 500€</li>
                    <li>24 meses: Para compras desde 800€</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">
                    Financiación 0% TAE. Sujeto a aprobación crediticia.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    <i className="fas fa-chart-line text-primary mr-2"></i>
                    Financiación Extendida
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>36 meses: TIN desde 5.95%</li>
                    <li>48 meses: TIN desde 7.95%</li>
                    <li>60 meses: TIN desde 9.95%</li>
                    <li>Entrada mínima desde 10%</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">
                    Para compras superiores a 1.000€. Consulta condiciones.
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-700 mb-2">
                  <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                  Proceso Rápido y Sencillo
                </h4>
                <p className="text-sm">
                  Aprobación inmediata online. Solo necesitas tu DNI y una cuenta bancaria. 
                  El proceso completo dura menos de 5 minutos.
                </p>
              </div>
            </div>
          </section>

          {/* ENLACES DE INTERÉS */}
          
          {/* Información de la empresa */}
          <section id="empresa" className="mb-12 scroll-mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-primary pb-2 flex items-center">
              <i className="fas fa-building text-primary mr-3"></i>
              Información Corporativa
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Tech Mobile es una empresa líder en el sector de la tecnología móvil en España, 
                comprometida con ofrecer los mejores productos y servicios a nuestros clientes.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Nuestra Historia</h3>
                  <p className="text-sm mb-3">
                    Fundada en 2015, hemos crecido desde una pequeña tienda local hasta convertirnos 
                    en una de las cadenas de tecnología móvil más reconocidas del país.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Más de 50 tiendas en toda España</li>
                    <li>Equipo de más de 200 profesionales</li>
                    <li>Más de 500.000 clientes satisfechos</li>
                    <li>Partner oficial de las principales marcas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Nuestros Valores</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Calidad:</strong> Solo trabajamos con productos de primeras marcas</li>
                    <li><strong>Servicio:</strong> Atención personalizada pre y post venta</li>
                    <li><strong>Innovación:</strong> Siempre a la vanguardia tecnológica</li>
                    <li><strong>Confianza:</strong> Transparencia en todos nuestros procesos</li>
                    <li><strong>Sostenibilidad:</strong> Compromiso con el medio ambiente</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Trabaja con Nosotros */}
          <section id="trabajo" className="mb-12 scroll-mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-primary pb-2 flex items-center">
              <i className="fas fa-users text-primary mr-3"></i>
              Trabaja con Nosotros
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                ¿Te apasiona la tecnología? Únete a nuestro equipo y forma parte del futuro de la tecnología móvil.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">¿Por qué elegir Tech Mobile?</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                    <li>Ambiente de trabajo dinámico e innovador</li>
                    <li>Oportunidades de crecimiento profesional</li>
                    <li>Formación continua en nuevas tecnologías</li>
                    <li>Beneficios sociales competitivos</li>
                    <li>Flexibilidad horaria y teletrabajo</li>
                    <li>Descuentos especiales en productos</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Posiciones Abiertas</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                    <li>Técnico de Reparación de Móviles</li>
                    <li>Comercial de Tienda</li>
                    <li>Desarrollador de Aplicaciones</li>
                    <li>Especialista en Atención al Cliente</li>
                    <li>Marketing Digital</li>
                    <li>Logistics Coordinator</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-2">
                  📧 Envía tu CV a: rrhh@techmobile.es
                </p>
                <p className="text-xs text-blue-700">
                  Incluye una carta de presentación explicando por qué quieres formar parte de nuestro equipo.
                </p>
              </div>
            </div>
          </section>

          {/* Sostenibilidad */}
          <section id="sostenibilidad" className="mb-12 scroll-mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-primary pb-2 flex items-center">
              <i className="fas fa-leaf text-primary mr-3"></i>
              Compromiso con la Sostenibilidad
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                En Tech Mobile estamos comprometidos con el cuidado del medio ambiente y la sostenibilidad tecnológica.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <i className="fas fa-recycle text-green-600 text-2xl mb-2"></i>
                  <h3 className="font-medium text-gray-700 mb-2">Reciclaje</h3>
                  <p className="text-sm">Programa de reciclaje de dispositivos usados con recompensa económica</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <i className="fas fa-box text-blue-600 text-2xl mb-2"></i>
                  <h3 className="font-medium text-gray-700 mb-2">Packaging</h3>
                  <p className="text-sm">Embalajes 100% reciclables y reducción del 30% en materiales</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <i className="fas fa-bolt text-yellow-600 text-2xl mb-2"></i>
                  <h3 className="font-medium text-gray-700 mb-2">Energía</h3>
                  <p className="text-sm">Tiendas alimentadas con energía 100% renovable desde 2023</p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-700 mb-3">Nuestras Iniciativas</h3>
              <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                <li>Programa "Móvil Verde": Recogida gratuita de dispositivos para reciclaje</li>
                <li>Certificación ISO 14001 en gestión ambiental</li>
                <li>Reducción del 50% de emisiones de CO2 en nuestras operaciones</li>
                <li>Colaboración con ONGs para donación de dispositivos reacondicionados</li>
                <li>Promoción de la reparación frente a la compra de dispositivos nuevos</li>
              </ul>
            </div>
          </section>

          {/* Política de Privacidad */}
          <section id="privacidad" className="mb-12 scroll-mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-primary pb-2 flex items-center">
              <i className="fas fa-shield-alt text-primary mr-3"></i>
              Política de Privacidad
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                En Tech Mobile respetamos tu privacidad y nos comprometemos a proteger tus datos personales 
                de acuerdo con el Reglamento General de Protección de Datos (RGPD).
              </p>
              
              <h3 className="text-lg font-medium text-gray-700 mb-3">Datos que Recopilamos</h3>
              <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                <li>Información de contacto (nombre, email, teléfono, dirección)</li>
                <li>Datos de facturación y envío</li>
                <li>Historial de compras y preferencias</li>
                <li>Información de navegación y cookies</li>
                <li>Comunicaciones contigo (emails, chats, llamadas)</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-700 mb-3">Cómo Usamos tus Datos</h3>
              <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                <li>Procesar y gestionar tus pedidos</li>
                <li>Proporcionar atención al cliente</li>
                <li>Enviar comunicaciones sobre productos y ofertas (solo si consientes)</li>
                <li>Mejorar nuestros servicios y experiencia de usuario</li>
                <li>Cumplir con obligaciones legales y fiscales</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-700 mb-3">Tus Derechos</h3>
              <p className="text-sm mb-4">
                Tienes derecho a acceder, rectificar, suprimir, limitar el tratamiento, 
                portabilidad de datos y oposición. Para ejercer estos derechos, 
                contacta con nosotros en privacidad@techmobile.es
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-800">
                  🔒 Nunca compartimos tus datos con terceros sin tu consentimiento expreso
                </p>
              </div>
            </div>
          </section>

          {/* Términos y Condiciones */}
          <section id="terminos" className="mb-12 scroll-mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-primary pb-2 flex items-center">
              <i className="fas fa-file-contract text-primary mr-3"></i>
              Términos y Condiciones
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Estos términos y condiciones regulan el uso de nuestro sitio web y la compra de productos.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Condiciones de Compra</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Los precios incluyen IVA y pueden cambiar sin previo aviso</li>
                    <li>Stock sujeto a disponibilidad</li>
                    <li>Confirmación de pedido por email</li>
                    <li>Derecho de desistimiento de 14 días</li>
                    <li>Factura electrónica disponible</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Uso del Sitio Web</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Prohibido el uso para fines ilegales</li>
                    <li>No reproducir contenido sin autorización</li>
                    <li>Respetar los derechos de propiedad intelectual</li>
                    <li>No intentar acceder a áreas restringidas</li>
                    <li>Reportar problemas de seguridad</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-700 mb-3">Limitación de Responsabilidad</h3>
              <p className="text-sm mb-4">
                Tech Mobile no se hace responsable de daños indirectos, pérdida de beneficios, 
                o daños que excedan el valor del producto adquirido. Nuestra responsabilidad 
                se limita a la reparación o sustitución del producto defectuoso.
              </p>
              
              <p className="text-xs text-gray-500">
                Última actualización: Junio 2025. Nos reservamos el derecho a modificar 
                estos términos en cualquier momento.
              </p>
            </div>
          </section>

          {/* Política de Cookies */}
          <section id="cookies" className="mb-12 scroll-mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-primary pb-2 flex items-center">
              <i className="fas fa-cookie-bite text-primary mr-3"></i>
              Política de Cookies
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Utilizamos cookies para mejorar tu experiencia de navegación y ofrecerte contenido personalizado.
              </p>
              
              <h3 className="text-lg font-medium text-gray-700 mb-3">Tipos de Cookies que Utilizamos</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Cookies Esenciales</h4>
                  <p className="text-sm mb-3">
                    Necesarias para el funcionamiento básico del sitio web. No se pueden desactivar.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Cookies de sesión</li>
                    <li>Carrito de compras</li>
                    <li>Autenticación de usuario</li>
                    <li>Preferencias de idioma</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Cookies de Análisis</h4>
                  <p className="text-sm mb-3">
                    Nos ayudan a entender cómo interactúas con nuestro sitio web.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Google Analytics</li>
                    <li>Mapas de calor</li>
                    <li>Análisis de comportamiento</li>
                    <li>Estadísticas de rendimiento</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Cookies de Marketing</h4>
                  <p className="text-sm mb-3">
                    Para mostrarte anuncios relevantes en nuestra web y otras plataformas.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Facebook Pixel</li>
                    <li>Google Ads</li>
                    <li>Retargeting</li>
                    <li>Personalización de contenido</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Cookies de Terceros</h4>
                  <p className="text-sm mb-3">
                    De servicios externos que utilizamos para mejorar la funcionalidad.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Chat en vivo</li>
                    <li>Redes sociales</li>
                    <li>Mapas integrados</li>
                    <li>Videos embebidos</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">
                  ⚙️ Gestión de Cookies
                </h4>
                <p className="text-sm">
                  Puedes gestionar tus preferencias de cookies en cualquier momento a través de 
                  la configuración de tu navegador o nuestro panel de preferencias. 
                  Ten en cuenta que desactivar ciertas cookies puede afectar la funcionalidad del sitio.
                </p>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                Al continuar navegando en nuestro sitio web, aceptas el uso de cookies 
                según se describe en esta política.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
