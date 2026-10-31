"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function InteractiveTimeline({ events }) {
  const [activeEvent, setActiveEvent] = useState(events[0]);

  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Nessun evento caricato agli atti</h3>
        <p className="text-slate-500">Aggiungi i file MDX nella cartella timeline per visualizzare la cronologia.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

      <div className="lg:w-1/3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-4 lg:pb-0 scrollbar-hide">
        {events.map((item, index) => {
          const isActive = activeEvent === item;
          const displayYear = item.year || "N/A";
          const displayTitle = item.title || "Documento in attesa";

          return (
            <button
              key={index}
              onClick={() => setActiveEvent(item)}
              className={`group flex items-center w-full text-left p-4 rounded-xl transition-all duration-300 border-2 ${isActive
                  ? 'bg-slate-900 border-slate-900 text-white shadow-lg transform lg:translate-x-2'
                  : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
            >
              <div className="flex flex-col">
                <span className={`font-mono font-black text-lg leading-none mb-1 ${isActive ? 'text-red-500' : 'text-slate-400 group-hover:text-red-700 transition-colors'}`}>
                  {displayYear}
                </span>
                <span className={`font-bold text-sm tracking-tight truncate w-full ${isActive ? 'text-white' : 'text-slate-700'}`}>
                  {displayTitle}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="lg:w-2/3">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-200 relative overflow-hidden min-h-[400px] flex flex-col justify-center transition-all duration-500">

          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-red-800 to-red-600"></div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block bg-slate-100 text-slate-500 px-3 py-1 rounded-md font-mono font-bold text-sm border border-slate-200">
                REPERTO CRONOLOGICO
              </span>
              <span className="text-red-700 font-black text-3xl font-mono tracking-tighter">
                {activeEvent.year}
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              {activeEvent.title}
            </h3>

            <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed max-w-none mb-10">
              {activeEvent.sintesi ? (
                <p>{activeEvent.sintesi}</p>
              ) : (
                <p className="italic text-slate-400">Nessun testo inserito per questo evento.</p>
              )}
            </div>

            {/* Pulsante che porta all'approfondimento della Timeline */}
            {activeEvent.slug && (
              <div className="mt-auto pt-6 border-t border-slate-100">
                <Link href={`/timeline/${activeEvent.slug}`} className="inline-flex items-center text-red-700 font-black hover:text-red-900 transition-colors group">
                  APPROFONDISCI L'EVENTO STORICO
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          <span className="absolute right-[-10%] bottom-[-10%] text-[15rem] font-serif font-bold text-slate-900 opacity-[0.02] pointer-events-none select-none">
            {activeEvent.year}
          </span>
        </div>
      </div>

    </div>
  );
}