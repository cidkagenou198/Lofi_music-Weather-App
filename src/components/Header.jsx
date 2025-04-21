import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { CloudRain, Settings, Info, Sun, Moon } from 'lucide-react';
import { usePreferences } from '../contexts/PreferencesContext';

const Header = () => {
  const { preferences } = usePreferences();
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-white/10 dark:bg-gray-900/20 py-4 px-6 rounded-b-lg shadow-sm"
    >
      <div className="flex justify-between items-center">
        <Link to="/home" className="flex items-center space-x-2">
          <CloudRain className="text-primary-500" size={28} />
          <span className="text-xl font-display font-bold text-gray-900 dark:text-white">WeatherLofi</span>
        </Link>
        
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Link 
            to="/home"
            className={`p-2 rounded-lg transition-colors ${
              isActive('/home') 
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/30'
            }`}
          >
            <span className="sr-only">Home</span>
            <CloudRain size={20} />
          </Link>
          
          <Link 
            to="/settings"
            className={`p-2 rounded-lg transition-colors ${
              isActive('/settings') 
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/30'
            }`}
          >
            <span className="sr-only">Settings</span>
            <Settings size={20} />
          </Link>
          
          <Link 
            to="/about"
            className={`p-2 rounded-lg transition-colors ${
              isActive('/about') 
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/30'
            }`}
          >
            <span className="sr-only">About</span>
            <Info size={20} />
          </Link>
          
          <button
            onClick={() => preferences.setDarkMode(!preferences.darkMode)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:bg-gray-800/30"
          >
            <span className="sr-only">{preferences.darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            {preferences.darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
