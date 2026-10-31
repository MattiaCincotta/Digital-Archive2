"use client";

import React, { useState } from 'react';
import Link from 'next/link';
// Importiamo i dati dal file centrale
import { bancaRasiniData } from '@/data/bancaRasini';

export default function BancaRasiniHub() {
  const INITIAL_COUNT = 5;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const displayedDossiers = bancaRasiniData.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#1e293b] pt-12 pb-20 border-b-4 border-red-700">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-sm font-medium shadow-sm hover:shadow">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Torna all'Archivio Principale
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-10 mb-4 tracking-tight">Il Caso Banca Rasini</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Catalogo cronologico dei documenti investigativi e processuali...</p>
          <div className="flex gap-4 mt-8">
            <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-md text-slate-300 text-sm font-medium">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              {bancaRasiniData.length} Documenti in archivio
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-6">
          {displayedDossiers.map((dossier) => (
            <Link key={dossier.id} href={`/banca-rasini/${dossier.id}`} className="block relative bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${dossier.colore === 'red' ? 'bg-red-600' : 'bg-blue-600'}`}></div>
              <div className="p-6 sm:p-8 pl-8 sm:pl-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                <div className="shrink-0 pt-1">
                  <span className={`inline-flex px-3 py-1.5 rounded-md text-sm font-bold tracking-wide ${dossier.colore === 'red' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>{dossier.categoria}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 group-hover:text-slate-700 transition-colors">
                    {dossier.titolo}
                  </h2>
                  <p className="mt-2 text-slate-600 leading-relaxed">{dossier.descrizione}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* Bottoni di Paginazione */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {visibleCount < bancaRasiniData.length && (
            <button onClick={() => setVisibleCount(prev => prev + 5)} className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-600 rounded-full font-bold hover:border-slate-800 hover:text-slate-900 transition-colors shadow-sm hover:shadow">
              Carica altri fascicoli ↓
            </button>
          )}
          {visibleCount > INITIAL_COUNT && (
            <button onClick={() => setVisibleCount(INITIAL_COUNT)} className="px-8 py-3 bg-slate-50 border-2 border-slate-200 text-slate-500 rounded-full font-bold hover:bg-slate-100 hover:text-slate-700 transition-colors shadow-sm">
              Mostra meno ↑
            </button>
          )}
        </div>
      </div>
    </div>
  );
}