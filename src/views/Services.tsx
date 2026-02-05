import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gift, Wrench, MessageCircle, BookOpen, Star,
  ChevronRight, Check, Clock, Zap, Sparkles,
  Wifi, Trash2, ShoppingBag, Bus,
} from 'lucide-react';

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

type Section = 'gifts' | 'guide' | 'maintenance' | 'reminders';

export function Services() {
  const [activeSection, setActiveSection] = useState<Section>('gifts');
  const [showGuidePreview, setShowGuidePreview] = useState(false);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -10 }}
    >
      {/* Header */}
      <motion.div variants={item} className="mb-6">
        <h1 className="text-xl font-bold text-slate-100">Palvelut</h1>
        <p className="text-xs text-slate-500 mt-1">
          Vuokralaiskokemuksen hallintatyökalut
        </p>
      </motion.div>

      {/* Section Tabs */}
      <motion.div
        variants={item}
        className="glass rounded-2xl p-1 flex gap-1 mb-5 shadow-lg shadow-black/20 overflow-x-auto"
      >
        <SectionTab
          active={activeSection === 'gifts'}
          onClick={() => setActiveSection('gifts')}
          icon="🎁"
          label="Lahjat"
        />
        <SectionTab
          active={activeSection === 'guide'}
          onClick={() => setActiveSection('guide')}
          icon="📋"
          label="Opas"
        />
        <SectionTab
          active={activeSection === 'maintenance'}
          onClick={() => setActiveSection('maintenance')}
          icon="🔧"
          label="Huolto"
        />
        <SectionTab
          active={activeSection === 'reminders'}
          onClick={() => setActiveSection('reminders')}
          icon="📬"
          label="Muistutukset"
        />
      </motion.div>

      {/* Section Content */}
      {activeSection === 'gifts' && <GiftsSection />}
      {activeSection === 'guide' && (
        <GuideSection
          showPreview={showGuidePreview}
          setShowPreview={setShowGuidePreview}
        />
      )}
      {activeSection === 'maintenance' && <MaintenanceSection />}
      {activeSection === 'reminders' && <RemindersSection />}
    </motion.div>
  );
}

function SectionTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap ${
        active
          ? 'bg-green-400/15 text-green-400'
          : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

/* ═══════════════════ GIFTS SECTION ═══════════════════ */

function GiftsSection() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Gift className="w-4 h-4 text-green-400" />
          <h2 className="text-sm font-semibold text-slate-100">
            Vuokralaislahjat
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Pienet eleet, suuri vaikutus vuokrasuhteeseen
        </p>
      </motion.div>

      {/* Joululahja */}
      <motion.div
        variants={item}
        className="glass rounded-2xl p-5 mb-3 shadow-lg shadow-black/20 border border-white/5 hover:border-green-400/15 transition-all duration-300"
      >
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 flex items-center justify-center shrink-0">
            <span className="text-xl">🎄</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-slate-100 text-sm">Joululahja</h3>
              <span className="text-sm font-bold text-green-400">19,90 €</span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Suklaarasialahja kortteineen —{' '}
              <span className="text-slate-400 italic">
                "Hyvää joulua vuokranantajaltasi"
              </span>
            </p>

            {/* Sent status for Matti */}
            <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-green-400/5 border border-green-400/10">
              <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span className="text-[10px] text-green-400">
                Lähetetty Matti Virtaselle 18.12.2025
              </span>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-green-400 bg-green-400/10 border border-green-400/10 hover:bg-green-400/15 transition-all duration-300">
                <Gift className="w-3 h-3" />
                Tilaa Annalle
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all duration-300">
                Tilaa kaikille
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Muuttolahja */}
      <motion.div
        variants={item}
        className="glass rounded-2xl p-5 mb-3 shadow-lg shadow-black/20 border border-white/5 hover:border-green-400/15 transition-all duration-300"
      >
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <span className="text-xl">🏡</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-slate-100 text-sm">Muuttolahja</h3>
              <span className="text-sm font-bold text-green-400">24,90 €</span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Tervetuliaispaketti uudelle vuokralaiselle
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-slate-400">
                ☕ Kahvipaketti
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-slate-400">
                🍫 Suklaa
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-slate-400">
                ✉️ Käsinkirjoitettu kortti
              </span>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all duration-300">
              <Gift className="w-3 h-3" />
              Tilaa seuraavalle vuokralaiselle
            </button>
          </div>
        </div>
      </motion.div>

      {/* Syntymäpäivälahja */}
      <motion.div
        variants={item}
        className="glass rounded-2xl p-5 mb-3 shadow-lg shadow-black/20 border border-white/5 hover:border-green-400/15 transition-all duration-300"
      >
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-500/20 flex items-center justify-center shrink-0">
            <span className="text-xl">🎂</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-slate-100 text-sm">
                Syntymäpäivälahja
              </h3>
              <span className="text-sm font-bold text-green-400">15,90 €</span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Automaattinen muistutus + tilaus vuokralaisen syntymäpäivänä
            </p>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-400/5 border border-blue-400/10">
              <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="text-[10px] text-blue-400">
                Seuraava: Matti Virtanen — 15.3.2026
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Smart tip */}
      <motion.div
        variants={item}
        className="glass-green rounded-2xl p-4 shadow-lg shadow-black/20"
      >
        <div className="flex items-start gap-2">
          <span className="text-base shrink-0">💡</span>
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="text-green-400 font-medium">Tiesitkö?</span>{' '}
            Vuokranantajan 20 € lahja voi säästää kuukausia tyhjäkäyntiä. Tyytyväinen
            vuokralainen pysyy keskimäärin 2,5 vuotta pidempään.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════ GUIDE SECTION ═══════════════════ */

