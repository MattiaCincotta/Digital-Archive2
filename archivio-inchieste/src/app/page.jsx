import InteractiveTimeline from '../components/InteractiveTimeline';
import DossierTabs from '../components/DossierTabs';

import protagonistiData from '../data/protagonisti.json'; 
import timelineData from '../data/timeline.json';
import processiData from '../data/processi.json'; 

export default function HomePage() {
  const sortedTimeline = [...timelineData].sort((a, b) => parseInt(a.year) - parseInt(b.year));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      <header className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white pt-20 pb-28 px-8 border-b-8 border-red-800 shadow-xl">
        <span className="absolute -right-12 -bottom-24 text-[24rem] font-serif font-bold text-white opacity-[0.03] pointer-events-none select-none">
          §
        </span>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 bg-red-900/50 text-red-100 rounded-md text-xs font-black mb-8 tracking-widest border border-red-700/50 uppercase shadow-sm">
            Archivio Investigativo
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1] drop-shadow-md">
            Il Sistema: Potere e Inchieste
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-4xl leading-relaxed font-light">
            Dossier analitico sulla ricostruzione storica basata su atti giudiziari e sentenze definitive.
          </p>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-8 -mt-16 relative z-20 flex flex-col gap-20 mb-20">

        <section className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12">
          <div className="mb-10 border-b-2 border-slate-100 pb-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Cronologia degli Eventi</h2>
          </div>
          <InteractiveTimeline events={sortedTimeline} />
        </section>

        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center">
              <span className="bg-red-800 w-3 h-8 mr-4 rounded-sm inline-block shadow-sm"></span>
              Archivio Dossier agli Atti
            </h2>
            <p className="text-slate-500 mt-2 text-lg ml-7">Seleziona una categoria per filtrare il materiale documentale.</p>
          </div>
          
          {/* Inseriamo il componente interattivo passando i dati */}
          <DossierTabs processi={processiData} protagonisti={protagonistiData} />

        </section>

      </main>

      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 border-t border-slate-800 relative z-20">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          <div>
            <div className="text-white font-black text-xl tracking-tighter mb-2 flex items-center">
               <svg className="w-5 h-5 mr-2 text-slate-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
               IL SISTEMA
            </div>
            <p className="text-xs font-mono opacity-80">Progetto indipendente di ricerca storica. Sviluppato in React/Next.js.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-xs font-mono">
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-slate-600 mr-2"></span>
              Stato: <span className="text-white ml-1">Online</span>
            </div>
            <div className="flex items-center opacity-50">
              Versione Build: 1.0.0
            </div>
          </div>

        </div>
      </footer>
      
    </div>
  );
}