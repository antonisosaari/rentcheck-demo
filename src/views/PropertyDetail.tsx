import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ArrowLeft, MapPin, FileText, ExternalLink, Calendar, User, Receipt, Euro, CheckCircle, Clock } from 'lucide-react';
import type { Property } from '../data/mockData';
import { leases, expenses } from '../data/mockData';

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

interface PropertyDetailProps {
  property: Property;
  onGenerateLetter: () => void;
  onBack: () => void;
}

type Tab = 'market' | 'sopimus' | 'kulut';

export function PropertyDetail({ property, onGenerateLetter, onBack }: PropertyDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('market');
  
  const delta = property.marketEstimate - property.currentRent;
  const deltaPercent = ((delta / property.currentRent) * 100).toFixed(1);

  const lease = leases.find(l => l.propertyId === property.id);
  const propertyExpenses = expenses.filter(e => e.propertyId === property.id);
  const totalExpenses = propertyExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Back + Title */}
      <motion.div variants={item} className="flex items-center gap-3 mb-5">
        <button
          onClick={onBack}
          className="p-2 rounded-xl glass transition-all duration-300 hover:bg-white/[0.08]"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-100">{property.address}</h1>
          <p className="text-xs text-slate-500">{property.neighborhood} · {property.type} · {property.size}m²</p>
        </div>
      </motion.div>

      {/* Photo Placeholder */}
      <motion.div variants={item} className="rounded-2xl h-40 mb-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 flex items-center justify-center shadow-lg shadow-black/20">
        <span className="text-4xl">🏠</span>
      </motion.div>

      {/* Key Stats Row */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3 mb-5">
        <div className="glass rounded-2xl p-3 text-center shadow-lg shadow-black/20">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Vuokra</p>
          <p className="text-xl font-bold text-green-400">{property.currentRent} €</p>
          <p className="text-[10px] text-slate-500">/kk</p>
        </div>
        <div className="glass-blue rounded-2xl p-3 text-center shadow-lg shadow-black/20">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Markkina</p>
          <p className="text-xl font-bold text-blue-400">{property.marketEstimate} €</p>
          <p className="text-[10px] text-slate-500">/kk</p>
        </div>
        <div className="glass-green rounded-2xl p-3 text-center shadow-lg shadow-black/20">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Erotus</p>
          <p className="text-xl font-bold text-green-400">+{delta} €</p>
          <p className="text-[10px] text-green-400/60">+{deltaPercent}%</p>
        </div>
      </motion.div>

      {/* Tenant Info */}
      <motion.div variants={item} className="flex flex-wrap gap-3 text-xs text-slate-500 mb-5">
        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{property.tenantName}</span>
        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Toistaiseksi</span>
        {lease && <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" />Max {lease.maxAnnualIncrease}%/v</span>}
      </motion.div>

      {/* Tabs */}
      <motion.div variants={item} className="glass rounded-2xl p-1 flex gap-1 mb-5 shadow-lg shadow-black/20">
        <TabButton active={activeTab === 'market'} onClick={() => setActiveTab('market')} label="Markkina" />
        <TabButton active={activeTab === 'sopimus'} onClick={() => setActiveTab('sopimus')} label="Sopimus" />
        <TabButton active={activeTab === 'kulut'} onClick={() => setActiveTab('kulut')} label="Kulut" badge={propertyExpenses.length} />
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'market' && (
        <MarketTab property={property} delta={delta} deltaPercent={deltaPercent} onGenerateLetter={onGenerateLetter} />
      )}
      {activeTab === 'sopimus' && lease && (
        <LeaseTab lease={lease} />
      )}
      {activeTab === 'kulut' && (
        <ExpensesTab expenses={propertyExpenses} totalExpenses={totalExpenses} />
      )}
    </motion.div>
  );
}

