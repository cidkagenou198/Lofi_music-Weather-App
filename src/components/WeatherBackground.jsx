import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../contexts/WeatherContext';
import { usePreferences } from '../contexts/PreferencesContext';

const WeatherBackground = () => {
  const { weather } = useWeather();
  const { preferences } = usePreferences();
  
  // Background images for different weather conditions
  const getBackgroundImage = (condition, timeOfDay) => {
    const images = {
      clear: {
        day: 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1600',
        night: 'https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      clouds: {
        day: 'https://images.pexels.com/photos/531767/pexels-photo-531767.jpeg?auto=compress&cs=tinysrgb&w=1600',
        night: 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      rain: {
        day: 'https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&w=1600',
        night: 'https://images.pexels.com/photos/3617453/pexels-photo-3617453.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      drizzle: {
        day: 'https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&w=1600',
        night: 'https://images.pexels.com/photos/3617453/pexels-photo-3617453.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      thunderstorm: {
        day: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1600',
        night: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      snow: {
        day: 'https://images.pexels.com/photos/813872/pexels-photo-813872.jpeg?auto=compress&cs=tinysrgb&w=1600',
        night: 'https://images.pexels.com/photos/773594/pexels-photo-773594.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      mist: {
        day: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1600',
        night: 'https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      fog: {
        day: 'https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg?auto=compress&cs=tinysrgb&w=1600',
        night: 'https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      loading: {
        day: 'https://images.pexels.com/photos/531767/pexels-photo-531767.jpeg?auto=compress&cs=tinysrgb&w=1600',
        night: 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg?auto=compress&cs=tinysrgb&w=1600'
      }
    };
    
    const conditionImages = images[condition] || images.clear;
    return conditionImages[timeOfDay] || conditionImages.day;
  };

  // Weather-specific animation components
  const RainAnimation = () => {
    if (!preferences.showAnimations) return null;
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, index) => (
          <div 
            key={index}
            className="absolute top-0 h-20 w-0.5 bg-blue-100"
            style={{
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.2,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 1}s`,
            }}
          >
            <motion.div 
              initial={{ y: -100 }}
              animate={{ y: window.innerHeight }}
              transition={{
                repeat: Infinity,
                duration: 1 + Math.random() * 1,
                ease: "linear"
              }}
              className="h-full w-full bg-blue-200"
            />
          </div>
        ))}
      </div>
    );
  };

  const SnowAnimation = () => {
    if (!preferences.showAnimations) return null;
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, index) => (
          <motion.div 
            key={index}
            className="absolute w-2 h-2 rounded-full bg-white/70"
            style={{
              left: `${Math.random() * 100}%`,
              top: -10,
            }}
            animate={{
              y: [0, window.innerHeight],
              x: [0, Math.random() * 50 - 25],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + Math.random() * 10,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>
    );
  };

  const SunRaysAnimation = () => {
    if (!preferences.showAnimations) return null;
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-yellow-500/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-10 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-yellow-400/10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    );
  };

  // Render the appropriate weather animation
  const renderWeatherAnimation = () => {
    switch (weather.condition) {
      case 'rain':
      case 'drizzle':
        return <RainAnimation />;
      case 'snow':
        return <SnowAnimation />;
      case 'clear':
        return weather.timeOfDay === 'day' ? <SunRaysAnimation /> : null;
      default:
        return null;
    }
  };

  const backgroundImage = getBackgroundImage(weather.condition, weather.timeOfDay);
  const overlayOpacity = weather.timeOfDay === 'night' ? 0.7 : 0.4;
  const overlayColor = preferences.darkMode 
    ? `rgba(0, 0, 0, ${overlayOpacity})` 
    : `rgba(0, 0, 0, ${overlayOpacity * 0.6})`;

  return (
    <div className="fixed inset-0 -z-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute inset-0"
      />
      
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor }}
      />
      
      {renderWeatherAnimation()}
    </div>
  );
};

export default WeatherBackground;