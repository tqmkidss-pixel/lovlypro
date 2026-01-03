
import React from 'react';

interface CookiePolicyProps {
  onClose: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onClose }) => {
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

        <h1 className="text-3xl font-bold text-[#202124] dark:text-[#e8eaed] mb-4">Política de Cookies</h1>
        <p className="text-sm text-[#70757a] dark:text-[#9aa0a6] mb-8 leading-relaxed">
          La presente Política de Cookies describe el uso de cookies y tecnologías similares en el sitio web lovly.pro (en adelante, el “Sitio” o el “Servicio”).
        </p>
        
        <div className="prose prose-sm text-[#3c4043] dark:text-[#bdc1c6] space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos que se descargan en el dispositivo del usuario al navegar por un sitio web. Su función puede incluir permitir el funcionamiento técnico del Sitio, recordar preferencias o realizar medición de uso y análisis estadísticos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">2. Cookies que utiliza lovly.pro</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[#202124] dark:text-[#e8eaed] text-xs uppercase mb-1">2.1. Cookies técnicas (necesarias)</h3>
                <p>Estas cookies son imprescindibles para permitir que el Sitio funcione correctamente. Se usan para:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Mantener la sesión del usuario activa mientras accede al chat</li>
                  <li>Recordar el número de consultas disponibles durante la sesión</li>
                  <li>Permitir la navegación básica y el uso seguro del Servicio</li>
                </ul>
                <p className="mt-2 italic text-xs">No almacenan información personal y no requieren consentimiento.</p>
              </div>

              <div>
                <h3 className="font-bold text-[#202124] dark:text-[#e8eaed] text-xs uppercase mb-1">2.2. Cookies analíticas (requieren consentimiento)</h3>
                <p>lovly.pro utiliza Google Analytics exclusivamente para medir el uso del Sitio y obtener estadísticas de acceso.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Proveedor:</strong> Google LLC</li>
                  <li><strong>Finalidad:</strong> estadísticas, tráfico y medición de rendimiento del Sitio</li>
                  <li><strong>Tratamiento:</strong> solo se activará cuando el usuario otorgue su consentimiento</li>
                </ul>
                <p className="mt-2">Sin consentimiento previo, lovly.pro no instala Google Analytics ni envía datos a Google.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">3. Consentimiento de cookies</h2>
            <p>
              Al entrar al Sitio, el usuario visualizará un aviso de cookies con opciones: Aceptar, Rechazar o Configurar. Las cookies técnicas seguirán activas, pero las analíticas solo se ejecutarán si el usuario selecciona “Aceptar”.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">4. Cómo retirar o modificar el consentimiento</h2>
            <p>
              El usuario puede solicitar modificar o retirar su consentimiento en cualquier momento enviando un correo a: <span className="text-[#4285F4] dark:text-[#8ab4f8] font-medium">soporte.lovly@gmail.com</span>
            </p>
            <p className="mt-2">
              Asimismo, puede configurar su navegador para bloquear o eliminar cookies siguiendo sus instrucciones oficiales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">5. Modificaciones</h2>
            <p>
              El titular del Sitio podrá modificar esta Política para adaptarla a cambios normativos o técnicos. La versión aplicable será siempre la última publicada en lovly.pro.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-[#3c4043] flex justify-center">
          <button 
            onClick={onClose}
            className="bg-[#FBBC05] text-[#202124] px-10 py-3 rounded-md font-bold text-sm hover:shadow-lg transition-all active:scale-95"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
