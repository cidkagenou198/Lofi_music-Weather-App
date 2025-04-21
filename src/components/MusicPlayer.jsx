import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, PauseCircle, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';
import { useWeather } from '../contexts/WeatherContext';

const MusicPlayer = () => {
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    availableTracks,
    togglePlay, 
    setVolume, 
    nextTrack, 
    prevTrack, 
    changeTrack 
  } = useMusic();
  
  const { weather } = useWeather();
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.5);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume);
    }
  };

  if (!currentTrack) {
    return (
      <div className="flex items-center justify-center p-6 text-gray-500 dark:text-gray-400">
        <Music className="mr-2" size={18} />
        <span>No music available for this weather</span>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="p-6 backdrop-blur-md bg-white/20 dark:bg-gray-900/30 rounded-2xl shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="w-24 h-24 rounded-lg overflow-hidden shadow-md"
        >
          <img 
            src={currentTrack.coverArt} 
            alt={currentTrack.title} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="flex-1">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{currentTrack.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{currentTrack.artist}</p>
            <p className="text-xs mt-1 text-primary-600 dark:text-primary-400">
              {availableTracks.filter(track => track.weatherType === weather.condition).length} tracks for {weather.condition} weather
            </p>
          </div>
          
          <div className="mt-4 flex items-center justify-center md:justify-start gap-4">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={prevTrack}
              className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
            >
              <SkipBack size={20} />
            </motion.button>
            
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              {isPlaying ? <PauseCircle size={40} /> : <PlayCircle size={40} />}
            </motion.button>
            
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={nextTrack}
              className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
            >
              <SkipForward size={20} />
            </motion.button>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
          >
            {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 md:w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="text-sm flex items-center text-primary-600 hover:text-primary-700 transition-colors dark:text-primary-400 dark:hover:text-primary-300"
        >
          <Music size={14} className="mr-1" />
          {showPlaylist ? 'Hide playlist' : 'Show playlist'}
        </button>
        
        {showPlaylist && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 max-h-48 overflow-y-auto"
          >
            <div className="space-y-2">
              {availableTracks.map(track => (
                <motion.div 
                  key={track.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => changeTrack(track.id)}
                  className={`p-2 rounded-md cursor-pointer flex items-center gap-2 ${
                    currentTrack.id === track.id 
                      ? 'bg-primary-100 dark:bg-primary-900/20' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800/30'
                  }`}
                >
                  <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                    <img src={track.coverArt} alt={track.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      currentTrack.id === track.id 
                        ? 'text-primary-700 dark:text-primary-400' 
                        : 'text-gray-800 dark:text-gray-300'
                    }`}>
                      {track.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{track.artist}</p>
                  </div>
                  <div className="text-xs px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {track.weatherType}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MusicPlayer;