// Sample lofi tracks for each weather condition
// In a real app, you'd likely fetch these from a backend or have more tracks
const musicLibrary = [
  {
    id: 'rainy-1',
    title: 'Rainfall Melody',
    artist: 'LofiCloud',
    url: 'https://audio.jukehost.co.uk/rUT59hjrGfvrfzkVsZ4UuJaK1FkwqNR1',
    weatherType: 'rain',
    coverArt: 'https://images.pexels.com/photos/7002973/pexels-photo-7002973.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'rainy-2',
    title: 'Rainy Day Coffee',
    artist: 'Chillhop',
    url: 'https://audio.jukehost.co.uk/HOrMElQd2JrS0NFMaoZfIuECqobuKjGX',
    weatherType: 'rain',
    coverArt: 'https://images.pexels.com/photos/7002973/pexels-photo-7002973.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'sunny-1',
    title: 'Morning Light',
    artist: 'SunLofi',
    url: 'https://audio.jukehost.co.uk/V5EtcflV3HzTr8J64QAgpKWcsVftSgrZ',
    weatherType: 'clear',
    coverArt: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'sunny-2',
    title: 'Warm Breeze',
    artist: 'SunsetBeats',
    url: 'https://audio.jukehost.co.uk/IWex6HhHZ6PWZbcqLcPOfMJWWjJm4H8d',
    weatherType: 'clear',
    
    coverArt: 'https://images.pexels.com/photos/3331094/pexels-photo-3331094.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'cloudy-1',
    title: 'Floating Clouds',
    artist: 'LofiSky',
    url: 'https://audio.jukehost.co.uk/2DA73E9tgPOwyFzP8mGhcohddxefLgtu',
    weatherType: 'clouds',
    coverArt: 'https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'thunder-1',
    title: 'Electric Night',
    artist: 'StormBeats',
    url: 'https://audio.jukehost.co.uk/hNZhgq7jLAPiSCayojUA2aHTG4XQHats',
    weatherType: 'thunderstorm',
    coverArt: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'snow-1',
    title: 'Winter Dreams',
    artist: 'SnowLofi',
    url: 'https://audio.jukehost.co.uk/rpVYm1pha3HSSj2x6od2AHEjlu1zVhjQ',
    weatherType: 'snow',
    coverArt: 'https://images.pexels.com/photos/813872/pexels-photo-813872.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'drizzle-1',
    title: 'Gentle Drops',
    artist: 'MistBeats',
    url: 'https://audio.jukehost.co.uk/2DA73E9tgPOwyFzP8mGhcohddxefLgtu',
    weatherType: 'drizzle',
    coverArt: 'https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'fog-1',
    title: 'Misty Morning',
    artist: 'FogWaves',
    url: 'https://audio.jukehost.co.uk/IWex6HhHZ6PWZbcqLcPOfMJWWjJm4H8d',
    weatherType: 'fog',
    coverArt: 'https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export const getMusicByWeather = (weatherCondition) => {
  // Return all tracks, but make sure tracks matching current weather are first
  const matchingTracks = musicLibrary.filter(track => track.weatherType === weatherCondition);
  const otherTracks = musicLibrary.filter(track => track.weatherType !== weatherCondition);
  
  return [...matchingTracks, ...otherTracks];
};

export const getTrackById = (id) => {
  return musicLibrary.find(track => track.id === id);
};
