
import React from 'react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
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

        <h1 className="text-3xl font-bold text-[#202124] dark:text-[#e8eaed] mb-8">Política de Privacidad</h1>
        
        <div className="prose prose-sm text-[#3c4043] dark:text-[#bdc1c6] space-y-6 text-sm leading-relaxed">
          <p className="font-medium">
            Lovly.pro es una plataforma basada en inteligencia artificial que permite procesar contenido enviado voluntariamente por el usuario con el fin de generar respuestas automatizadas.
          </p>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-2 uppercase tracking-wider text-[11px]">1. Responsable del Tratamiento</h2>
            <p>
              El responsable del procesamiento de los datos proporcionados a través del sitio web lovly.pro es el titular de la plataforma. Para cuestiones relacionadas con privacidad puede contactarse mediante el formulario disponible en la web.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-2 uppercase tracking-wider text-[11px]">2. Datos Procesados</h2>
            <p>
              Durante el uso de la plataforma pueden procesarse únicamente los datos que el usuario decida enviar, tales como:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Texto introducido manualmente en el sistema.</li>
              <li>Archivos o imágenes que el usuario cargue (si la función está habilitada).</li>
              <li>Datos técnicos mínimos para el funcionamiento del servicio (por ejemplo: dirección IP, navegador, dispositivo y registro de uso anónimo).</li>
            </ul>
            <p className="mt-2">No se recogen datos personales con fines ajenos al funcionamiento de la plataforma.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-2 uppercase tracking-wider text-[11px]">3. Finalidad del Tratamiento</h2>
            <p>
              Los datos proporcionados se utilizan exclusivamente con el objetivo de:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Procesar las solicitudes del usuario.</li>
              <li>Generar una respuesta automatizada mediante modelos de inteligencia artificial.</li>
              <li>Mejorar y mantener la calidad y funcionamiento del servicio.</li>
            </ul>
            <p className="mt-2">No se venden, comparten ni ceden los datos a terceros con fines publicitarios o comerciales.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-2 uppercase tracking-wider text-[11px]">4. Conservación de Datos</h2>
            <p>
              Los datos cargados por los usuarios pueden almacenarse temporalmente para permitir el funcionamiento del servicio. El usuario podrá solicitar la eliminación de su información enviando una notificación a través del formulario habilitado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-2 uppercase tracking-wider text-[11px]">5. Derechos del Usuario</h2>
            <p>
              El usuario puede solicitar:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Acceso a sus datos almacenados.</li>
              <li>Eliminación de su información.</li>
              <li>Información sobre el tratamiento aplicado.</li>
            </ul>
            <p className="mt-2">La eliminación solicitada será permanente y se aplicará en un plazo razonable desde su recepción.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-2 uppercase tracking-wider text-[11px]">6. Limitaciones del Servicio</h2>
            <p>
              Lovly.pro es una plataforma informática que genera contenido automatizado. No sustituye asesoramiento profesional de ningún tipo. La plataforma no debe utilizarse como sustituto de servicios jurídicos, médicos, psicológicos ni de emergencia.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-2 uppercase tracking-wider text-[11px]">7. Seguridad</h2>
            <p>
              Se aplican medidas de seguridad razonables para proteger la información procesada frente a accesos o usos no autorizados.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-[#3c4043] flex justify-center">
          <button 
            onClick={onClose}
            className="bg-[#4285F4] text-white px-10 py-3 rounded-md font-medium text-sm hover:shadow-lg transition-all active:scale-95"
          >
            Aceptar y Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
