
import React, { useState } from 'react';
import { Vibe, Entry } from '../types';

interface CheckInFormProps {
  onSave: (entry: Entry) => void;
  onCancel: () => void;
}

const CheckInForm: React.FC<CheckInFormProps> = ({ onSave, onCancel }) => {
  const [vibe, setVibe] = useState<Vibe>(Vibe.LUCID);
  const [intensity, setIntensity] = useState(50);
  const [narrative, setNarrative] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      vibe,
      intensity,
      narrative
    });
  };

  const getVibeColor = (v: Vibe) => {
    switch(v) {
      case Vibe.LUCID: return 'bg-[#4285F4]';
      case Vibe.DEVOTED: return 'bg-[#EA4335]';
      case Vibe.MAGNETIC: return 'bg-[#FBBC05]';
      case Vibe.OBSESSED: return 'bg-[#34A853]';
      default: return 'bg-gray-500';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#dadce0] rounded-2xl p-8 space-y-8 animate-fadeIn shadow-lg max-w-md mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-medium text-[#202124]">Nueva entrada</h3>
        <p className="text-[11px] text-[#70757a] font-medium uppercase tracking-widest mt-1">Sincronización</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {Object.values(Vibe).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVibe(v)}
            className={`py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${
              vibe === v 
                ? `${getVibeColor(v)} border-transparent text-white shadow-md` 
                : 'bg-white border-[#dadce0] text-[#70757a] hover:bg-[#f8f9fa]'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-[11px] font-bold text-[#70757a] uppercase tracking-widest">
          <span>Intensidad</span>
          <span className="text-[#4285F4]">{intensity}%</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="100" 
          value={intensity}
          onChange={(e) => setIntensity(parseInt(e.target.value))}
          className="w-full h-1.5 bg-[#f1f3f4] rounded-lg appearance-none cursor-pointer accent-[#4285F4]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-bold text-[#70757a] uppercase tracking-widest">Observaciones</label>
        <textarea
          value={narrative}
          onChange={(e) => setNarrative(e.target.value)}
          placeholder="Describe la situación..."
          className="w-full bg-white border border-[#dadce0] rounded-xl p-4 text-sm text-[#3c4043] placeholder:text-[#bdc1c6] focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] min-h-[100px] transition-all"
        ></textarea>
      </div>

      <div className="flex space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 text-sm font-medium text-[#70757a] hover:bg-[#f8f9fa] rounded-lg transition-colors border border-[#dadce0]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 py-3 rounded-lg text-sm font-medium text-white bg-[#4285F4] hover:bg-[#1a73e8] shadow-md transition-all"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default CheckInForm;
