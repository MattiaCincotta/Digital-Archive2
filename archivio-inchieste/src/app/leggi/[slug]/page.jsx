import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';

// Importa qui tutti i componenti che vuoi usare nei file MDX!
import Citation from '../../../components/Citation.jsx';
import WarningBox from '../../../components/WarningBox.jsx';
import InfoBox from '../../../components/InfoBox.jsx';

import leggiData from '../../../data/leggi.json';

export default async function LawDetailPage({ params }) {
    // Next.js 15: params è una promise
    const { slug } = await params;

    // 1. Trova i metadati della legge nel JSON
    const legge = leggiData.find(l => l.slug === slug);

    if (!legge) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Documento non presente</h2>
                    <Link href="/leggi" className="mt-4 inline-block text-blue-600 font-bold underline">Torna all'archivio</Link>
                </div>
            </div>
        );
    }

    // 2. MAGIA: Leggiamo dinamicamente il file MDX dal disco!
    let mdxContent = "";
    try {
        const filePath = path.join(process.cwd(), 'src', 'content', 'leggi', `${slug}.mdx`);
        mdxContent = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        // Se il file MDX non esiste ancora, mostriamo un testo di fallback
        mdxContent = "> *Dossier in fase di acquisizione archivistica. Il testo completo della normativa sarà caricato a breve.*";
    }

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-24">

            {/* TESTATA: Design autoritario e profondo */}
            <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white pt-16 pb-32 px-8 border-b-8 border-red-800 shadow-2xl">
                {/* Filigrana Decorativa */}
                <span className="absolute -right-16 -bottom-20 text-[25rem] font-serif font-bold text-white opacity-[0.04] pointer-events-none select-none">
                    §
                </span>

                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/leggi" className="inline-flex items-center bg-white/10 hover:bg-white/25 border border-white/20 text-white px-8 py-4 rounded-full transition-all font-bold text-sm mb-12 shadow-lg backdrop-blur-md group">
                        <svg className="w-5 h-5 mr-3 transform group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        TORNA ALL'INDICE DELLE LEGGI
                    </Link>

                    {/* Badge e Tag in cima al Dossier */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="bg-red-700 text-white px-4 py-1.5 rounded-md font-mono font-black text-xl shadow-lg border border-red-600">
                            {legge.year}
                        </span>

                        <div className="h-6 w-px bg-white/20 hidden md:block mx-2"></div>

                        {/* Generatore dinamico di Etichette Colorate */}
                        <div className="flex gap-2">
                            {legge.tags && legge.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${tag === 'Penale' ? 'bg-red-500/20 text-red-200 border-red-500/30' :
                                            tag === 'Fisco' ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30' :
                                                tag === 'Media' ? 'bg-blue-500/20 text-blue-200 border-blue-500/30' :
                                                    tag === 'Giustizia' ? 'bg-amber-500/20 text-amber-200 border-amber-300/30' :
                                                        'bg-slate-500/20 text-slate-200 border-slate-500/30'
                                        }`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] drop-shadow-md">
                        {legge.title}
                    </h1>
                </div>
            </div>

            {/* CONTENUTO: Strutturato come un vero atto */}
            <main className="max-w-4xl mx-auto px-8 -mt-16 relative z-20">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200">
                    <div className="relative p-8 md:p-16">

                        {/* Sintesi Rapida (Highlights) caricata dal JSON */}
                        <div className="mb-12 p-6 bg-slate-50 border-l-8 border-red-700 rounded-r-xl">
                            <h4 className="text-xs font-black text-red-800 uppercase tracking-widest mb-3">Sintesi dell'impatto</h4>
                            <p className="text-xl md:text-2xl font-serif italic text-slate-700 leading-relaxed">
                                "{legge.sintesi_impatto || legge.content}"
                            </p>
                        </div>

                        {/* Corpo del Testo: rimossa la classe "prose" per evitare conflitti, gestiamo tutto tramite components */}
                        <div className="max-w-none text-slate-700">
                            <MDXRemote
                                source={mdxContent}
                                components={{
                                    Fonte: Citation,
                                    InfoBox: InfoBox,
                                    WarningBox: WarningBox,
                                    // REGOLE DI STILE FORTI PER I TAG MARKDOWN
                                    h2: (props) => <h2 className="text-3xl font-black text-slate-900 mt-14 mb-6 tracking-tight border-b border-slate-200 pb-3" {...props} />,
                                    p: (props) => <p className="font-serif text-lg leading-relaxed mb-6" {...props} />,
                                    ul: (props) => <ul className="list-disc pl-6 mb-8 font-serif text-lg space-y-2" {...props} />,
                                    li: (props) => <li className="leading-relaxed" {...props} />,
                                    strong: (props) => <strong className="font-bold text-slate-900" {...props} />
                                }}
                            />
                        </div>
                    </div>

                    {/* Piè di pagina */}
                    <div className="bg-slate-50 border-t border-slate-100 p-8 flex justify-between items-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Archivio Digitale Inchieste • Ver. 1.0.5
                        </div>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-800"></div>
                            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}