function GuideSection({
  showPreview,
  setShowPreview,
}: {
  showPreview: boolean;
  setShowPreview: (v: boolean) => void;
}) {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-4 h-4 text-green-400" />
          <h2 className="text-sm font-semibold text-slate-100">Asunnon opas</h2>
        </div>
        <p className="text-xs text-slate-500">
          Luo AirBnB-tyylinen tervetuloa-opas vuokralaiselle
        </p>
      </motion.div>

      {/* Guide Builder Card */}
      <motion.div
        variants={item}
        className="glass rounded-2xl p-5 mb-4 shadow-lg shadow-black/20"
      >
        <h3 className="text-sm font-semibold text-slate-100 mb-4">
          Oppaan sisältö
        </h3>
        <div className="space-y-3">
          <GuideItem icon={<Wifi className="w-4 h-4" />} title="WiFi-tiedot" desc="Verkkonimi ja salasana" done />
          <GuideItem icon={<Zap className="w-4 h-4" />} title="Kodinkoneet" desc="Käyttöohjeet: pesukone, astianpesukone, uuni" done />
          <GuideItem icon={<Trash2 className="w-4 h-4" />} title="Roskien lajittelu" desc="Keräyspisteet ja lajitteluohjeet" done />
          <GuideItem icon={<ShoppingBag className="w-4 h-4" />} title="Lähimmät palvelut" desc="Kaupat, ravintolat, apteekki" />
          <GuideItem icon={<Bus className="w-4 h-4" />} title="Julkinen liikenne" desc="Lähimmät pysäkit ja reitit" />
          <GuideItem icon={<BookOpen className="w-4 h-4" />} title="Taloyhtiön säännöt" desc="Hiljaisuusaika, sauna, pyykkitupa" done />
        </div>
      </motion.div>

      {/* Preview Toggle */}
      <motion.div variants={item}>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="w-full bg-green-500 text-black rounded-2xl p-4 flex items-center justify-center gap-2 font-semibold text-sm hover:bg-green-400 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-green-500/20 mb-4"
        >
          <Sparkles className="w-4 h-4" />
          {showPreview ? 'Piilota esikatselu' : 'Esikatsele opasta'}
        </button>
      </motion.div>

      {/* Guide Preview */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          {/* Phone mockup */}
          <div className="mx-auto max-w-[280px]">
            <div className="rounded-[2rem] border-4 border-slate-700 bg-[#0f1115] p-4 shadow-2xl shadow-black/50">
              {/* Status bar mock */}
              <div className="flex justify-between items-center text-[8px] text-slate-600 mb-3 px-1">
                <span>9:41</span>
                <div className="flex gap-1">
                  <span>📶</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* Guide content */}
              <div className="rounded-2xl overflow-hidden">
                {/* Hero */}
                <div className="bg-gradient-to-br from-green-600/40 to-green-900/30 p-4 text-center">
                  <span className="text-3xl mb-2 block">🏠</span>
                  <h4 className="text-sm font-bold text-slate-100">
                    Tervetuloa kotiin!
                  </h4>
                  <p className="text-[9px] text-slate-400 mt-0.5">
                    Fleminginkatu 15 B 23, Kallio
                  </p>
                </div>

                <div className="bg-white/[0.03] p-3 space-y-3">
                  {/* WiFi */}
                  <div className="bg-white/5 rounded-xl p-2.5">
                    <div className="flex items-center gap-2 mb-1">
                      <Wifi className="w-3 h-3 text-blue-400" />
                      <span className="text-[10px] font-semibold text-slate-200">
                        WiFi
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-400">
                      Verkko: <span className="text-slate-300">KotiWifi-5G</span>
                    </p>
                    <p className="text-[9px] text-slate-400">
                      Salasana: <span className="text-slate-300">tervetuloa2026</span>
                    </p>
                  </div>

                  {/* Trash */}
                  <div className="bg-white/5 rounded-xl p-2.5">
                    <div className="flex items-center gap-2 mb-1">
                      <Trash2 className="w-3 h-3 text-green-400" />
                      <span className="text-[10px] font-semibold text-slate-200">
                        Lajittelu
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-400">
                      Bio 🟤 Muovi 🟡 Paperi 🔵
                    </p>
                    <p className="text-[9px] text-slate-400">
                      Keräyspiste: sisäpihan roska-aita
                    </p>
                  </div>

                  {/* Quiet hours */}
                  <div className="bg-white/5 rounded-xl p-2.5">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span className="text-[10px] font-semibold text-slate-200">
                        Hiljaisuus
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-400">
                      Arkisin 22-07, viikonloppuisin 23-09
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Share buttons */}
      <motion.div variants={item} className="flex gap-2">
        <button className="flex-1 glass rounded-2xl p-3 flex items-center justify-center gap-2 text-xs font-medium text-green-400 hover:bg-white/[0.08] transition-all duration-300">
          <MessageCircle className="w-3.5 h-3.5" />
          Jaa vuokralaiselle
        </button>
        <button className="flex-1 glass rounded-2xl p-3 flex items-center justify-center gap-2 text-xs font-medium text-slate-400 hover:bg-white/[0.08] transition-all duration-300">
          <BookOpen className="w-3.5 h-3.5" />
          Muokkaa sisältöä
        </button>
      </motion.div>
    </motion.div>
  );
}

