import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Dashboard } from './views/Dashboard';
import { PropertyDetail } from './views/PropertyDetail';
import { RentLetter } from './views/RentLetter';
import { Alerts } from './views/Alerts';
import { properties } from './data/mockData';

export type View = 'dashboard' | 'property' | 'letter' | 'alerts';

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
    <div className="min-h-screen bg-[#f1f5f9]">
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onBack={goBack}
        showBack={currentView !== 'dashboard'}
      />
      <main className="max-w-5xl mx-auto px-4 pb-8 pt-4">
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
            />
          )}
          {currentView === 'letter' && selectedProperty && (
            <RentLetter
              key="letter"
              property={selectedProperty}
              onBack={goBack}
            />
          )}
          {currentView === 'alerts' && (
            <Alerts
              key="alerts"
              onSelectProperty={(id) => navigateTo('property', id)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
