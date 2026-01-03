
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, UserProfile } from '../types';
import { getSupportResponse, analyzeWhatsAppLog } from '../services/geminiService';
import { jsPDF } from 'jspdf';
import ProPlans from './ProPlans';

type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

interface SupportChatProps {
  user: UserProfile;
  onUpdateBalance: (newBalance: number, isFreeQuery?: boolean) => void;
  onShowPrivacy?: () => void;
  onShowTerms?: () => void;
  onShowCookies?: () => void;
  onShowAbout?: () => void;
  onShowContact?: () => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

const SupportChat: React.FC<SupportChatProps> = ({ 
  user,
  onUpdateBalance,
  onShowPrivacy, 
  onShowTerms, 
  onShowCookies, 
  onShowAbout,
  onShowContact,
  isDarkMode,
  toggleDarkMode
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: 'Bienvenido a lovly.pro cuéntame ¿que te pasó?, también puedes analizar estados de WhatsApp, Instagram, fotos y conversaciones.', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzingFile, setIsAnalyzingFile] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState('');
  
  const [fontSize, setFontSize] = useState<FontSize>('sm');
  const [showSettings, setShowSettings] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showProPlans, setShowProPlans] = useState(false);
  const [showShareButton, setShowShareButton] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  
  // Voice Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<any>(null);

