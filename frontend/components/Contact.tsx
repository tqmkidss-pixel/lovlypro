
import React from 'react';

interface ContactProps {
  onClose: () => void;
}

const Contact: React.FC<ContactProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-[#121212] overflow-y-auto animate-fadeIn transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center select-none">
            <span className="text-[#4285F4] font-medium text-2xl tracking-tight">l</span>
            <span className="text-[#EA4335] font-medium text-2xl tracking-tight">o</span>
            <span className="text-[#FBBC05] font-medium text-2xl tracking-tight">v</span>
            <span className="text-[#4285F4] font-medium text-2xl tracking-tight">l</span>
            <span className="text-[#34A853] font-medium text-2xl tracking-tight">y</span>
            <span className="text-[#70757a] dark:text-[#9aa0a6] font-light text-2xl tracking-tight">.</span>
            <span className="text-[#70757a] dark:text-[#9aa0a6] font-light text-sm mt-1.5 ml-0.5">pro</span>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#1e1e1e] transition-colors text-gray-400 text-2xl"
          >
            &times;
          </button>
        </div>

        <h1 className="text-3xl font-bold text-[#202124] dark:text-[#e8eaed] mb-8">Contacto Oficial</h1>
        
        <div className="space-y-10">
          <section className="animate-slideInLeft">
            <p className="text-sm text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed mb-6">
              Si necesitas soporte, tienes dudas sobre el funcionamiento de la plataforma, deseas solicitar información adicional o ejercer algún derecho relacionado con privacidad y protección de datos, puedes escribirnos a nuestro canal de contacto oficial:
            </p>
            
            <div className="bg-[#f8f9fa] dark:bg-[#1e1e1e] p-6 rounded-[24px] border border-[#dadce0] dark:border-[#3c4043] flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-[#4285F4]">
                <i className="fas fa-envelope text-xl"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#70757a] dark:text-[#9aa0a6] uppercase tracking-widest">Correo de soporte</p>
                <a href="mailto:soporte.lovly@gmail.com" className="text-lg font-bold text-[#4285F4] hover:underline">soporte.lovly@gmail.com</a>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideInLeft [animation-delay:0.1s]">
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-[24px] border border-[#dadce0] dark:border-[#3c4043]">
              <div className="flex items-center space-x-3 mb-4">
                <i className="fas fa-clock text-[#FBBC05]"></i>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#202124] dark:text-white">Horario de atención</h3>
              </div>
              <p className="text-sm text-[#3c4043] dark:text-[#bdc1c6]">
                De lunes a sábado, 09:00 – 19:00 <br/>
                <span className="text-[10px] font-medium opacity-70">(Hora España – CET)</span>
              </p>
              <p className="mt-4 text-[11px] font-medium text-[#70757a] italic">
                Las consultas se responden generalmente en un plazo máximo de 24–48 horas.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-[24px] border border-[#dadce0] dark:border-[#3c4043]">
              <div className="flex items-center space-x-3 mb-4">
                <i className="fas fa-map-marker-alt text-[#EA4335]"></i>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#202124] dark:text-white">Dirección física</h3>
              </div>
              <p className="text-sm text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed">
                John Jairo Correa Guerrero<br/>
                Calle Luis Barrón 17, 4H<br/>
                26005 Logroño, La Rioja – España
              </p>
            </div>
          </section>

          <section className="animate-slideInLeft [animation-delay:0.2s]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#202124] dark:text-white mb-4 pl-1">Asuntos frecuentes</h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                "Preguntas sobre funcionamiento del sistema",
                "Problemas al iniciar sesión con Google",
                "Dudas sobre consumo de consultas",
                "Solicitud de asistencia o sugerencias de mejora",
                "Solicitud de comprobante de pago"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-[#2d2d2d] rounded-xl text-xs text-[#3c4043] dark:text-[#bdc1c6]">
                  <i className="fas fa-chevron-right text-[8px] text-[#34A853]"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-red-50 dark:bg-red-900/10 p-6 rounded-[24px] border border-red-100 dark:border-red-900/30 animate-slideInLeft [animation-delay:0.3s]">
            <div className="flex items-start space-x-4">
              <i className="fas fa-info-circle text-red-500 mt-1"></i>
              <div>
                <h4 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest mb-1">Importante</h4>
                <p className="text-xs text-red-700 dark:text-red-300/80 leading-relaxed">
                  lovly.pro no ofrece atención telefónica. Todo contacto debe realizarse vía correo electrónico para garantizar la privacidad, trazabilidad y seguridad de la comunicación.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-[#3c4043] flex flex-col items-center">
          <p className="text-[10px] text-[#70757a] dark:text-[#9aa0a6] font-bold uppercase tracking-widest mb-6">lovly.pro © 2026 • Canal de Soporte Oficial</p>
          <button 
            onClick={onClose}
            className="bg-[#4285F4] text-white px-10 py-3 rounded-md font-medium text-sm hover:shadow-lg transition-all active:scale-95"
          >
            Cerrar contacto
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
