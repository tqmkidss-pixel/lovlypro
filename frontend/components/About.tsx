
import React from 'react';

interface AboutProps {
  onClose: () => void;
}

const About: React.FC<AboutProps> = ({ onClose }) => {
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

        <h1 className="text-3xl font-bold text-[#202124] dark:text-[#e8eaed] mb-8">Acerca de lovly.pro</h1>
        
        <div className="prose prose-sm text-[#3c4043] dark:text-[#bdc1c6] space-y-8 text-sm leading-relaxed">
          <section>
            <p>
              <strong className="text-[#202124] dark:text-[#e8eaed]">lovly.pro</strong> es una plataforma digital centrada en ofrecer un espacio conversacional diseñado para ayudar al usuario a analizar y entender situaciones afectivas desde una perspectiva objetiva y estructurada. Nuestra propuesta se basa en una interfaz simple, directa, estilo Google, pensada para acompañar procesos de autoanálisis emocional y comprensión de vínculos.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>El acceso al servicio se realiza exclusivamente mediante inicio de sesión con Google.</li>
              <li>El usuario dispone de 3 consultas gratuitas al acceder por primera vez.</li>
              <li>Para continuar utilizando la plataforma, podrá adquirir paquetes de consultas de forma puntual, sin suscripción ni renovaciones automáticas.</li>
              <li>lovly.pro no almacena información personal, no guarda conversaciones y no registra datos de identidad más allá del tiempo estrictamente necesario para permitir la sesión activa del usuario.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">Modelo de servicio</h2>
            <ul className="list-none space-y-1 font-medium">
              <li>– 3 consultas gratuitas al registrarse</li>
              <li>– Paquetes de consultas de pago sin caducidad</li>
              <li>– No existen planes recurrentes ni cargos automáticos</li>
              <li>– Uso personal e intransferible</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">Nuestra visión</h2>
            <p>
              Facilitar una herramienta digital que permita a las personas reflexionar, identificar patrones y tomar decisiones afectivas con claridad, sin juicios ni presión, desde un entorno privado y minimalista.
            </p>
          </section>

          <section className="bg-[#f8f9fa] dark:bg-[#1e1e1e] p-6 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]">
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">Titular del servicio</h2>
            <div className="space-y-1 text-xs">
              <p className="font-bold text-sm text-[#202124] dark:text-[#e8eaed]">John Jairo Correa Guerrero</p>
              <p>Contacto: <span className="text-[#4285F4] dark:text-[#8ab4f8]">soporte.lovly@gmail.com</span></p>
              <p>Logroño, La Rioja – España</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-[#3c4043] flex flex-col items-center">
          <p className="text-[10px] text-[#70757a] dark:text-[#9aa0a6] font-bold uppercase tracking-widest mb-6">lovly.pro © 2026</p>
          <button 
            onClick={onClose}
            className="bg-[#34A853] text-white px-10 py-3 rounded-md font-medium text-sm hover:shadow-lg transition-all active:scale-95"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
