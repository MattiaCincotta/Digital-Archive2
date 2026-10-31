import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Citation from '../../../components/Citation.jsx';
import protagonistiData from '../../../data/protagonisti.json';

export default async function ProtagonistaPage({ params }) {
  const { slug } = await params;
  
  // 1. Cerchiamo i metadati nel JSON
  const infoBase = protagonistiData.find(p => p.slug === slug);
  
  // 2. Cerchiamo il contenuto esteso nel file MDX
  const mdxPath = path.join(process.cwd(), 'src/content/protagonisti', `${slug}.mdx`);
  
  let mdxContent;
  try {
    mdxContent = fs.readFileSync(mdxPath, 'utf8');
  } catch (error) {
    // Se il file MDX non esiste ancora, mostriamo un errore pulito
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Fascicolo non reperito</h2>
          <Link href="/" className="mt-4 inline-block text-red-600 font-bold underline">Torna alla Home</Link>
        </div>
      </div>
    );
  }

  const { content } = matter(mdxContent);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-24">
      
      {/* TESTATA: Stile Archivio Riservato */}
      <div className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-32 px-8 border-b-8 border-slate-800 shadow-2xl">
        
        {/* Filigrana: Il nome del protagonista in sottofondo */}
        <span className="absolute -right-20 -bottom-10 text-[15rem] font-black text-white opacity-[0.02] pointer-events-none select-none whitespace-nowrap uppercase">
          {infoBase?.nome || "Protagonista"}
        </span>

        <div className="max-w-4xl mx-auto relative z-10">
          
          <Link href="/" className="inline-flex items-center bg-white/10 hover:bg-white/25 border border-white/20 text-white px-8 py-4 rounded-full transition-all font-bold text-sm mb-12 shadow-lg backdrop-blur-md group">
            <svg className="w-5 h-5 mr-3 transform group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            CHIUDI FASCICOLO
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-slate-700 text-white px-4 py-1.5 rounded-md font-mono font-black text-sm shadow-lg border border-slate-600 uppercase tracking-tighter">
              Identità Verificata
            </span>
            <div className="h-6 w-px bg-white/20 hidden md:block"></div>
            <span className="text-slate-400 font-black tracking-[0.2em] text-xs uppercase bg-white/5 px-3 py-1 rounded">
              Profilo Biografico Critico
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-4">
            {infoBase?.nome}
          </h1>
          <p className="text-xl md:text-2xl text-red-500 font-mono font-bold uppercase tracking-widest italic opacity-80">
            {infoBase?.ruolo}
          </p>
        </div>
      </div>

      {/* SCHEDA BIOGRAFICA */}
      <main className="max-w-4xl mx-auto px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200">
          
          <div className="relative p-8 md:p-16">
            
            {/* Disclaimer o Sintesi Rapida */}
            <div className="mb-12 p-6 bg-slate-50 border-l-8 border-slate-900 rounded-r-xl">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Sintesi agli Atti</h4>
               <p className="text-lg text-slate-600 leading-relaxed">
                 {infoBase?.sintesi}
               </p>
            </div>

            {/* Testo MDX dell'approfondimento */}
            <div className="prose prose-slate prose-xl max-w-none 
              prose-headings:text-slate-900 prose-headings:font-black
              prose-strong:text-slate-900 prose-strong:font-bold
              prose-p:leading-relaxed prose-p:text-slate-700
              prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline">
              
              <MDXRemote 
                source={content} 
                components={{ Fonte: Citation }} 
              />
              
            </div>

            <div className="flex items-center gap-3 mt-16 opacity-30">
              <div className="h-px flex-grow bg-slate-300"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Documentazione Conclusa</span>
              <div className="h-px flex-grow bg-slate-300"></div>
            </div>
          </div>

          {/* Footer della scheda */}
          <div className="bg-slate-900 border-t border-slate-800 p-8 flex justify-between items-center text-white/40">
            <div className="text-[10px] font-bold uppercase tracking-widest">
              Dipartimento Storico-Giudiziario • Dossier Personale
            </div>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-red-800 animate-pulse"></div>
               <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}