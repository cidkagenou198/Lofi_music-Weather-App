import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import WeatherDisplay from '../components/WeatherDisplay';
import MusicPlayer from '../components/MusicPlayer';
import LocationSearch from '../components/LocationSearch';
import WeatherBackground from '../components/WeatherBackground';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col text-gray-900 dark:text-white relative">
      <WeatherBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <LocationSearch />
          <WeatherDisplay />
          <MusicPlayer />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"
          >
            <p>Music selected to match your current weather conditions.</p>
            <p>Enjoy your weather-based lofi experience!</p>
          </motion.div>
        </motion.div>
      </main>
      
      <footer className="py-4 text-center text-xs text-gray-500 dark:text-gray-500 backdrop-blur-sm bg-white/10 dark:bg-gray-900/20">
        <p>© {new Date().getFullYear()} WeatherLofi App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;