
import React from 'react';
import { UserState, Entry } from '../types';
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';

interface DashboardProps {
  state: UserState;
  entries: Entry[];
}

const Dashboard: React.FC<DashboardProps> = ({ state, entries }) => {
  const chartData = entries.slice(-10).map(e => ({
    time: new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    val: e.intensity
  }));

  return (
    <div className="space-y-6 pb-10 bg-white">
      {/* Minimal Paradigm Card */}
      <div className="bg-white border border-[#dadce0] rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <div className="w-2 h-2 bg-[#34A853] rounded-full animate-pulse"></div>
        </div>
        <span className="text-[11px] font-medium text-[#70757a] uppercase tracking-wider mb-2 block">Estado actual</span>
        <h2 className="text-2xl font-semibold text-[#202124] tracking-tight">
          {state.currentParadigm || 'En espera'}
        </h2>
        
        <div className="mt-6 flex items-baseline space-x-2">
          <span className="text-4xl font-bold text-[#4285F4]">{state.lastIntensity}%</span>
          <span className="text-xs font-medium text-[#70757a]">Nivel de impacto</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white border border-[#dadce0] rounded-2xl p-5 shadow-sm">
        <h3 className="text-xs font-semibold text-[#3c4043] mb-4">Actividad reciente</h3>
        <div className="h-[180px] w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4285F4" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4285F4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#fff', border: '1px solid #dadce0', borderRadius: '8px', fontSize: '11px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="val" 
                  stroke="#4285F4" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorVal)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-[#bdc1c6]">
              <i className="fas fa-chart-area text-3xl mb-2"></i>
              <span className="text-[10px] uppercase font-bold tracking-widest">Sin datos</span>
            </div>
          )}
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-bold text-[#70757a] uppercase tracking-widest pl-1">Historial</h3>
        {entries.slice().reverse().map(entry => (
          <div key={entry.id} className="bg-white border border-[#dadce0] p-4 rounded-xl flex items-center justify-between hover:bg-[#f8f9fa] transition-all group">
            <div className="flex flex-col space-y-0.5">
              <span className="text-sm text-[#3c4043] font-medium">"{entry.narrative}"</span>
              <span className="text-[10px] text-[#70757a] flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05] mr-2"></span>
                {entry.vibe} • {new Date(entry.timestamp).toLocaleDateString()}
              </span>
            </div>
            <div className="text-lg font-bold text-[#dadce0] group-hover:text-[#4285F4] transition-all">
              {entry.intensity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
