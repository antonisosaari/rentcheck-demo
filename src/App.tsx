import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './views/Dashboard';
import { PropertiesList } from './views/PropertiesList';
import { PropertyDetail } from './views/PropertyDetail';
import { RentLetter } from './views/RentLetter';
import { Messages } from './views/Messages';
import { Profile } from './views/Profile';
import { properties } from './data/mockData';

export type View = 'dashboard' | 'properties' | 'property' | 'letter' | 'messages' | 'profile';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [propertyInitialTab, setPropertyInitialTab] = useState<string | undefined>(undefined);

  const selectedProperty = properties.find(p => p.id === selectedPropertyId) || null;

  const navigateTo = (view: View, propertyId?: string, initialTab?: string) => {
    if (propertyId) setSelectedPropertyId(propertyId);
    setPropertyInitialTab(initialTab);
    setCurrentView(view);
  };

  const goBack = () => {
    if (currentView === 'letter') {
      setCurrentView('property');
    } else if (currentView === 'property') {
      setCurrentView('properties');
      setSelectedPropertyId(null);
      setPropertyInitialTab(undefined);
    } else {
      setCurrentView('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115]">
      <main className="max-w-md mx-auto px-4 pb-24 pt-6">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <Dashboard
              key="dashboard"
              onSelectProperty={(id, tab) => navigateTo('property', id, tab)}
              onNavigate={navigateTo}
            />
          )}
          {currentView === 'properties' && (
            <PropertiesList
              key="properties"
              onSelectProperty={(id) => navigateTo('property', id)}
            />
          )}
          {currentView === 'property' && selectedProperty && (
            <PropertyDetail
              key={`property-${selectedProperty.id}`}
              property={selectedProperty}
              initialTab={propertyInitialTab}
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
          {currentView === 'profile' && (
            <Profile key="profile" />
          )}
        </AnimatePresence>
      </main>
      <BottomNav currentView={currentView} onNavigate={navigateTo} />
    </div>
  );
}

export default App;
