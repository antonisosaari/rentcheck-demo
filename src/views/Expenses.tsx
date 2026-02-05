import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Receipt, Sparkles, Filter, Building2 } from 'lucide-react';
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

const categoryColors: Record<string, string> = {
  korjaus: 'bg-red-50 text-red-700',
  huolto: 'bg-orange-50 text-orange-700',
  vakuutus: 'bg-blue-50 text-blue-700',
  vastike: 'bg-purple-50 text-purple-700',
  tarvikkeet: 'bg-emerald-50 text-emerald-700',
  muu: 'bg-gray-50 text-gray-700',
};

interface ExpensesProps {
  onSelectProperty: (id: string) => void;
}

export function Expenses({ onSelectProperty }: ExpensesProps) {
  const [filterProperty, setFilterProperty] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isDragOver, setIsDragOver] = useState(false);

  const filtered = expenses.filter((exp) => {
    if (filterProperty !== 'all' && exp.propertyId !== filterProperty) return false;
    if (filterCategory !== 'all' && exp.category !== filterCategory) return false;
    return true;
  });

  const totalAmount = filtered.reduce((sum, e) => sum + e.amount, 0);

  // Group totals by property
  const propertyTotals = properties.map((p) => {
    const propExpenses = expenses.filter((e) => e.propertyId === p.id);
    const total = propExpenses.reduce((sum, e) => sum + e.amount, 0);
    return { ...p, total };
  });

  // Group totals by category
  const categoryTotals = Object.keys(categoryLabels).map((cat) => {
    const catExpenses = filtered.filter((e) => e.category === cat);
    const total = catExpenses.reduce((sum, e) => sum + e.amount, 0);
    return { category: cat, label: categoryLabels[cat], total };
  }).filter((c) => c.total > 0);

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kuitit & Kulut</h1>
          <p className="text-sm text-gray-500 mt-1">Seuraa ja hallinnoi vuokra-asuntojen kuluja</p>
        </div>
      </motion.div>

      {/* Upload Area */}
      <motion.div variants={item} className="mb-6">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
            isDragOver
              ? 'border-[#2563eb] bg-blue-50'
              : 'border-[#e2e8f0] bg-white hover:border-blue-300 hover:bg-blue-50/30'
          }`}
        >
          <Upload className={`w-8 h-8 mx-auto mb-3 ${isDragOver ? 'text-[#2563eb]' : 'text-gray-400'}`} />
          <p className="font-medium text-gray-900 text-sm">
            Raahaa kuitti tähän tai <span className="text-[#2563eb]">valitse tiedosto</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PDF, JPG tai PNG · AI tunnistaa tiedot automaattisesti
          </p>
        </div>
      </motion.div>

      {/* Per-Property Summary */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3 mb-6">
        {propertyTotals.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setFilterProperty(filterProperty === p.id ? 'all' : p.id);
              onSelectProperty(p.id);
            }}
            className={`bg-white rounded-xl border p-3 text-center transition-all hover:shadow-md ${
              filterProperty === p.id ? 'border-[#2563eb] ring-1 ring-blue-100' : 'border-[#e2e8f0]'
            }`}
          >
            <Building2 className="w-4 h-4 mx-auto mb-1 text-gray-400" />
            <p className="text-xs text-gray-400">{p.neighborhood}</p>
            <p className="text-lg font-bold text-gray-900">{p.total.toLocaleString('fi-FI')} €</p>
          </button>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div variants={item} className="flex flex-wrap items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-gray-400" />
        <select
          value={filterProperty}
          onChange={(e) => setFilterProperty(e.target.value)}
          className="px-3 py-1.5 bg-white border border-[#e2e8f0] rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Kaikki asunnot</option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>{p.neighborhood} — {p.address}</option>
          ))}
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-1.5 bg-white border border-[#e2e8f0] rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Kaikki kategoriat</option>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        {(filterProperty !== 'all' || filterCategory !== 'all') && (
          <button
            onClick={() => { setFilterProperty('all'); setFilterCategory('all'); }}
            className="px-2 py-1.5 text-xs text-[#2563eb] hover:underline"
          >
            Tyhjennä suodattimet
          </button>
        )}
      </motion.div>

      {/* Category Totals */}
      {categoryTotals.length > 0 && (
        <motion.div variants={item} className="flex flex-wrap gap-2 mb-4">
          {categoryTotals.map((ct) => (
            <span
              key={ct.category}
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[ct.category]}`}
            >
              {ct.label}: {ct.total.toLocaleString('fi-FI')} €
            </span>
          ))}
        </motion.div>
      )}

      {/* Expense List */}
      <div className="space-y-3">
        {filtered.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>

      {/* Total */}
      <motion.div variants={item} className="mt-6 bg-white rounded-xl border border-[#e2e8f0] p-4 flex items-center justify-between">
        <span className="font-medium text-gray-700">
          Yhteensä ({filtered.length} kuittia)
        </span>
        <span className="text-xl font-bold text-gray-900">
          {totalAmount.toLocaleString('fi-FI')} €
        </span>
      </motion.div>

      <motion.div variants={item} className="mt-4 text-center">
        <p className="text-xs text-gray-400">Kulut tallennetaan automaattisesti verokoontiin</p>
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
      className="bg-white rounded-xl border border-[#e2e8f0] p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
          <Receipt className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
              categoryColors[expense.category]
            }`}>
              {categoryLabels[expense.category]}
            </span>
            <span className="text-xs text-gray-400">{formatDate(expense.date)}</span>
            {expense.recurring && (
              <span className="text-[10px] font-medium text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded-full">
                Toistuva {expense.recurringPeriod && `(${expense.recurringPeriod})`}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 text-sm">{expense.vendor}</h3>
          <p className="text-sm text-gray-600 mt-0.5">{expense.description}</p>
          <p className="text-xs text-gray-400 mt-1">
            {expense.neighborhood} · {expense.propertyAddress}
          </p>
          {expense.aiExtracted && (
            <div className="mt-2 flex items-start gap-1.5 bg-blue-50 rounded-lg p-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2563eb] shrink-0 mt-0.5" />
              <span className="text-xs text-blue-800">{expense.aiExtracted}</span>
            </div>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-gray-900">{expense.amount} €</p>
          {expense.recurring && expense.recurringPeriod && (
            <p className="text-xs text-gray-400">/{expense.recurringPeriod}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

