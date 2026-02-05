import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
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
    if (diffHours < 24) return `${diffHours}h sitten`;
    if (diffDays === 1) return 'Eilen';
    if (diffDays < 7) return `${diffDays}pv sitten`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}kk sitten`;
    return date.toLocaleDateString('fi-FI');
  };

  const severityBadgeColor: Record<string, string> = {
    urgent: 'bg-red-400/15 text-red-400 border-red-400/15',
    warning: 'bg-amber-400/15 text-amber-400 border-amber-400/15',
    info: 'bg-blue-400/15 text-blue-400 border-blue-400/15',
  };

  const typeLabels: Record<string, string> = {
    listing: 'Listaus',
    renewal: 'Sopimus',
    market: 'Markkina',
    recommendation: 'Suositus',
    lease: 'Korotus',
    'rent-increase': 'Kirje',
  };

  const urgentCount = alerts.filter(a => a.severity === 'urgent').length;
  const warningCount = alerts.filter(a => a.severity === 'warning').length;
  const infoCount = alerts.filter(a => a.severity === 'info').length;

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Header */}
      <motion.div variants={item} className="mb-5">
        <h1 className="text-xl font-bold text-slate-100">Ilmoitukset</h1>
        <p className="text-xs text-slate-500 mt-1">Sopimukset, markkina ja muistutukset</p>
      </motion.div>

      {/* Alert Stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-2 mb-5">
        <div className="glass rounded-2xl p-3 text-center shadow-lg shadow-black/20">
          <p className="text-2xl font-bold text-red-400">{urgentCount}</p>
          <p className="text-[10px] text-slate-500">Kiireellinen</p>
        </div>
        <div className="glass rounded-2xl p-3 text-center shadow-lg shadow-black/20">
          <p className="text-2xl font-bold text-amber-400">{warningCount}</p>
          <p className="text-[10px] text-slate-500">Varoitus</p>
        </div>
        <div className="glass rounded-2xl p-3 text-center shadow-lg shadow-black/20">
          <p className="text-2xl font-bold text-blue-400">{infoCount}</p>
          <p className="text-[10px] text-slate-500">Tiedoksi</p>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="space-y-2">
        {alerts.map((alert) => (
          <motion.button
            key={alert.id}
            variants={item}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert.propertyId && onSelectProperty(alert.propertyId)}
            className="w-full glass rounded-2xl p-4 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">{alert.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${severityBadgeColor[alert.severity]}`}>
                    {typeLabels[alert.type] || alert.type}
                  </span>
                  <span className="text-[10px] text-slate-600">{formatTimestamp(alert.timestamp)}</span>
                </div>
                <h3 className="font-semibold text-slate-200 text-sm">{alert.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{alert.description}</p>
              </div>
              {alert.propertyId && (
                <ChevronRight className="w-4 h-4 text-slate-600 shrink-0 mt-1" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div variants={item} className="mt-6 text-center">
        <p className="text-[10px] text-slate-600">
          Ilmoitukset perustuvat sopimustietoihin ja markkinadataan
        </p>
      </motion.div>
    </motion.div>
  );
}
