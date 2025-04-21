import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../contexts/WeatherContext';
import { CloudRain, Cloud, Sun, CloudSun, CloudFog, CloudSnow, CloudLightning, RefreshCw } from 'lucide-react';

const WeatherDisplay: React.FC = () => {
  const { weather, loading, error, refreshWeather } = useWeather();

  // Mapping of weather conditions to icons
  const getWeatherIcon = (condition: string, size = 36) => {
    switch (condition) {
      case 'rain':
      case 'drizzle':
        return <CloudRain size={size} className="text-primary-500" />;
      case 'clouds':
        return <Cloud size={size} className="text-secondary-400" />;
      case 'clear':
        return <Sun size={size} className="text-accent-500" />;
      case 'mist':
      case 'fog':
        return <CloudFog size={size} className="text-secondary-300" />;
      case 'snow':
        return <CloudSnow size={size} className="text-primary-200" />;
      case 'thunderstorm':
        return <CloudLightning size={size} className="text-primary-600" />;
      default:
        return <CloudSun size={size} className="text-accent-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <RefreshCw size={36} className="animate-spin mx-auto mb-4 text-primary-500" />
          <p className="text-lg font-medium">Loading weather data...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-error-50 text-error-700 p-4 rounded-lg"
        >
          <p className="mb-2 font-medium">Error: {error}</p>
          <button 
            onClick={() => refreshWeather()}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 backdrop-blur-md bg-white/20 dark:bg-gray-900/30 rounded-2xl shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-center md:text-left"
        >
          {getWeatherIcon(weather.condition, 64)}
        </motion.div>
        
        <div className="flex-1">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
              {weather.temperature}°C
            </h1>
            <p className="text-lg capitalize text-gray-700 dark:text-gray-300">
              {weather.description}
            </p>
            <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
              <p className="text-lg font-medium">{weather.location}, {weather.country}</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400">Feels like</span>
              <span className="font-medium text-gray-900 dark:text-white">{weather.feelsLike}°C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400">Humidity</span>
              <span className="font-medium text-gray-900 dark:text-white">{weather.humidity}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400">Wind</span>
              <span className="font-medium text-gray-900 dark:text-white">{weather.windSpeed} km/h</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400">Updated</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Date(weather.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => refreshWeather()}
        className="mt-4 flex items-center text-sm text-primary-600 hover:text-primary-700 transition-colors dark:text-primary-400 dark:hover:text-primary-300"
      >
        <RefreshCw size={14} className="mr-1" /> Refresh
      </button>
    </motion.div>
  );
};

export default WeatherDisplay;
