import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeather } from '../services/weatherService';
import { usePreferences } from './PreferencesContext';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState({
    temperature: 0,
    feelsLike: 0,
    condition: 'loading',
    description: 'Loading weather data...',
    icon: '01d',
    location: 'Loading...',
    country: '',
    timeOfDay: 'day',
    humidity: 0,
    windSpeed: 0,
    updatedAt: new Date(),
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { preferences } = usePreferences();

  const refreshWeather = async () => {
    if (!preferences.location) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeather(preferences.location);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const setLocation = (location) => {
    preferences.setLocation(location);
  };

  useEffect(() => {
    if (preferences.location) {
      refreshWeather();
    } else if (preferences.useGeoLocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const data = await fetchWeather(`${latitude},${longitude}`);
            setWeather(data);
            setLoading(false);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
            setLoading(false);
          }
        },
        (err) => {
          setError(`Geolocation error: ${err.message}`);
          setLoading(false);
        }
      );
    }
    
    // Refresh weather data every 30 minutes
    const interval = setInterval(refreshWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [preferences.location, preferences.useGeoLocation]);

  return (
    <WeatherContext.Provider value={{ weather, loading, error, refreshWeather, setLocation }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};