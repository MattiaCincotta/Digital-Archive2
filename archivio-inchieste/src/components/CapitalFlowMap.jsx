"use client";
import React, { useState } from 'react';

export default function CapitalFlowMap() {
  // Stato per gestire se la mappa è a tutto schermo o no
  const [isExpanded, setIsExpanded] = useState(false);

  // Isolo il disegno vettoriale in una variabile così posso riusarlo sia nella 
  // vista piccola che nella vista grande senza riscrivere 50 righe di codice
  const mapSvgContent = (
    <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">
      {/* Linee di collegamento */}
      <path id="path-sud-nord" d="M 80 240 L 200 150" stroke="#334155" strokeWidth="2" fill="none" />
      <path id="path-nord-estero" d="M 200 150 L 320 60" stroke="#334155" strokeWidth="2" fill="none" />

      {/* Animazioni flussi */}
      <circle r="4" fill="#ef4444" className="shadow-lg">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 80 240 L 200 150" />
      </circle>
      <circle r="3" fill="#fca5a5">
        <animateMotion dur="2.5s" begin="1.2s" repeatCount="indefinite" path="M 80 240 L 200 150" />
      </circle>
      <circle r="4" fill="#3b82f6">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 200 150 L 320 60" />
      </circle>
      <circle r="4" fill="#eab308">
        <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M 200 150 L 320 60" />
      </circle>

      {/* Nodo Palermo */}
      <g transform="translate(80, 240)">
        <circle r="30" fill="#1e293b" opacity="0.6">
          <animate attributeName="r" values="25;35;25" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle r="12" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <path d="M-4,-4 Q0,-10 4,-4 Q6,0 0,6 Q-6,0 -4,-4 Z" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <circle cx="0" cy="-3" r="1.5" fill="#94a3b8" />
      </g>

      {/* Nodo Milano */}
      <g transform="translate(200, 150)">
        <circle r="35" fill="#1e293b" opacity="0.6">
          <animate attributeName="r" values="30;40;30" dur="4s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle r="16" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <rect x="-6" y="-6" width="12" height="12" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M-3,-2 v1 M3,-2 v1 M-3,2 v1 M3,2 v1" stroke="#94a3b8" strokeWidth="1" />
      </g>

      {/* Nodo Svizzera */}
      <g transform="translate(320, 60)">
        <circle r="40" fill="#1e293b" opacity="0.6">
          <animate attributeName="r" values="35;45;35" dur="4s" begin="2s" repeatCount="indefinite" />
        </circle>
        <circle r="18" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <rect x="-8" y="-6" width="16" height="12" rx="2" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <circle cx="3" cy="0" r="1.5" fill="#94a3b8" />
      </g>
    </svg>
  );

  return (
    <>
      {/* VISTA 1: Componente Normale (nella barra laterale) */}
      <div className="mt-8 bg-[#111827] rounded-xl border border-slate-800 overflow-hidden shadow-lg relative">
        <div className="p-4 border-b border-slate-800">
          
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-white font-bold text-sm">Archivio Banca Rasini: 1950-1973</h4>
            {/* TASTO ESPANDI */}
            <button 
              onClick={() => setIsExpanded(true)}
              className="text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 p-1.5 rounded-md transition-all"
              title="Espandi a tutto schermo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>

          <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase tracking-widest">
            <div><span className="block text-slate-500 mb-1">Periodo</span><span className="text-slate-300">1950 - 1973</span></div>
            <div><span className="block text-slate-500 mb-1">Sede</span><span className="text-slate-300">Via Mercanti, MI</span></div>
            <div className="text-right"><span className="block text-slate-500 mb-1">Flussi</span><span className="text-slate-300">Attivi</span></div>
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] bg-[#0f172a] overflow-hidden flex items-center justify-center p-4">
          {mapSvgContent}
          <div className="absolute bottom-6 left-6 border border-slate-700 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Palermo (Misilmeri)</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 mt-8 border border-slate-700 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Milano (Sede Rasini)</div>
          <div className="absolute top-16 right-6 border border-slate-700 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Svizzera (Capitali Neri)</div>
        </div>
      </div>


      {/* VISTA 2: Modal a Schermo Intero (appare solo se isExpanded è true) */}
      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
          
          <div className="bg-[#111827] rounded-xl border border-slate-700 w-full max-w-5xl overflow-hidden shadow-2xl relative flex flex-col">
            
            {/* Header del Modal */}
            <div className="p-4 md:p-6 border-b border-slate-800 flex justify-between items-center bg-[#0f172a]">
              <div>
                <h3 className="text-white font-black text-xl tracking-tight">I Flussi di Capitale: La Rotta dell'Infiltrazione</h3>
                <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mt-1">Archivio Storico: Banca Rasini, 1950-1973</p>
              </div>
              {/* TASTO CHIUDI */}
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-2 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white rounded-full transition-colors"
                title="Chiudi visualizzazione"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Corpo Gigante del Modal */}
            <div className="relative w-full aspect-video bg-[#0f172a] overflow-hidden flex items-center justify-center p-8 md:p-16">
              {mapSvgContent}
              <div className="absolute bottom-16 left-16 border border-slate-700 bg-slate-900/80 backdrop-blur-sm text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider">Palermo (Misilmeri)</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 mt-16 border border-slate-700 bg-slate-900/80 backdrop-blur-sm text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider">Milano (Sede Rasini)</div>
              <div className="absolute top-16 right-16 border border-slate-700 bg-slate-900/80 backdrop-blur-sm text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider">Svizzera (Capitali Neri)</div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}