"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DossierTabs({ processi = [], protagonisti = [] }) {
  const [activeTab, setActiveTab] = useState('tutti');
  
  // Impostiamo quante card mostrare all'inizio (6 = due righe perfette su desktop)
  const INITIAL_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Quando l'utente cambia categoria, resettiamo i bottoni di espansione
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [activeTab]);

  const tabs = [
    { id: 'tutti', label: 'Tutti gli Atti' },
    { id: 'leggi', label: 'Database Storico' },
    { id: 'processi', label: 'Fascicoli Processuali' },
    { id: 'protagonisti', label: 'Profili Biografici' }
  ];

  // 1. UNIFICHIAMO I DATI: Creiamo un unico array con tutti i documenti
  const allCards = [
    {
      id: 'leggi-ad-personam',
      type: 'leggi',
      href: '/leggi',
      categoria: 'Database Storico',
      titolo: 'Le Leggi ad Personam',
      descrizione: "L'archivio filtrabile dei decreti che hanno impattato il sistema giudiziario italiano.",
      colore: 'red',
      testoLink: "Apri l'archivio"
    },
    {
      id: 'banca-rasini',
      type: 'leggi',
      href: '/banca-rasini',
      categoria: 'Database Storico',
      titolo: 'Il Caso Banca Rasini',
      descrizione: "L'archivio documentale sulle origini finanziarie, i capitali svizzeri e i conti correnti di Cosa Nostra.",
      colore: 'red',
      testoLink: "Apri l'archivio"
    },
    ...processi.map((proc, i) => ({
      id: `proc-${i}`,
      type: 'processi',
      href: `/processi/${proc.slug}`,
      categoria: 'Fascicolo Processuale',
      titolo: proc.titolo,
      descrizione: proc.descrizione,
      colore: 'blue',
      testoLink: 'Esamina la sentenza'
    })),
    ...protagonisti.map((prot, i) => ({
      id: `prot-${i}`,
      type: 'protagonisti',
      href: `/protagonisti/${prot.slug}`,
      categoria: 'Profilo Biografico',
      titolo: prot.nome,
      descrizione: prot.sintesi,
      colore: 'slate',
      testoLink: 'Consulta il dossier'
    }))
  ];

  // 2. FILTRIAMO: Teniamo solo le card del tab selezionato
  const filteredCards = allCards.filter(card => activeTab === 'tutti' || card.type === activeTab);

  // 3. TAGLIAMO: Mostriamo solo il numero di card consentito da visibleCount
  const displayedCards = filteredCards.slice(0, visibleCount);

  // Helper per assegnare le classi Tailwind corrette in base al colore
  const getColorClasses = (colore) => {
    if (colore === 'red') return {
      borderTop: 'bg-red-800',
      catText: 'text-red-700',
      linkText: 'text-red-700',
      hoverBorder: 'hover:border-red-200'
    };
    if (colore === 'blue') return {
      borderTop: 'bg-blue-800',
      catText: 'text-blue-700',
      linkText: 'text-blue-700',
      hoverBorder: 'hover:border-blue-200'
    };
    return {
      borderTop: 'bg-slate-800',
      catText: 'text-slate-500',
      linkText: 'text-slate-700',
      hoverBorder: 'hover:border-slate-800'
    };
  };

  return (
    <div>
      {/* Menu dei Filtri */}
      <div className="flex flex-wrap gap-3 mb-10 border-b-2 border-slate-100 pb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-red-800 text-white shadow-md transform -translate-y-0.5'
                : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Griglia dei Dossier */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedCards.map((card) => {
          const colors = getColorClasses(card.colore);
          
          return (
            <Link 
              key={card.id} 
              href={card.href} 
              className={`group relative bg-white rounded-2xl p-8 flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 transform hover:-translate-y-1 overflow-hidden animate-in fade-in zoom-in duration-300 ${colors.hoverBorder}`}
            >
              <div className={`absolute top-0 left-0 w-full h-1.5 ${colors.borderTop}`}></div>
              <div className={`text-xs font-black uppercase tracking-widest mb-4 ${colors.catText}`}>
                {card.categoria}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">{card.titolo}</h3>
              <p className="text-slate-600 flex-grow text-lg mb-8">{card.descrizione}</p>
              <div className={`mt-auto inline-flex items-center text-sm font-bold ${colors.linkText}`}>
                {card.testoLink}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Area Bottoni di Paginazione */}
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {/* Mostra "Carica Altri" se ci sono ancora card nascoste */}
        {visibleCount < filteredCards.length && (
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-600 rounded-full font-bold hover:border-slate-800 hover:text-slate-900 transition-colors shadow-sm hover:shadow"
          >
            Carica altri fascicoli ↓
          </button>
        )}
        
        {/* Mostra "Mostra Meno" se abbiamo superato il numero iniziale di card */}
        {visibleCount > INITIAL_COUNT && (
          <button
            onClick={() => setVisibleCount(INITIAL_COUNT)}
            className="px-8 py-3 bg-slate-50 border-2 border-slate-200 text-slate-500 rounded-full font-bold hover:bg-slate-100 hover:text-slate-700 transition-colors shadow-sm"
          >
            Mostra meno ↑
          </button>
        )}
      </div>
      
      {/* Testo se la ricerca è vuota */}
      {filteredCards.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          Nessun fascicolo trovato in questa categoria.
        </div>
      )}
    </div>
  );
}