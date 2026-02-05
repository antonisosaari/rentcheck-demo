import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Check, FileText, Sparkles } from 'lucide-react';
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

export function RentLetter({ property }: RentLetterProps) {
  const [copied, setCopied] = useState(false);

  const delta = property.marketEstimate - property.currentRent;
  const deltaPercent = ((delta / property.currentRent) * 100).toFixed(1);
  const newRent = Math.round(property.currentRent + delta * 0.75); // Suggest 75% of delta
  const increaseAmount = newRent - property.currentRent;
  const increasePercent = ((increaseAmount / property.currentRent) * 100).toFixed(1);

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

Vuokrankorotus perustuu huoneiston vuokran saattamiseen lähemmäksi alueen käypää vuokratasoa. Vuokrankorotus on kohtuullinen seuraavilla perusteilla:

1. Alueen vuokrataso
${property.neighborhood}n alueen vastaavien ${property.type}-asuntojen keskimääräinen vuokrataso on tällä hetkellä ${avgComparable} €/kk. Nykyinen vuokra ${property.currentRent} €/kk on ${deltaPercent} % alle alueen keskitason.

2. Vertailukohteet
Seuraavat vastaavat asunnot ovat tarjolla tai äskettäin vuokrattu alueella:
${property.comparables.slice(0, 4).map((c) => `   - ${c.address} (${c.type}, ${c.size} m²): ${c.rent} €/kk (${c.source}, ${c.listedDate})`).join('\n')}

3. Kohtuullisuus
Korotuksen jälkeenkin vuokra ${newRent} €/kk jää alle alueen markkinahinnan (${property.marketEstimate} €/kk). Korotus vastaa ${increasePercent} % nykyisestä vuokrasta.

LAKIPERUSTE

Vuokrankorotus perustuu asuinhuoneiston vuokrauksesta annetun lain (481/1995) 27 §:ään. Vuokranantajalla on oikeus korottaa vuokraa ilmoittamalla siitä kirjallisesti vuokralaiselle. Korotus astuu voimaan aikaisintaan kahden kuukauden kuluttua ilmoituksesta.

Vuokrankorotus on kohtuullinen asuinhuoneiston vuokrauksesta annetun lain 30 §:n tarkoittamalla tavalla, ottaen huomioon vuokran suhde alueen vastaavien huoneistojen vuokratasoon.

Mikäli haluatte keskustella korotuksesta tai teillä on kysyttävää, ottakaa yhteyttä allekirjoittaneeseen.

Ystävällisin terveisin,

___________________________
[Vuokranantajan nimi]
[Puhelinnumero]
[Sähköpostiosoite]

Tämä ilmoitus on lähetetty asuinhuoneiston vuokrauksesta annetun lain (481/1995) mukaisesti.`;

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
      {/* Header */}
      <motion.div variants={item} className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-[#2563eb]" />
          <span className="text-sm font-medium text-[#2563eb]">AI-generoitu</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Vuokrankorotuskirje</h1>
        <p className="text-sm text-gray-500 mt-1">
          Laadittu markkinadatan perusteella · {property.address}
        </p>
      </motion.div>

      {/* Summary Card */}
      <motion.div variants={item} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-blue-400">Nykyinen</p>
            <p className="text-lg font-bold text-gray-900">{property.currentRent} €</p>
          </div>
          <div>
            <p className="text-xs text-blue-400">Ehdotettu</p>
            <p className="text-lg font-bold text-[#2563eb]">{newRent} €</p>
          </div>
          <div>
            <p className="text-xs text-blue-400">Korotus</p>
            <p className="text-lg font-bold text-emerald-600">+{increaseAmount} €</p>
            <p className="text-xs text-emerald-500">+{increasePercent}%</p>
          </div>
        </div>
      </motion.div>

      {/* Letter Content */}
      <motion.div variants={item} className="bg-white rounded-xl border border-[#e2e8f0] mb-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Vuokrankorotusilmoitus</span>
          </div>
          <span className="text-xs text-gray-400">Suomi · Laki 481/1995</span>
        </div>
        <div className="p-5 sm:p-8">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-[inherit] leading-relaxed">
            {letterText}
          </pre>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={item} className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 bg-white border border-[#e2e8f0] rounded-xl p-3.5 flex items-center justify-center gap-2 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-green-600">Kopioitu!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Kopioi teksti</span>
            </>
          )}
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 bg-[#2563eb] text-white rounded-xl p-3.5 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          <span>Lataa tiedostona</span>
        </button>
      </motion.div>

      {/* Disclaimer */}
      <motion.div variants={item} className="mt-4 text-center">
        <p className="text-xs text-gray-400 leading-relaxed">
          ⚠️ Tämä kirje on tekoälyn luoma malli. Tarkista tiedot ja muokkaa tarvittaessa ennen lähettämistä.
          <br />
          Suosittelemme konsultoimaan lakimiestä ennen vuokrankorotuksen toteuttamista.
        </p>
      </motion.div>
    </motion.div>
  );
}
