import { motion } from 'framer-motion';
import { ChevronRight, Plus, Send, AlertTriangle, Clock, MessageCircle, Lightbulb } from 'lucide-react';
import { properties } from '../data/mockData';
import type { View } from '../App';
import type { ReactNode } from 'react';

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
  onSelectProperty: (id: string, initialTab?: string) => void;
  onNavigate: (view: View) => void;
}

interface FeedItem {
  id: string;
  priority: 'urgent' | 'warning' | 'info' | 'tip';
  icon: ReactNode;
  title: string;
  subtitle: string;
  action?: () => void;
}

export function Dashboard({ onSelectProperty, onNavigate }: DashboardProps) {
  const totalRent = properties.reduce((sum, p) => sum + p.currentRent, 0);
  const listingCount = 1; // kallio-1 has active listing

  const feedItems: FeedItem[] = [
    {
      id: 'f1',
      priority: 'urgent',
      icon: <AlertTriangle size={16} className="text-red-400" />,
      title: 'Vuokrankorotus: Fleminginkatu',
      subtitle: 'Ilmoita vuokralaiselle viim. 15.2.2026',
      action: () => onSelectProperty('kallio-1', 'sopimus'),
    },
    {
      id: 'f2',
      priority: 'warning',
      icon: <Clock size={16} className="text-amber-400" />,
      title: 'Uusi hakija: Petra Nieminen',
      subtitle: 'Fleminginkatu · Sairaanhoitaja · 3 400 €/kk',
      action: () => onSelectProperty('kallio-1', 'valitys'),
    },
    {
      id: 'f3',
      priority: 'warning',
      icon: <Clock size={16} className="text-amber-400" />,
      title: 'Näyttö huomenna: Juha Mäkinen klo 17:00',
      subtitle: 'Fleminginkatu 15 B · +perhe',
      action: () => onSelectProperty('kallio-1', 'valitys'),
    },
    {
      id: 'f4',
      priority: 'info',
      icon: <MessageCircle size={16} className="text-blue-400" />,
      title: 'Matti Virtanen lähetti viestin',
      subtitle: '"Sopii hyvin, kiitos nopeasta reagoinnista!"',
      action: () => onNavigate('messages'),
    },
    {
      id: 'f5',
      priority: 'tip',
      icon: <Lightbulb size={16} className="text-green-400" />,
      title: 'Vinkki: Matin vuokrasuhde täyttää 2v ensi kuussa',
      subtitle: 'Harkitse kiitosviesti tai pieni lahja',
      action: () => onSelectProperty('kallio-1', 'vuokralainen'),
    },
  ];

  const borderColors: Record<string, string> = {
    urgent: 'border-l-red-500',
    warning: 'border-l-amber-400',
    info: 'border-l-blue-400',
    tip: 'border-l-green-400',
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Greeting */}
      <motion.div variants={item} className="mb-5">
        <p className="text-slate-400 text-sm">Hei Jyri</p>
      </motion.div>

      {/* Summary Stats */}
      <motion.div variants={item} className="glass-green rounded-2xl p-5 mb-5 shadow-lg shadow-black/20">
        <p className="text-sm font-semibold text-green-400 mb-1">
          {properties.length} asuntoa · €{totalRent.toLocaleString('fi-FI')}/kk · {listingCount} välityksessä
        </p>
        <p className="text-xs text-slate-500">Käyttöaste 100%</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="flex gap-3 mb-5">
        <button
          onClick={() => onSelectProperty('kallio-1', 'valitys')}
          className="flex-1 glass rounded-2xl p-3 flex items-center justify-center gap-2 text-xs font-medium text-green-400 hover:bg-white/[0.08] transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Luo ilmoitus
        </button>
        <button
          onClick={() => onNavigate('messages')}
          className="flex-1 glass rounded-2xl p-3 flex items-center justify-center gap-2 text-xs font-medium text-green-400 hover:bg-white/[0.08] transition-all duration-300"
        >
          <Send className="w-4 h-4" />
          Lähetä viesti
        </button>
      </motion.div>

      {/* Section Label */}
      <motion.div variants={item} className="mb-3">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">Huomioitavaa</p>
      </motion.div>

      {/* Activity Feed */}
      <div className="space-y-3">
        {feedItems.map((fi) => (
          <motion.div key={fi.id} variants={item}>
            <button
              onClick={fi.action}
              className={`w-full glass rounded-2xl p-4 flex items-center gap-3 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20 border-l-[3px] ${borderColors[fi.priority]}`}
            >
              <span className="shrink-0">{fi.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-100 text-sm">{fi.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{fi.subtitle}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div variants={item} className="mt-6 text-center">
        <p className="text-xs text-slate-600">
          Päivitetty 5.2.2026 klo 14:30
        </p>
      </motion.div>
    </motion.div>
  );
}
