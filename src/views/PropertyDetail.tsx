import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { TrendingDown, MapPin, FileText, ExternalLink, Calendar, User, Receipt, Sparkles, Euro, CheckCircle, Clock } from 'lucide-react';
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

export function PropertyDetail({ property, onGenerateLetter }: PropertyDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('market');
  
  const delta = property.marketEstimate - property.currentRent;
  const deltaPercent = ((delta / property.currentRent) * 100).toFixed(1);

  const lease = leases.find(l => l.propertyId === property.id);
  const propertyExpenses = expenses.filter(e => e.propertyId === property.id);
  const totalExpenses = propertyExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Property Header Card */}
      <motion.div variants={item} className="bg-white rounded-xl border border-[#e2e8f0] p-5 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-100 text-[#2563eb] text-xs font-bold px-2.5 py-1 rounded-lg">
                {property.neighborhood}
              </span>
              <span className="text-sm text-gray-400">{property.type} · {property.size}m²</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{property.address}</h1>
          </div>
        </div>

        {/* Rent Comparison */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">Nykyinen vuokra</p>
            <p className="text-2xl font-bold text-gray-900">{property.currentRent} €</p>
            <p className="text-xs text-gray-400">/kk</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-xs text-blue-400 mb-1">Markkina-arvio</p>
            <p className="text-2xl font-bold text-[#2563eb]">{property.marketEstimate} €</p>
            <p className="text-xs text-blue-400">/kk</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <p className="text-xs text-red-400 mb-1">Erotus</p>
            <p className="text-2xl font-bold text-red-600">-{delta} €</p>
            <p className="text-xs text-red-400">-{deltaPercent}%</p>
          </div>
        </div>

        {/* Tenant & Lease Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{property.tenantName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Toistaiseksi voimassa</span>
          </div>
          {lease && (
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Max korotus {lease.maxAnnualIncrease} %/v</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={item} className="flex gap-1 mb-4 bg-white rounded-xl border border-[#e2e8f0] p-1">
        <TabButton active={activeTab === 'market'} onClick={() => setActiveTab('market')} label="Markkina" icon={<TrendingDown className="w-4 h-4" />} />
        <TabButton active={activeTab === 'sopimus'} onClick={() => setActiveTab('sopimus')} label="Sopimus" icon={<FileText className="w-4 h-4" />} />
        <TabButton active={activeTab === 'kulut'} onClick={() => setActiveTab('kulut')} label="Kulut" icon={<Receipt className="w-4 h-4" />} badge={propertyExpenses.length} />
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

function TabButton({ active, onClick, label, icon, badge }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode; badge?: number }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
        active ? 'bg-[#2563eb] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
          active ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function MarketTab({ property, delta, onGenerateLetter }: { property: Property; delta: number; deltaPercent?: string; onGenerateLetter: () => void }) {
  const avgComparable = Math.round(
    property.comparables.reduce((s, c) => s + c.rent, 0) / property.comparables.length
  );

  return (
    <>
      {/* Delta Banner */}
      <motion.div variants={item} initial="hidden" animate="show" className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
          <TrendingDown className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <p className="font-semibold text-red-900 text-sm">
            Vuokrasi on {delta} €/kk alle markkinahinnan
          </p>
          <p className="text-red-700 text-xs mt-0.5">
            Menetät vuodessa arviolta {delta * 12} € potentiaalista vuokratuloa
          </p>
        </div>
      </motion.div>

      {/* Market Chart */}
      <motion.div variants={item} initial="hidden" animate="show" className="bg-white rounded-xl border border-[#e2e8f0] p-5 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Markkinavertailu</h2>
        <p className="text-sm text-gray-400 mb-4">Vuokrasi vs. alueen markkinahinta (12 kk)</p>
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={property.monthlyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}€`}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  fontSize: '13px',
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any, name: any) => [
                  `${value} €/kk`,
                  name === 'yourRent' ? 'Sinun vuokra' : 'Markkinahinta',
                ]}
              />
              <Legend
                formatter={(value: string) =>
                  value === 'yourRent' ? 'Sinun vuokra' : 'Markkinahinta'
                }
              />
              <Line
                type="monotone"
                dataKey="yourRent"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="marketAvg"
                stroke="#2563eb"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5, fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Comparable Listings */}
      <motion.div variants={item} initial="hidden" animate="show" className="bg-white rounded-xl border border-[#e2e8f0] p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Vertailukohteet</h2>
            <p className="text-sm text-gray-400">
              Keskihinta: <span className="font-semibold text-[#2563eb]">{avgComparable} €/kk</span>
            </p>
          </div>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-lg">
            {property.comparables.length} kohdetta
          </span>
        </div>
        <div className="space-y-3">
          {property.comparables.map((comp) => {
            const compDelta = comp.rent - property.currentRent;
            const compDeltaPercent = ((compDelta / property.currentRent) * 100).toFixed(1);
            return (
              <div
                key={comp.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{comp.address}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                    <span>{comp.type} · {comp.size}m²</span>
                    <span>·</span>
                    <span>{comp.distance}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <ExternalLink className="w-3 h-3" />
                      {comp.source}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">{comp.rent} €/kk</p>
                  <p className={`text-xs font-medium ${compDelta > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {compDelta > 0 ? '+' : ''}{compDelta} € ({compDeltaPercent}%)
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Generate Letter CTA */}
      <motion.div variants={item} initial="hidden" animate="show">
        <button
          onClick={onGenerateLetter}
          className="w-full bg-gradient-to-r from-[#2563eb] to-blue-600 text-white rounded-xl p-4 flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.99]"
        >
          <FileText className="w-5 h-5" />
          <span className="font-semibold">Luo vuokrankorotuskirje</span>
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">
          Tekoäly laatii vuokrankorotusilmoituksen markkinadataan perustuen
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
      <motion.div variants={item} initial="hidden" animate="show" className="bg-white rounded-xl border border-[#e2e8f0] p-5 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sopimustiedot</h2>
        <div className="space-y-3">
          <InfoRow label="Vuokralainen" value={lease.tenantName} />
          <InfoRow label="Sopimuksen tyyppi" value="Toistaiseksi voimassa oleva" />
          <InfoRow label="Alkamispäivä" value={formatDate(lease.leaseStart)} />
          <InfoRow label="Vuokra" value={`${lease.rentAmount} €/kk`} />
          <InfoRow label="Korotuslauseke" value={`Max ${lease.maxAnnualIncrease} % vuodessa`} />
          <InfoRow label="Vakuus" value={`${lease.rentAmount * 2} € (2 kk vuokraa)`} />
        </div>
      </motion.div>

      {/* Rent Increase History */}
      <motion.div variants={item} initial="hidden" animate="show" className="bg-white rounded-xl border border-[#e2e8f0] p-5 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Vuokrankorotukset</h2>
        
        {lease.lastIncreaseDate && (
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg mb-3">
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">
                Edellinen korotus: +{lease.lastIncreasePercent} %
              </p>
              <p className="text-xs text-green-600">
                Voimaan {formatDate(lease.lastIncreaseDate)}
              </p>
            </div>
          </div>
        )}

        <div className={`flex items-center gap-3 p-3 rounded-lg ${
          notifyDays <= 14 ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50'
        }`}>
          <Clock className={`w-5 h-5 shrink-0 ${notifyDays <= 14 ? 'text-amber-500' : 'text-blue-500'}`} />
          <div>
            <p className={`text-sm font-medium ${notifyDays <= 14 ? 'text-amber-800' : 'text-blue-800'}`}>
              Seuraava korotus mahdollinen {formatDate(lease.nextIncreaseEligible)}
            </p>
            <p className={`text-xs ${notifyDays <= 14 ? 'text-amber-600' : 'text-blue-600'}`}>
              Ilmoitettava viimeistään {formatDate(lease.notifyByDate)}
              {notifyDays > 0 ? ` (${notifyDays} pv)` : ' (myöhässä!)'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Signature Status */}
      <motion.div variants={item} initial="hidden" animate="show" className="bg-white rounded-xl border border-[#e2e8f0] p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Allekirjoitukset</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-900">Vuokranantaja</span>
            </div>
            <span className="text-sm text-green-600 font-medium">Allekirjoitettu ✅</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-900">Vuokralainen</span>
            </div>
            <span className="text-sm text-green-600 font-medium">Allekirjoitettu ✅</span>
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
    korjaus: 'bg-red-50 text-red-700',
    huolto: 'bg-orange-50 text-orange-700',
    vakuutus: 'bg-blue-50 text-blue-700',
    vastike: 'bg-purple-50 text-purple-700',
    tarvikkeet: 'bg-emerald-50 text-emerald-700',
    muu: 'bg-gray-50 text-gray-700',
  };

  return (
    <>
      {/* Total */}
      <motion.div variants={item} initial="hidden" animate="show" className="bg-white rounded-xl border border-[#e2e8f0] p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Euro className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Kulut yhteensä</span>
        </div>
        <span className="text-xl font-bold text-gray-900">{totalExpenses.toLocaleString('fi-FI')} €</span>
      </motion.div>

      {/* Expense List */}
      <div className="space-y-3">
        {propertyExpenses.map((expense) => (
          <motion.div
            key={expense.id}
            variants={item}
            initial="hidden"
            animate="show"
            className="bg-white rounded-xl border border-[#e2e8f0] p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <Receipt className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${categoryColors[expense.category]}`}>
                    {categoryLabels[expense.category]}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(expense.date)}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{expense.vendor}</h3>
                <p className="text-sm text-gray-600 mt-0.5">{expense.description}</p>
                {expense.aiExtracted && (
                  <div className="mt-2 flex items-start gap-1.5 bg-blue-50 rounded-lg p-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#2563eb] shrink-0 mt-0.5" />
                    <span className="text-xs text-blue-800">{expense.aiExtracted}</span>
                  </div>
                )}
              </div>
              <span className="text-lg font-bold text-gray-900 shrink-0">{expense.amount} €</span>
            </div>
          </motion.div>
        ))}
      </div>

      {propertyExpenses.length === 0 && (
        <motion.div variants={item} initial="hidden" animate="show" className="bg-white rounded-xl border border-[#e2e8f0] p-8 text-center">
          <Receipt className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Ei kuluja tälle asunnolle</p>
        </motion.div>
      )}
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}
