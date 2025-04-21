import React, { createContext, useContext, useState, useEffect } from 'react';

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [location, setLocationState] = useState(() => {
    return localStorage.getItem('weatherLocation') || '';
  });
  
  const [useGeoLocation, setUseGeoLocationState] = useState(() => {
    const saved = localStorage.getItem('useGeoLocation');
    return saved ? saved === 'true' : true;
  });
  
  const [darkMode, setDarkModeState] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? saved === 'true' : false;
  });
  
  const [autoSelectMusic, setAutoSelectMusicState] = useState(() => {
    const saved = localStorage.getItem('autoSelectMusic');
    return saved ? saved === 'true' : true;
  });
  
  const [showAnimations, setShowAnimationsState] = useState(() => {
    const saved = localStorage.getItem('showAnimations');
    return saved ? saved === 'true' : true;
  });

  const setLocation = (newLocation) => {
    setLocationState(newLocation);
    localStorage.setItem('weatherLocation', newLocation);
  };
  
  const setUseGeoLocation = (use) => {
    setUseGeoLocationState(use);
    localStorage.setItem('useGeoLocation', use.toString());
  };
  
  const setDarkMode = (dark) => {
    setDarkModeState(dark);
    localStorage.setItem('darkMode', dark.toString());
  };
  
  const setAutoSelectMusic = (auto) => {
    setAutoSelectMusicState(auto);
    localStorage.setItem('autoSelectMusic', auto.toString());
  };
  
  const setShowAnimations = (show) => {
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

  const preferences = {
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