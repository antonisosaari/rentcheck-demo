import { motion } from 'framer-motion';
import { Building2, TrendingUp, CalendarClock, Euro, ChevronRight, FileText, Receipt } from 'lucide-react';
import { properties, getSummaryStats, leases, taxSummary2025 } from '../data/mockData';
import type { View } from '../App';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

interface DashboardProps {
  onSelectProperty: (id: string) => void;
  onNavigate: (view: View) => void;
}

export function Dashboard({ onSelectProperty, onNavigate }: DashboardProps) {
  const stats = getSummaryStats();

  // Find upcoming lease actions
  const urgentLease = leases.find(l => l.propertyId === 'kallio-1');

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Hero Section */}
      <motion.div variants={item} className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tervetuloa takaisin 👋</h1>
        <p className="text-gray-500 mt-1">Hallinnoi vuokra-asuntojasi yhdestä paikasta.</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <SummaryCard
          icon={<Building2 className="w-5 h-5" />}
          iconBg="bg-blue-50 text-[#2563eb]"
          label="Asuntoja"
          value={stats.totalProperties.toString()}
          subtitle="portfoliossa"
        />
        <SummaryCard
          icon={<Euro className="w-5 h-5" />}
          iconBg="bg-emerald-50 text-emerald-500"
          label="Vuokratulot"
          value={`${stats.totalMonthlyRent.toLocaleString('fi-FI')} €`}
          subtitle="kuukaudessa"
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5" />}
          iconBg="bg-violet-50 text-violet-500"
          label="Nettotulo 2025"
          value={`${taxSummary2025.netIncome.toLocaleString('fi-FI')} €`}
          subtitle="verojen jälkeen"
        />
        <SummaryCard
          icon={<CalendarClock className="w-5 h-5" />}
          iconBg="bg-amber-50 text-amber-500"
          label="Seuraava korotus"
          value="10 pv"
          subtitle="ilmoitusaika"
          highlight="warning"
        />
      </motion.div>

      {/* Urgent Alert Banner */}
      {urgentLease && (
        <motion.div variants={item}>
          <button
            onClick={() => onNavigate('leases')}
            className="w-full mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow text-left"
          >
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-amber-900 text-sm">Vuokrankorotus: {urgentLease.propertyAddress}</p>
              <p className="text-amber-700 text-xs mt-0.5">Ilmoitus vuokralaiselle lähetettävä viimeistään 15.2.2026 →</p>
            </div>
            <ChevronRight className="w-5 h-5 text-amber-400 shrink-0" />
          </button>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div variants={item} className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => onNavigate('expenses')}
          className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex items-center gap-3 hover:shadow-md hover:border-blue-200 transition-all text-left"
        >
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <Receipt className="w-5 h-5 text-[#2563eb]" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Lisää kuitti</p>
            <p className="text-xs text-gray-400">Tallenna kulu</p>
          </div>
        </button>
        <button
          onClick={() => onNavigate('leases')}
          className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex items-center gap-3 hover:shadow-md hover:border-blue-200 transition-all text-left"
        >
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#2563eb]" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Sopimukset</p>
            <p className="text-xs text-gray-400">Hallinnoi vuokrasopimuksia</p>
          </div>
        </button>
      </motion.div>

      {/* Property Cards */}
      <motion.div variants={item} className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Asunnot</h2>
      </motion.div>
      
      <div className="space-y-3">
        {properties.map((property) => {
          const delta = property.marketEstimate - property.currentRent;
          const deltaPercent = ((delta / property.currentRent) * 100).toFixed(1);
          const isUnderpriced = delta > 0;

          return (
            <motion.button
              key={property.id}
              variants={item}
              onClick={() => onSelectProperty(property.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-white rounded-xl border border-[#e2e8f0] p-4 flex items-center gap-4 hover:shadow-lg hover:border-blue-200 transition-all text-left group"
            >
              {/* Left: Neighborhood Badge */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-white font-bold text-lg">{property.neighborhood[0]}</span>
              </div>

              {/* Middle: Property Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {property.neighborhood} {property.type}
                  </h3>
                  <span className="text-xs text-gray-400 hidden sm:inline">{property.size}m²</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{property.address}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-sm font-medium text-gray-900">{property.currentRent} €/kk</span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-sm text-gray-500">{property.tenantName}</span>
                </div>
              </div>

              {/* Right: Delta */}
              <div className="flex flex-col items-end shrink-0">
                <div className={`px-2.5 py-1 rounded-lg text-sm font-semibold ${
                  isUnderpriced ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                }`}>
                  {isUnderpriced ? '-' : '+'}
                  {Math.abs(delta)} €
                </div>
                <span className={`text-xs mt-1 ${isUnderpriced ? 'text-red-400' : 'text-green-400'}`}>
                  {deltaPercent}% {isUnderpriced ? 'alle' : 'yli'}
                </span>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors shrink-0" />
            </motion.button>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div variants={item} className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          Markkina-analyysi päivitetty 5.2.2026 klo 14:30
        </p>
      </motion.div>
    </motion.div>
  );
}

function SummaryCard({
  icon,
  iconBg,
  label,
  value,
  subtitle,
  highlight,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  subtitle: string;
  highlight?: 'danger' | 'warning';
}) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${iconBg}`}>
        {icon}
      </div>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <p className={`text-xl font-bold mt-0.5 ${
        highlight === 'danger' ? 'text-red-600' : highlight === 'warning' ? 'text-amber-600' : 'text-gray-900'
      }`}>
        {value}
      </p>
      <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
    </div>
  );
}
