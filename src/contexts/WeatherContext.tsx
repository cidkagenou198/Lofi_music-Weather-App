import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeather } from '../services/weatherService';
import { usePreferences } from './PreferencesContext';

export type WeatherCondition = 
  | 'clear' 
  | 'clouds' 
  | 'rain' 
  | 'drizzle' 
  | 'thunderstorm' 
  | 'snow' 
  | 'mist' 
  | 'fog'
  | 'loading';

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  description: string;
  icon: string;
  location: string;
  country: string;
  timeOfDay: 'day' | 'night';
  humidity: number;
  windSpeed: number;
  updatedAt: Date;
}

const initialWeatherState: WeatherData = {
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
};

interface WeatherContextType {
  weather: WeatherData;
  loading: boolean;
  error: string | null;
  refreshWeather: () => Promise<void>;
  setLocation: (location: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData>(initialWeatherState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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

  const setLocation = (location: string) => {
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