function TabButton({ active, onClick, label, badge }: { active: boolean; onClick: () => void; label: string; badge?: number }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
        active ? 'bg-green-400/15 text-green-400' : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
          active ? 'bg-green-400/20 text-green-400' : 'bg-white/10 text-slate-500'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DarkTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 shadow-lg shadow-black/30">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        {payload.map((p: { dataKey: string; value: number; color: string }, i: number) => (
          <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.dataKey === 'yourRent' ? 'Vuokra' : 'Markkina'}: {p.value} €
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function MarketTab({ property, delta, onGenerateLetter }: { property: Property; delta: number; deltaPercent?: string; onGenerateLetter: () => void }) {
  const avgComparable = Math.round(
    property.comparables.reduce((s, c) => s + c.rent, 0) / property.comparables.length
  );

  return (
    <>
      {/* Chart */}
      <motion.div variants={item} initial="hidden" animate="show" className="glass rounded-2xl p-5 mb-4 shadow-lg shadow-black/20">
        <h2 className="text-sm font-semibold text-slate-100 mb-1">Markkinavertailu</h2>
        <p className="text-xs text-slate-500 mb-4">Vuokrasi vs. markkinahinta (12 kk)</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={property.monthlyData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: '#64748b' }}
                axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}€`}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<DarkTooltip />} />
              <Line
                type="monotone"
                dataKey="yourRent"
                stroke="#64748b"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="marketAvg"
                stroke="#4ade80"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: '#4ade80', stroke: '#0f1115', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-slate-500 rounded inline-block" style={{ borderTop: '2px dashed #64748b' }}></span> Vuokra</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-green-400 rounded inline-block"></span> Markkina</span>
        </div>
      </motion.div>

      {/* Comparables */}
      <motion.div variants={item} initial="hidden" animate="show" className="glass rounded-2xl p-5 mb-4 shadow-lg shadow-black/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">Vertailukohteet</h2>
            <p className="text-xs text-slate-500">
              Keskihinta: <span className="font-semibold text-green-400">{avgComparable} €/kk</span>
            </p>
          </div>
          <span className="text-[10px] bg-white/5 text-slate-500 px-2 py-1 rounded-lg border border-white/5">
            {property.comparables.length} kohdetta
          </span>
        </div>
        <div className="space-y-2">
          {property.comparables.map((comp) => {
            const compDelta = comp.rent - property.currentRent;
            return (
              <div
                key={comp.id}
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-white/[0.05]"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">{comp.address}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                    <span>{comp.type} · {comp.size}m²</span>
                    <span>·</span>
                    <span>{comp.distance}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <ExternalLink className="w-2.5 h-2.5" />
                      {comp.source}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-100">{comp.rent} €</p>
                  <p className="text-[10px] font-medium text-green-400">
                    +{compDelta} €
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Delta Banner */}
      <motion.div variants={item} initial="hidden" animate="show" className="glass-green rounded-2xl p-4 mb-4 shadow-lg shadow-black/20">
        <p className="font-semibold text-green-400 text-sm">
          Potentiaali: +{delta} €/kk
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Vuositasolla +{(delta * 12).toLocaleString('fi-FI')} € lisää vuokratuloa
        </p>
      </motion.div>

      {/* Generate Letter CTA */}
      <motion.div variants={item} initial="hidden" animate="show">
        <button
          onClick={onGenerateLetter}
          className="w-full bg-green-500 text-black rounded-2xl p-4 flex items-center justify-center gap-2 font-semibold text-sm hover:bg-green-400 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-green-500/20"
        >
          <FileText className="w-5 h-5" />
          <span>Luo vuokrankorotuskirje</span>
        </button>
        <p className="text-center text-[10px] text-slate-600 mt-2">
          AI laatii korotusilmoituksen markkinadataan perustuen
        </p>
      </motion.div>
    </>
  );
}

function LeaseTab({ lease }: { lease: typeof leases[0] }) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fi-FI');
  };

  const daysUntil = (dateStr: string) => {
    const target = new Date(dateStr);
    const now = new Date('2026-02-05');
    return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  const notifyDays = daysUntil(lease.notifyByDate);

  return (
    <>
      <motion.div variants={item} initial="hidden" animate="show" className="glass rounded-2xl p-5 mb-4 shadow-lg shadow-black/20">
        <h2 className="text-sm font-semibold text-slate-100 mb-4">Sopimustiedot</h2>
        <div className="space-y-3">
          <InfoRow label="Vuokralainen" value={lease.tenantName} />
          <InfoRow label="Tyyppi" value="Toistaiseksi voimassa" />
          <InfoRow label="Alkamispäivä" value={formatDate(lease.leaseStart)} />
          <InfoRow label="Vuokra" value={`${lease.rentAmount} €/kk`} />
          <InfoRow label="Korotuslauseke" value={`Max ${lease.maxAnnualIncrease} %/v`} />
          <InfoRow label="Vakuus" value={`${lease.rentAmount * 2} € (2 kk)`} />
        </div>
      </motion.div>

      {/* Rent Increase History */}
      <motion.div variants={item} initial="hidden" animate="show" className="glass rounded-2xl p-5 mb-4 shadow-lg shadow-black/20">
        <h2 className="text-sm font-semibold text-slate-100 mb-4">Vuokrankorotukset</h2>
        
        {lease.lastIncreaseDate && (
          <div className="flex items-center gap-3 p-3 bg-green-400/10 rounded-xl mb-3 border border-green-400/10">
            <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-400">
                Edellinen: +{lease.lastIncreasePercent} %
              </p>
              <p className="text-xs text-slate-500">
                Voimaan {formatDate(lease.lastIncreaseDate)}
              </p>
            </div>
          </div>
        )}

        <div className={`flex items-center gap-3 p-3 rounded-xl border ${
          notifyDays <= 14
            ? 'bg-amber-400/10 border-amber-400/15'
            : 'bg-blue-400/10 border-blue-400/10'
        }`}>
          <Clock className={`w-4 h-4 shrink-0 ${notifyDays <= 14 ? 'text-amber-400' : 'text-blue-400'}`} />
          <div>
            <p className={`text-sm font-medium ${notifyDays <= 14 ? 'text-amber-400' : 'text-blue-400'}`}>
              Korotus mahdollinen {formatDate(lease.nextIncreaseEligible)}
            </p>
            <p className="text-xs text-slate-500">
              Ilmoitus viim. {formatDate(lease.notifyByDate)}
              {notifyDays > 0 ? ` (${notifyDays} pv)` : ' (myöhässä!)'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Signatures */}
      <motion.div variants={item} initial="hidden" animate="show" className="glass rounded-2xl p-5 shadow-lg shadow-black/20">
        <h2 className="text-sm font-semibold text-slate-100 mb-4">Allekirjoitukset</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]">
            <span className="text-sm text-slate-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Vuokranantaja
            </span>
            <span className="text-xs text-green-400 font-medium">Allekirjoitettu ✅</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]">
            <span className="text-sm text-slate-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Vuokralainen
            </span>
            <span className="text-xs text-green-400 font-medium">Allekirjoitettu ✅</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function ExpensesTab({ expenses: propertyExpenses, totalExpenses }: { expenses: typeof expenses; totalExpenses: number }) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fi-FI');
  };

  const categoryLabels: Record<string, string> = {
    korjaus: 'Korjaus',
    huolto: 'Huolto',
    vakuutus: 'Vakuutus',
    vastike: 'Vastike',
    tarvikkeet: 'Tarvikkeet',
    muu: 'Muu',
  };

  const categoryColors: Record<string, string> = {
    korjaus: 'bg-red-400/15 text-red-400',
    huolto: 'bg-amber-400/15 text-amber-400',
    vakuutus: 'bg-blue-400/15 text-blue-400',
    vastike: 'bg-purple-400/15 text-purple-400',
    tarvikkeet: 'bg-green-400/15 text-green-400',
    muu: 'bg-white/10 text-slate-400',
  };

  return (
    <>
      {/* Total */}
      <motion.div variants={item} initial="hidden" animate="show" className="glass rounded-2xl p-4 mb-4 flex items-center justify-between shadow-lg shadow-black/20">
        <div className="flex items-center gap-2">
          <Euro className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-400">Kulut yhteensä</span>
        </div>
        <span className="text-xl font-bold text-red-400">{totalExpenses.toLocaleString('fi-FI')} €</span>
      </motion.div>

      {/* Expense List */}
      <div className="space-y-2">
        {propertyExpenses.map((expense) => (
          <motion.div
            key={expense.id}
            variants={item}
            initial="hidden"
            animate="show"
            className="glass rounded-2xl p-4 shadow-lg shadow-black/20"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                <Receipt className="w-4 h-4 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${categoryColors[expense.category]}`}>
                    {categoryLabels[expense.category]}
                  </span>
                  <span className="text-[10px] text-slate-600">{formatDate(expense.date)}</span>
                </div>
                <h3 className="font-semibold text-slate-200 text-sm">{expense.vendor}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{expense.description}</p>
              </div>
              <span className="text-base font-bold text-slate-100 shrink-0">{expense.amount} €</span>
            </div>
          </motion.div>
        ))}
      </div>

      {propertyExpenses.length === 0 && (
        <motion.div variants={item} initial="hidden" animate="show" className="glass rounded-2xl p-8 text-center shadow-lg shadow-black/20">
          <Receipt className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Ei kuluja tälle asunnolle</p>
        </motion.div>
      )}
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-200">{value}</span>
    </div>
  );
}
