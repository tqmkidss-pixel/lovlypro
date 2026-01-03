
import React from 'react';

interface TermsOfUseProps {
  onClose: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ onClose }) => {
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

        <h1 className="text-3xl font-bold text-[#202124] dark:text-[#e8eaed] mb-4">Condiciones de Uso</h1>
        <p className="text-sm text-[#70757a] dark:text-[#9aa0a6] mb-8 leading-relaxed">
          Las presentes Condiciones de Uso regulan el acceso y utilización del sitio web lovly.pro (en adelante, “el Servicio”). Al acceder mediante “Continuar con Google”, el usuario acepta íntegramente estas condiciones.
        </p>
        
        <div className="prose prose-sm text-[#3c4043] dark:text-[#bdc1c6] space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">1. Objeto del Servicio</h2>
            <p>
              lovly.pro permite acceder a un chat digital operado a través de inicio de sesión con Google. El Servicio está orientado a uso personal, conversacional y digital.
            </p>
            <p className="mt-2">El acceso estándar incluye:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>3 consultas gratuitas otorgadas automáticamente al iniciar sesión por primera vez</li>
              <li>Uso adicional sujeto a la compra de paquetes de consultas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">2. Funcionamiento del sistema de consultas</h2>
            <p>El usuario dispone de un sistema de consumo por créditos:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Al iniciar sesión por primera vez:</strong> recibe 3 consultas gratuitas, no transferibles y sin fecha de caducidad.</li>
              <li>Para continuar usando el Servicio deberá comprar paquetes de consultas.</li>
              <li>Mientras el saldo sea 0, el usuario no podrá acceder al chat.</li>
            </ul>
            <p className="mt-4 font-bold text-[#202124] dark:text-[#e8eaed]">Paquetes disponibles actualmente:</p>
            <div className="bg-[#F8F9FA] dark:bg-[#1e1e1e] p-4 rounded-xl border border-gray-100 dark:border-[#3c4043] mt-2 space-y-1 transition-colors">
              <p>– 5 € → 10 consultas</p>
              <p>– 10 € → 40 consultas</p>
              <p>– 19 € → 100 consultas</p>
            </div>
            <p className="mt-4">
              <strong>Las consultas:</strong> No caducan, permanecen disponibles hasta ser utilizadas, no se reembolsan una vez activadas y no pueden convertirse en dinero ni compensarse por otras vías.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">3. Prohibiciones y normas de uso</h2>
            <p>El usuario se compromete a NO:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Compartir su cuenta con terceros</li>
              <li>Revender, sublicenciar o ceder sus créditos</li>
              <li>Utilizar la plataforma para actividades ilegales, violentas, discriminatorias o de acoso</li>
              <li>Interferir con el funcionamiento técnico del Sitio</li>
            </ul>
            <p className="mt-4 italic text-xs text-[#70757a] dark:text-[#9aa0a6]">
              lovly.pro podrá bloquear o suspender el acceso de un usuario si detecta abuso, uso fraudulento o violación de estas normas, sin derecho a reembolso.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">4. Pago y facturación</h2>
            <p>
              El pago habilita únicamente el acceso y uso del número de consultas adquiridas.
            </p>
            <p className="mt-2">
              El Servicio no emite factura automática. Si un usuario desea un comprobante, deberá solicitarlo a: <span className="text-[#4285F4] dark:text-[#8ab4f8] font-medium">soporte.lovly@gmail.com</span>
            </p>
            <p className="mt-2">No existen suscripciones recurrentes ni cargos automáticos.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">5. Disponibilidad y responsabilidad</h2>
            <p>
              El Servicio se ofrece “tal cual”, sin garantía de disponibilidad ininterrumpida.
            </p>
            <p className="mt-2">
              lovly.pro no se responsabiliza de decisiones tomadas por los usuarios basadas en información obtenida en el chat ni de daños o consecuencias derivadas del uso del Servicio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">6. Suspensión o cierre del servicio</h2>
            <p>
              lovly.pro podrá suspender temporal o definitivamente el acceso por mantenimiento técnico, cambios operativos, incumplimiento de estas condiciones o actividad sospechosa o fraudulenta.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-3 uppercase tracking-wider text-[11px]">7. Legislación aplicable y jurisdicción</h2>
            <p>
              Estas condiciones se rigen por la legislación española.
            </p>
            <p className="mt-2 text-xs">
              Para cualquier controversia, las partes se someterán a los juzgados y tribunales competentes de <strong>Logroño, La Rioja</strong>, salvo normativa imperativa en contrario.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-[#3c4043] flex justify-center">
          <button 
            onClick={onClose}
            className="bg-[#202124] dark:bg-[#e8eaed] text-white dark:text-[#202124] px-10 py-3 rounded-md font-medium text-sm hover:shadow-lg transition-all active:scale-95"
          >
            Aceptar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
