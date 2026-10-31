"use client";
import React, { useState } from 'react';

export default function ForensicAnalysisGraph() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePhase, setActivePhase] = useState('origine');

  const phases = {
    origine: {
      title: "Afflusso di capitali di origine diversa verso le holding centrali.",
      svg: (
        <>
          <path d="M 160 160 Q 340 160 520 270" fill="none" stroke="#1e293b" strokeWidth="3" strokeDasharray="6 6" />
          <path d="M 160 380 Q 340 380 520 270" fill="none" stroke="#1e293b" strokeWidth="3" strokeDasharray="6 6" />
          
          <circle r="5" fill="#f43f5e"><animateMotion dur="3s" repeatCount="indefinite" path="M 160 160 Q 340 160 520 270" /></circle>
          <circle r="5" fill="#3b82f6"><animateMotion dur="3.5s" repeatCount="indefinite" path="M 160 380 Q 340 380 520 270" /></circle>

          <g transform="translate(160, 160)">
            <circle r="45" fill="#f43f5e" opacity="0.15"><animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite" /></circle>
            <text y="10" textAnchor="middle" fontSize="36">💵</text>
            <rect x="-115" y="35" width="230" height="28" rx="14" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
            <text y="53" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" className="uppercase tracking-widest">Narcodollari Cosa Nostra</text>
          </g>
          
          <g transform="translate(160, 380)">
            <circle r="45" fill="#3b82f6" opacity="0.15"><animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite" /></circle>
            <text y="10" textAnchor="middle" fontSize="36">💼</text>
            <rect x="-125" y="35" width="250" height="28" rx="14" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
            <text y="53" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" className="uppercase tracking-widest">Evasione Borghesia Lombarda</text>
          </g>
          
          <g transform="translate(520, 270)">
            <circle r="50" fill="#94a3b8" opacity="0.15"><animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite" /></circle>
            <text y="12" textAnchor="middle" fontSize="40">🏢</text>
            <rect x="-85" y="40" width="170" height="28" rx="14" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
            <text y="58" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" className="uppercase tracking-widest">Holding Fininvest</text>
          </g>
        </>
      )
    },
    meccanismo: {
      title: "Il sistema di lavaggio a maglia chiusa e frammentazione del capitale.",
      svg: (
        <>
          {/* Diamante allargato significativamente per evitare sovrapposizioni */}
          <path d="M 120 270 L 340 80 L 560 270 L 340 460 Z" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeDasharray="5 5" />
          
          <circle r="5" fill="#a855f7"><animateMotion dur="6s" repeatCount="indefinite" path="M 120 270 L 340 80 L 560 270 L 340 460 Z" /></circle>
          <text fill="#cbd5e1" fontSize="12" fontWeight="bold"><animateMotion dur="6s" repeatCount="indefinite" path="M 120 270 L 340 80 L 560 270 L 340 460 Z" /><tspan x="12" y="-12">Assegno Circolare</tspan></text>

          {[
            {x: 340, y: 80, label: "Conto Cifrato", color: "#a855f7", icon: "🏦", width: 140, xOff: -70},
            {x: 560, y: 270, label: "Fiduciaria Svizzera", color: "#a855f7", icon: "🤝", width: 170, xOff: -85},
            {x: 340, y: 460, label: "Prestazione Estera", color: "#a855f7", icon: "📄", width: 160, xOff: -80},
            {x: 120, y: 270, label: "Società Off-Shore", color: "#a855f7", icon: "🏝️", width: 150, xOff: -75}
          ].map((n, i) => (
            <g key={i} transform={`translate(${n.x}, ${n.y})`}>
              <circle r="35" fill={n.color} opacity="0.15"><animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite" /></circle>
              <text y="10" textAnchor="middle" fontSize="28">{n.icon}</text>
              <rect x={n.xOff} y="32" width={n.width} height="26" rx="13" fill="#0f172a" stroke={n.color} strokeWidth="1.5" />
              <text y="49" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" className="uppercase tracking-widest">{n.label}</text>
            </g>
          ))}
          
          <g transform="translate(340, 270)">
            <circle r="45" fill="#3b82f6" opacity="0.15" />
            <text y="12" textAnchor="middle" fontSize="36">🏢</text>
            <rect x="-95" y="40" width="190" height="26" rx="13" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
            <text y="57" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" className="uppercase tracking-widest">Architettura Fininvest</text>
          </g>
        </>
      )
    },
    reinvestimento: {
      title: "Immissione dei capitali ripuliti nell'economia legale.",
      svg: (
        <>
          <line x1="200" y1="270" x2="480" y2="270" stroke="#1e293b" strokeWidth="3" strokeDasharray="6 6" />
          <circle r="5" fill="#10b981"><animateMotion dur="2s" repeatCount="indefinite" path="M 200 270 L 480 270" /></circle>
          
          <g transform="translate(200, 270)">
            <circle r="50" fill="#f59e0b" opacity="0.15"><animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.5s" repeatCount="indefinite" /></circle>
            <text y="12" textAnchor="middle" fontSize="40">☁️</text>
            <rect x="-85" y="40" width="170" height="28" rx="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text y="58" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" className="uppercase tracking-widest">Nebbia Finanziaria</text>
          </g>

          <g transform="translate(480, 270)">
            <circle r="50" fill="#10b981" opacity="0.15"><animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite" /></circle>
            <text y="12" textAnchor="middle" fontSize="40">🛒</text>
            <rect x="-105" y="40" width="210" height="28" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text y="58" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" className="uppercase tracking-widest">Acquisto Aziende Lecito</text>
          </g>
        </>
      )
    }
  };

  const current = phases[activePhase];

  const renderContent = (isModal) => (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex-shrink-0 p-4 md:p-6 border-b border-slate-800 bg-[#0f172a] flex justify-between items-start gap-4">
        <div>
          <h3 className="text-white font-black text-xl tracking-tight">Giri Finanziari Chiusi: Analisi Forense</h3>
          <p className="text-sm text-slate-400 mt-1">{current.title}</p>
        </div>
        {!isExpanded && (
          <button onClick={() => setIsExpanded(true)} className="flex-shrink-0 p-2 bg-slate-800 text-slate-400 hover:text-white rounded-md transition-colors" title="Espandi a schermo intero">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
          </button>
        )}
        {isExpanded && (
          <button onClick={() => setIsExpanded(false)} className="flex-shrink-0 p-2 bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors" title="Chiudi visualizzazione">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      {/* SVG Canvas - Spazio vitale per i nodi aumentato */}
      <div className={`relative w-full bg-[#0b0f1a] overflow-hidden p-2 flex items-center justify-center ${isModal ? 'flex-1 min-h-[300px]' : 'aspect-[5/4]'}`}>
        <svg viewBox="0 0 680 540" className="w-full h-full max-h-full">
          {current.svg}
        </svg>
      </div>

      {/* Footer - Impilato verticalmente (flex-col) per garantire che non esca MAI dai bordi */}
      <div className="flex-shrink-0 p-4 md:p-5 bg-[#1e293b] border-t border-slate-800">
        <div className="flex flex-col gap-2.5">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Fase dell'Indagine:
          </span>
          <select 
            value={activePhase}
            onChange={(e) => setActivePhase(e.target.value)}
            className="w-full bg-[#0f172a] text-white border border-slate-600 rounded-md py-2.5 px-4 text-sm outline-none focus:border-blue-500 cursor-pointer shadow-inner"
          >
            <option value="origine">1. Origine Capitali</option>
            <option value="meccanismo">2. Lavaggio (Meccanismo)</option>
            <option value="reinvestimento">3. Reinvestimento Lecito</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="mt-8 bg-[#111827] rounded-xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
        {renderContent(false)}
      </div>

      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
          <div className="bg-[#111827] rounded-xl border border-slate-700 w-full max-w-6xl h-[85vh] overflow-hidden shadow-2xl flex flex-col">
            {renderContent(true)}
          </div>
        </div>
      )}
    </>
  );
}