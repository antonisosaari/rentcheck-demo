import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Receipt, Calculator } from 'lucide-react';
import { Leases } from './Leases';
import { Expenses } from './Expenses';
import { TaxSummary } from './TaxSummary';

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

type ManagementTab = 'sopimukset' | 'kulut' | 'vero';

interface ManagementProps {
  onSelectProperty: (id: string) => void;
}

export function Management({ onSelectProperty }: ManagementProps) {
  const [activeTab, setActiveTab] = useState<ManagementTab>('sopimukset');

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Header */}
      <motion.div variants={item} className="mb-5">
        <h1 className="text-xl font-bold text-slate-100">Hallinta</h1>
        <p className="text-xs text-slate-500 mt-1">Sopimukset, kulut ja verokoonti</p>
      </motion.div>

      {/* Tab Selector */}
      <motion.div variants={item} className="glass rounded-2xl p-1 flex gap-1 mb-5 shadow-lg shadow-black/20">
        <button
          onClick={() => setActiveTab('sopimukset')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 ${
            activeTab === 'sopimukset'
              ? 'bg-green-400/15 text-green-400'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Sopimukset</span>
        </button>
        <button
          onClick={() => setActiveTab('kulut')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 ${
            activeTab === 'kulut'
              ? 'bg-green-400/15 text-green-400'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Kulut</span>
        </button>
        <button
          onClick={() => setActiveTab('vero')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 ${
            activeTab === 'vero'
              ? 'bg-green-400/15 text-green-400'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Vero</span>
        </button>
      </motion.div>

      {/* Tab Content — render inside this wrapper */}
      <div>
        {activeTab === 'sopimukset' && (
          <Leases onSelectProperty={onSelectProperty} />
        )}
        {activeTab === 'kulut' && (
          <Expenses onSelectProperty={onSelectProperty} />
        )}
        {activeTab === 'vero' && <TaxSummary />}
      </div>
    </motion.div>
  );
}
