"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function LawsSearch({ initialLaws }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = initialLaws.filter(l => {
    const title = l.title || "";
    const year = l.year || "";
    const content = l.content || "";

    return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           year.includes(searchTerm) ||
           content.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Funzione per raggruppare le leggi per decennio
  const groupedLaws = filtered.reduce((acc, legge) => {
    const decade = Math.floor(parseInt(legge.year) / 10) * 10;
    if (!acc[decade]) acc[decade] = [];
    acc[decade].push(legge);
    return acc;
  }, {});

  // Funzione per formattare il nome del decennio
  const formatDecade = (decade) => {
    if (decade === 1990) return "Anni '90";
    if (decade === 2000) return "Anni 2000";
    if (decade === 2010) return "Anni 2010";
    return `Anni ${decade}`;
  };

  return (
    <>
      <div className="sticky top-6 z-30 mb-12 shadow-xl rounded-xl -mt-8">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-red-800 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Cerca per anno, nome o parola chiave..."
          className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-900/20 focus:border-red-300 text-slate-800 text-base transition-all shadow-sm placeholder-slate-400 font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-5 pb-12">
        {Object.keys(groupedLaws).length > 0 ? (
          Object.keys(groupedLaws).sort().map(decade => (
            <div key={decade} className="mb-4">
              
              {/* Il Divisorio del Decennio */}
              <div className="flex items-center my-8">
                <div className="flex-grow border-t border-slate-300"></div>
                <span className="px-4 text-sm font-black text-slate-400 tracking-widest uppercase">
                  {formatDecade(parseInt(decade))}
                </span>
                <div className="flex-grow border-t border-slate-300"></div>
              </div>

              {/* Le schede del decennio */}
              <div className="flex flex-col gap-5">
                {groupedLaws[decade].map((legge, index) => (
                  <Link 
                    href={`/leggi/${legge.slug}`} 
                    key={index} 
                    className="group relative bg-white rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 hover:border-red-200 block"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-red-800 to-red-600 rounded-l-xl opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="md:w-32 shrink-0">
                      <div className="inline-flex items-center justify-center bg-red-50 border border-red-100 text-red-800 px-3 py-1.5 rounded-lg font-mono font-bold text-lg shadow-inner group-hover:bg-red-800 group-hover:text-white transition-colors duration-300">
                        {legge.year}
                      </div>
                    </div>
                    
                    <div className="w-full">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight flex items-center gap-2 group-hover:text-red-900 transition-colors">
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {legge.title}
                      </h3>
                      {legge.content && (
                        <p className="text-slate-600 text-base leading-relaxed">{legge.content}</p>
                      )}
                      
                      <div className="mt-5 pt-4 border-t border-slate-50 flex items-center text-sm font-bold text-red-700 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span>Ulteriori approfondimenti</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-12 text-center shadow-sm mt-8">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">Nessun documento trovato</h3>
             <p className="text-slate-500">Modifica i termini di ricerca per interrogare nuovamente l'archivio.</p>
          </div>
        )}
      </div>
    </>
  );
}