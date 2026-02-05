import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Camera, Check, ChevronRight, Star, Calendar,
  Users, FileText, Send, X, Sparkles,
  Megaphone, CheckCircle2, Handshake, Home, Building2,
  Lightbulb, Clock,
} from 'lucide-react';
import type { Property } from '../data/mockData';
import type { ReactNode } from 'react';

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

type ValitysTab = 'ilmoitus' | 'hakijat' | 'naytot' | 'valinta';

const pipelineSteps: { key: string; label: string; icon: ReactNode }[] = [
  { key: 'ilmoitus', label: 'Ilmoitus', icon: <Megaphone size={10} /> },
  { key: 'hakijat', label: 'Yhteydenotot', icon: <Users size={10} /> },
  { key: 'naytot', label: 'Näytöt', icon: <Calendar size={10} /> },
  { key: 'valinta', label: 'Valinta', icon: <CheckCircle2 size={10} /> },
  { key: 'sopimus', label: 'Sopimus', icon: <FileText size={10} /> },
];

interface PropertyValitysProps {
  property: Property;
}

/** Embeddable välitys view for a single property — used inside PropertyDetail */
export function PropertyValitys({ property }: PropertyValitysProps) {
  const [activeTab, setActiveTab] = useState<ValitysTab>('ilmoitus');
  const [showOutsource, setShowOutsource] = useState(false);

  const activeStepIndex = pipelineSteps.findIndex(s => s.key === activeTab);

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Outsource Banner */}
      <motion.div variants={item} className="mb-4">
        <button
          onClick={() => setShowOutsource(!showOutsource)}
          className="w-full glass rounded-2xl p-4 flex items-center gap-3 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20 border border-white/5"
        >
          <span className="shrink-0"><Handshake size={20} className="text-slate-300" /></span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-100">Haluatko ammattilaisen hoitavan?</p>
            <p className="text-[10px] text-slate-500">Anna välitys kumppanillemme</p>
          </div>
          <ChevronRight className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${showOutsource ? 'rotate-90' : ''}`} />
        </button>

        {showOutsource && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 glass rounded-2xl p-5 shadow-lg shadow-black/20 border border-blue-400/10"
          >
            <h3 className="text-sm font-semibold text-slate-100 mb-2">Anna välitys ammattilaiselle</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Kumppanimme hoitavat ilmoituksen, näytöt, vuokralaisen valinnan ja sopimuksen puolestasi.
            </p>
            <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-white/[0.03]">
              <span className="text-xs text-slate-300 font-medium">Hinta:</span>
              <span className="text-sm font-bold text-green-400">1kk vuokra</span>
              <span className="text-[10px] text-slate-500">(sis. ALV)</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Luottovälitys Oy', rating: '4.8', color: 'blue', icon: <Building2 size={14} /> },
                { name: 'Vuokraturva', rating: '4.6', color: 'purple', icon: <Home size={14} /> },
              ].map(partner => (
                <div key={partner.name} className="glass rounded-xl p-3 flex items-center gap-3 border border-white/5">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br from-${partner.color}-500/20 to-${partner.color}-600/10 border border-${partner.color}-500/20 flex items-center justify-center shrink-0 text-slate-300`}>
                    {partner.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-200">{partner.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] text-amber-400">{partner.rating}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg text-[10px] font-semibold text-black bg-green-500 hover:bg-green-400 transition-all">
                    Tilaa
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Pipeline Visualization */}
      <motion.div variants={item} className="glass rounded-2xl p-4 mb-4 shadow-lg shadow-black/20">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-3 font-medium">Vuokrausprosessi</p>
        <div className="flex items-center justify-between relative">
          <div className="absolute top-3 left-5 right-5 h-0.5 bg-white/5" />
          <div
            className="absolute top-3 left-5 h-0.5 bg-green-500/50 transition-all duration-500"
            style={{ width: `${Math.max(0, activeStepIndex) * 25}%` }}
          />
          {pipelineSteps.map((step, i) => {
            const isActive = step.key === activeTab;
            const isCompleted = i < activeStepIndex;
            const isFuture = i > activeStepIndex;
            return (
              <button
                key={step.key}
                onClick={() => { if (step.key !== 'sopimus') setActiveTab(step.key as ValitysTab); }}
                className="flex flex-col items-center gap-1.5 relative z-10"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                  isActive ? 'bg-green-500 text-black shadow-lg shadow-green-500/30' :
                  isCompleted ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  'bg-white/5 text-slate-600 border border-white/10'
                }`}>
                  {isCompleted ? <Check className="w-3 h-3" /> : <span className="text-[10px]">{step.icon}</span>}
                </div>
                <span className={`text-[8px] font-medium transition-colors duration-300 ${
                  isActive ? 'text-green-400' : isFuture ? 'text-slate-600' : 'text-slate-400'
                }`}>{step.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Sub-Tab Selector */}
      <motion.div variants={item} className="glass rounded-2xl p-1 flex gap-1 mb-4 shadow-lg shadow-black/20">
        {([
          { key: 'ilmoitus', label: 'Ilmoitus', icon: <Megaphone size={12} /> },
          { key: 'hakijat', label: 'Hakijat', icon: <Users size={12} /> },
          { key: 'naytot', label: 'Näytöt', icon: <Calendar size={12} /> },
          { key: 'valinta', label: 'Valinta', icon: <FileText size={12} /> },
        ] as const).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1 px-2 py-2.5 rounded-xl text-[10px] font-medium transition-all duration-300 ${
              activeTab === tab.key ? 'bg-green-400/15 text-green-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'ilmoitus' && <IlmoitusTab property={property} />}
      {activeTab === 'hakijat' && <HakijatTab />}
      {activeTab === 'naytot' && <NaytotTab property={property} />}
      {activeTab === 'valinta' && <ValintaTab />}
    </motion.div>
  );
}

/* ═══════════════════ ILMOITUS TAB ═══════════════════ */

function IlmoitusTab({ property }: { property: Property }) {
  const [published, setPublished] = useState(false);
  const [portals] = useState({
    oikotie: true,
    vuokraovi: true,
    tori: true,
    facebook: true,
  });

  const photoSlots = [
    { id: 1, label: 'Olohuone', gradient: 'from-blue-500/30 to-blue-600/10', filled: true },
    { id: 2, label: 'Keittiö', gradient: 'from-amber-500/30 to-amber-600/10', filled: true },
    { id: 3, label: 'Makuuhuone', gradient: 'from-purple-500/30 to-purple-600/10', filled: true },
    { id: 4, label: 'Kylpyhuone', gradient: 'from-cyan-500/30 to-cyan-600/10', filled: true },
    { id: 5, label: 'Lisää kuva', gradient: 'from-white/5 to-white/5', filled: false },
    { id: 6, label: 'Lisää kuva', gradient: 'from-white/5 to-white/5', filled: false },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Photo Grid */}
      <motion.div variants={item} className="mb-4">
        <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-2 block">Kuvat</label>
        <div className="grid grid-cols-3 gap-2">
          {photoSlots.map(slot => (
            <div
              key={slot.id}
              className={`aspect-square rounded-xl bg-gradient-to-br ${slot.gradient} border ${
                slot.filled ? 'border-white/10' : 'border-dashed border-white/10'
              } flex flex-col items-center justify-center gap-1 relative overflow-hidden`}
            >
              {slot.filled ? (
                <>
                  <Camera className="w-5 h-5 text-white/30" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-1.5 left-2 text-[8px] text-white/60">{slot.label}</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 text-slate-600" />
                  <span className="text-[9px] text-slate-600">{slot.label}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Badge */}
      <motion.div variants={item} className="glass-green rounded-xl p-3 mb-4 flex items-start gap-2 shadow-lg shadow-black/20">
        <Sparkles className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-300 leading-relaxed">
          <span className="text-green-400 font-semibold">AI-avustaja:</span> AI kirjoitti kuvauksen asunnon tietojen perusteella. Muokkaa vapaasti.
        </p>
      </motion.div>

      {/* Listing Form */}
      <motion.div variants={item} className="space-y-3 mb-4">
        <FormField label="Otsikko" value={`Valoisa ${property.type === '2h+k' ? 'kaksio' : property.type === '3h+k' ? 'kolmio' : 'yksiö'} ${property.neighborhood}ssa`} />
        <div>
          <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">Kuvaus</label>
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-green-400/30 resize-none leading-relaxed"
            rows={3}
            defaultValue={`Kaunis ja valoisa ${property.size}m² ${property.type === '2h+k' ? 'kaksio' : property.type === '3h+k' ? 'kolmio' : 'yksiö'} ${property.address.split(' ').slice(0, 1).join('')}lla. Asunto on hyvässä kunnossa. Erinomainen sijainti palveluiden äärellä.`}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Vuokra" value={`${property.currentRent} €/kk`} />
          <FormField label="Vakuus" value="2kk vuokraa" />
          <FormField label="Vapautuu" value="1.4.2026" />
          <FormField label="Neliöt" value={`${property.size} m²`} />
          <FormField label="Huoneet" value={property.type} />
          <FormField label="Kerros" value="3/5" />
          <FormField label="Lemmikit" value="Neuvoteltavissa" />
          <FormField label="Parveke" value="Kyllä" />
        </div>
      </motion.div>

      {/* Portal Checkboxes */}
      <motion.div variants={item} className="mb-4">
        <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-2 block">Julkaisualustat</label>
        <div className="space-y-2">
          {['Oikotie.fi', 'Vuokraovi.fi', 'Tori.fi', 'Facebook Marketplace'].map((label, i) => {
            const keys = ['oikotie', 'vuokraovi', 'tori', 'facebook'] as const;
            return (
              <label key={label} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-all cursor-pointer">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                  portals[keys[i]] ? 'bg-green-500 border-green-500' : 'bg-white/5 border-white/20'
                }`}>
                  {portals[keys[i]] && <Check className="w-3 h-3 text-black" />}
                </div>
                <span className="text-xs text-slate-200">{label}</span>
                {published && portals[keys[i]] && <span className="ml-auto text-[10px] text-green-400 flex items-center gap-1"><CheckCircle2 size={10} className="text-green-400" /> Julkaistu</span>}
              </label>
            );
          })}
        </div>
      </motion.div>

      {/* Publish Button */}
      <motion.div variants={item}>
        {!published ? (
          <button
            onClick={() => setPublished(true)}
            className="w-full bg-green-500 text-black rounded-2xl p-4 flex items-center justify-center gap-2 font-semibold text-sm hover:bg-green-400 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-green-500/20"
          >
            <Send className="w-4 h-4" />
            Julkaise portaaleihin
          </button>
        ) : (
          <div className="glass-green rounded-2xl p-4 text-center shadow-lg shadow-black/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold text-green-400 flex items-center gap-1">Julkaistu 4 portaaliin <CheckCircle2 size={14} className="text-green-400" /></span>
            </div>
            <p className="text-[10px] text-slate-400">Ilmoitus näkyy kaikilla alustoilla 15 minuutin kuluessa</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function FormField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">{label}</label>
      <input
        type="text"
        defaultValue={value}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-green-400/30"
      />
    </div>
  );
}

