import { useState, useEffect } from 'react';
import { Desktop } from './components/Desktop';
import { ChatDialog } from './components/ChatDialog';
import { AppConfig } from './types';
import { loadApps } from './config/apps';
import './App.css';

function App() {
  const [activeApp, setActiveApp] = useState<AppConfig | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [apps, setApps] = useState<AppConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load apps when component mounts
    const initializeApps = async () => {
      setIsLoading(true);
      try {
        const loadedApps = await loadApps();
        setApps(loadedApps);
      } catch (error) {
        console.error('Error initializing apps:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApps();
  }, []);

  const handleAppClick = (app: AppConfig) => {
    setActiveApp(app);
    setIsDialogOpen(true);
  };

  return (
    <div className="app-container">
      {isLoading ? (
        <div className="loading-screen">
          <div className="loading-logo">
            <img src="/lyraios.png" alt="Lyra OS" />
          </div>
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading Lyra OS...</div>
        </div>
      ) : (
        <>
          <Desktop apps={apps} onAppClick={handleAppClick} />
          <ChatDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            app={activeApp}
          />
        </>
      )}
    </div>
  );
}

export default App;
