import { motion } from 'framer-motion';
import { Calculator, Download, Building2, FileText, Euro } from 'lucide-react';
import { taxSummary2025 } from '../data/mockData';

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

export function TaxSummary() {
  const tax = taxSummary2025;
  const taxRate = 30; // Finnish capital income tax rate
  const estimatedTax = Math.round(tax.netIncome * taxRate / 100);

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verokoonti {tax.year}</h1>
          <p className="text-sm text-gray-500 mt-1">Vähennyskelpoisten kulujen yhteenveto verottajalle</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#2563eb] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>Lataa verokoonti (PDF)</span>
        </button>
      </motion.div>

      {/* Grand Total Cards */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 text-center">
          <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Euro className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-xs text-gray-400">Vuokratulot yhteensä</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{tax.totalIncome.toLocaleString('fi-FI')} €</p>
        </div>
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 text-center">
          <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-2">
            <FileText className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-xs text-gray-400">Vähennyskelpoiset kulut</p>
          <p className="text-2xl font-bold text-red-600 mt-1">-{tax.totalExpenses.toLocaleString('fi-FI')} €</p>
        </div>
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 text-center">
          <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Calculator className="w-5 h-5 text-[#2563eb]" />
          </div>
          <p className="text-xs text-gray-400">Nettovuokratulo</p>
          <p className="text-2xl font-bold text-[#2563eb] mt-1">{tax.netIncome.toLocaleString('fi-FI')} €</p>
        </div>
      </motion.div>

      {/* Estimated Tax */}
      <motion.div variants={item} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5 text-[#2563eb]" />
          </div>
          <div>
            <p className="font-semibold text-blue-900 text-sm">
              Arvioitu pääomatulovero ({taxRate} %): {estimatedTax.toLocaleString('fi-FI')} €
            </p>
            <p className="text-blue-700 text-xs mt-0.5">
              Perustuu vuokratulon verotukseen. Yli 30 000 € osalta veroprosentti on 34 %.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Per-Property Breakdown */}
      <motion.div variants={item} className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Asuntokohtainen erittely</h2>
      </motion.div>

      <div className="space-y-3 mb-6">
        {tax.properties.map((prop) => (
          <motion.div
            key={prop.propertyId}
            variants={item}
            className="bg-white rounded-xl border border-[#e2e8f0] p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{prop.address}</h3>
                <p className="text-sm text-gray-500">{prop.neighborhood}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-emerald-50 rounded-lg p-3 text-center">
                <p className="text-xs text-emerald-500 mb-1">Vuokratulot</p>
                <p className="text-lg font-bold text-emerald-700">{prop.rentalIncome.toLocaleString('fi-FI')} €</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <p className="text-xs text-red-400 mb-1">Kulut</p>
                <p className="text-lg font-bold text-red-600">-{prop.expenses.toLocaleString('fi-FI')} €</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-xs text-blue-400 mb-1">Nettotulo</p>
                <p className="text-lg font-bold text-[#2563eb]">{prop.netIncome.toLocaleString('fi-FI')} €</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expense Categories */}
      <motion.div variants={item} className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Kulujen erittely kategorioittain</h2>
      </motion.div>

      <motion.div variants={item} className="bg-white rounded-xl border border-[#e2e8f0] p-5 mb-6">
        <div className="space-y-3">
          {Object.entries(tax.expensesByCategory).map(([category, amount]) => {
            const percentage = Math.round((amount / tax.totalExpenses) * 100);
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <span className="text-sm font-bold text-gray-900">{amount.toLocaleString('fi-FI')} €</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="bg-[#2563eb] h-2 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{percentage} % kokonaiskuluista</p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
          <span className="font-semibold text-gray-900">Kulut yhteensä</span>
          <span className="text-lg font-bold text-red-600">{tax.totalExpenses.toLocaleString('fi-FI')} €</span>
        </div>
      </motion.div>

      {/* Notes */}
      <motion.div variants={item} className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
        <p className="text-sm text-amber-800 font-medium mb-2">📌 Muistilista verotukseen</p>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Vuokratulo ilmoitetaan verottajalle lomakkeella 7H</li>
          <li>• Säilytä kaikki kuitit ja tositteet 6 vuotta</li>
          <li>• Vastikkeet ovat vähennyskelpoisia vain, jos ne eivät sisällä rahastosuorituksia</li>
          <li>• Korjauskulut ovat vähennyskelpoisia kokonaisuudessaan samana vuonna</li>
          <li>• Perusparannukset vähennetään poistoina (10 vuotta)</li>
        </ul>
      </motion.div>

      <motion.div variants={item} className="text-center">
        <p className="text-xs text-gray-400">
          ⚠️ Verokoonti on suuntaa-antava. Konsultoi veroneuvojaa lopullisten veroilmoitusten osalta.
        </p>
      </motion.div>
    </motion.div>
  );
}
