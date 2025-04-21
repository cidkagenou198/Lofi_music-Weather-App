import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import WeatherBackground from '../components/WeatherBackground';
import { usePreferences } from '../contexts/PreferencesContext';

const SettingsPage = () => {
  const { preferences } = usePreferences();

  const SettingToggle = ({ title, description, value, onChange }) => {
    return (
      <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 
                        dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 
                        peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                        after:bg-white after:border-gray-300 after:border after:rounded-full 
                        after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                        peer-checked:bg-primary-600"></div>
        </label>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-900 dark:text-white">
      <WeatherBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-6 flex items-center">
            <Link to="/" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mr-3">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-display font-bold">Settings</h1>
          </div>
          
          <div className="backdrop-blur-md bg-white/20 dark:bg-gray-900/30 rounded-2xl shadow-lg p-6">
            <SettingToggle
              title="Use Geolocation"
              description="Automatically detect your location for weather data"
              value={preferences.useGeoLocation}
              onChange={preferences.setUseGeoLocation}
            />
            
            <SettingToggle
              title="Dark Mode"
              description="Switch between light and dark interface"
              value={preferences.darkMode}
              onChange={preferences.setDarkMode}
            />
            
            <SettingToggle
              title="Auto-select Music"
              description="Automatically select music based on current weather"
              value={preferences.autoSelectMusic}
              onChange={preferences.setAutoSelectMusic}
            />
            
            <SettingToggle
              title="Show Weather Animations"
              description="Display animated weather effects in the background"
              value={preferences.showAnimations}
              onChange={preferences.setShowAnimations}
            />
          </div>
        </motion.div>
      </main>
      
      <footer className="py-4 text-center text-xs text-gray-500 dark:text-gray-500 backdrop-blur-sm bg-white/10 dark:bg-gray-900/20">
        <p>© {new Date().getFullYear()} WeatherLofi App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SettingsPage;