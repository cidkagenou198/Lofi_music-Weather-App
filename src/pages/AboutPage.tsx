import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Twitter, Coffee, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import WeatherBackground from '../components/WeatherBackground';

const AboutPage: React.FC = () => {
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
            <h1 className="text-2xl font-display font-bold">About WeatherLofi</h1>
          </div>
          
          <div className="backdrop-blur-md bg-white/20 dark:bg-gray-900/30 rounded-2xl shadow-lg p-6">
            <section className="mb-8">
              <h2 className="text-xl font-display font-semibold mb-4">What is WeatherLofi?</h2>
              <p className="mb-4">
                WeatherLofi is a unique application that combines weather information with 
                carefully curated lofi music tracks. The app automatically selects music 
                that matches your current weather conditions, creating the perfect atmosphere 
                for work, study, or relaxation.
              </p>
              <p>
                Whether it's a rainy day, sunny afternoon, or snowy evening, WeatherLofi 
                provides the perfect soundtrack to complement your environment.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-display font-semibold mb-4">Features</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Real-time weather data for your location</li>
                <li>Weather-matched lofi music tracks</li>
                <li>Dynamic backgrounds that change with weather conditions</li>
                <li>Playlist management with multiple tracks per weather type</li>
                <li>Dark mode support</li>
                <li>Location search and geolocation capabilities</li>
                <li>Customizable settings for personalization</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-display font-semibold mb-4">How It Works</h2>
              <p>
                WeatherLofi fetches your local weather data using the OpenWeatherMap API. 
                It then categorizes the current conditions and selects music tracks that best 
                match the mood of your weather. For example, gentle, relaxing beats for rain, 
                or brighter melodies for sunny days.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-display font-semibold mb-4">Connect With Us</h2>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="flex items-center px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                  <Github size={18} className="mr-2" />
                  GitHub
                </a>
                <a href="#" className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                  <Twitter size={18} className="mr-2" />
                  Twitter
                </a>
                <a href="#" className="flex items-center px-4 py-2 rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors">
                  <Coffee size={18} className="mr-2" />
                  Buy Me a Coffee
                </a>
              </div>
            </section>
            
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                Made with <Heart size={16} className="mx-1 text-error-500" /> using React, Tailwind CSS, and OpenWeatherMap API
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      
      <footer className="py-4 text-center text-xs text-gray-500 dark:text-gray-500 backdrop-blur-sm bg-white/10 dark:bg-gray-900/20">
        <p>© {new Date().getFullYear()} WeatherLofi App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;