import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Check, FileText, Sparkles, ArrowLeft, AlertTriangle } from 'lucide-react';
import type { Property } from '../data/mockData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

interface RentLetterProps {
  property: Property;
  onBack: () => void;
}

export function RentLetter({ property, onBack }: RentLetterProps) {
  const [copied, setCopied] = useState(false);

  const delta = property.marketEstimate - property.currentRent;
  const newRent = Math.round(property.currentRent + delta * 0.75);
  const increaseAmount = newRent - property.currentRent;
  const increasePercent = ((increaseAmount / property.currentRent) * 100).toFixed(1);
  const deltaPercent = ((delta / property.currentRent) * 100).toFixed(1);

  const avgComparable = Math.round(
    property.comparables.reduce((s, c) => s + c.rent, 0) / property.comparables.length
  );

  const today = new Date();
  const effectiveDate = new Date(today);
  effectiveDate.setMonth(effectiveDate.getMonth() + 2);
  effectiveDate.setDate(1);

  const formatDate = (d: Date) =>
    `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;

  const letterText = `VUOKRANKOROTUSILMOITUS

Vuokranantaja: [Vuokranantajan nimi]
Vuokralainen: ${property.tenantName}
Asunto: ${property.address}, Helsinki
Huoneisto: ${property.type}, ${property.size} m²
Vuokrasopimuksen päivämäärä: ${property.leaseStart}

Päivämäärä: ${formatDate(today)}

Hyvä ${property.tenantName},

Ilmoitan täten asuinhuoneiston vuokrankorotuksesta seuraavasti:

VUOKRANKOROTUS

Nykyinen vuokra: ${property.currentRent},00 €/kk
Uusi vuokra: ${newRent},00 €/kk
Korotuksen määrä: ${increaseAmount},00 €/kk (${increasePercent} %)
Korotus astuu voimaan: ${formatDate(effectiveDate)}

PERUSTELUT

Vuokrankorotus perustuu huoneiston vuokran saattamiseen lähemmäksi alueen käypää vuokratasoa.

1. Alueen vuokrataso
${property.neighborhood}n alueen vastaavien ${property.type}-asuntojen keskimääräinen vuokrataso on ${avgComparable} €/kk. Nykyinen vuokra ${property.currentRent} €/kk on ${deltaPercent} % alle alueen keskitason.

2. Vertailukohteet
${property.comparables.slice(0, 4).map((c) => `   - ${c.address} (${c.type}, ${c.size} m²): ${c.rent} €/kk (${c.source})`).join('\n')}

3. Kohtuullisuus
Korotuksen jälkeenkin vuokra ${newRent} €/kk jää alle markkinahinnan (${property.marketEstimate} €/kk). Korotus on ${increasePercent} %.

LAKIPERUSTE

Laki asuinhuoneiston vuokrauksesta (481/1995) 27 § ja 30 §.

Ystävällisin terveisin,

___________________________
[Vuokranantajan nimi]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([letterText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vuokrankorotus_${property.neighborhood.toLowerCase()}_${formatDate(today).replace(/\./g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Back + Header */}
      <motion.div variants={item} className="flex items-center gap-3 mb-5">
        <button
          onClick={onBack}
          className="p-2 rounded-xl glass transition-all duration-300 hover:bg-white/[0.08]"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-xs font-medium text-green-400">AI-generoitu</span>
          </div>
          <h1 className="text-lg font-bold text-slate-100">Vuokrankorotuskirje</h1>
        </div>
      </motion.div>

      {/* Summary Card */}
      <motion.div variants={item} className="glass-green rounded-2xl p-5 mb-4 shadow-lg shadow-black/20">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Nykyinen</p>
            <p className="text-lg font-bold text-slate-200">{property.currentRent} €</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Ehdotettu</p>
            <p className="text-lg font-bold text-green-400">{newRent} €</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Korotus</p>
            <p className="text-lg font-bold text-green-400">+{increaseAmount} €</p>
            <p className="text-[10px] text-green-400/60">+{increasePercent}%</p>
          </div>
        </div>
      </motion.div>

      {/* Letter Content */}
      <motion.div variants={item} className="glass rounded-2xl mb-4 overflow-hidden shadow-lg shadow-black/20">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-medium text-slate-400">Vuokrankorotusilmoitus</span>
          </div>
          <span className="text-[10px] text-slate-600">Laki 481/1995</span>
        </div>
        <div className="p-5">
          <pre className="text-xs text-slate-300 whitespace-pre-wrap font-[inherit] leading-relaxed">
            {letterText}
          </pre>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={item} className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 glass rounded-2xl p-3.5 flex items-center justify-center gap-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/[0.08]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Kopioitu!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Kopioi</span>
            </>
          )}
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 bg-green-500 text-black rounded-2xl p-3.5 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-green-400 transition-all duration-300 shadow-lg shadow-green-500/20"
        >
          <Download className="w-4 h-4" />
          <span>Lataa</span>
        </button>
      </motion.div>

      {/* Disclaimer */}
      <motion.div variants={item} className="mt-4 text-center">
        <p className="text-[10px] text-slate-600 leading-relaxed">
          <span className="inline-flex items-center gap-1"><AlertTriangle size={10} /> AI-luoma malli. Tarkista tiedot ennen lähettämistä.</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
