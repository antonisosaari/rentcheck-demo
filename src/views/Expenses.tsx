import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Building2 } from 'lucide-react';
import { expenses, properties } from '../data/mockData';
import type { Expense } from '../data/mockData';

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

const categoryLabels: Record<string, string> = {
  korjaus: 'Korjaus',
  huolto: 'Huolto',
  vakuutus: 'Vakuutus',
  vastike: 'Vastike',
  tarvikkeet: 'Tarvikkeet',
  muu: 'Muu',
};

const categoryIcons: Record<string, string> = {
  korjaus: '🔧',
  huolto: '🛠️',
  vakuutus: '🛡️',
  vastike: '🏢',
  tarvikkeet: '📦',
  muu: '📄',
};

const categoryColors: Record<string, string> = {
  korjaus: 'bg-red-400/15 text-red-400',
  huolto: 'bg-amber-400/15 text-amber-400',
  vakuutus: 'bg-blue-400/15 text-blue-400',
  vastike: 'bg-purple-400/15 text-purple-400',
  tarvikkeet: 'bg-green-400/15 text-green-400',
  muu: 'bg-white/10 text-slate-400',
};

interface ExpensesProps {
  onSelectProperty: (id: string) => void;
}

export function Expenses({ onSelectProperty }: ExpensesProps) {
  const [filterProperty, setFilterProperty] = useState<string>('all');
  const [isDragOver, setIsDragOver] = useState(false);

  const filtered = expenses.filter((exp) => {
    if (filterProperty !== 'all' && exp.propertyId !== filterProperty) return false;
    return true;
  });

  const totalAmount = filtered.reduce((sum, e) => sum + e.amount, 0);

  // Group totals by property
  const propertyTotals = properties.map((p) => {
    const propExpenses = expenses.filter((e) => e.propertyId === p.id);
    const total = propExpenses.reduce((sum, e) => sum + e.amount, 0);
    return { ...p, total };
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Header */}
      <motion.div variants={item} className="mb-5">
        <h1 className="text-xl font-bold text-slate-100">Kulut</h1>
        <p className="text-xs text-slate-500 mt-1">Kuitit ja vuokra-asuntojen kulut</p>
      </motion.div>

      {/* Hero Total */}
      <motion.div variants={item} className="glass-red rounded-2xl p-5 mb-4 shadow-lg shadow-black/20">
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Kulut yhteensä</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-red-400">{totalAmount.toLocaleString('fi-FI')} €</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">{filtered.length} kuittia · {properties.length} asuntoa</p>
      </motion.div>

      {/* Upload Area */}
      <motion.div variants={item} className="mb-4">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer ${
            isDragOver
              ? 'border-green-400/50 bg-green-400/5'
              : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
          }`}
        >
          <Upload className={`w-6 h-6 mx-auto mb-2 ${isDragOver ? 'text-green-400' : 'text-slate-600'}`} />
          <p className="text-sm text-slate-400">
            Raahaa kuitti tähän tai <span className="text-green-400">valitse tiedosto</span>
          </p>
          <p className="text-[10px] text-slate-600 mt-1">
            PDF, JPG tai PNG · AI tunnistaa automaattisesti
          </p>
        </div>
      </motion.div>

      {/* Per-Property Filter */}
      <motion.div variants={item} className="grid grid-cols-3 gap-2 mb-4">
        {propertyTotals.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setFilterProperty(filterProperty === p.id ? 'all' : p.id);
              if (filterProperty !== p.id) onSelectProperty(p.id);
            }}
            className={`glass rounded-xl p-3 text-center transition-all duration-300 shadow-lg shadow-black/20 ${
              filterProperty === p.id ? 'border-green-400/30 bg-green-400/5' : 'hover:bg-white/[0.08]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 mx-auto mb-1 text-slate-600" />
            <p className="text-[10px] text-slate-500">{p.neighborhood}</p>
            <p className="text-sm font-bold text-slate-200">{p.total.toLocaleString('fi-FI')} €</p>
          </button>
        ))}
      </motion.div>

      {/* Section Label */}
      <motion.div variants={item} className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">
          Kuitit {filterProperty !== 'all' && `· ${properties.find(p => p.id === filterProperty)?.neighborhood}`}
        </p>
        {filterProperty !== 'all' && (
          <button
            onClick={() => setFilterProperty('all')}
            className="text-[10px] text-green-400 hover:underline"
          >
            Näytä kaikki
          </button>
        )}
      </motion.div>

      {/* Expense List */}
      <div className="space-y-2">
        {filtered.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>

      <motion.div variants={item} className="mt-6 text-center">
        <p className="text-[10px] text-slate-600">Kulut tallennetaan automaattisesti verokoontiin</p>
      </motion.div>
    </motion.div>
  );
}

function ExpenseCard({ expense }: { expense: Expense }) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fi-FI');
  };

  return (
    <motion.div
      variants={item}
      className="glass rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 text-base">
          {categoryIcons[expense.category] || '📄'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
              categoryColors[expense.category]
            }`}>
              {categoryLabels[expense.category]}
            </span>
            <span className="text-[10px] text-slate-600">{formatDate(expense.date)}</span>
            {expense.recurring && (
              <span className="text-[10px] font-medium text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded-full">
                Toistuva
              </span>
            )}
          </div>
          <h3 className="font-semibold text-slate-200 text-sm">{expense.vendor}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{expense.description}</p>
          <p className="text-[10px] text-slate-600 mt-0.5">
            {expense.neighborhood} · {expense.propertyAddress}
          </p>
          {expense.aiExtracted && (
            <div className="mt-2 flex items-start gap-1.5 bg-blue-400/5 rounded-lg p-2 border border-blue-400/10">
              <Sparkles className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />
              <span className="text-[10px] text-blue-400">{expense.aiExtracted}</span>
            </div>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="text-base font-bold text-slate-100">{expense.amount} €</p>
          {expense.recurring && expense.recurringPeriod && (
            <p className="text-[10px] text-slate-600">/{expense.recurringPeriod}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
