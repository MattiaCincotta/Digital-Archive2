"use client";
import React, { useState } from 'react';

export default function NetworkGraph() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = [
    { id: 'rasini', label: 'BANCA RASINI', type: 'hub', x: 250, y: 250, icon: '🏦', color: '#64748b', bg: '#1e293b', dur: 0 },
    { id: 'agrimex', label: 'AGRIMEX', type: 'company', x: 250, y: 80, icon: '🏢', color: '#22c55e', bg: '#064e3b', dur: 2.3 },
    { id: 'citam', label: 'CITAM', type: 'company', x: 359, y: 120, icon: '🏢', color: '#22c55e', bg: '#064e3b', dur: 3.1 },
    { id: 'mapriel', label: 'MAPRIEL', type: 'company', x: 417, y: 221, icon: '🏢', color: '#22c55e', bg: '#064e3b', dur: 2.7 },
    { id: 'prodolit', label: 'PRODOLIT', type: 'company', x: 397, y: 335, icon: '🏢', color: '#22c55e', bg: '#064e3b', dur: 3.5 },
    { id: 'calo', label: 'PIPPO CALÒ', type: 'person', x: 308, y: 410, icon: '💼', color: '#3b82f6', bg: '#1e3a8a', dur: 2.1 }, 
    { id: 'riina', label: 'TOTÒ RIINA', type: 'person', x: 192, y: 410, icon: '👑', color: '#f43f5e', bg: '#881337', dur: 3.8 }, 
    { id: 'provenzano', label: 'B. PROVENZANO', type: 'person', x: 103, y: 335, icon: '📝', color: '#a855f7', bg: '#4c1d95', dur: 2.6 }, 
    { id: 'mangano', label: 'V. MANGANO', type: 'person', x: 83, y: 221, icon: '🐴', color: '#f97316', bg: '#7c2d12', dur: 3.2 }, 
    { id: 'datra', label: 'DATRA', type: 'company', x: 141, y: 120, icon: '🏢', color: '#22c55e', bg: '#064e3b', dur: 2.9 },
  ];

  const hubNode = nodes.find(n => n.id === 'rasini');
  const satelliteNodes = nodes.filter(n => n.id !== 'rasini');

  // Tempo per un'orbita completa
  const orbitDuration = "60s";

  const graphSvgContent = (
    <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
      
      {/* GRUPPO ORBITANTE PRINCIPALE */}
      <g>
        {/* Questa animazione fa ruotare l'intero blocco attorno al centro 250, 250 */}
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="0 250 250" 
          to="360 250 250" 
          dur={orbitDuration} 
          repeatCount="indefinite" 
        />

        {/* Linee e particelle */}
        {satelliteNodes.map(node => (
          <g key={`link-${node.id}`}>
            <line 
              x1="250" y1="250" x2={node.x} y2={node.y} 
              stroke={hoveredNode === node.id ? node.color : '#1e293b'} 
              strokeWidth={hoveredNode === node.id ? "2" : "1.5"}
              strokeDasharray="4 4"
              className="transition-all duration-300"
            />
            <circle r="2.5" fill={node.color}>
              <animateMotion dur={`${node.dur}s`} repeatCount="indefinite" path={`M 250 250 L ${node.x} ${node.y}`} />
            </circle>
          </g>
        ))}

        {/* Nodi Satellite */}
        {satelliteNodes.map((node) => (
          <g 
            key={node.id} 
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="transition-all duration-300 cursor-default"
            style={{ transform: hoveredNode === node.id ? 'scale(1.1)' : 'scale(1)', transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {/* GRUPPO CONTRO-ROTANTE: Annulla la rotazione per mantenere il testo sempre dritto */}
            <g>
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                from={`360 ${node.x} ${node.y}`} 
                to={`0 ${node.x} ${node.y}`} 
                dur={orbitDuration} 
                repeatCount="indefinite" 
              />

              {hoveredNode === node.id && (
                <circle cx={node.x} cy={node.y} r="30" fill={node.color} opacity="0.15">
                  <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              
              <circle cx={node.x} cy={node.y} r="20" fill={node.bg} stroke={node.color} strokeWidth="2" />
              <text x={node.x} y={node.y + 6} textAnchor="middle" fontSize="16">{node.icon}</text>

              <rect x={node.x - 45} y={node.y + 28} width="90" height="20" rx="10" fill="#0f172a" stroke={node.color} strokeWidth="1.5" />
              <text x={node.x} y={node.y + 41} textAnchor="middle" fill={hoveredNode === node.id ? 'white' : '#cbd5e1'} fontSize="9" fontWeight="bold" className="uppercase tracking-widest">{node.label}</text>
            </g>
          </g>
        ))}
      </g>

      {/* HUB CENTRALE BANCA RASINI - Tenuto fuori dall'orbita per restare immobile */}
      <g 
        onMouseEnter={() => setHoveredNode(hubNode.id)}
        onMouseLeave={() => setHoveredNode(null)}
        className="transition-all duration-300 cursor-default"
        style={{ transform: hoveredNode === hubNode.id ? 'scale(1.1)' : 'scale(1)', transformOrigin: `${hubNode.x}px ${hubNode.y}px` }}
      >
        <circle cx={hubNode.x} cy={hubNode.y} r="55" fill={hubNode.color} opacity="0.15">
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx={hubNode.x} cy={hubNode.y} r="35" fill={hubNode.bg} stroke={hubNode.color} strokeWidth="2" />
        <text x={hubNode.x} y={hubNode.y + 8} textAnchor="middle" fontSize="24">{hubNode.icon}</text>

        <rect x={hubNode.x - 45} y={hubNode.y + 42} width="90" height="20" rx="10" fill="#0f172a" stroke={hubNode.color} strokeWidth="1.5" />
        <text x={hubNode.x} y={hubNode.y + 55} textAnchor="middle" fill={hoveredNode === hubNode.id ? 'white' : '#cbd5e1'} fontSize="9" fontWeight="bold" className="uppercase tracking-widest">{hubNode.label}</text>
      </g>

    </svg>
  );

  return (
    <>
      <div className="mt-8 bg-[#111827] rounded-xl border border-slate-800 overflow-hidden shadow-2xl relative">
        <div className="p-4 md:p-5 border-b border-slate-800 bg-[#0f172a]">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-tight">Banca Rasini: Analisi Investigativa</h4>
              <p className="text-[9px] text-slate-500 font-mono uppercase mt-1">Status: Cassaforte Sistemica / Focus: S. Valentino</p>
            </div>
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
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-[9px] text-slate-400 uppercase">Fiduciarie</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div><span className="text-[9px] text-slate-400 uppercase">Target</span></div>
          </div>
        </div>
        <div className="relative w-full aspect-square bg-[#0b0f1a] p-4 flex items-center justify-center">
          {graphSvgContent}
        </div>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
          <div className="bg-[#111827] rounded-xl border border-slate-700 w-full max-w-5xl overflow-hidden shadow-2xl relative flex flex-col">
            <div className="p-4 md:p-6 border-b border-slate-800 flex justify-between items-center bg-[#0f172a]">
              <div>
                <h3 className="text-white font-black text-xl tracking-tight uppercase">Banca Rasini: Analisi Investigativa</h3>
                <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mt-1">Status: Cassaforte Sistemica / Focus: San Valentino - San Lorenzo</p>
              </div>
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
            <div className="relative w-full aspect-video bg-[#0b0f1a] overflow-hidden flex items-center justify-center p-8 md:p-16">
              {graphSvgContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}