  // Wizards States
  const [showDownloadWizard, setShowDownloadWizard] = useState(false);
  const [showTutorialWizard, setShowTutorialWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [tutorialStep, setTutorialStep] = useState(1);
  
  const [whatsappLog, setWhatsappLog] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  const [selectedFiles, setSelectedFiles] = useState<{data: string, mimeType: string, name: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sound Engine (Mario Style)
  const playSound = (type: 'click' | 'success' | 'popup' | 'finish' | 'share' | 'coin' | 'jump' | 'powerup' | 'stomp' | 'mic-on' | 'mic-off') => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'mic-on') {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'mic-off') {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'coin') {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.1); // E6
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'jump') {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'powerup') {
        [440, 554.37, 659.25, 880].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.05, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.2);
          osc.connect(gain);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.2);
        });
      } else if (type === 'stomp') {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'click') {
        const osc = ctx.createOscillator();
        osc.connect(gain);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'success') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.connect(gain);
        osc2.connect(gain);
        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now);
        osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3);
        osc2.frequency.setValueAtTime(261.63, now);
        osc2.frequency.exponentialRampToValueAtTime(523.25, now + 0.3);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.3);
        osc2.stop(now + 0.3);
      } else if (type === 'popup') {
        const osc = ctx.createOscillator();
        osc.connect(gain);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'finish') {
        const osc = ctx.createOscillator();
        osc.connect(gain);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'share') {
        const osc = ctx.createOscillator();
        osc.connect(gain);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {
      console.warn("Audio Context error", e);
    }
  };

  // Recording Logic
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Audio = (reader.result as string).split(',')[1];
          setSelectedFiles(prev => [...prev, { 
            data: base64Audio, 
            mimeType: 'audio/webm', 
            name: `Consulta de Voz ${new Date().toLocaleTimeString()}.webm` 
          }]);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      playSound('mic-on');
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("No se pudo acceder al micrófono.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
      playSound('mic-off');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto-start Tutorial on Login
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem(`tutorial_seen_${user.email}`);
    if (!hasSeenTutorial) {
      setTimeout(() => {
        setShowTutorialWizard(true);
        playSound('powerup');
      }, 800);
    }
  }, [user.email]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };
    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior
      });
      setUnreadCount(0);
      setIsAtBottom(true);
    }
  }, []);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const atBottom = scrollHeight - scrollTop - clientHeight < 100;
    setIsAtBottom(atBottom);
    if (atBottom) setUnreadCount(0);
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;
    if (lastMessage.role === 'user' || isAtBottom) {
      setTimeout(() => scrollToBottom('smooth'), 50);
    } else {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages, scrollToBottom, isAtBottom]);

  const checkBalance = () => {
    const today = new Date().toDateString();
    const deviceLastFreeDate = localStorage.getItem('device_last_free_date');
    if (user.queriesBalance > 0) return true;
    if (user.lastFreeQueryDate === today) return false;
    if (deviceLastFreeDate === today) return false;
    return true;
  };

  const handleSend = async () => {
    if ((!input.trim() && selectedFiles.length === 0) || isLoading) return;
    if (!checkBalance()) {
      setShowProPlans(true);
      return;
    }
    const currentInput = input;
    const currentFiles = [...selectedFiles];
    const historyForApi = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    
    let userMsgText = currentInput;
    const hasAudio = currentFiles.some(f => f.mimeType.includes('audio'));
    
    if (!userMsgText && currentFiles.length > 0) {
      userMsgText = hasAudio 
        ? `Consulta por voz analizada.` 
        : `Analiza estas ${currentFiles.length} capturas. Realiza validación de autenticidad y orden cronológico.`;
    }

    const userMsg: ChatMessage = { 
      role: 'user', 
      text: userMsgText, 
      timestamp: new Date(), 
      files: currentFiles.length > 0 ? currentFiles : undefined 
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedFiles([]);
    setIsLoading(true);
    setShowShareButton(false);

    if (currentFiles.length > 0) {
      setIsAnalyzingFile(true);
      setAnalysisProgress(0);
      setAnalysisStatus(hasAudio ? "Procesando audio forense..." : (currentFiles.length > 1 ? "Ordenando capturas cronológicamente..." : "Iniciando análisis forense..."));
    }

    let analysisInterval: any;
    if (currentFiles.length > 0) {
      analysisInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 98) return 98;
          const next = prev + Math.random() * 8;
          
          if (hasAudio) {
            setAnalysisStatus(next < 25 ? "Extrayendo ondas..." : next < 50 ? "Analizando entonación..." : next < 75 ? "Detectando micro-temblores..." : "Validando metadatos...");
          } else if (currentFiles.length > 1) {
            setAnalysisStatus(next < 25 ? "Validando interfaz de Instagram..." : next < 50 ? "Reconstruyendo cronología..." : next < 75 ? "Analizando coherencia visual..." : "Validando metadatos...");
          } else {
            setAnalysisStatus(next < 25 ? "Escaneando..." : next < 50 ? "Patrones visuales..." : next < 75 ? "Carga emocional..." : "Validando...");
          }
          
          return next > 98 ? 98 : next;
        });
      }, 300);
    }

    try {
      const responseText = await getSupportResponse(currentInput, historyForApi, currentFiles.length > 0 ? currentFiles : undefined);
      if (currentFiles.length > 0) {
        clearInterval(analysisInterval);
        setAnalysisProgress(100);
        await new Promise(r => setTimeout(r, 400));
      }
      setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
      setShowShareButton(true);
      if (user.queriesBalance <= 0) onUpdateBalance(user.queriesBalance, true);
      else onUpdateBalance(user.queriesBalance - 1);
    } finally {
      setIsLoading(false);
      setIsAnalyzingFile(false);
      setAnalysisProgress(0);
    }
  };

  const handleWhatsAppAnalysis = async () => {
    if (!whatsappLog.trim() || isLoading) return;
    if (!checkBalance()) {
      setShowProPlans(true);
      return;
    }
    
    const logToAnalyze = whatsappLog;
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: "Analizando registro de chat proporcionado.", 
      timestamp: new Date() 
    }]);
    setWhatsappLog('');
    setIsLoading(true);
    setShowShareButton(false);

    try {
      const responseText = await analyzeWhatsAppLog(logToAnalyze);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: responseText || "El análisis no devolvió resultados claros.", 
        timestamp: new Date() 
      }]);
      setShowShareButton(true);
      
      if (user.queriesBalance <= 0) onUpdateBalance(user.queriesBalance, true);
      else onUpdateBalance(user.queriesBalance - 1);
    } catch (error) {
      console.error("Analysis Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Error al procesar el log. Intenta de nuevo más tarde.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadProgress(0);
    playSound('popup');
    const duration = 1500;
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, duration / steps));
      setDownloadProgress(i);
    }
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("lovly.pro - Reporte Forense Affective", 20, 20);
      doc.setFontSize(10);
      doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 30);
      doc.line(20, 35, 190, 35);
      let yOffset = 45;
      messages.forEach((m) => {
        if (yOffset > 270) { doc.addPage(); yOffset = 20; }
        doc.setFont("helvetica", "bold");
        doc.text(m.role === 'user' ? 'TÚ:' : 'LOVLY:', 20, yOffset);
        doc.setFont("helvetica", "normal");
        const lines = doc.splitTextToSize(m.text, 160);
        doc.text(lines, 35, yOffset);
        yOffset += (lines.length * 5) + 8;
      });
      doc.save(`lovly-backup-${Date.now()}.pdf`);
      setIsDownloading(false);
      setWizardStep(1);
      setShowDownloadWizard(true);
      playSound('success');
    } catch (e) { setIsDownloading(false); }
  };

  const handleShare = async () => {
    playSound('share');
    const shareUrl = 'https://www.lovly.pro';
    const shareText = 'prueba lovly.pro para analizar el comportamiento real de tu pareja.';
    const shareData = { title: 'lovly.pro', text: shareText, url: shareUrl };

    try {
      if (navigator.share) await navigator.share(shareData);
      else throw new Error('Web Share not supported');
    } catch (err) {
      try {
        const textToCopy = `${shareText} ${shareUrl}`;
        await navigator.clipboard.writeText(textToCopy);
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 3000);
      } catch (clipErr) {
        const text = `${shareText} ${shareUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      }
    }
  };

  const handleResetChat = () => {
    playSound('stomp');
    setMessages([{ 
      role: 'model', 
      text: 'Bienvenido a lovly.pro cuéntame ¿que te pasó?, también puedes analizar estados de WhatsApp, Instagram, fotos y conversaciones.', 
      timestamp: new Date() 
    }]);
    setInput('');
    setSelectedFiles([]);
    setWhatsappLog('');
    setShowSettings(false);
  };

  const nextWizardStep = () => {
    playSound('jump');
    setWizardStep(prev => prev + 1);
  };

  const nextTutorialStep = () => {
    playSound('coin');
    setTutorialStep(prev => prev + 1);
  };

  const closeWizard = () => {
    playSound('powerup');
    setShowDownloadWizard(false);
  };

  const closeTutorial = () => {
    playSound('powerup');
    localStorage.setItem(`tutorial_seen_${user.email}`, 'true');
    setShowTutorialWizard(false);
    setTutorialStep(1);
  };

  const removeFile = (index: number) => {
    playSound('stomp');
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    playSound('coin');
    
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (result) {
          const base64String = result.split(',')[1];
          setSelectedFiles(prev => [...prev, { data: base64String, mimeType: file.type, name: file.name }]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const fontSizeClasses: Record<FontSize, string> = { 'xs': 'text-xs', 'sm': 'text-sm', 'base': 'text-base', 'lg': 'text-lg', 'xl': 'text-xl' };

  const tutorialData = [
    {
      title: "Bienvenido a lovly.pro",
      text: "Soy tu asistente analítico de inteligencia forense afectiva. Estoy aquí para mostrarte la verdad, sin filtros.",
      icon: "fa-robot",
      color: "bg-[#4285F4]"
    },
    {
      title: "Análisis de WhatsApp",
      text: "Usa el icono de WhatsApp arriba para pegar logs. Analizo tiempos, interés y señales de manipulación.",
      icon: "fa-whatsapp",
      color: "bg-[#34A853]"
    },
    {
      title: "Capturas Instagram",
      text: "Usa el icono de Instagram para subir capturas. Las ordenaré cronológicamente y buscaré patrones de desinterés.",
      icon: "fa-instagram",
      color: "bg-[#E1306C]"
    },
    {
      title: "Recuperación con PDF",
      text: "Descarga el reporte para no perder el contexto. Si lo subes en tu próxima sesión, recordaré todo lo hablado.",
      icon: "fa-file-pdf",
      color: "bg-[#EA4335]"
    },
    {
      title: "Consultas Pro",
      text: "Cada mensaje usa potencia de Gemini 3. Tus créditos Pro aseguran que nada escape a nuestro radar táctico.",
      icon: "fa-bolt",
      color: "bg-[#FBBC05]"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#121212] relative overflow-hidden transition-colors duration-300">
      {showProPlans && <ProPlans onSelectPlan={(q) => { onUpdateBalance(user.queriesBalance + q); setShowProPlans(false); }} onClose={() => setShowProPlans(false)} />}
      
      {showShareButton && (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end space-y-2 animate-fadeIn">
          {copyStatus && (
            <div className="bg-[#34A853] text-white text-[10px] font-black py-2 px-4 rounded-full shadow-lg animate-bounce uppercase tracking-widest">
              ¡Enlace Copiado!
            </div>
          )}
          <div className="relative group">
            <button onClick={handleShare} className="bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2 transform transition-transform hover:scale-110 active:scale-95 border-2 border-white/50">
              <i className="fas fa-user-plus text-sm"></i>
              <span className="text-xs font-black uppercase tracking-widest">Invitar a un amigo</span>
            </button>
            <button onClick={() => { playSound('click'); setShowShareButton(false); }} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-lg border-2 border-white hover:bg-red-600 transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Tutorial Wizard (MARIO STYLE) */}
      {showTutorialWizard && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-3xl p-6 animate-fadeIn">
          <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-lg rounded-[48px] shadow-3xl overflow-hidden animate-popIn border-8 border-yellow-400 dark:border-yellow-600 relative">
            {/* Retro Question Mark Accents */}
            <div className="absolute top-4 left-4 text-yellow-400 opacity-20 text-4xl font-black">?</div>
            <div className="absolute bottom-4 right-4 text-yellow-400 opacity-20 text-4xl font-black">?</div>
            
            <div className="p-12 flex flex-col items-center text-center">
              <div className="relative mb-10 scale-125">
                <div className={`absolute inset-0 ${tutorialData[tutorialStep-1].color} opacity-20 blur-3xl rounded-full animate-pulse`}></div>
                <div className={`relative w-28 h-28 ${tutorialData[tutorialStep-1].color} text-white rounded-[38px] flex items-center justify-center text-5xl shadow-2xl transform transition-all duration-700 hover:rotate-12 ring-4 ring-white/50`}>
                   <i className={`fas ${tutorialData[tutorialStep-1].icon} ${tutorialStep % 2 === 0 ? 'animate-bounce' : 'animate-pulse'}`}></i>
                </div>
              </div>
              
              <div className="flex space-x-2 mb-10">
                {tutorialData.map((_, s) => (
                  <div key={s} className={`h-3 rounded-full transition-all duration-500 border border-gray-300 dark:border-gray-600 ${tutorialStep === s + 1 ? 'w-10 bg-yellow-400 shadow-[0_0_10px_rgba(251,188,5,0.8)]' : 'w-3 bg-gray-200 dark:bg-[#3c4043]'}`}></div>
                ))}
              </div>
              
              <div className="min-h-[200px] flex flex-col justify-center px-4">
                <div className="animate-slideInRight">
                  <h2 className="text-3xl font-black text-[#202124] dark:text-white leading-tight mb-4 uppercase tracking-tighter">
                    {tutorialData[tutorialStep-1].title}
                  </h2>
                  <p className="text-xl text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed font-medium">
                    {tutorialData[tutorialStep-1].text}
                  </p>
                </div>
              </div>
              
              <div className="w-full mt-12">
                {tutorialStep < tutorialData.length ? (
                  <button onClick={nextTutorialStep} className="w-full py-6 bg-[#4285F4] text-white rounded-3xl text-2xl font-black shadow-2xl hover:bg-[#1a73e8] active:scale-95 transition-all flex items-center justify-center space-x-4 border-b-8 border-[#1967D2]">
                    <span>¡VAMOS!</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                ) : (
                  <button onClick={closeTutorial} className="w-full py-6 bg-[#34A853] text-white rounded-3xl text-2xl font-black shadow-2xl hover:bg-[#2d8e47] active:scale-95 transition-all border-b-8 border-[#1e7e34]">
                    ¡QUE COMIENCE EL JUEGO!
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showDownloadWizard && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-2xl p-6 animate-fadeIn">
          <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-lg rounded-[48px] shadow-3xl overflow-hidden animate-popIn border border-white/30 dark:border-white/10">
            <div className="p-12 flex flex-col items-center text-center">
              <div className="relative mb-10 scale-125">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
                <div className="relative w-28 h-28 bg-gradient-to-br from-[#4285F4] to-[#1a73e8] text-white rounded-[38px] flex items-center justify-center text-5xl shadow-2xl transform transition-all duration-700 hover:scale-110">
                   {wizardStep === 1 && <i className="fas fa-check-circle animate-bounce"></i>}
                   {wizardStep === 2 && <i className="fas fa-user-shield animate-pulse"></i>}
                   {wizardStep === 3 && <i className="fas fa-file-import animate-bounce"></i>}
                   {wizardStep === 4 && <i className="fas fa-microchip animate-spin-slow"></i>}
                </div>
              </div>
              <div className="flex space-x-3 mb-10">
                {[1, 2, 3, 4].map(s => <div key={s} className={`h-2 rounded-full transition-all duration-500 ${wizardStep === s ? 'w-12 bg-[#4285F4]' : 'w-2 bg-gray-200 dark:bg-[#3c4043]'}`}></div>)}
              </div>
              <div className="min-h-[280px] flex flex-col justify-center px-4">
                {wizardStep === 1 && <div className="animate-slideInRight"><h2 className="text-4xl font-black text-[#202124] dark:text-white leading-tight mb-6">¡Descarga Exitosa!</h2><p className="text-2xl text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed font-medium">Tu reporte forense ya está a salvo en tu dispositivo.</p></div>}
                {wizardStep === 2 && <div className="animate-slideInRight"><h2 className="text-4xl font-black text-[#202124] dark:text-white leading-tight mb-6">Seguridad Máxima</h2><p className="text-2xl text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed font-medium">No guardamos nada en la nube. Este PDF es tu única copia privada.</p></div>}
                {wizardStep === 3 && <div className="animate-slideInRight"><h2 className="text-4xl font-black text-[#202124] dark:text-white leading-tight mb-6">Uso Táctico</h2><p className="text-2xl text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed font-medium">En tu próxima sesión, carga este PDF para que yo recuerde todo nuestro progreso.</p></div>}
                {wizardStep === 4 && <div className="animate-slideInRight"><h2 className="text-4xl font-black text-[#202124] dark:text-white leading-tight mb-6">Continuidad Total</h2><p className="text-2xl text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed font-medium">La IA analizará el PDF y seguirá nuestra asesoría justo donde la dejamos hoy.</p></div>}
              </div>
              <div className="w-full mt-12">
                {wizardStep < 4 ? <button onClick={nextWizardStep} className="w-full py-6 bg-[#4285F4] text-white rounded-3xl text-2xl font-black shadow-2xl hover:bg-[#1a73e8] active:scale-95 transition-all flex items-center justify-center space-x-4"><span>Siguiente</span><i className="fas fa-chevron-right"></i></button> : <button onClick={closeWizard} className="w-full py-6 bg-[#34A853] text-white rounded-3xl text-2xl font-black shadow-2xl hover:bg-[#2d8e47] active:scale-95 transition-all">¡Entendido!</button>}
              </div>
            </div>
          </div>
        </div>
      )}

      {showAnalysisModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-popIn p-8">
            <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-[#202124] dark:text-white">Analizador de Chat</h2><button onClick={() => setShowAnalysisModal(false)} className="text-gray-400 text-3xl">&times;</button></div>
            <textarea value={whatsappLog} onChange={(e) => setWhatsappLog(e.target.value)} placeholder="Pega el log aquí..." className="w-full h-64 bg-[#f8f9fa] dark:bg-[#2d2d2d] border border-[#dadce0] dark:border-[#3c4043] rounded-2xl p-4 text-xs dark:text-[#e8eaed] focus:ring-2 focus:ring-[#34A853] focus:outline-none mb-6 resize-none" />
            <div className="flex space-x-3"><button onClick={() => setShowAnalysisModal(false)} className="flex-1 py-3.5 rounded-2xl bg-gray-100 dark:bg-[#2d2d2d] text-gray-600 dark:text-gray-300 font-bold">Cancelar</button><button onClick={() => { handleWhatsAppAnalysis(); setShowAnalysisModal(false); }} disabled={!whatsappLog.trim() || isLoading} className="flex-1 py-3.5 rounded-2xl bg-[#34A853] text-white font-bold shadow-lg hover:bg-[#2d8e47] transition-all">Analizar</button></div>
          </div>
        </div>
      )}

      {isDownloading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-[280px] rounded-3xl p-8 flex flex-col items-center shadow-2xl">
            <div className="relative w-20 h-20 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100 dark:text-[#3c4043]" />
                <circle cx="40" cy="40" r="36" stroke="#4285F4" strokeWidth="4" strokeDasharray={226} strokeDashoffset={226 - (226 * downloadProgress) / 100} strokeLinecap="round" fill="transparent" className="transition-all duration-100" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-[#202124] dark:text-white">{downloadProgress}%</div>
            </div>
            <h3 className="text-sm font-bold text-[#202124] dark:text-white uppercase tracking-widest mb-1">Exportando</h3>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 z-40 flex space-x-2 items-start" ref={settingsRef}>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex space-x-2">
            <button onClick={() => { playSound('coin'); setShowTutorialWizard(true); }} title="Tutorial Interactivo" className="w-10 h-10 rounded-full bg-white dark:bg-[#1e1e1e] shadow-md border border-gray-100 dark:border-[#3c4043] flex items-center justify-center text-[#FBBC05] hover:scale-110 transition-transform">
              <i className="fas fa-question-circle text-lg"></i>
            </button>
            <button onClick={() => { playSound('coin'); setShowProPlans(true); }} title="Ver Planes Pro" className="w-10 h-10 rounded-full bg-white dark:bg-[#1e1e1e] shadow-md border border-gray-100 dark:border-[#3c4043] flex items-center justify-center text-[#FBBC05] hover:scale-110 transition-transform border-yellow-400">
              <i className="fas fa-crown text-lg"></i>
            </button>
            <button onClick={() => { playSound('click'); setShowAnalysisModal(true); }} title="Analizar WhatsApp" className="w-10 h-10 rounded-full bg-white dark:bg-[#1e1e1e] shadow-md border border-gray-100 dark:border-[#3c4043] flex items-center justify-center text-[#34A853] hover:scale-110 transition-transform">
              <i className="fab fa-whatsapp"></i>
            </button>
            <button onClick={() => { playSound('click'); fileInputRef.current?.click(); }} title="Subir capturas Instagram" className="w-10 h-10 rounded-full bg-white dark:bg-[#1e1e1e] shadow-md border border-gray-100 dark:border-[#3c4043] flex items-center justify-center text-[#E1306C] hover:scale-110 transition-transform">
              <i className="fab fa-instagram text-lg"></i>
            </button>
            <button onClick={() => { playSound('click'); handleDownloadPDF(); }} disabled={isDownloading} title="Descargar" className="w-10 h-10 rounded-full bg-white dark:bg-[#1e1e1e] shadow-md border border-gray-100 dark:border-[#3c4043] flex items-center justify-center text-[#4285F4] hover:scale-110 transition-transform">
              <i className="fas fa-download"></i>
            </button>
            <button onClick={() => { playSound('click'); setShowSettings(!showSettings); }} title="Ajustes" className={`w-10 h-10 rounded-full shadow-md border flex items-center justify-center transition-all ${showSettings ? 'bg-[#4285F4] text-white border-transparent' : 'bg-white dark:bg-[#1e1e1e] text-[#5f6368] dark:text-[#9aa0a6] border-gray-100 dark:border-[#3c4043]'}`}>
              <i className="fas fa-cog"></i>
            </button>
          </div>
          {showSettings && (
            <div className="bg-white dark:bg-[#1e1e1e] w-48 rounded-2xl shadow-xl border border-[#dadce0] dark:border-[#3c4043] p-4 animate-popIn">
              <span className="text-[10px] font-bold text-[#70757a] dark:text-[#9aa0a6] uppercase tracking-widest block mb-2">Letra</span>
              <div className="flex justify-between bg-[#f8f9fa] dark:bg-[#2d2d2d] p-1 rounded-lg mb-4">
                {(['xs', 'sm', 'base', 'lg'] as FontSize[]).map(s => <button key={s} onClick={() => { playSound('click'); setFontSize(s); }} className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${fontSize === s ? 'bg-white dark:bg-[#4285F4] text-[#4285F4] dark:text-white shadow-sm' : 'text-gray-400'}`}>{s.toUpperCase()}</button>)}
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-[#3c4043] flex flex-col space-y-1">
                <button onClick={handleResetChat} className="w-full flex items-center justify-between text-xs font-bold text-red-500 dark:text-red-400 p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"><span>Reiniciar chat</span><i className="fas fa-trash-alt"></i></button>
                <button onClick={() => { playSound('click'); toggleDarkMode?.(); }} className="w-full flex items-center justify-between text-xs font-bold text-[#3c4043] dark:text-[#e8eaed] p-2 hover:bg-[#f8f9fa] dark:hover:bg-[#2d2d2d] rounded-xl transition-all"><span>{isDarkMode ? 'Claro' : 'Oscuro'}</span><i className={`fas ${isDarkMode ? 'fa-sun text-[#FBBC05]' : 'fa-moon text-[#4285F4]'}`}></i></button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-4 pt-20 pb-6 space-y-6 bg-white dark:bg-[#121212] transition-colors duration-300">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex items-start space-x-3 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse animate-slideInRight' : 'flex-row animate-slideInLeft'}`}>
            <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] text-white shadow-sm ${m.role === 'user' ? 'bg-[#4285F4]' : 'bg-[#34A853]'}`}>{m.role === 'user' ? <i className="fas fa-user"></i> : <i className="fas fa-robot"></i>}</div>
            <div className={`max-w-[80%] flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-5 py-3.5 rounded-2xl shadow-sm border ${fontSizeClasses[fontSize]} ${m.role === 'user' ? 'bg-[#E8F0FE] dark:bg-[#1a2b4d] text-[#1967D2] dark:text-[#8ab4f8] rounded-tr-none border-[#D2E3FC] dark:border-[#1a73e8]' : 'bg-[#F8F9FA] dark:bg-[#1e1e1e] text-[#3C4043] dark:text-[#e8eaed] rounded-tl-none border-[#DADCE0] dark:border-[#3c4043]'}`}>
                {m.files && m.files.length > 0 && (
                  <div className="mb-3 grid grid-cols-2 gap-2">
                    {m.files.map((file, fIdx) => (
                      <div key={fIdx} className="overflow-hidden rounded-2xl border border-white/50 shadow-sm transition-transform hover:scale-[1.02]">
                        {file.mimeType.includes('pdf') ? (
                          <div className="bg-red-50 dark:bg-red-900/10 p-4 flex items-center space-x-3 min-w-[120px]">
                            <i className="fas fa-file-pdf text-red-500 text-xl"></i>
                            <div><p className="text-[8px] font-bold text-red-600 truncate max-w-[60px]">{file.name}</p></div>
                          </div>
                        ) : file.mimeType.includes('audio') ? (
                          <div className="bg-blue-50 dark:bg-blue-900/10 p-4 flex items-center space-x-3 min-w-[120px]">
                            <i className="fas fa-microphone text-blue-500 text-xl"></i>
                            <div><p className="text-[8px] font-bold text-blue-600 truncate max-w-[60px]">{file.name}</p></div>
                          </div>
                        ) : (
                          <img src={`data:${file.mimeType};base64,${file.data}`} alt="Analysis" className="w-full h-24 object-cover cursor-zoom-in" onClick={() => window.open(`data:${file.mimeType};base64,${file.data}`, '_blank')} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                <div className="flex justify-end mt-2 opacity-30"><span className="text-[9px] font-bold">{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-start space-y-3 animate-slideInLeft">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#34A853] flex items-center justify-center text-white text-[10px] shadow-sm"><i className="fas fa-robot"></i></div>
              <div className="bg-[#F8F9FA] dark:bg-[#1e1e1e] rounded-full px-6 py-3 border border-[#DADCE0] dark:border-[#3c4043] flex space-x-2 items-center">
                <div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-[#FBBC05] rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
            {isAnalyzingFile && (
              <div className="ml-12 w-full max-w-[200px]">
                <div className="flex justify-between mb-1"><span className="text-[9px] font-bold text-[#4285F4] uppercase tracking-tighter">{analysisStatus}</span><span className="text-[9px] font-black text-[#70757a]">{Math.round(analysisProgress)}%</span></div>
                <div className="w-full h-1 bg-gray-100 dark:bg-[#3c4043] rounded-full overflow-hidden"><div className="h-full bg-[#4285F4] transition-all duration-300" style={{ width: `${analysisProgress}%` }}></div></div>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedFiles.length > 0 && !isLoading && (
        <div className="px-6 py-4 bg-[#F8F9FA] dark:bg-[#1e1e1e] border-t border-gray-200 dark:border-[#3c4043] transition-colors overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            {selectedFiles.map((file, idx) => (
              <div key={idx} className="relative flex-shrink-0 group">
                {file.mimeType.includes('pdf') ? (
                  <div className="h-16 w-16 bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-400 flex flex-col items-center justify-center text-red-500 shadow-md">
                    <i className="fas fa-file-pdf text-xl mb-1"></i>
                    <span className="text-[8px] font-bold uppercase">PDF</span>
                  </div>
                ) : file.mimeType.includes('audio') ? (
                  <div className="h-16 w-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-400 flex flex-col items-center justify-center text-blue-500 shadow-md">
                    <i className="fas fa-microphone text-xl mb-1"></i>
                    <span className="text-[8px] font-bold uppercase">VOZ</span>
                  </div>
                ) : (
                  <img src={`data:${file.mimeType};base64,${file.data}`} className="h-16 w-16 object-cover rounded-xl border-2 border-[#4285F4] shadow-md group-hover:brightness-90 transition-all" />
                )}
                <button onClick={() => removeFile(idx)} className="absolute -top-2 -right-2 bg-[#EA4335] text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-lg hover:scale-110 transition-transform"><i className="fas fa-times"></i></button>
              </div>
            ))}
            {selectedFiles.length > 0 && (
              <div className="flex flex-col justify-center min-w-[120px]">
                <p className="text-[10px] font-bold text-[#4285F4] uppercase tracking-widest">{selectedFiles.length} ARCHIVOS</p>
                <p className="text-[8px] text-gray-500 dark:text-[#9aa0a6] uppercase font-bold">ORDENACIÓN TÁCTICA ACTIVA</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recording Overlay UI */}
      {isRecording && (
        <div className="px-6 py-4 bg-red-50 dark:bg-red-900/10 border-t border-red-100 dark:border-red-900/30 transition-all animate-fadeIn flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">Grabando Consulta Forense...</span>
           </div>
           <div className="flex items-center space-x-4">
              <span className="text-lg font-black font-mono text-red-600 dark:text-red-400">{formatTime(recordingTime)}</span>
              <button onClick={stopRecording} className="bg-red-600 text-white px-5 py-1.5 rounded-full font-bold text-[10px] uppercase shadow-lg transition-all hover:bg-red-700 active:scale-95">Finalizar</button>
           </div>
        </div>
      )}

      <div className="p-4 bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-[#3c4043] flex-shrink-0 z-40">
        <div className="relative flex items-end max-w-md mx-auto group bg-[#F1F3F4] dark:bg-[#303134] rounded-[24px] px-3 py-2 focus-within:bg-white dark:focus-within:bg-[#3c4043] focus-within:ring-4 focus-within:ring-blue-50 transition-all">
          <input type="file" accept="image/*,application/pdf" multiple className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          <button onClick={() => { playSound('click'); fileInputRef.current?.click(); }} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#4285F4] rounded-full transition-all" disabled={isLoading || isRecording}><i className="fas fa-plus-circle text-xl"></i></button>
          
          {/* Microphone Icon Button */}
          {!isRecording ? (
            <button onClick={startRecording} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#EA4335] rounded-full transition-all" disabled={isLoading}><i className="fas fa-microphone text-xl"></i></button>
          ) : (
            <div className="w-10 h-10"></div> // Space for recorder icon placeholder
          )}

          <textarea ref={textAreaRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); playSound('click'); } }} placeholder={isRecording ? "Escuchando..." : "Escribir consulta..."} rows={1} className="flex-1 bg-transparent border-none py-2.5 px-3 text-sm dark:text-[#e8eaed] focus:outline-none resize-none max-h-40 overflow-y-auto" disabled={isLoading || isRecording} />
          <button onClick={() => { playSound('click'); handleSend(); }} disabled={(!input.trim() && selectedFiles.length === 0) || isLoading || isRecording} className={`w-11 h-11 flex items-center justify-center rounded-full transition-all ${(input.trim() || selectedFiles.length > 0) && !isLoading ? 'bg-[#4285F4] text-white shadow-lg' : 'text-gray-300'}`}>{isLoading ? <i className="fas fa-circle-notch animate-spin text-xs"></i> : <i className="fas fa-paper-plane text-xs"></i>}</button>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
