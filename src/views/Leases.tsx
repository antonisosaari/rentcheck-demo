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
    return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Sopimukset</h1>
          <p className="text-xs text-slate-500 mt-1">Vuokrasopimukset ja korotukset</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-green-500 text-black rounded-xl text-xs font-semibold hover:bg-green-400 transition-all duration-300"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Uusi</span>
        </button>
      </motion.div>

      {/* Lease Cards */}
      <div className="space-y-3">
        {leases.map((lease) => {
          const notifyDays = daysUntil(lease.notifyByDate);
          const isUrgent = notifyDays <= 14 && notifyDays > 0;

          return (
            <motion.div
              key={lease.id}
              variants={item}
              className={`glass rounded-2xl p-5 shadow-lg shadow-black/20 ${
                isUrgent ? 'border-amber-400/20' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-bold">{lease.neighborhood[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 text-sm">{lease.propertyAddress}</h3>
                    <p className="text-xs text-slate-500">{lease.neighborhood} · Toistaiseksi</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/15">
                  Voimassa
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-600" />
                  <div>
                    <p className="text-[10px] text-slate-600">Vuokralainen</p>
                    <p className="text-xs font-medium text-slate-300">{lease.tenantName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-600" />
                  <div>
                    <p className="text-[10px] text-slate-600">Alkanut</p>
                    <p className="text-xs font-medium text-slate-300">{formatDate(lease.leaseStart)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="w-3.5 h-3.5 text-slate-600" />
                  <div>
                    <p className="text-[10px] text-slate-600">Vuokra</p>
                    <p className="text-xs font-medium text-green-400">{lease.rentAmount} €/kk</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-slate-600" />
                  <div>
                    <p className="text-[10px] text-slate-600">Korotus</p>
                    <p className="text-xs font-medium text-slate-300">max {lease.maxAnnualIncrease}%/v</p>
                  </div>
                </div>
              </div>

              {/* Increase Info */}
              <div className={`rounded-xl p-3 mb-4 border ${
                isUrgent
                  ? 'bg-amber-400/10 border-amber-400/15'
                  : 'bg-white/[0.03] border-white/5'
              }`}>
                {lease.lastIncreaseDate && (
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span className="text-slate-400">
                      Edellinen korotus {formatDate(lease.lastIncreaseDate)}: +{lease.lastIncreasePercent}%
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs">
                  {isUrgent ? (
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  ) : (
                    <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  )}
                  <span className={isUrgent ? 'text-amber-400' : 'text-slate-400'}>
                    Seuraava korotus {formatDate(lease.nextIncreaseEligible)}
                    {isUrgent && ` — ilmoita viim. ${formatDate(lease.notifyByDate)} (${notifyDays}pv)`}
                    {!isUrgent && ` (ilmoitus viim. ${formatDate(lease.notifyByDate)})`}
                  </span>
                </div>
              </div>

              {/* Signatures */}
              <div className="flex items-center gap-3 mb-4 text-xs">
                <span className="text-slate-600">Allekirjoitukset:</span>
                <span className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" /> Vuokranantaja ✅
                </span>
                <span className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" /> Vuokralainen ✅
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(lease.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-slate-400 bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Sopimus
                </button>
                <button
                  onClick={() => onSelectProperty(lease.propertyId)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-slate-400 bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all duration-300"
                >
                  Asunto →
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-green-400 bg-green-400/10 border border-green-400/10 hover:bg-green-400/15 transition-all duration-300"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  e-Allekirjoitus
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showPreview && (
          <LeasePreviewModal
            lease={leases.find(l => l.id === showPreview)!}
            onClose={() => setShowPreview(null)}
          />
        )}
      </AnimatePresence>

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
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-400" />
            <h2 className="text-base font-bold text-slate-100">Vuokrasopimus</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 transition-all duration-300">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <div className="p-5">
          <pre className="text-xs text-slate-300 whitespace-pre-wrap font-[inherit] leading-relaxed">
{`ASUINHUONEISTON VUOKRASOPIMUS
Toistaiseksi voimassa oleva

━━━━━━━━━━━━━━━━━━━━━━━━━━

VUOKRANANTAJA
[Vuokranantajan nimi]

VUOKRALAINEN
${lease.tenantName}

━━━━━━━━━━━━━━━━━━━━━━━━━━

VUOKRAUKSEN KOHDE
${lease.propertyAddress}, Helsinki

VUOKRA-AIKA
Toistaiseksi ${formatDate(lease.leaseStart)} alkaen.

VUOKRA
${lease.rentAmount},00 €/kk

VUOKRANKOROTUS
Max ${lease.maxAnnualIncrease} % vuodessa.
Ilmoitettava 2 kk ennen.

VAKUUS
${lease.rentAmount * 2},00 € (2 kk vuokraa)

━━━━━━━━━━━━━━━━━━━━━━━━━━

ALLEKIRJOITUKSET

Päivämäärä: ${formatDate(lease.leaseStart)}

Vuokranantaja: ________________________
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
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-base font-bold text-slate-100">Luo uusi sopimus</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 transition-all duration-300">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <FormField label="Vuokralaisen nimi" placeholder="Etunimi Sukunimi" />
          <FormField label="Sähköposti" placeholder="email@esimerkki.fi" type="email" />
          <FormField label="Puhelinnumero" placeholder="+358 40 123 4567" />
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Asunto</label>
            <select className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent">
              <option value="" className="bg-[#1a1d23]">Valitse asunto...</option>
              <option value="1" className="bg-[#1a1d23]">Fleminginkatu 15 B 23, Kallio</option>
              <option value="2" className="bg-[#1a1d23]">Hämeentie 42 A 8, Sörnäinen</option>
              <option value="3" className="bg-[#1a1d23]">Nilsiänkatu 8 C 12, Vallila</option>
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
              className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/[0.08] transition-all duration-300"
            >
              Peruuta
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-green-500 text-black rounded-xl text-sm font-semibold hover:bg-green-400 transition-all duration-300"
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
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent"
      />
    </div>
  );
}