/* ═══════════════════ HAKIJAT TAB ═══════════════════ */

interface Candidate {
  id: string;
  name: string;
  age: number;
  profession: string;
  householdSize: string;
  income: number;
  message: string;
  status: string;
  statusIcon: ReactNode;
  statusColor: string;
  aiScore: number;
  recommended: boolean;
}

const candidates: Candidate[] = [
  {
    id: 'c1', name: 'Matti Virtanen', age: 32, profession: 'Insinööri', householdSize: '2 hlö talous', income: 4200,
    message: 'Hei! Olemme kiinnostuneita asunnosta. Olemme rauhallinen pariskunta ja molemmat työssäkäyviä.',
    status: 'Suositeltu', statusIcon: <Star size={10} className="text-amber-400" />, statusColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20', aiScore: 95, recommended: true,
  },
  {
    id: 'c2', name: 'Anna Korhonen', age: 28, profession: 'Graafikko', householdSize: '1 hlö', income: 3100,
    message: 'Moi! Etsin yksiötä/kaksiota Kalliosta. Olen siisti ja rauhallinen vuokralainen.',
    status: 'Uusi', statusIcon: null, statusColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20', aiScore: 78, recommended: false,
  },
  {
    id: 'c3', name: 'Juha Mäkinen', age: 45, profession: 'Opettaja', householdSize: '3 hlö (1 lapsi)', income: 3800,
    message: 'Terve, olisimme kiinnostuneita. Meillä on 5-vuotias lapsi ja kissa.',
    status: 'Näyttö sovittu 15.3.', statusIcon: null, statusColor: 'text-green-400 bg-green-400/10 border-green-400/20', aiScore: 82, recommended: false,
  },
  {
    id: 'c4', name: 'Li Wei', age: 25, profession: 'Opiskelija / osa-aikatyö', householdSize: '1 hlö', income: 1800,
    message: "Hello! I'm an exchange student at Aalto University. Very interested!",
    status: 'Vastaus lähetetty', statusIcon: null, statusColor: 'text-slate-400 bg-white/5 border-white/10', aiScore: 45, recommended: false,
  },
  {
    id: 'c5', name: 'Petra Nieminen', age: 38, profession: 'Sairaanhoitaja', householdSize: '1 hlö', income: 3400,
    message: 'Hei! Olen muuttamassa Helsinkiin työn perässä. Rauhallinen ja luotettava vuokralainen.',
    status: 'Uusi', statusIcon: null, statusColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20', aiScore: 80, recommended: false,
  },
];

