import { motion } from 'framer-motion';
import type { View } from '../App';

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const tabs: { view: View; icon: string; label: string }[] = [
  { view: 'dashboard', icon: '🏠', label: 'Koti' },
  { view: 'properties', icon: '🏘️', label: 'Asunnot' },
  { view: 'messages', icon: '💬', label: 'Viestit' },
  { view: 'profile', icon: '👤', label: 'Profiili' },
];

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const getActiveIndex = () => {
    if (currentView === 'dashboard') return 0;
    if (['properties', 'property', 'letter'].includes(currentView)) return 1;
    if (currentView === 'messages') return 2;
    if (currentView === 'profile') return 3;
    return 0;
  };

  const activeIndex = getActiveIndex();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="glass rounded-2xl mb-2 mx-1 px-1 py-1 flex items-center justify-around shadow-lg shadow-black/40">
          {tabs.map((tab, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={tab.label}
                onClick={() => onNavigate(tab.view)}
                className="relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-300 min-w-0 flex-1"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="text-lg relative z-10">{tab.icon}</span>
                <span className={`text-[10px] font-medium relative z-10 transition-colors duration-300 ${
                  isActive ? 'text-green-400' : 'text-slate-500'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
