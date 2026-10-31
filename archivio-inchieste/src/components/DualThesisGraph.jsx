"use client";
import React, { useState } from 'react';

export default function DualThesisGraph() {
  // Stati per la gestione della tesi attiva e dell'ingrandimento
  const [activeThesis, setActiveThesis] = useState('giudiziaria');
  const [isExpanded, setIsExpanded] = useState(false);

  // Dati per le due visualizzazioni
  const content = {
    giudiziaria: {
      title: "Tesi Giudiziaria (Mafia/Riciclaggio)",
      color: "#f43f5e", // Rosso
      bgColor: "#4c0519", // Rosso scuro per sfondi pillole
      icon: "⚖️",
      nodes: [
        { id: 1, label: "ORIGINE", desc: "Cosa Nostra (Palermo)" },
        { id: 2, label: "TRANSITO", desc: "Banca Rasini / Milano" },
        { id: 3, label: "EDILNORD/FININVEST", desc: "Milano" }
      ]
    },
    ufficiale: {
      title: "Tesi Ufficiale (Borghese/Fiscale)",
      color: "#3b82f6", // Blu
      bgColor: "#172554", // Blu scuro per sfondi pillole
      icon: "🏛️",
      nodes: [
        { id: 1, label: "ORIGINE", desc: "Borghesia Lombarda" },
        { id: 2, label: "TRANSITO", desc: "Svizzera / Holding" },
        { id: 3, label: "EDILNORD/FININVEST", desc: "Milano" }
      ]
    }
  };

  const current = content[activeThesis];

  // Estraiamo il contenuto SVG per riutilizzarlo.
  const graphSvgContent = (
    <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
      {/* Linea di base tratteggiata */}
      <line x1="100" y1="100" x2="500" y2="100" stroke="#1e293b" strokeWidth="2.5" strokeDasharray="6 6" />
      
      {/* Linea colorata animata in sovrimpressione */}
      <line x1="100" y1="100" x2="500" y2="100" stroke={current.color} strokeWidth="2.5" strokeDasharray="6 6" className="transition-colors duration-500" opacity="0.6" />

      {/* Particelle animate che viaggiano */}
      <circle r="4.5" fill={current.color} className="transition-colors duration-500 shadow-xl">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 100 100 L 500 100" />
      </circle>
      <circle r="4.5" fill={current.color} className="transition-colors duration-500 shadow-xl">
        <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M 100 100 L 500 100" />
      </circle>

      {/* Nodi 1, 2, 3 */}
      {[100, 300, 500].map((x, index) => (
        <g key={index} className="transition-all duration-500">
          {/* Icona sopra il nodo - leggermente ingrandita */}
          <text x={x} y="70" textAnchor="middle" fontSize="28">{current.icon}</text>
          
          {/* Punto del nodo sulla linea */}
          <circle cx={x} cy="100" r="7.5" fill={current.color} stroke="#0b0f1a" strokeWidth="4" className="transition-colors duration-500" />
          
          {/* Etichetta a pillola */}
          <rect x={x - 70} y="125" width="140" height="26" rx="13" fill={current.bgColor} stroke={current.color} strokeWidth="1.5" className="transition-colors duration-500" />
          <text x={x} y="142" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" className="uppercase tracking-widest">{current.nodes[index].label}</text>
          
          {/* Sotto-testo descrittivo */}
          <text x={x} y="170" textAnchor="middle" fill="#94a3b8" fontSize="12" className="transition-all duration-500">{current.nodes[index].desc}</text>
        </g>
      ))}
    </svg>
  );

  return (
    <>
      {/* VISTA 1: Componente Normale (nella barra laterale) */}
      <div className="mt-8 bg-[#111827] rounded-xl border border-slate-800 overflow-hidden shadow-2xl relative">
        
        {/* Header - Aumentata la spaziatura */}
        <div className="p-5 md:p-6 border-b border-slate-800 bg-[#0f172a]">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h4 className="text-white font-black text-lg md:text-xl tracking-tight">Origini Capitali Fininvest <span className="text-slate-400 font-normal">1970-1980</span></h4>
              <p className="text-xs text-slate-400 font-mono mt-2.5 transition-colors duration-500">
                Tesi corrente: <span style={{ color: current.color }} className="font-bold">{current.title}</span>
              </p>
            </div>
            {/* TASTO ESPANDI */}
            <button 
              onClick={() => setIsExpanded(true)}
              className="flex-shrink-0 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 p-2.5 rounded-md transition-all"
              title="Espandi a tutto schermo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Area Grafico ANTEPRIMA - Il segreto è qui: tolto il padding (p-0) e cambiato aspect ratio */}
        <div className="relative w-full aspect-[16/11] bg-[#0b0f1a] overflow-hidden flex items-center justify-center p-3 border-b border-slate-800">
          {graphSvgContent}
        </div>

        {/* Controlli Toggle in basso */}
        <div className="p-5 md:p-6 bg-[#0f172a] flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="flex bg-[#1e293b] rounded-full p-1 border border-slate-700">
            <button 
              onClick={() => setActiveThesis('giudiziaria')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeThesis === 'giudiziaria' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Tesi Giudiziaria
            </button>
            <button 
              onClick={() => setActiveThesis('ufficiale')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeThesis === 'ufficiale' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Tesi Ufficiale
            </button>
          </div>
        </div>
      </div>

      {/* VISTA 2: Modal a Schermo Intero - Invariata perché andava già bene */}
      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
          
          <div className="bg-[#111827] rounded-xl border border-slate-700 w-full max-w-6xl overflow-hidden shadow-2xl relative flex flex-col">
            
            {/* Header del Modal */}
            <div className="p-5 md:p-6 border-b border-slate-800 flex justify-between items-center bg-[#0f172a]">
              <div>
                <h3 className="text-white font-black text-2xl tracking-tight">Le Due Verità sulle Origini dei Capitali Fininvest</h3>
                <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mt-1">Archivio Banca Rasini / Inchiesta Storica 1970-1980</p>
              </div>
              {/* TASTO CHIUDI */}
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-2 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white rounded-full transition-colors"
                title="Chiudi visualizzazione"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Corpo Gigante del Modal - Qui manteniamo il padding per l'eleganza */}
            <div className="relative w-full aspect-video bg-[#0b0f1a] overflow-hidden flex items-center justify-center p-8 md:p-16 border-b border-slate-800">
              {graphSvgContent}
            </div>

            {/* Controlli Toggle del Modal */}
            <div className="p-5 md:p-6 bg-[#0f172a] flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="flex bg-[#1e293b] rounded-full p-1.5 border border-slate-700">
                    <button 
                    onClick={() => setActiveThesis('giudiziaria')}
                    className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeThesis === 'giudiziaria' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                    Tesi Giudiziaria
                    </button>
                    <button 
                    onClick={() => setActiveThesis('ufficiale')}
                    className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeThesis === 'ufficiale' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                    Tesi Ufficiale
                    </button>
                </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}