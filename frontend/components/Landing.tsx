
import React, { useState } from 'react';

interface LandingProps {
  onLogin: () => void;
  isLoading: boolean;
  onShowPrivacy: () => void;
  onShowTerms: () => void;
  onShowCookies: () => void;
  onShowAbout: () => void;
  onShowContact: () => void;
}

const Landing: React.FC<LandingProps> = ({ 
  onLogin, 
  isLoading, 
  onShowPrivacy, 
  onShowTerms, 
  onShowCookies, 
  onShowAbout,
  onShowContact
}) => {
  const [showConsent, setShowConsent] = useState(false);

  const handleLoginClick = () => {
    setShowConsent(true);
  };

  const confirmConsent = () => {
    setShowConsent(false);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] flex flex-col items-center justify-center px-6 relative font-sans overflow-hidden transition-colors duration-300">
      {/* Background Decoración Sutil */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-[100px] animate-pulse"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm text-center">
        
        {/* Logo Lovly Estilo Google */}
        <div className="mb-14 select-none animate-fadeIn">
           <h1 className="text-7xl font-medium tracking-tighter flex items-center justify-center">
             <span className="text-[#4285F4]">l</span>
             <span className="text-[#EA4335]">o</span>
             <span className="text-[#FBBC05]">v</span>
             <span className="text-[#4285F4]">l</span>
             <span className="text-[#34A853]">y</span>
             <span className="text-[#70757a] dark:text-[#9aa0a6] font-light">.</span>
             <span className="text-[#70757a] dark:text-[#9aa0a6] font-light text-5xl">pro</span>
           </h1>
           <p className="mt-4 text-[#70757a] dark:text-[#9aa0a6] text-sm font-light tracking-wide">
             Inteligencia Forense Affective
           </p>
        </div>

        {/* Botón de Google Auténtico */}
        <div className="w-full space-y-6 animate-popIn">
          <button 
            onClick={handleLoginClick}
            disabled={isLoading}
            className={`w-full flex items-center justify-center space-x-3 py-3 px-6 bg-white dark:bg-[#1e1e1e] border border-[#dadce0] dark:border-[#3c4043] rounded-md shadow-sm hover:shadow-md hover:bg-[#f8f9fa] dark:hover:bg-[#2d2d2d] transition-all active:bg-[#eee] dark:active:bg-[#252525] disabled:opacity-50 ${isLoading ? 'cursor-wait' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <svg className="animate-spin h-5 w-5 text-[#4285F4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm font-medium text-[#3c4043] dark:text-[#e8eaed]">Verificando...</span>
              </div>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.712s.102-1.172.282-1.712V4.956H.957a8.991 8.991 0 0 0 0 8.088l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.373 0 2.236 2.09 0 5.148l3.007 2.332C3.708 5.164 5.692 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                <span className="text-sm font-medium text-[#3c4043] dark:text-[#e8eaed]">Continuar con Google</span>
              </>
            )}
          </button>
          
          <div className="pt-4 flex items-center justify-center space-x-2 opacity-50">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#70757a] dark:text-[#9aa0a6]">
              Acceso Seguro SSL
            </p>
          </div>
        </div>
      </div>

      {/* Ventana Emergente de Consentimiento */}
      {showConsent && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#1e1e1e] w-full max-sm rounded-3xl shadow-2xl overflow-hidden animate-popIn p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-[#4285F4] dark:text-[#8ab4f8] text-2xl">
                <i className="fas fa-shield-alt"></i>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#202124] dark:text-[#e8eaed]">Antes de continuar</h3>
                <p className="text-sm text-[#70757a] dark:text-[#9aa0a6] leading-relaxed">
                  Para acceder a <span className="font-semibold text-[#202124] dark:text-[#e8eaed]">lovly.pro</span>, es necesario que leas y aceptes nuestras políticas legales.
                </p>
              </div>

              <div className="w-full bg-gray-50 dark:bg-[#2d2d2d] rounded-2xl p-4 space-y-3 transition-colors">
                <div className="flex items-center space-x-3 text-xs font-medium text-[#3c4043] dark:text-[#e8eaed]">
                  <i className="fas fa-check text-[#34A853]"></i>
                  <button onClick={onShowTerms} className="hover:underline text-[#4285F4] dark:text-[#8ab4f8]">Condiciones de Uso</button>
                </div>
                <div className="flex items-center space-x-3 text-xs font-medium text-[#3c4043] dark:text-[#e8eaed]">
                  <i className="fas fa-check text-[#34A853]"></i>
                  <button onClick={onShowPrivacy} className="hover:underline text-[#4285F4] dark:text-[#8ab4f8]">Política de Privacidad</button>
                </div>
                <div className="flex items-center space-x-3 text-xs font-medium text-[#3c4043] dark:text-[#e8eaed]">
                  <i className="fas fa-check text-[#34A853]"></i>
                  <button onClick={onShowCookies} className="hover:underline text-[#4285F4] dark:text-[#8ab4f8]">Política de Cookies</button>
                </div>
              </div>

              <div className="w-full flex flex-col space-y-3">
                <button 
                  onClick={confirmConsent}
                  className="w-full bg-[#4285F4] text-white py-4 rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-[#1a73e8] transition-all active:scale-[0.98]"
                >
                  Aceptar y Continuar
                </button>
                <button 
                  onClick={() => setShowConsent(false)}
                  className="w-full py-3 text-xs font-bold text-[#70757a] dark:text-[#9aa0a6] hover:bg-gray-50 dark:hover:bg-[#2d2d2d] rounded-xl transition-all"
                >
                  Cancelar
                </button>
              </div>
              
              <p className="text-[10px] text-[#bdc1c6] dark:text-[#5f6368] uppercase tracking-widest font-bold">
                lovly.pro • Verificación de Seguridad
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Minimalista */}
      <div className="absolute bottom-10 flex flex-col items-center space-y-4">
        <div className="flex space-x-6 text-[11px] text-[#70757a] dark:text-[#9aa0a6] font-medium">
          <span className="hover:underline cursor-pointer" onClick={onShowPrivacy}>Privacidad</span>
          <span className="hover:underline cursor-pointer" onClick={onShowTerms}>Términos</span>
          <span className="hover:underline cursor-pointer" onClick={onShowContact}>Contacto</span>
          <span className="hover:underline cursor-pointer" onClick={onShowAbout}>lovly.pro © 2026</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
