import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Calendar, User, Euro, TrendingUp, CheckCircle, Clock, X, PenLine } from 'lucide-react';
import { leases } from '../data/mockData';

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

interface LeasesProps {
  onSelectProperty: (id: string) => void;
}

export function Leases({ onSelectProperty }: LeasesProps) {
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fi-FI');
  };

  const daysUntil = (dateStr: string) => {
    const target = new Date(dateStr);
    const now = new Date('2026-02-05');
    const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sopimukset</h1>
          <p className="text-sm text-gray-500 mt-1">Vuokrasopimukset ja korotukset</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#2563eb] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Luo uusi sopimus</span>
        </button>
      </motion.div>

      {/* Lease Cards */}
      <div className="space-y-4">
        {leases.map((lease) => {
          const notifyDays = daysUntil(lease.notifyByDate);
          const isUrgent = notifyDays <= 14 && notifyDays > 0;
          const isPast = notifyDays <= 0;

          return (
            <motion.div
              key={lease.id}
              variants={item}
              className={`bg-white rounded-xl border p-5 ${
                isUrgent ? 'border-amber-300 shadow-amber-100 shadow-md' : 'border-[#e2e8f0]'
              }`}
            >
              {/* Lease Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{lease.neighborhood[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{lease.propertyAddress}</h3>
                    <p className="text-sm text-gray-500">{lease.neighborhood} · Toistaiseksi voimassa</p>
                  </div>
                </div>
                <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  Voimassa
                </span>
              </div>

              {/* Lease Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Vuokralainen</p>
                    <p className="text-sm font-medium text-gray-900">{lease.tenantName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Alkanut</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(lease.leaseStart)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Vuokra</p>
                    <p className="text-sm font-medium text-gray-900">{lease.rentAmount} €/kk</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Korotuslauseke</p>
                    <p className="text-sm font-medium text-gray-900">max {lease.maxAnnualIncrease} %/vuosi</p>
                  </div>
                </div>
              </div>

              {/* Increase Info */}
              <div className={`rounded-lg p-3 mb-4 ${
                isUrgent ? 'bg-amber-50 border border-amber-200' : isPast ? 'bg-gray-50' : 'bg-blue-50'
              }`}>
                {lease.lastIncreaseDate ? (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-gray-700">
                      Edellinen korotus {formatDate(lease.lastIncreaseDate)}: +{lease.lastIncreasePercent} %
                    </span>
                  </div>
                ) : null}
                <div className={`flex items-center gap-2 text-sm ${lease.lastIncreaseDate ? 'mt-2' : ''}`}>
                  {isUrgent ? (
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  ) : (
                    <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                  )}
                  <span className={isUrgent ? 'text-amber-800 font-medium' : 'text-gray-700'}>
                    Seuraava korotus mahdollinen {formatDate(lease.nextIncreaseEligible)}
                    {isUrgent && (
                      <span className="text-amber-600"> — ilmoitettava viimeistään {formatDate(lease.notifyByDate)} ({notifyDays} pv)</span>
                    )}
                    {!isUrgent && !isPast && (
                      <span className="text-gray-500"> (ilmoitus viim. {formatDate(lease.notifyByDate)})</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Signature Status */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="text-gray-500">Allekirjoitukset:</span>
                <span className="flex items-center gap-1">
                  {lease.landlordSigned ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-500" />
                  )}
                  <span className={lease.landlordSigned ? 'text-green-700' : 'text-amber-700'}>
                    Vuokranantaja {lease.landlordSigned ? '✅' : '⏳'}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  {lease.tenantSigned ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-500" />
                  )}
                  <span className={lease.tenantSigned ? 'text-green-700' : 'text-amber-700'}>
                    Vuokralainen {lease.tenantSigned ? '✅' : '⏳'}
                  </span>
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(lease.id)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-[#e2e8f0] rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Näytä sopimus</span>
                </button>
                <button
                  onClick={() => onSelectProperty(lease.propertyId)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-[#e2e8f0] rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span>Asunnon tiedot →</span>
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-[#2563eb] hover:bg-blue-100 transition-colors"
                >
                  <PenLine className="w-4 h-4" />
                  <span>Allekirjoita sähköisesti</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lease Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <LeasePreviewModal
            lease={leases.find(l => l.id === showPreview)!}
            onClose={() => setShowPreview(null)}
          />
        )}
      </AnimatePresence>

      {/* New Lease Form Modal */}
      <AnimatePresence>
        {showForm && (
          <NewLeaseFormModal onClose={() => setShowForm(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LeasePreviewModal({ lease, onClose }: { lease: typeof leases[0]; onClose: () => void }) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fi-FI');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2563eb]" />
            <h2 className="text-lg font-bold text-gray-900">Vuokrasopimus</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-[inherit] leading-relaxed">
{`ASUINHUONEISTON VUOKRASOPIMUS
Toistaiseksi voimassa oleva

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VUOKRANANTAJA
[Vuokranantajan nimi]
[Osoite]
[Puhelinnumero]

VUOKRALAINEN
${lease.tenantName}
[Vuokralaisen osoite]
[Puhelinnumero]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VUOKRAUKSEN KOHDE
Osoite: ${lease.propertyAddress}, Helsinki
Huoneisto: ${lease.neighborhood}

VUOKRA-AIKA
Sopimus on voimassa toistaiseksi ${formatDate(lease.leaseStart)} alkaen.
Irtisanomisaika on vuokranantajalle 6 kuukautta ja 
vuokralaiselle 1 kuukausi.

VUOKRA
Vuokra on ${lease.rentAmount},00 euroa kuukaudessa.
Vuokra maksetaan kuukauden 2. päivään mennessä 
vuokranantajan ilmoittamalle pankkitilille.

VUOKRANKOROTUS
Vuokranantajalla on oikeus korottaa vuokraa kerran 
vuodessa sopimuksen alkamispäivästä lukien. 
Korotus on enintään ${lease.maxAnnualIncrease} % vuodessa.
Korotuksesta on ilmoitettava kirjallisesti 
vähintään 2 kuukautta ennen korotuksen voimaantuloa.

VAKUUS
Vuokralainen on maksanut vakuuden, joka vastaa 
kahden (2) kuukauden vuokraa eli ${lease.rentAmount * 2},00 euroa.

MUUT EHDOT
- Tupakointi huoneistossa on kielletty
- Lemmikkieläimet: sovittava erikseen
- Vuokralainen vastaa huoneiston tavanomaisesta 
  kunnossapidosta

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ALLEKIRJOITUKSET

Päivämäärä: ${formatDate(lease.leaseStart)}

Vuokranantaja: ________________________
               [Vuokranantajan nimi]

Vuokralainen: ________________________
               ${lease.tenantName}`}
          </pre>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NewLeaseFormModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#e2e8f0]">
          <h2 className="text-lg font-bold text-gray-900">Luo uusi sopimus</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <FormField label="Vuokralaisen nimi" placeholder="Etunimi Sukunimi" />
          <FormField label="Vuokralaisen sähköposti" placeholder="email@esimerkki.fi" type="email" />
          <FormField label="Vuokralaisen puhelinnumero" placeholder="+358 40 123 4567" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Asunto</label>
            <select className="w-full px-3 py-2.5 bg-gray-50 border border-[#e2e8f0] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Valitse asunto...</option>
              <option>Fleminginkatu 15 B 23, Kallio</option>
              <option>Hämeentie 42 A 8, Sörnäinen</option>
              <option>Nilsiänkatu 8 C 12, Vallila</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Vuokra (€/kk)" placeholder="950" type="number" />
            <FormField label="Vakuus (kk)" placeholder="2" type="number" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Alkamispäivä" type="date" />
            <FormField label="Max korotus (%/v)" placeholder="5" type="number" />
          </div>
          <div className="pt-2 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-[#e2e8f0] rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Peruuta
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-[#2563eb] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Luo sopimus
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FormField({
  label,
  placeholder,
  type = 'text',
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-gray-50 border border-[#e2e8f0] rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