function GuideItem({
  icon,
  title,
  desc,
  done,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  done?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          done
            ? 'bg-green-400/15 text-green-400'
            : 'bg-white/5 text-slate-600'
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200">{title}</p>
        <p className="text-[10px] text-slate-500">{desc}</p>
      </div>
      {done ? (
        <Check className="w-4 h-4 text-green-400 shrink-0" />
      ) : (
        <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
      )}
    </div>
  );
}

/* ═══════════════════ MAINTENANCE SECTION ═══════════════════ */

function MaintenanceSection() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Wrench className="w-4 h-4 text-green-400" />
          <h2 className="text-sm font-semibold text-slate-100">
            Huoltopalvelut
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Tilaa ammattilainen partneriverkoston kautta
        </p>
      </motion.div>

      {/* Service Cards */}
      <motion.div
        variants={item}
        className="glass rounded-2xl p-5 mb-3 shadow-lg shadow-black/20 border border-white/5 hover:border-blue-400/15 transition-all duration-300"
      >
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <span className="text-xl">🔧</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-slate-100 text-sm">
                Putkimies
              </h3>
              <span className="text-xs text-slate-500">alv. 80–150 €</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Hanakorjaukset, vuodot, viemäritukokset
            </p>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-green-400/5 border border-green-400/10 mb-3">
              <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span className="text-[10px] text-green-400">
                Viimeisin tilaus: 3.2.2026 · Fleminginkatu (hanakorjaus)
              </span>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-black bg-green-500 hover:bg-green-400 transition-all duration-300">
              <Wrench className="w-3.5 h-3.5" />
              Tilaa putkimies
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="glass rounded-2xl p-5 mb-3 shadow-lg shadow-black/20 border border-white/5 hover:border-amber-400/15 transition-all duration-300"
      >
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <span className="text-xl">⚡</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-slate-100 text-sm">
                Sähkömies
              </h3>
              <span className="text-xs text-slate-500">alv. 90–200 €</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Pistorasiat, valaistus, sulakekaappi
            </p>
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-black bg-green-500 hover:bg-green-400 transition-all duration-300">
              <Zap className="w-3.5 h-3.5" />
              Tilaa sähkömies
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="glass rounded-2xl p-5 mb-3 shadow-lg shadow-black/20 border border-white/5 hover:border-purple-400/15 transition-all duration-300"
      >
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20 flex items-center justify-center shrink-0">
            <span className="text-xl">🧹</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-slate-100 text-sm">
                Muuttosiivous
              </h3>
              <span className="text-xs text-slate-500">alv. 150–350 €</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Perusteellinen siivous vuokralaisen vaihtuessa
            </p>
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all duration-300">
              Tilaa siivous
            </button>
          </div>
        </div>
      </motion.div>

      {/* Partner note */}
      <motion.div variants={item} className="mt-4 text-center">
        <p className="text-[10px] text-slate-600">
          Kumppanuusverkosto: luotettavat, arvioidut ammattilaiset
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════ REMINDERS SECTION ═══════════════════ */

