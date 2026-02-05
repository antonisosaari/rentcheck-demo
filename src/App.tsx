import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './views/Dashboard';
import { PropertyDetail } from './views/PropertyDetail';
import { RentLetter } from './views/RentLetter';
import { Messages } from './views/Messages';
import { Valitys } from './views/Valitys';
import { MoreView } from './views/MoreView';
import { properties } from './data/mockData';

export type View = 'dashboard' | 'property' | 'letter' | 'alerts' | 'leases' | 'expenses' | 'tax' | 'messages' | 'services' | 'management' | 'valitys' | 'more';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const selectedProperty = properties.find(p => p.id === selectedPropertyId) || null;

  const navigateTo = (view: View, propertyId?: string) => {
    if (propertyId) setSelectedPropertyId(propertyId);
    setCurrentView(view);
  };

  const goBack = () => {
    if (currentView === 'letter') {
      setCurrentView('property');
    } else {
      setCurrentView('dashboard');
      setSelectedPropertyId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115]">
      <main className="max-w-md mx-auto px-4 pb-24 pt-6">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <Dashboard key="dashboard" onSelectProperty={(id) => navigateTo('property', id)} onNavigate={navigateTo} />
          )}
          {currentView === 'property' && selectedProperty && (
            <PropertyDetail
              key={`property-${selectedProperty.id}`}
              property={selectedProperty}
              onGenerateLetter={() => navigateTo('letter')}
              onBack={goBack}
              onNavigate={navigateTo}
            />
          )}
          {currentView === 'letter' && selectedProperty && (
            <RentLetter
              key="letter"
              property={selectedProperty}
              onBack={goBack}
            />
          )}
          {currentView === 'messages' && (
            <Messages key="messages" />
          )}
          {currentView === 'valitys' && (
            <Valitys key="valitys" />
          )}
          {currentView === 'more' && (
            <MoreView
              key="more"
              onSelectProperty={(id) => navigateTo('property', id)}
              onNavigate={navigateTo}
            />
          )}
        </AnimatePresence>
      </main>
      <BottomNav currentView={currentView} onNavigate={navigateTo} />
    </div>
  );
}

export default App;
