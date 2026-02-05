import { motion } from 'framer-motion';
import { ChevronRight, Filter } from 'lucide-react';
import { alerts } from '../data/mockData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

interface AlertsProps {
  onSelectProperty: (id: string) => void;
}

export function Alerts({ onSelectProperty }: AlertsProps) {
  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    const now = new Date('2026-02-05T17:00:00');
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Juuri nyt';
    if (diffHours < 24) return `${diffHours} tuntia sitten`;
    if (diffDays === 1) return 'Eilen';
    if (diffDays < 7) return `${diffDays} päivää sitten`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} kk sitten`;
    return date.toLocaleDateString('fi-FI');
  };

  const severityStyles = {
    urgent: 'border-l-4 border-l-red-500 bg-red-50/50',
    warning: 'border-l-4 border-l-amber-400 bg-amber-50/30',
    info: 'border-l-4 border-l-blue-300 bg-white',
  };

  const severityBadge = {
    urgent: 'bg-red-100 text-red-700',
    warning: 'bg-amber-100 text-amber-700',
    info: 'bg-blue-50 text-blue-600',
  };

  const typeLabels: Record<string, string> = {
    listing: 'Uusi listaus',
    renewal: 'Sopimus',
    market: 'Markkina',
    recommendation: 'Suositus',
    lease: 'Vuokrankorotus',
    'rent-increase': 'Korotuskirje',
  };

  const urgentCount = alerts.filter(a => a.severity === 'urgent').length;
  const warningCount = alerts.filter(a => a.severity === 'warning').length;
  const infoCount = alerts.filter(a => a.severity === 'info').length;

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ilmoitukset</h1>
          <p className="text-sm text-gray-500 mt-1">Sopimukset, markkinamuutokset ja muistutukset</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Suodata</span>
        </button>
      </motion.div>

      {/* Alert Stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-3 text-center">
          <p className="text-2xl font-bold text-red-600">{urgentCount}</p>
          <p className="text-xs text-gray-400">Kiireellinen</p>
        </div>
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-3 text-center">
          <p className="text-2xl font-bold text-amber-500">{warningCount}</p>
          <p className="text-xs text-gray-400">Varoituksia</p>
        </div>
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-3 text-center">
          <p className="text-2xl font-bold text-blue-500">{infoCount}</p>
          <p className="text-xs text-gray-400">Tiedoksi</p>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <motion.button
            key={alert.id}
            variants={item}
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            onClick={() => alert.propertyId && onSelectProperty(alert.propertyId)}
            className={`w-full rounded-xl p-4 text-left transition-all hover:shadow-md ${severityStyles[alert.severity]}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0 mt-0.5">{alert.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${severityBadge[alert.severity]}`}>
                    {typeLabels[alert.type] || alert.type}
                  </span>
                  <span className="text-xs text-gray-400">{formatTimestamp(alert.timestamp)}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{alert.title}</h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{alert.description}</p>
              </div>
              {alert.propertyId && (
                <ChevronRight className="w-5 h-5 text-gray-300 shrink-0 mt-1" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Bottom */}
      <motion.div variants={item} className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          Ilmoitukset perustuvat sopimustietoihin ja reaaliaikaiseen markkinadatan seurantaan
        </p>
      </motion.div>
    </motion.div>
  );
}
