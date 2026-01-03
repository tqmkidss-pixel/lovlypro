
import React from 'react';

interface ProPlansProps {
  onSelectPlan: (queries: number) => void;
  onClose: () => void;
}

const ProPlans: React.FC<ProPlansProps> = ({ onSelectPlan, onClose }) => {
  const plans = [
    { name: 'Mini', price: '3€', queries: 5, color: 'text-[#4285F4]', bg: 'bg-[#E8F0FE]', description: 'Para un análisis rápido' },
    { name: 'Standard', price: '9€', queries: 30, color: 'text-[#34A853]', bg: 'bg-[#E6F4EA]', description: 'El más popular', popular: true },
    { name: 'Ultra', price: '19€', queries: 100, color: 'text-[#FBBC05]', bg: 'bg-[#FEF7E0]', description: 'Análisis sin límites' }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-lg rounded-[32px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-popIn">
        {/* Header fijo para no perder el botón de cerrar al hacer scroll */}
        <div className="p-8 pb-4 flex justify-between items-start flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-[#202124] dark:text-white">Hazte Pro</h2>
            <p className="text-sm text-[#70757a] dark:text-[#9aa0a6] mt-1">Has agotado tus consultas gratuitas. Elige un plan para continuar.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-3xl leading-none">&times;</button>
        </div>

        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto p-8 pt-0 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-[#3c4043]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative flex flex-col p-5 rounded-2xl border border-[#dadce0] dark:border-[#3c4043] hover:border-[#4285F4] transition-all cursor-pointer group ${plan.popular ? 'ring-2 ring-[#4285F4] border-transparent shadow-lg shadow-blue-100 dark:shadow-none' : ''}`}
                onClick={() => onSelectPlan(plan.queries)}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4285F4] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter z-10">Recomendado</span>
                )}
                <div className={`${plan.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0`}>
                  <i className={`fas fa-bolt ${plan.color}`}></i>
                </div>
                <h3 className="text-lg font-bold text-[#202124] dark:text-white">{plan.name}</h3>
                <p className="text-[10px] font-bold text-[#70757a] dark:text-[#9aa0a6] uppercase tracking-widest mt-1 mb-4">{plan.description}</p>
                
                <div className="mt-auto">
                  <div className="mb-1">
                    <span className="text-3xl font-black text-[#202124] dark:text-white">{plan.price}</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#4285F4] mb-4">
                    {plan.queries} Consultas
                  </div>

                  <button className="w-full py-2.5 rounded-xl bg-[#f8f9fa] dark:bg-[#2d2d2d] group-hover:bg-[#4285F4] group-hover:text-white text-[#202124] dark:text-white text-xs font-bold transition-all border border-[#dadce0] dark:border-[#3c4043] group-hover:border-transparent">
                    Elegir
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-[#3c4043] flex flex-col items-center">
            <p className="text-[10px] text-[#70757a] dark:text-[#9aa0a6] font-medium flex items-center">
              <i className="fas fa-lock mr-2"></i> Pago seguro mediante SSL • Créditos sin caducidad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProPlans;
