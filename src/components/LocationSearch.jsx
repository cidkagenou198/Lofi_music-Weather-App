import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { usePreferences } from '../contexts/PreferencesContext';

const LocationSearch = () => {
  const { setLocation } = useWeather();
  const { preferences } = usePreferences();
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setIsSearching(true);
      setLocation(searchInput.trim());
      
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsSearching(true);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude},${longitude}`);
          preferences.setUseGeoLocation(true);
          setIsSearching(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsSearching(false);
          alert('Could not get your location. Please enter it manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="p-6 backdrop-blur-md bg-white/20 dark:bg-gray-900/30 rounded-2xl shadow-lg"
    >
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative w-full">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter city or location..."
            className="w-full py-2 pl-10 pr-4 rounded-lg border-2 border-gray-200 focus:border-primary-400 
                     focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-colors 
                     dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-primary-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            type="submit"
            disabled={isSearching || !searchInput.trim()}
            className={`py-2 px-4 rounded-lg font-medium transition-colors whitespace-nowrap
                      ${isSearching || !searchInput.trim() 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400' 
                        : 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700'
                      }`}
          >
            {isSearching ? <Loader2 className="animate-spin" size={18} /> : 'Search'}
          </button>
          
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isSearching}
            className={`py-2 px-4 rounded-lg transition-colors whitespace-nowrap flex items-center
                      ${isSearching 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400' 
                        : 'bg-secondary-500 text-white hover:bg-secondary-600 dark:bg-secondary-600 dark:hover:bg-secondary-700'
                      }`}
          >
            <MapPin size={16} className="mr-1" />
            <span className="hidden md:inline">Current Location</span>
            <span className="inline md:hidden">My Location</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default LocationSearch;