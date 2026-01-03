
import React, { useState, useEffect } from 'react';
import SupportChat from './components/SupportChat';
import Landing from './components/Landing';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import CookiePolicy from './components/CookiePolicy';
import About from './components/About';
import Contact from './components/Contact';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('lovly-theme');
    return savedTheme === 'dark';
  });

  // Estado para rastrear el uso gratuito del dispositivo
  const [deviceLastFreeDate, setDeviceLastFreeDate] = useState<string | null>(
    localStorage.getItem('device_last_free_date')
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lovly-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lovly-theme', 'light');
    }
  }, [isDarkMode]);

  // Cargar saldo guardado al iniciar sesión
  useEffect(() => {
    if (user) {
      const savedBalance = localStorage.getItem(`balance_${user.email}`);
      const savedDate = localStorage.getItem(`lastFree_${user.email}`);
      if (savedBalance) {
        setUser(prev => prev ? { ...prev, queriesBalance: parseInt(savedBalance), lastFreeQueryDate: savedDate } : null);
      }
    }
  }, [user?.email]);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Cambio: Ahora el usuario inicia con 3 consultas en lugar de 0
      setUser({
        name: 'Usuario Lovly',
        email: 'usuario@gmail.com', 
        photo: 'https://ui-avatars.com/api/?name=Usuario+Lovly&background=4285F4&color=fff',
        queriesBalance: 3,
        lastFreeQueryDate: null
      });
      setIsLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const updateUserBalance = (newBalance: number, isFreeQuery: boolean = false) => {
    if (!user) return;
    const today = new Date().toDateString();
    
    const updatedUser = { 
      ...user, 
      queriesBalance: newBalance,
      lastFreeQueryDate: isFreeQuery ? today : user.lastFreeQueryDate 
    };
    
    setUser(updatedUser);
    localStorage.setItem(`balance_${user.email}`, newBalance.toString());
    
    if (isFreeQuery) {
      localStorage.setItem(`lastFree_${user.email}`, today);
      localStorage.setItem('device_last_free_date', today);
      setDeviceLastFreeDate(today);
    }
  };

  return (
    <div className={`h-screen bg-white dark:bg-[#121212] text-[#202124] dark:text-[#e8eaed] flex flex-col font-sans tracking-tight overflow-hidden transition-colors duration-300`}>
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfUse onClose={() => setShowTerms(false)} />}
      {showCookies && <CookiePolicy onClose={() => setShowCookies(false)} />}
      {showAbout && <About onClose={() => setShowAbout(false)} />}
      {showContact && <Contact onClose={() => setShowContact(false)} />}

      {!user ? (
        <Landing 
          onLogin={handleGoogleLogin} 
          isLoading={isLoading} 
          onShowPrivacy={() => setShowPrivacy(true)}
          onShowTerms={() => setShowTerms(true)}
          onShowCookies={() => setShowCookies(true)}
          onShowAbout={() => setShowAbout(true)}
          onShowContact={() => setShowContact(true)}
        />
      ) : (
        <>
          <header className="z-40 bg-white dark:bg-[#121212] border-b border-[#f1f3f4] dark:border-[#3c4043] flex-shrink-0">
            <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center select-none cursor-pointer" onClick={handleLogout}>
                <span className="text-[#4285F4] font-medium text-2xl tracking-tight">l</span>
                <span className="text-[#EA4335] font-medium text-2xl tracking-tight">o</span>
                <span className="text-[#FBBC05] font-medium text-2xl tracking-tight">v</span>
                <span className="text-[#4285F4] font-medium text-2xl tracking-tight">l</span>
                <span className="text-[#34A853] font-medium text-2xl tracking-tight">y</span>
                <span className="text-[#70757a] dark:text-[#9aa0a6] font-light text-2xl tracking-tight">.</span>
                <span className="text-[#70757a] dark:text-[#9aa0a6] font-light text-sm mt-1.5 ml-0.5">pro</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex flex-col items-end">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-[#4285F4] uppercase tracking-wider">
                      {user.queriesBalance} consultas
                    </span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <span className="text-[10px] font-bold text-[#34A853] uppercase tracking-wider">
                      {(user.lastFreeQueryDate === new Date().toDateString() || deviceLastFreeDate === new Date().toDateString()) ? 'Free agotadas' : 'Free disponible'}
                    </span>
                  </div>
                  <span className="text-[9px] text-[#70757a] font-medium uppercase mt-0.5">Dispositivo vinculado: {deviceLastFreeDate === new Date().toDateString() ? 'Limitado' : 'OK'}</span>
                </div>

                <button onClick={handleLogout} className="group relative">
                  <img src={user.photo} alt="Profile" className="w-9 h-9 rounded-full border border-gray-200 dark:border-[#3c4043] shadow-sm group-hover:opacity-80 transition-opacity" />
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#3c4043] rounded-full w-4 h-4 flex items-center justify-center text-[8px] text-[#70757a] dark:text-[#9aa0a6] shadow-sm">
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 max-w-2xl mx-auto w-full flex flex-col min-h-0 relative">
            <SupportChat 
              user={user}
              onUpdateBalance={updateUserBalance}
              onShowPrivacy={() => setShowPrivacy(true)} 
              onShowTerms={() => setShowTerms(true)}
              onShowCookies={() => setShowCookies(true)}
              onShowAbout={() => setShowAbout(true)}
              onShowContact={() => setShowContact(true)}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </main>
        </>
      )}
    </div>
  );
};

export default App;
