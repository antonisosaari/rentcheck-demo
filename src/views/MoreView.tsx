import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, FileText, Bell, ChevronRight } from 'lucide-react';
import { Services } from './Services';
import { Management } from './Management';
import { Alerts } from './Alerts';
import type { View } from '../App';

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

type MoreTab = 'menu' | 'palvelut' | 'hallinta' | 'ilmoitukset';

interface MoreViewProps {
  onSelectProperty: (id: string) => void;
  onNavigate: (view: View) => void;
}

export function MoreView({ onSelectProperty }: MoreViewProps) {
  const [activeTab, setActiveTab] = useState<MoreTab>('menu');

  if (activeTab === 'palvelut') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button
          onClick={() => setActiveTab('menu')}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-all mb-4"
        >
          <ChevronRight className="w-3 h-3 rotate-180" />
          Takaisin
        </button>
        <Services />
      </motion.div>
    );
  }

  if (activeTab === 'hallinta') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button
          onClick={() => setActiveTab('menu')}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-all mb-4"
        >
          <ChevronRight className="w-3 h-3 rotate-180" />
          Takaisin
        </button>
        <Management onSelectProperty={onSelectProperty} />
      </motion.div>
    );
  }

  if (activeTab === 'ilmoitukset') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button
          onClick={() => setActiveTab('menu')}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-all mb-4"
        >
          <ChevronRight className="w-3 h-3 rotate-180" />
          Takaisin
        </button>
        <Alerts onSelectProperty={onSelectProperty} />
      </motion.div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Header */}
      <motion.div variants={item} className="mb-6">
        <h1 className="text-xl font-bold text-slate-100">Lisää</h1>
        <p className="text-xs text-slate-500 mt-1">Palvelut, hallinta ja ilmoitukset</p>
      </motion.div>

      {/* Menu Items */}
      <div className="space-y-3">
        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('palvelut')}
          className="w-full glass rounded-2xl p-5 flex items-center gap-4 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20 flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-100 text-sm">Palvelut</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Lahjat, oppaat, huolto, muistutukset</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
        </motion.button>

        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('hallinta')}
          className="w-full glass rounded-2xl p-5 flex items-center gap-4 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-100 text-sm">Hallinta</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Sopimukset, kulut, verokoonti</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
        </motion.button>

        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('ilmoitukset')}
          className="w-full glass rounded-2xl p-5 flex items-center gap-4 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-100 text-sm">Ilmoitukset</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Markkinahälytykset ja suositukset</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">3</span>
            </span>
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </div>
        </motion.button>
      </div>

      {/* Footer */}
      <motion.div variants={item} className="mt-8 text-center">
        <p className="text-[10px] text-slate-600">RentCheck v0.2 · Demo</p>
      </motion.div>
    </motion.div>
  );
}
