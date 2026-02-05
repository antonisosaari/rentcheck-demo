import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Briefcase, Settings, HelpCircle, ChevronRight, User, Download, Building2, Pin, AlertTriangle } from 'lucide-react';
import { taxSummary2025 } from '../data/mockData';

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

type ProfileSection = 'menu' | 'vero';

export function Profile() {
  const [section, setSection] = useState<ProfileSection>('menu');
  const [taxExpanded, setTaxExpanded] = useState(false);

  if (section === 'vero') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <BackButton onClick={() => setSection('menu')} />
        <TaxDetail />
      </motion.div>
    );
  }

  const tax = taxSummary2025;

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Profile Header */}
      <motion.div variants={item} className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/30 to-green-600/15 border border-green-500/20 flex items-center justify-center">
            <User className="w-7 h-7 text-green-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">Jyri Vuorinen</h1>
            <p className="text-xs text-slate-500">3 asuntoa · RentCheck Pro</p>
          </div>
        </div>
      </motion.div>

      {/* Tax Summary Card (expandable) */}
      <motion.div variants={item} className="mb-4">
        <button
          onClick={() => setTaxExpanded(!taxExpanded)}
          className="w-full glass-green rounded-2xl p-5 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-5 h-5 text-green-400" />
            <div className="flex-1">
              <h3 className="font-semibold text-slate-100 text-sm">Verokoonti 2025</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Netto: {tax.netIncome.toLocaleString('fi-FI')} €</p>
            </div>
            <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${taxExpanded ? 'rotate-90' : ''}`} />
          </div>
        </button>

        {taxExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 space-y-2"
          >
            {tax.properties.map((prop) => (
              <div key={prop.propertyId} className="glass rounded-2xl p-4 shadow-lg shadow-black/20">
                <p className="text-xs font-semibold text-slate-200 mb-2">{prop.neighborhood} · {prop.address}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[10px] text-slate-500">Tulot</p>
                    <p className="text-sm font-bold text-green-400">{prop.rentalIncome.toLocaleString('fi-FI')} €</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Kulut</p>
                    <p className="text-sm font-bold text-red-400">-{prop.expenses.toLocaleString('fi-FI')} €</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Netto</p>
                    <p className="text-sm font-bold text-blue-400">{prop.netIncome.toLocaleString('fi-FI')} €</p>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => setSection('vero')}
              className="w-full glass rounded-2xl p-3 text-center text-xs font-medium text-green-400 hover:bg-white/[0.08] transition-all"
            >
              Näytä koko verokoonti →
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Menu Items */}
      <div className="space-y-2">
        <MenuItem
          icon={<Briefcase className="w-5 h-5 text-blue-400" />}
          iconBg="from-blue-500/20 to-blue-600/10 border-blue-500/20"
          label="Kumppanipalvelut"
          desc="Välittäjät, huoltopalvelut"
          onClick={() => {}}
        />
        <MenuItem
          icon={<Settings className="w-5 h-5 text-slate-400" />}
          iconBg="from-white/10 to-white/5 border-white/10"
          label="Asetukset"
          desc="Ilmoitukset, kieli, tili"
          onClick={() => {}}
        />
        <MenuItem
          icon={<HelpCircle className="w-5 h-5 text-slate-400" />}
          iconBg="from-white/10 to-white/5 border-white/10"
          label="Tuki"
          desc="Usein kysytyt kysymykset"
          onClick={() => {}}
        />
      </div>

      {/* Footer */}
      <motion.div variants={item} className="mt-8 text-center">
        <p className="text-[10px] text-slate-600">RentCheck v0.3 · Demo</p>
      </motion.div>
    </motion.div>
  );
}

function TaxDetail() {
  const tax = taxSummary2025;
  const taxRate = 30;
  const estimatedTax = Math.round(tax.netIncome * taxRate / 100);

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Verokoonti {tax.year}</h1>
          <p className="text-xs text-slate-500 mt-1">Yhteenveto verottajalle</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 bg-green-500 text-black rounded-xl text-xs font-semibold hover:bg-green-400 transition-all duration-300">
          <Download className="w-3.5 h-3.5" />
          <span>PDF</span>
        </button>
      </motion.div>

      <motion.div variants={item} className="glass-green rounded-2xl p-6 mb-4 shadow-lg shadow-black/20">
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Nettovuokratulo</p>
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-4xl font-bold text-green-400">{tax.netIncome.toLocaleString('fi-FI')} €</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Tulot</p>
            <p className="text-lg font-bold text-green-400">+{tax.totalIncome.toLocaleString('fi-FI')} €</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Kulut</p>
            <p className="text-lg font-bold text-red-400">-{tax.totalExpenses.toLocaleString('fi-FI')} €</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="glass-blue rounded-2xl p-4 mb-5 shadow-lg shadow-black/20">
        <div className="flex items-center gap-3">
          <Calculator className="w-5 h-5 text-blue-400 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-400">
              Arvioitu vero ({taxRate}%): {estimatedTax.toLocaleString('fi-FI')} €
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Yli 30 000 € osalta veroprosentti on 34 %
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="mb-3">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">Asuntokohtainen erittely</p>
      </motion.div>

      <div className="space-y-3 mb-5">
        {tax.properties.map((prop) => (
          <motion.div key={prop.propertyId} variants={item} className="glass rounded-2xl p-5 shadow-lg shadow-black/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100 text-sm">{prop.address}</h3>
                <p className="text-xs text-slate-500">{prop.neighborhood}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-green-400/5 border border-green-400/10 p-3 text-center">
                <p className="text-[10px] text-slate-500 mb-0.5">Tulot</p>
                <p className="text-sm font-bold text-green-400">{prop.rentalIncome.toLocaleString('fi-FI')} €</p>
              </div>
              <div className="rounded-xl bg-red-400/5 border border-red-400/10 p-3 text-center">
                <p className="text-[10px] text-slate-500 mb-0.5">Kulut</p>
                <p className="text-sm font-bold text-red-400">-{prop.expenses.toLocaleString('fi-FI')} €</p>
              </div>
              <div className="rounded-xl bg-blue-400/5 border border-blue-400/10 p-3 text-center">
                <p className="text-[10px] text-slate-500 mb-0.5">Netto</p>
                <p className="text-sm font-bold text-blue-400">{prop.netIncome.toLocaleString('fi-FI')} €</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item} className="mb-3">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">Kulujen erittely</p>
      </motion.div>

      <motion.div variants={item} className="glass rounded-2xl p-5 mb-5 shadow-lg shadow-black/20">
        <div className="space-y-4">
          {Object.entries(tax.expensesByCategory).map(([category, amount]) => {
            const percentage = Math.round((amount / tax.totalExpenses) * 100);
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-slate-300">{category}</span>
                  <span className="text-xs font-bold text-slate-200">{amount.toLocaleString('fi-FI')} €</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                  />
                </div>
                <p className="text-[10px] text-slate-600 mt-0.5">{percentage}% kokonaiskuluista</p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">Yhteensä</span>
          <span className="text-lg font-bold text-red-400">{tax.totalExpenses.toLocaleString('fi-FI')} €</span>
        </div>
      </motion.div>

      <motion.div variants={item} className="glass rounded-2xl p-4 mb-4 border-amber-400/10 shadow-lg shadow-black/20" style={{ background: 'linear-gradient(135deg, rgba(46, 42, 26, 0.5), rgba(15, 17, 21, 0.9))' }}>
        <p className="text-xs text-amber-400 font-medium mb-2 flex items-center gap-1"><Pin size={12} /> Muistilista verotukseen</p>
        <ul className="text-[10px] text-slate-400 space-y-1">
          <li>• Vuokratulo ilmoitetaan lomakkeella 7H</li>
          <li>• Säilytä kuitit ja tositteet 6 vuotta</li>
          <li>• Vastikkeet vähennyskelpoisia (ei rahastosuorituksia)</li>
          <li>• Korjauskulut vähennetään samana vuonna</li>
          <li>• Perusparannukset poistoina (10 v)</li>
        </ul>
      </motion.div>

      <motion.div variants={item} className="text-center">
        <p className="text-[10px] text-slate-600 flex items-center justify-center gap-1"><AlertTriangle size={10} /> Suuntaa-antava. Konsultoi veroneuvojaa.</p>
      </motion.div>
    </motion.div>
  );
}

function MenuItem({ icon, iconBg, label, desc, onClick }: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full glass rounded-2xl p-4 flex items-center gap-4 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
    >
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${iconBg} border flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-100 text-sm">{label}</h3>
        <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
    </motion.button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-all mb-4"
    >
      <ChevronRight className="w-3 h-3 rotate-180" />
      Takaisin
    </button>
  );
}
