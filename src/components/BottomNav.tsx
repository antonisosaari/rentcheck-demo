import { motion } from 'framer-motion';
import type { View } from '../App';

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const tabs: { view: View; icon: string; label: string }[] = [
  { view: 'dashboard', icon: '🏠', label: 'Koti' },
  { view: 'property', icon: '🏘️', label: 'Asunnot' },
  { view: 'leases', icon: '📋', label: 'Sopimukset' },
  { view: 'expenses', icon: '🧾', label: 'Kulut' },
  { view: 'tax', icon: '📊', label: 'Vero' },
];

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  // Map property-related views to the "Asunnot" tab
  const activeView = ['property', 'letter', 'alerts'].includes(currentView) ? 'property' : currentView;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="glass rounded-2xl mb-2 mx-1 px-1 py-1 flex items-center justify-around shadow-lg shadow-black/40">
          {tabs.map((tab) => {
            const isActive = activeView === tab.view;
            return (
              <button
                key={tab.view}
                onClick={() => {
                  if (tab.view === 'property') {
                    onNavigate('dashboard');
                  } else {
                    onNavigate(tab.view);
                  }
                }}
                className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 min-w-0 flex-1"
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
