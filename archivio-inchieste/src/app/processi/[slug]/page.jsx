import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Citation from '../../../components/Citation.jsx';
import processiData from '../../../data/processi.json';

// Aggiungi questi stili specifici per il corpo del testo qui
const mdxComponents = {
  h1: (props) => <h1 className="text-3xl font-black text-slate-900 mt-12 mb-6 border-b-2 border-slate-100 pb-4 uppercase tracking-tight" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2" {...props} />,
  p: (props) => <p className="text-lg leading-relaxed text-slate-700 mb-6 font-serif" {...props} />, // Font serif per lunghe letture
  strong: (props) => <strong className="font-bold text-slate-900 bg-yellow-50 px-0.5" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-red-600 bg-slate-50 p-6 my-8 italic text-slate-600 rounded-r-lg shadow-sm" {...props} />
  ),
  Fonte: Citation
};

export default async function ProcessoPage({ params }) {
  const { slug } = await params;
  const infoBase = processiData.find(p => p.slug === slug);
  const mdxPath = path.join(process.cwd(), 'src/content/processi', `${slug}.mdx`);
  
  let mdxContent;
  try {
    mdxContent = fs.readFileSync(mdxPath, 'utf8');
  } catch (error) {
    // SCHERMATA DI ERRORE GENTILE: FASCICOLO IN FASE DI REPERIMENTO
    return (
      <div className="min-h-screen bg-slate-50 text-slate-500 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-lg px-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white border border-slate-200 mb-8 shadow-sm">
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>

          <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-3 uppercase">Fascicolo non reperito</h2>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed">
            La documentazione relativa a <span className="font-bold text-slate-700 italic">"{infoBase?.titolo || slug}"</span> non è attualmente disponibile negli archivi digitali.
          </p>

          <Link href="/" className="inline-flex items-center px-8 py-3 bg-slate-900 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:bg-red-800 transition-all shadow-lg active:scale-95">
            Torna all'indice generale
          </Link>
        </div>
      </div>
    );
  }

  const { content } = matter(mdxContent);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] text-slate-800 font-sans">
      {/* Header ridotto per dare spazio subito al testo */}
      <div className="bg-slate-900 text-white py-12 px-8 border-b-4 border-red-700 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors mb-4 inline-block uppercase tracking-widest">
            ← Torna all'indice generale
          </Link>
          <h1 className="text-4xl font-black tracking-tighter leading-none">{infoBase?.titolo}</h1>
        </div>
      </div>

      <main className="flex-grow max-w-6xl w-full mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* COLONNA SINISTRA: Contenuto Principale */}
          <div className="lg:w-2/3 bg-white shadow-sm border border-slate-200 rounded-sm p-8 md:p-16 relative overflow-hidden">
            {/* Timbro di classificazione in alto a destra */}
            <div className="absolute top-8 right-8 border-4 border-red-200 text-red-200 font-black px-4 py-2 rotate-12 pointer-events-none select-none text-xl uppercase">
              Documento Acquisito
            </div>

            <article className="prose prose-slate prose-lg max-w-none 
              prose-headings:tracking-tight 
              prose-p:font-serif prose-p:text-slate-800 prose-p:leading-8">
              <MDXRemote source={content} components={mdxComponents} />
            </article>
          </div>

          {/* COLONNA DESTRA: Metadati */}
          <aside className="lg:w-1/3">
            <div className="sticky top-8 space-y-6">
              <div className="bg-slate-800 text-white p-6 rounded-lg shadow-md">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-slate-400 border-b border-slate-700 pb-2">
                  Dettagli Archivio
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Stato Procedimento</label>
                    <p className="font-mono text-sm">{infoBase?.esito || "In fase di analisi"}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Argomento Principale</label>
                    <p className="font-mono text-sm">{infoBase?.accusa || "Analisi Storica"}</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-300 p-6 rounded-lg">
                <p className="text-xs text-slate-500 italic leading-relaxed">
                  "Le informazioni contenute in questo dossier sono estratte da sentenze definitive e documenti."
                </p>
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* Footer pulito */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-400 text-[10px] uppercase tracking-widest">
        Fine della documentazione reperita • Sistema di Archiviazione Digitale
      </footer>
    </div>
  );
}