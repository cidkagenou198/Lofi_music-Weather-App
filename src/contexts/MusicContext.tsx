import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWeather } from './WeatherContext';
import { usePreferences } from './PreferencesContext';
import { getMusicByWeather } from '../utils/musicMapper';

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  weatherType: string;
  coverArt: string;
}

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  availableTracks: Track[];
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  changeTrack: (trackId: string) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { weather } = useWeather();
  const { preferences } = usePreferences();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(() => {
    const savedVolume = localStorage.getItem('musicVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.7;
  });
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [availableTracks, setAvailableTracks] = useState<Track[]>([]);

  // Initialize audio when component mounts
  useEffect(() => {
    const audioElement = new Audio();
    audioElement.volume = volume;
    setAudio(audioElement);

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, []);

  // Update tracks based on weather condition
  useEffect(() => {
    if (weather.condition !== 'loading') {
      const tracks = getMusicByWeather(weather.condition);
      setAvailableTracks(tracks);
      
      // If no track is selected or user prefers auto-selection, pick a track for current weather
      if (!currentTrack || preferences.autoSelectMusic) {
        const weatherTracks = tracks.filter(track => track.weatherType === weather.condition);
        if (weatherTracks.length > 0) {
          const lastTrackId = localStorage.getItem(`lastTrack_${weather.condition}`);
          const track = lastTrackId 
            ? weatherTracks.find(t => t.id === lastTrackId) || weatherTracks[0]
            : weatherTracks[0];
            
          setCurrentTrack(track);
          if (audio) {
            audio.src = track.url;
            if (isPlaying) audio.play().catch(err => {
              console.error('Error playing audio:', err);
            });
          }
        }
      }
    }
  }, [weather.condition, preferences.autoSelectMusic]);

  // Play the selected track
  useEffect(() => {
    if (!audio || !currentTrack) return;
    
    // Create a new Audio element to test if the URL is valid
    const audioTest = new Audio();
    audioTest.src = currentTrack.url;
    
    // Only set the source on the main audio element if the test was successful
    audioTest.addEventListener('canplaythrough', () => {
      if (audio) {
        audio.src = currentTrack.url;
        
        if (isPlaying) {
          audio.play().catch(err => {
            console.error('Error playing audio:', err.message);
            setIsPlaying(false);
          });
        }
        
        // Save last played track for this weather
        if (currentTrack.weatherType) {
          localStorage.setItem(`lastTrack_${currentTrack.weatherType}`, currentTrack.id);
        }
      }
    });
    
    // Handle errors during loading
    audioTest.addEventListener('error', (e) => {
      console.error('Error loading audio track:', currentTrack.title, e);
      // If this track fails, try to move to the next one
      setTimeout(() => nextTrack(), 1000);
    });
    
    // Start loading the test audio
    audioTest.load();
    
  }, [currentTrack]);

  // Update audio when play state changes
  useEffect(() => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.play().catch(err => {
        console.error('Error playing audio:', err.message);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Update volume
  useEffect(() => {
    if (audio) {
      audio.volume = volume;
      localStorage.setItem('musicVolume', volume.toString());
    }
  }, [volume]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)));
  };
  
  const changeTrack = (trackId: string) => {
    const track = availableTracks.find(t => t.id === trackId);
    if (track) {
      setCurrentTrack(track);
    }
  };
  
  const nextTrack = () => {
    if (!currentTrack || availableTracks.length === 0) return;
    
    const currentIndex = availableTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % availableTracks.length;
    setCurrentTrack(availableTracks[nextIndex]);
  };
  
  const prevTrack = () => {
    if (!currentTrack || availableTracks.length === 0) return;
    
    const currentIndex = availableTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + availableTracks.length) % availableTracks.length;
    setCurrentTrack(availableTracks[prevIndex]);
  };

  return (
    <MusicContext.Provider value={{
      currentTrack,
      isPlaying,
      volume,
      availableTracks,
      play,
      pause,
      togglePlay,
      setVolume,
      changeTrack,
      nextTrack,
      prevTrack
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};