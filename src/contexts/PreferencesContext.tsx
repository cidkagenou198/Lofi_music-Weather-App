import React, { createContext, useContext, useState, useEffect } from 'react';

interface Preferences {
  location: string;
  useGeoLocation: boolean;
  darkMode: boolean;
  autoSelectMusic: boolean;
  showAnimations: boolean;
  setLocation: (location: string) => void;
  setUseGeoLocation: (use: boolean) => void;
  setDarkMode: (dark: boolean) => void;
  setAutoSelectMusic: (auto: boolean) => void;
  setShowAnimations: (show: boolean) => void;
}

interface PreferencesContextType {
  preferences: Preferences;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocationState] = useState<string>(() => {
    return localStorage.getItem('weatherLocation') || '';
  });
  
  const [useGeoLocation, setUseGeoLocationState] = useState<boolean>(() => {
    const saved = localStorage.getItem('useGeoLocation');
    return saved ? saved === 'true' : true;
  });
  
  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? saved === 'true' : false;
  });
  
  const [autoSelectMusic, setAutoSelectMusicState] = useState<boolean>(() => {
    const saved = localStorage.getItem('autoSelectMusic');
    return saved ? saved === 'true' : true;
  });
  
  const [showAnimations, setShowAnimationsState] = useState<boolean>(() => {
    const saved = localStorage.getItem('showAnimations');
    return saved ? saved === 'true' : true;
  });

  const setLocation = (newLocation: string) => {
    setLocationState(newLocation);
    localStorage.setItem('weatherLocation', newLocation);
  };
  
  const setUseGeoLocation = (use: boolean) => {
    setUseGeoLocationState(use);
    localStorage.setItem('useGeoLocation', use.toString());
  };
  
  const setDarkMode = (dark: boolean) => {
    setDarkModeState(dark);
    localStorage.setItem('darkMode', dark.toString());
  };
  
  const setAutoSelectMusic = (auto: boolean) => {
    setAutoSelectMusicState(auto);
    localStorage.setItem('autoSelectMusic', auto.toString());
  };
  
  const setShowAnimations = (show: boolean) => {
    setShowAnimationsState(show);
    localStorage.setItem('showAnimations', show.toString());
  };

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const preferences: Preferences = {
    location,
    useGeoLocation,
    darkMode,
    autoSelectMusic,
    showAnimations,
    setLocation,
    setUseGeoLocation,
    setDarkMode,
    setAutoSelectMusic,
    setShowAnimations
  };

  return (
    <PreferencesContext.Provider value={{ preferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};