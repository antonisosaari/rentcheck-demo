import { motion } from 'framer-motion';
import { ArrowLeft, LayoutDashboard, Bell, Building2, FileText, Receipt, Calculator } from 'lucide-react';
import type { View } from '../App';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onBack: () => void;
  showBack: boolean;
}

export function Header({ currentView, onNavigate, onBack, showBack }: HeaderProps) {
  return (
    <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onBack}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
          )}
          <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-gray-900 leading-tight">RentCheck</span>
              <span className="text-[10px] text-gray-400 leading-tight tracking-wide uppercase hidden sm:block">Vuokranhallinnan kokonaisratkaisu</span>
            </div>
          </button>
        </div>
        <nav className="flex items-center gap-0.5">
          <NavButton
            active={currentView === 'dashboard'}
            onClick={() => onNavigate('dashboard')}
            icon={<LayoutDashboard className="w-4 h-4" />}
            label="Yhteenveto"
          />
          <NavButton
            active={currentView === 'leases'}
            onClick={() => onNavigate('leases')}
            icon={<FileText className="w-4 h-4" />}
            label="Sopimukset"
          />
          <NavButton
            active={currentView === 'expenses'}
            onClick={() => onNavigate('expenses')}
            icon={<Receipt className="w-4 h-4" />}
            label="Kulut"
          />
          <NavButton
            active={currentView === 'tax'}
            onClick={() => onNavigate('tax')}
            icon={<Calculator className="w-4 h-4" />}
            label="Verokoonti"
          />
          <NavButton
            active={currentView === 'alerts'}
            onClick={() => onNavigate('alerts')}
            icon={<Bell className="w-4 h-4" />}
            label="Ilmoitukset"
            badge={4}
          />
        </nav>
      </div>
    </header>
  );
}

function NavButton({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-blue-50 text-[#2563eb]'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
      {badge && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}
