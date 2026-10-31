import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

// Importazioni dei componenti centralizzati
import Citation from '@/components/Citation';
import WarningBox from '@/components/WarningBox';
import InfoBox from '@/components/InfoBox';
import CapitalFlowMap from '@/components/CapitalFlowMap';
import NetworkGraph from '@/components/NetworkGraph';
import DualThesisGraph from '@/components/DualThesisGraph';
import ForensicAnalysisGraph from '@/components/ForensicAnalysisGraph';

// Dati centralizzati
import { bancaRasiniData } from '@/data/bancaRasini';

export default async function FascicoloBancaRasini({ params }) {
  const { slug } = await params;

  // Cerchiamo il fascicolo giusto nell'array usando lo slug
  const metadata = bancaRasiniData.find(d => d.id === slug) || {
    titolo: "Reperto non classificato",
    anni: "Sconosciuto",
    classificazione: "Non definita"
  };

  const filePath = path.join(process.cwd(), 'src', 'content', 'banca-rasini', `${slug}.mdx`);

  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-black text-slate-900 mb-4">Fascicolo non trovato</h1>
        <p className="text-slate-500 mb-8">Non siamo riusciti a trovare il documento: {slug}.mdx</p>
        <Link href="/banca-rasini" className="px-6 py-3 bg-red-800 text-white font-bold rounded-full hover:bg-red-900 transition-colors">
          Torna all'Archivio
        </Link>
      </div>
    );
  }

  const customComponents = {
    Fonte: Citation,
    WarningBox,
    InfoBox,
    h2: (props) => <h2 className="text-3xl font-black text-slate-900 mt-14 mb-6 tracking-tight" {...props} />,
    p: (props) => <p className="font-serif text-lg leading-relaxed mb-6" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 mb-8 font-serif text-lg space-y-2" {...props} />,
    li: (props) => <li className="leading-relaxed" {...props} />,
    strong: (props) => <strong className="font-bold" {...props} />
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      {/* HEADER SCURO */}
      <div className="bg-[#111827] pt-12 pb-16 border-b-[6px] border-red-600">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            href="/banca-rasini"
            className="inline-flex items-center px-5 py-2 rounded-full border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-all text-[10px] font-bold tracking-widest uppercase mb-14"
          >
            ← Torna all'archivio
          </Link>

          <div className="flex items-center gap-4 mb-5">
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Reperto</span>
            <span className="text-red-500 font-bold tracking-widest text-xs">{metadata.anni}</span>
            <div className="h-px bg-slate-700 w-24"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            {metadata.titolo}
          </h1>
        </div>
      </div>

      {/* LAYOUT A DUE COLONNE */}
      <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* COLONNA SINISTRA: Testo Documento */}
        <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-sm shadow-sm border border-slate-200">
          <article className="max-w-none text-slate-800">
            <MDXRemote source={fileContent} components={customComponents} />
          </article>
        </div>

        {/* COLONNA DESTRA: Sidebar Dettagli */}
        <div className="lg:col-span-1">
          <div className="bg-[#1e293b] rounded-sm p-8 text-white shadow-md">
            <h3 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-6">
              Dettagli Reperto
            </h3>

            <div className="border-t border-slate-700 mb-6"></div>

            <div className="mb-8">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Anno di riferimento
              </p>
              <p className="text-2xl font-black text-red-500">
                {metadata.anni}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Classificazione
              </p>
              <p className="text-sm font-mono text-slate-200">
                {metadata.classificazione}
              </p>
            </div>
          </div>

          {metadata.citazione && (
            <div className="mt-6 border border-dashed border-slate-300 rounded-sm p-6 bg-transparent">
              <p className="text-slate-500 italic text-sm leading-relaxed">
                "{metadata.citazione}"
              </p>
            </div>
          )}

          {/* Mappe e Grafici Dinamici */}
          {slug === 'origini' && <CapitalFlowMap />}
          {slug === 'epilogo' && <NetworkGraph />}
          {slug === 'fininvest' && <DualThesisGraph />}
          {slug === 'analisi-forense' && <ForensicAnalysisGraph />}
        </div>

      </div>
    </div>
  );
}