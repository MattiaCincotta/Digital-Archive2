import Link from 'next/link';
import LawsSearch from '../../components/LawsSearch';
import leggiData from '../../data/leggi.json';

export default function LeggiPage() {
  
  const leggi = [...leggiData].sort((a, b) => parseInt(a.year) - parseInt(b.year));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      
      {/* Testata arricchita con filigrana e metadati */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-12 pb-24 px-8 shadow-inner border-b-4 border-red-800">
        
        {/* Filigrana decorativa (Simbolo di Sezione Giuridica) */}
        <span className="absolute -right-12 -bottom-24 text-[24rem] font-serif font-bold text-white opacity-[0.03] pointer-events-none select-none">
          §
        </span>

        <div className="max-w-4xl mx-auto relative z-10">
          
          <Link href="/" className="inline-flex items-center bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2.5 rounded-full transition-all font-medium text-sm mb-10 shadow-sm backdrop-blur-sm group">
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Torna all'Archivio Principale
          </Link>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Le Leggi ad Personam</h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed font-light mb-8">
            Catalogo cronologico dei provvedimenti legislativi analizzati nel dossier, raggruppati per periodo storico.
          </p>

          {/* Metadati dell'archivio */}
          <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-300">
            <div className="flex items-center bg-slate-950/30 px-4 py-2 rounded-lg border border-white/5">
              <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {leggi.length} Documenti in archivio
            </div>
            <div className="flex items-center bg-slate-950/30 px-4 py-2 rounded-lg border border-white/5">
              <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Dal 1994 a oggi
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <LawsSearch initialLaws={leggi} />
      </div>
    </div>
  );
}