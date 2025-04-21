import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CloudRain, Music, Sun, Moon } from 'lucide-react';

const GetStartedPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex justify-center items-center mb-4">
            <CloudRain size={48} className="text-white" />
            <Music size={48} className="text-white ml-2" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Welcome to WeatherLofi
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Experience music that matches your weather
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl">
            <Sun className="w-12 h-12 mb-4 mx-auto text-accent-300" />
            <h3 className="text-xl font-semibold mb-2">Weather-Matched Music</h3>
            <p className="text-white/80">
              Our app automatically selects the perfect lofi tracks based on your local weather
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl">
            <Moon className="w-12 h-12 mb-4 mx-auto text-secondary-300" />
            <h3 className="text-xl font-semibold mb-2">Day & Night Themes</h3>
            <p className="text-white/80">
              Dynamic backgrounds and music that adapt to the time of day
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg
                     hover:bg-white/90 transform hover:scale-105 transition-all duration-300
                     shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="absolute bottom-4 text-center text-sm text-white/60"
      >
        <p>© {new Date().getFullYear()} WeatherLofi. All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default GetStartedPage;