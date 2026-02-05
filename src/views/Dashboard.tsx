import { motion } from 'framer-motion';
import { ChevronRight, Heart, MessageCircle, Gift } from 'lucide-react';
import { properties, getSummaryStats, taxSummary2025 } from '../data/mockData';
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
  onSelectProperty: (id: string) => void;
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
          {stats.totalProperties} asuntoa · Seuraava korotus {stats.nextRenewal}pv
        </p>
      </motion.div>

      {/* 3 Stat Cards Row */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3 mb-4">
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
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Käyttöaste</p>
          <p className="text-lg font-bold text-green-400">100%</p>
          <p className="text-[10px] text-slate-500">kaikki vuokrattu</p>
        </div>
      </motion.div>

      {/* Tenant Relationship Health Card */}
      <motion.div variants={item}>
        <button
          onClick={() => onNavigate('messages')}
          className="w-full glass rounded-2xl p-5 mb-4 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20 border border-green-400/10"
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
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500/40 to-green-600/20 border border-green-500/30 flex items-center justify-center">
                <span className="text-[9px] font-bold text-green-400">M</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500/40 to-green-600/20 border border-green-500/30 flex items-center justify-center">
                <span className="text-[9px] font-bold text-green-400">A</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500/40 to-green-600/20 border border-green-500/30 flex items-center justify-center">
                <span className="text-[9px] font-bold text-green-400">J</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-500">Kaikki vuokralaiset tavoitettavissa</span>
            <ChevronRight className="w-3 h-3 text-slate-600 ml-auto" />
          </div>
        </button>
      </motion.div>

      {/* Smart Tip Card */}
      <motion.div variants={item} className="glass-green rounded-2xl p-4 mb-4 shadow-lg shadow-black/20">
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
              <button
                onClick={() => onNavigate('services')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-slate-400 bg-white/5 hover:bg-white/[0.08] transition-all duration-300"
              >
                <Gift className="w-3 h-3" />
                Tilaa lahja
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Alert Card */}
      <motion.div variants={item}>
        <button
          onClick={() => onNavigate('management')}
          className="w-full glass-red rounded-2xl p-4 mb-6 flex items-center gap-3 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
        >
          <span className="text-xl shrink-0">⚠️</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-red-400 text-sm">Vuokrankorotus: Fleminginkatu</p>
            <p className="text-xs text-slate-400 mt-0.5">Ilmoita vuokralaiselle viim. 15.2.2026</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
        </button>
      </motion.div>

      {/* Section Label */}
      <motion.div variants={item} className="mb-3">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">Asunnot</p>
      </motion.div>

      {/* Property Cards */}
      <div className="space-y-3">
        {properties.map((property) => {
          const delta = property.marketEstimate - property.currentRent;

          return (
            <motion.button
              key={property.id}
              variants={item}
              onClick={() => onSelectProperty(property.id)}
              whileTap={{ scale: 0.98 }}
              className="w-full glass rounded-2xl p-4 flex items-center gap-4 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
            >
              {/* Neighborhood Initial */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20 flex items-center justify-center shrink-0">
                <span className="text-green-400 font-bold text-lg">{property.neighborhood[0]}</span>
              </div>

              {/* Property Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-100 text-sm truncate">
                  {property.neighborhood} · {property.type}
                </h3>
                <p className="text-xs text-slate-500 truncate">{property.address}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-green-400">{property.currentRent} €/kk</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-slate-500">{property.tenantName}</span>
                </div>
              </div>

              {/* Delta Badge */}
              <div className="flex flex-col items-end shrink-0">
                <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg">
                  +{delta} €
                </span>
                <span className="text-[10px] text-slate-500 mt-1">
                  alle markkinan
                </span>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <motion.div variants={item} className="mt-8 text-center">
        <p className="text-xs text-slate-600">
          Päivitetty 5.2.2026 klo 14:30
        </p>
      </motion.div>
    </motion.div>
  );
}
