import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { properties } from '../data/mockData';

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

interface PropertiesListProps {
  onSelectProperty: (id: string) => void;
}

export function PropertiesList({ onSelectProperty }: PropertiesListProps) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Header */}
      <motion.div variants={item} className="mb-5">
        <h1 className="text-xl font-bold text-slate-100">Asunnot</h1>
        <p className="text-xs text-slate-500 mt-1">{properties.length} kohdetta</p>
      </motion.div>

      {/* Property Cards */}
      <div className="space-y-3">
        {properties.map((property) => {
          const delta = property.marketEstimate - property.currentRent;
          const isListing = property.id === 'kallio-1'; // Mock: Kallio has active listing

          return (
            <motion.button
              key={property.id}
              variants={item}
              onClick={() => onSelectProperty(property.id)}
              whileTap={{ scale: 0.98 }}
              className="w-full glass rounded-2xl p-4 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
            >
              <div className="flex items-center gap-4">
                {/* Neighborhood Initial */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20 flex items-center justify-center shrink-0">
                  <span className="text-green-400 font-bold text-xl">{property.neighborhood[0]}</span>
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
                  <span className="text-[10px] text-slate-500 mt-1">alle markkinan</span>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
              </div>

              {/* Active listing badge */}
              {isListing && (
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/20 font-medium">📢 Välitys aktiivinen</span>
                  <span className="text-[10px] text-slate-500">5 hakijaa · 2 näyttöä</span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <motion.div variants={item} className="mt-8 text-center">
        <p className="text-xs text-slate-600">
          Kaikki asunnot vuokrattu
        </p>
      </motion.div>
    </motion.div>
  );
}
