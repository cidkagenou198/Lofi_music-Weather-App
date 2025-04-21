import axios from 'axios';
import { WeatherData, WeatherCondition } from '../contexts/WeatherContext';

// Replace with your actual OpenWeatherMap API key
// In production, this should be in an environment variable
// For demo purposes, we're hard-coding it here
const API_KEY = '1aed1668ecce65a32f1621b29e8a1119';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Map OpenWeatherMap condition codes to our simplified conditions
const mapWeatherCondition = (code: string): WeatherCondition => {
  const mainCondition = code.split('')[0];
  
  switch (mainCondition) {
    case '01':
    case '02':
      return 'clear';
    case '03':
    case '04':
      return 'clouds';
    case '09':
      return 'drizzle';
    case '10':
      return 'rain';
    case '11':
      return 'thunderstorm';
    case '13':
      return 'snow';
    case '50':
      return code === '50d' ? 'mist' : 'fog';
    default:
      return 'clear';
  }
};

// Determine if it's day or night based on icon
const getTimeOfDay = (icon: string) => {
  return icon.includes('d') ? 'day' : 'night';
};

export const fetchWeather = async (location: string): Promise<WeatherData> => {
  try {
    const params = location.includes(',') 
      ? { lat: location.split(',')[0], lon: location.split(',')[1], appid: API_KEY, units: 'metric' }
      : { q: location, appid: API_KEY, units: 'metric' };
      
    const response = await axios.get(BASE_URL, { params });
    const data = response.data;
    
    return {
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: mapWeatherCondition(data.weather[0].icon),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      location: data.name,
      country: data.sys.country,
      timeOfDay: getTimeOfDay(data.weather[0].icon),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      updatedAt: new Date(),
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        throw new Error('Location not found. Please try another location.');
      } else if (error.response.status === 401) {
        throw new Error('Invalid API key. Please check your API settings.');
      }
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
};
