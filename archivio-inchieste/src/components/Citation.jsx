"use client";

import React from 'react';
import fontiData from '../data/fonti.json';

export default function Citation({ id, testo }) {
  const fonte = fontiData.find((f) => f.id === String(id));

  // I SALVAGENTE: Se non trova la fonte nel JSON, usa dei testi di emergenza
  const displayTitolo = fonte ? fonte.titolo : (testo || "⚠️ Fonte in catalogazione");
  const description = fonte?.descrizione || "I dettagli bibliografici per questo reperto non sono ancora stati inseriti nell'archivio centrale.";
  const link = fonte?.link;

  return (
    <span className="relative group inline-block cursor-help mx-0.5">
      <sup className="text-red-700 font-black text-xs">[{id}]</sup>
      
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-slate-900 text-slate-200 text-sm rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 transform scale-95 group-hover:scale-100 font-sans border border-slate-700">
        
        <strong className="block text-white mb-2 pb-2 border-b border-slate-700 leading-tight">
          {displayTitolo}
        </strong>
        
        <span className="block text-slate-400 mb-2 text-xs leading-relaxed">
          {description}
        </span>
        
        {link && (
          <span className="block text-blue-400 text-[10px] truncate mt-2 font-mono bg-slate-950 p-1 rounded">
            {link}
          </span>
        )}
        
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></span>
      </span>
    </span>
  );
}