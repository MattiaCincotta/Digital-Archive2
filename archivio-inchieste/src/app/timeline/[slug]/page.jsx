import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Citation from '../../../components/Citation.jsx';
import timelineData from '../../../data/timeline.json';

const mdxComponents = {
  h1: (props) => <h1 className="text-3xl font-black text-slate-900 mt-12 mb-6 border-b-2 border-slate-100 pb-4 uppercase tracking-tight" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2" {...props} />,
  p: (props) => <p className="text-lg leading-relaxed text-slate-700 mb-6 font-serif" {...props} />,
  strong: (props) => <strong className="font-bold text-slate-900 bg-yellow-50 px-0.5" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-red-600 bg-slate-50 p-6 my-8 italic text-slate-600 rounded-r-lg shadow-sm" {...props} />
  ),
  Fonte: Citation
};

export default async function TimelineDetailPage({ params }) {
  const { slug } = await params;
  const infoBase = timelineData.find(t => t.slug === slug);
  const mdxPath = path.join(process.cwd(), 'src/content/timeline', `${slug}.mdx`);
  
  let mdxContent;
  try {
    mdxContent = fs.readFileSync(mdxPath, 'utf8');
  } catch (error) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-500 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-lg px-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white border border-slate-200 mb-8 shadow-sm">
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-3 uppercase">Reperto non trovato</h2>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed">
            Il documento storico richiesto non è attualmente disponibile negli archivi.
          </p>
          <Link href="/" className="inline-flex items-center px-8 py-3 bg-slate-900 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:bg-red-800 transition-all shadow-lg active:scale-95">
            Torna all'indice generale
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] text-slate-800 font-sans">
      
      {/* HEADER MIGLIORATO: Più profondo, interattivo e in stile dossier */}
      <header className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-10 pb-16 px-8 border-b-4 border-red-700 shadow-xl z-10">
        
        {/* Pattern di sfondo per togliere l'effetto "piatto" */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-20">
          
          {/* Pulsante Indietro ben visibile e interattivo */}
          <Link href="/" className="inline-flex items-center px-4 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-600/50 rounded-full text-xs font-bold text-slate-300 hover:text-white transition-all shadow-sm backdrop-blur-sm group mb-8">
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            TORNA ALL'ARCHIVIO
          </Link>

          {/* Sottotitolo e Titolo con gerarchia visiva */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="text-red-500 font-mono text-sm font-bold tracking-widest uppercase">
                Reperto {infoBase?.year}
              </span>
              <span className="h-px w-16 bg-slate-700 hidden md:block"></span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight drop-shadow-lg">
              {infoBase?.title}
            </h1>
          </div>
          
        </div>
      </header>

      <main className="flex-grow max-w-6xl w-full mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-2/3 bg-white shadow-sm border border-slate-200 rounded-sm p-8 md:p-16 relative ">
            <article className="prose prose-slate prose-lg max-w-none prose-headings:tracking-tight prose-p:font-serif prose-p:text-slate-800 prose-p:leading-8">
              <MDXRemote source={mdxContent} components={mdxComponents} />
            </article>
          </div>

          <aside className="lg:w-1/3">
            <div className="sticky top-8 space-y-6">
              <div className="bg-slate-800 text-white p-6 rounded-lg shadow-md">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-slate-400 border-b border-slate-700 pb-2">
                  Dettagli Reperto
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Anno di riferimento</label>
                    <p className="font-mono text-xl font-bold text-red-400">{infoBase?.year}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Classificazione</label>
                    <p className="font-mono text-sm">Fascicolo Storico</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-300 p-6 rounded-lg">
                <p className="text-xs text-slate-500 italic leading-relaxed">
                  "L'analisi storiografica e giudiziaria delle dinamiche di infiltrazione finanziaria."
                </p>
              </div>
            </div>
          </aside>

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-400 text-[10px] uppercase tracking-widest mt-auto">
        Fine della documentazione reperita • Sistema di Archiviazione Digitale
      </footer>
    </div>
  );
}