function RemindersSection() {
  const [reminders, setReminders] = useState([
    { id: 'r1', title: '6 kk vuokrasuhteesta — kysy kuulumisia', next: '15.4.2026', enabled: true },
    { id: 'r2', title: '12 kk — vuosittainen tyytyväisyyskysely', next: '15.10.2026', enabled: true },
    { id: 'r3', title: 'Joulutoivotus', next: '20.12.2026', enabled: true },
    { id: 'r4', title: 'Vuokrasuhteen vuosipäivä', next: '15.4.2026', enabled: false },
  ]);

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    );
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <MessageCircle className="w-4 h-4 text-green-400" />
          <h2 className="text-sm font-semibold text-slate-100">
            Viestintämuistutukset
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Automaattiset muistutukset vuokralaissuhteen hoitamiseen
        </p>
      </motion.div>

      {/* Reminder Cards */}
      <div className="space-y-2 mb-5">
        {reminders.map((reminder) => (
          <motion.div
            key={reminder.id}
            variants={item}
            className={`glass rounded-2xl p-4 shadow-lg shadow-black/20 transition-all duration-300 ${
              reminder.enabled ? '' : 'opacity-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-slate-200">
                  {reminder.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock className="w-3 h-3 text-slate-600" />
                  <span className="text-[10px] text-slate-500">
                    Seuraava: {reminder.next}
                  </span>
                </div>
              </div>
              {/* Toggle */}
              <button
                onClick={() => toggleReminder(reminder.id)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                  reminder.enabled
                    ? 'bg-green-500'
                    : 'bg-white/10'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-all duration-300 ${
                    reminder.enabled ? 'left-5.5' : 'left-0.5'
                  }`}
                  style={{
                    left: reminder.enabled ? '22px' : '2px',
                  }}
                />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Draft */}
      <motion.div
        variants={item}
        className="glass rounded-2xl p-5 shadow-lg shadow-black/20 border border-green-400/10"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-green-400" />
          <h3 className="text-sm font-semibold text-green-400">
            AI-viestiluonnos
          </h3>
        </div>
        <div className="glass-green rounded-xl p-4 mb-3">
          <p className="text-xs text-slate-300 leading-relaxed italic">
            "Hei Matti! Puoli vuotta on kulunut vuokrasuhteemme alusta. Miten
            olet viihtynyt? Onko jotain mitä voisin parantaa asumismukavuudessa?
            Kuulen mielelläni palautetta."
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-black bg-green-500 hover:bg-green-400 transition-all duration-300">
            <MessageCircle className="w-3.5 h-3.5" />
            Lähetä Matille
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs text-slate-400 bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all duration-300">
            <Star className="w-3.5 h-3.5" />
            Muokkaa
          </button>
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-6 text-center">
        <p className="text-[10px] text-slate-600">
          Muistutukset lähetetään push-ilmoituksena
        </p>
      </motion.div>
    </motion.div>
  );
}
