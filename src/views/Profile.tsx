import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Gift, Bell, HelpCircle, Settings, ChevronRight, User } from 'lucide-react';
import { TaxSummary } from './TaxSummary';
import { Services } from './Services';
import { Alerts } from './Alerts';

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

type ProfileSection = 'menu' | 'vero' | 'palvelut' | 'ilmoitukset';

export function Profile() {
  const [section, setSection] = useState<ProfileSection>('menu');

  if (section === 'vero') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <BackButton onClick={() => setSection('menu')} />
        <TaxSummary />
      </motion.div>
    );
  }

  if (section === 'palvelut') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <BackButton onClick={() => setSection('menu')} />
        <Services />
      </motion.div>
    );
  }

  if (section === 'ilmoitukset') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <BackButton onClick={() => setSection('menu')} />
        <Alerts onSelectProperty={() => {}} />
      </motion.div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Profile Header */}
      <motion.div variants={item} className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/30 to-green-600/15 border border-green-500/20 flex items-center justify-center">
            <User className="w-7 h-7 text-green-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">Jyri Sosaari</h1>
            <p className="text-xs text-slate-500">3 asuntoa · RentCheck Pro</p>
          </div>
        </div>
      </motion.div>

      {/* Menu Items */}
      <div className="space-y-2">
        <MenuItem
          icon={<Calculator className="w-5 h-5 text-green-400" />}
          iconBg="from-green-500/20 to-green-600/10 border-green-500/20"
          label="Verokoonti"
          desc="Vuosi 2025 yhteenveto verottajalle"
          onClick={() => setSection('vero')}
        />
        <MenuItem
          icon={<Gift className="w-5 h-5 text-blue-400" />}
          iconBg="from-blue-500/20 to-blue-600/10 border-blue-500/20"
          label="Palvelut"
          desc="Lahjat, oppaat, huolto, muistutukset"
          onClick={() => setSection('palvelut')}
        />
        <MenuItem
          icon={<Bell className="w-5 h-5 text-amber-400" />}
          iconBg="from-amber-500/20 to-amber-600/10 border-amber-500/20"
          label="Ilmoitukset"
          desc="Markkinahälytykset ja suositukset"
          onClick={() => setSection('ilmoitukset')}
          badge={3}
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
          label="Tuki & ohjeet"
          desc="Usein kysytyt kysymykset"
          onClick={() => {}}
        />
      </div>

      {/* Footer */}
      <motion.div variants={item} className="mt-8 text-center">
        <p className="text-[10px] text-slate-600">RentCheck v0.2 · Demo</p>
      </motion.div>
    </motion.div>
  );
}

function MenuItem({ icon, iconBg, label, desc, onClick, badge }: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  desc: string;
  onClick: () => void;
  badge?: number;
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
      <div className="flex items-center gap-2 shrink-0">
        {badge && (
          <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">{badge}</span>
          </span>
        )}
        <ChevronRight className="w-4 h-4 text-slate-600" />
      </div>
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
