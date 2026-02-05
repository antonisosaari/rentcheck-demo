import { motion } from 'framer-motion';
import { ChevronRight, Heart, MessageCircle, Calendar, Check } from 'lucide-react';
import { getSummaryStats, taxSummary2025 } from '../data/mockData';
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
  onSelectProperty: (id: string, initialTab?: string) => void;
  onNavigate: (view: View) => void;
}

export function Dashboard({ onSelectProperty, onNavigate }: DashboardProps) {
  const stats = getSummaryStats();

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Greeting */}
      <motion.div variants={item} className="mb-6">
        <p className="text-slate-400 text-sm">Hei Jyri 👋</p>
      </motion.div>

      {/* Hero Income Card */}
      <motion.div variants={item} className="glass-green rounded-2xl p-6 mb-4 shadow-lg shadow-black/20">
        <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Vuokratuotot</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-green-400">€{stats.totalMonthlyRent.toLocaleString('fi-FI')}</span>
          <span className="text-lg text-slate-500">/kk</span>
        </div>
        <p className="text-sm text-slate-400 mt-2">
          {stats.totalProperties} asuntoa · Käyttöaste 100%
        </p>
      </motion.div>

      {/* 3 Stat Cards Row */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3 mb-5">
        <div className="glass rounded-2xl p-4 shadow-lg shadow-black/20">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Delta</p>
          <p className="text-lg font-bold text-green-400">+€{stats.avgDelta}/kk</p>
          <p className="text-[10px] text-slate-500">markkina vs. nyky</p>
        </div>
        <div className="glass rounded-2xl p-4 shadow-lg shadow-black/20">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Vuosi 2025</p>
          <p className="text-lg font-bold text-slate-100">€{taxSummary2025.netIncome.toLocaleString('fi-FI')}</p>
          <p className="text-[10px] text-slate-500">nettotulo</p>
        </div>
        <div className="glass rounded-2xl p-4 shadow-lg shadow-black/20">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Korotus</p>
          <p className="text-lg font-bold text-amber-400">{stats.nextRenewal}pv</p>
          <p className="text-[10px] text-slate-500">seuraava</p>
        </div>
      </motion.div>

      {/* Section Label */}
      <motion.div variants={item} className="mb-3">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">Huomioitavaa</p>
      </motion.div>

      {/* Urgent: Rent Increase */}
      <motion.div variants={item}>
        <button
          onClick={() => onSelectProperty('kallio-1', 'sopimus')}
          className="w-full glass-red rounded-2xl p-4 mb-3 flex items-center gap-3 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
        >
          <span className="text-xl shrink-0">⚠️</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-red-400 text-sm">Vuokrankorotus: Fleminginkatu</p>
            <p className="text-xs text-slate-400 mt-0.5">Ilmoita vuokralaiselle viim. 15.2.2026</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
        </button>
      </motion.div>

      {/* Active Listing Pipeline */}
      <motion.div variants={item}>
        <button
          onClick={() => onSelectProperty('kallio-1', 'valitys')}
          className="w-full glass rounded-2xl p-4 mb-3 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20 border border-green-400/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl shrink-0">📢</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-100 text-sm">Välitys: Fleminginkatu 15 B</p>
              <p className="text-xs text-slate-400 mt-0.5">5 hakijaa · 2 näyttöä sovittu · 3 pv sitten</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
          </div>
          {/* Mini Pipeline */}
          <div className="flex items-center gap-1.5">
            {['Ilmoitus', 'Hakijat', 'Näytöt', 'Valinta', 'Sopimus'].map((step, i) => (
              <div key={step} className="flex items-center gap-1.5 flex-1">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${
                  i === 0 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  i === 1 ? 'bg-green-500 text-black' :
                  'bg-white/5 text-slate-600 border border-white/10'
                }`}>
                  {i === 0 ? <Check className="w-2.5 h-2.5" /> : (i + 1)}
                </div>
                {i < 4 && <div className={`flex-1 h-0.5 ${i < 1 ? 'bg-green-500/30' : 'bg-white/5'}`} />}
              </div>
            ))}
          </div>
        </button>
      </motion.div>

      {/* Upcoming Showing */}
      <motion.div variants={item}>
        <button
          onClick={() => onSelectProperty('kallio-1', 'valitys')}
          className="w-full glass rounded-2xl p-4 mb-3 flex items-center gap-3 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-100 text-sm">Näyttö 15.3. klo 17:00</p>
            <p className="text-xs text-slate-400 mt-0.5">Juha Mäkinen (+perhe) · Fleminginkatu 15 B</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
        </button>
      </motion.div>

      {/* Tenant Relationships */}
      <motion.div variants={item}>
        <button
          onClick={() => onNavigate('messages')}
          className="w-full glass rounded-2xl p-4 mb-3 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20 border border-green-400/10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-green-400" />
            <h3 className="text-sm font-semibold text-slate-100">Vuokralaissuhteet</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="text-center">
              <p className="text-lg font-bold text-green-400">3/3</p>
              <p className="text-[10px] text-slate-500">tyytyväisiä ✅</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-amber-400">1</p>
              <p className="text-[10px] text-slate-500">korjauspyyntö</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-400">15.4.</p>
              <p className="text-[10px] text-slate-500">seur. muistutus</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['M', 'A', 'J'].map(initial => (
                <div key={initial} className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500/40 to-green-600/20 border border-green-500/30 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-green-400">{initial}</span>
                </div>
              ))}
            </div>
            <span className="text-[10px] text-slate-500">Kaikki tavoitettavissa</span>
            <ChevronRight className="w-3 h-3 text-slate-600 ml-auto" />
          </div>
        </button>
      </motion.div>

      {/* Smart Tip */}
      <motion.div variants={item} className="glass-green rounded-2xl p-4 mb-3 shadow-lg shadow-black/20">
        <div className="flex items-start gap-3">
          <span className="text-lg shrink-0">💡</span>
          <div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <span className="text-green-400 font-semibold">Vinkki:</span>{' '}
              Matin vuokrasuhde täyttää 2 vuotta ensi kuussa. Harkitse kiitosviesti tai pieni lahja — pitkäaikainen vuokralainen on arvokkain.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onNavigate('messages')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-green-400 bg-green-400/10 hover:bg-green-400/15 transition-all duration-300"
              >
                <MessageCircle className="w-3 h-3" />
                Lähetä viesti
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div variants={item} className="mt-6 text-center">
        <p className="text-xs text-slate-600">
          Päivitetty 5.2.2026 klo 14:30
        </p>
      </motion.div>
    </motion.div>
  );
}