function HakijatTab() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* AI Recommendation */}
      <motion.div variants={item} className="glass rounded-2xl p-4 mb-4 shadow-lg shadow-black/20 border border-green-400/15" style={{ boxShadow: '0 0 30px rgba(74, 222, 128, 0.05)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-green-400" />
          <span className="text-xs font-semibold text-green-400">AI-suositus</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-slate-100">Matti Virtanen</span> — Vakaat tulot (4.4x vuokra), pariskunta ilman lemmikkejä, pitkäaikainen vuokrasuhde todennäköinen.
        </p>
      </motion.div>

      <motion.div variants={item} className="flex items-center gap-2 mb-3">
        <Users className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-xs text-slate-500">{candidates.length} hakijaa</span>
      </motion.div>

      <div className="space-y-3">
        {candidates.map(candidate => (
          <motion.div
            key={candidate.id}
            variants={item}
            className={`glass rounded-2xl p-4 shadow-lg shadow-black/20 transition-all duration-300 ${
              candidate.recommended ? 'border border-green-400/15' : 'border border-white/5'
            }`}
            style={candidate.recommended ? { boxShadow: '0 0 20px rgba(74, 222, 128, 0.04)' } : {}}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                candidate.recommended
                  ? 'bg-gradient-to-br from-green-500/30 to-green-600/15 border border-green-500/20'
                  : 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
              }`}>
                <span className={`font-bold text-sm ${candidate.recommended ? 'text-green-400' : 'text-slate-400'}`}>
                  {candidate.name[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-sm font-semibold text-slate-100">{candidate.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 ${candidate.statusColor}`}>{candidate.statusIcon}{candidate.status}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap mb-2">
                  <span className="text-[10px] text-slate-500">{candidate.age}v</span>
                  <span className="text-slate-700">·</span>
                  <span className="text-[10px] text-slate-500">{candidate.profession}</span>
                  <span className="text-slate-700">·</span>
                  <span className="text-[10px] text-slate-500">{candidate.householdSize}</span>
                  <span className="text-slate-700">·</span>
                  <span className="text-[10px] text-slate-400 font-medium">{candidate.income.toLocaleString('fi-FI')} €/kk</span>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-2.5 mb-3">
                  <p className="text-[11px] text-slate-400 italic leading-relaxed">"{candidate.message}"</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          candidate.aiScore >= 80 ? 'bg-green-500' : candidate.aiScore >= 60 ? 'bg-amber-500' : 'bg-red-400'
                        }`}
                        style={{ width: `${candidate.aiScore}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-medium ${
                      candidate.aiScore >= 80 ? 'text-green-400' : candidate.aiScore >= 60 ? 'text-amber-400' : 'text-red-400'
                    }`}>{candidate.aiScore}%</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-green-400 bg-green-400/10 hover:bg-green-400/15 transition-all">Vastaa</button>
                    <button className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-blue-400 bg-blue-400/10 hover:bg-blue-400/15 transition-all">Näyttö</button>
                    <button className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-slate-500 bg-white/5 hover:bg-white/[0.08] transition-all">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════ NÄYTÖT TAB ═══════════════════ */

function NaytotTab({ property }: { property: Property }) {
  const showings = [
    { id: 's3', date: '12.3.2026', time: '18:00', candidate: 'Anna Korhonen', extra: '', status: 'completed' as const, notes: 'Positiivinen vaikutelma, siisti olemus, kyseli taloyhtiöstä' },
    { id: 's1', date: '15.3.2026', time: '17:00', candidate: 'Juha Mäkinen', extra: '+perhe', status: 'upcoming' as const, reminders: ['Muistutus lähetetty 14.3.', 'Kalenterimerkintä: Vuokranantaja + Vuokralainen'] },
    { id: 's2', date: '16.3.2026', time: '10:00', candidate: 'Matti Virtanen', extra: '+puoliso', status: 'confirmed' as const },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="glass-green rounded-xl p-3 mb-4 flex items-start gap-2 shadow-lg shadow-black/20">
        <span className="shrink-0"><Lightbulb size={16} className="text-green-400" /></span>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          <span className="text-green-400 font-semibold">Vinkki:</span> Varaa näytöille 30 min välit. Näytä ensin yleiset tilat.
        </p>
      </motion.div>

      <div className="space-y-3 mb-4">
        {showings.map(showing => (
          <motion.div
            key={showing.id}
            variants={item}
            className={`glass rounded-2xl p-4 shadow-lg shadow-black/20 border-l-[3px] ${
              showing.status === 'completed' ? 'border-l-green-500' :
              showing.status === 'confirmed' ? 'border-l-blue-400' : 'border-l-blue-500'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                showing.status === 'completed' ? 'bg-green-500/10 border border-green-500/20' : 'bg-blue-500/10 border border-blue-500/20'
              }`}>
                <Calendar size={18} className={showing.status === 'completed' ? 'text-green-400' : 'text-blue-400'} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-slate-100">{showing.date} klo {showing.time}</span>
                  {showing.status === 'completed' && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/20 font-medium flex items-center gap-1">PIDETTY <CheckCircle2 size={10} /></span>}
                  {showing.status === 'confirmed' && <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20 font-medium flex items-center gap-1">Vahvistettu <CheckCircle2 size={10} /></span>}
                </div>
                <p className="text-xs text-slate-300 mb-1">
                  {showing.candidate} {showing.extra && <span className="text-slate-500">({showing.extra})</span>}
                </p>
                <p className="text-[10px] text-slate-500 mb-2">{property.address}</p>
                {'reminders' in showing && showing.reminders && (
                  <div className="space-y-1 mb-2">
                    {showing.reminders.map((r, i) => (
                      <p key={i} className="text-[10px] text-slate-400 flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-green-400 shrink-0" />{r}
                      </p>
                    ))}
                  </div>
                )}
                {'notes' in showing && showing.notes && (
                  <div className="bg-white/[0.03] rounded-lg p-2.5 mt-2">
                    <p className="text-[10px] text-slate-500 mb-0.5 font-medium">Muistiinpano:</p>
                    <p className="text-[11px] text-slate-400 italic">"{showing.notes}"</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item}>
        <button className="w-full glass rounded-2xl p-4 flex items-center justify-center gap-2 text-sm font-medium text-green-400 hover:bg-white/[0.08] transition-all border border-dashed border-green-400/20">
          <Calendar className="w-4 h-4" />
          Lisää näyttö
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════ VALINTA TAB ═══════════════════ */

function ValintaTab() {
  const [selected, setSelected] = useState(false);
  const topCandidates = candidates.filter(c => c.aiScore >= 78).sort((a, b) => b.aiScore - a.aiScore);

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-4">
        <h2 className="text-sm font-semibold text-slate-100 mb-1">Vertailu</h2>
        <p className="text-[10px] text-slate-500">Parhaat hakijat rinnakkain</p>
      </motion.div>

      <motion.div variants={item} className="flex gap-2 mb-5 overflow-x-auto pb-2">
        {topCandidates.map(candidate => (
          <div
            key={candidate.id}
            className={`glass rounded-2xl p-4 min-w-[160px] flex-1 shadow-lg shadow-black/20 ${
              candidate.recommended ? 'border border-green-400/20' : 'border border-white/5'
            }`}
          >
            <div className="text-center mb-3">
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                candidate.recommended
                  ? 'bg-gradient-to-br from-green-500/30 to-green-600/15 border border-green-500/20'
                  : 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
              }`}>
                <span className={`font-bold text-lg ${candidate.recommended ? 'text-green-400' : 'text-slate-400'}`}>
                  {candidate.name[0]}
                </span>
              </div>
              <h3 className="text-xs font-semibold text-slate-100">{candidate.name}</h3>
              {candidate.recommended && <span className="text-[9px] text-green-400 font-medium flex items-center justify-center gap-1"><Star size={10} className="text-amber-400" /> AI-suositeltu</span>}
            </div>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between"><span className="text-slate-500">Ikä</span><span className="text-slate-300">{candidate.age}v</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Ammatti</span><span className="text-slate-300">{candidate.profession}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Tulot</span><span className="text-slate-300 font-medium">{candidate.income.toLocaleString('fi-FI')} €</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Suhde</span><span className={`font-medium ${candidate.income / 950 >= 3 ? 'text-green-400' : 'text-amber-400'}`}>{(candidate.income / 950).toFixed(1)}x vuokra</span></div>
              <div className="flex justify-between"><span className="text-slate-500">AI</span><span className={`font-medium ${candidate.aiScore >= 80 ? 'text-green-400' : 'text-amber-400'}`}>{candidate.aiScore}%</span></div>
            </div>
            {!selected && (
              <button
                onClick={() => candidate.recommended && setSelected(true)}
                className={`w-full mt-3 py-2 rounded-xl text-[10px] font-semibold transition-all ${
                  candidate.recommended ? 'bg-green-500 text-black hover:bg-green-400' : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                Valitse
              </button>
            )}
          </div>
        ))}
      </motion.div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="glass-green rounded-2xl p-5 shadow-lg shadow-black/20">
            <h3 className="text-sm font-semibold text-green-400 mb-4">Vuokrausprosessi</h3>
            <div className="space-y-3">
              <FlowStep icon={<CheckCircle2 size={16} className="text-green-400" />} label="Vuokralainen valittu: Matti Virtanen" done />
              <FlowStep icon={<Clock size={16} className="text-amber-400" />} label="Sopimus lähetetty allekirjoitettavaksi" />
              <FlowStep icon={<Clock size={16} className="text-amber-400" />} label="Vakuus maksettu" />
              <FlowStep icon={<Clock size={16} className="text-amber-400" />} label="Avainten luovutus" />
            </div>
          </div>
          <div className="glass rounded-2xl p-5 shadow-lg shadow-black/20 border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-100">Vuokrasopimus</h3>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-4 mb-3 space-y-2">
              {[
                ['Vuokranantaja', 'Jyri Aleksi Sosaari'],
                ['Vuokralainen', 'Matti Virtanen'],
                ['Kohde', 'Fleminginkatu 15 B 23'],
                ['Vuokra', '950 €/kk'],
                ['Alkaa', '1.4.2026'],
                ['Vakuus', '1 900 €'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-xs">
                  <span className="text-slate-500">{label}</span>
                  <span className="text-slate-200">{value}</span>
                </div>
              ))}
            </div>
            <button className="w-full bg-green-500 text-black rounded-xl p-3.5 flex items-center justify-center gap-2 font-semibold text-sm hover:bg-green-400 transition-all active:scale-[0.98]">
              <FileText className="w-4 h-4" />
              Allekirjoita sähköisesti
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function FlowStep({ icon, label, done }: { icon: ReactNode; label: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0">{icon}</span>
      <span className={`text-xs ${done ? 'text-green-400 font-medium' : 'text-slate-400'}`}>{label}</span>
      {done && <Check className="w-3.5 h-3.5 text-green-400 ml-auto shrink-0" />}
    </div>
  );
}
