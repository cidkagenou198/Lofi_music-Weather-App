import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WeatherProvider } from './contexts/WeatherContext';
import { MusicProvider } from './contexts/MusicContext';
import { PreferencesProvider } from './contexts/PreferencesContext';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import GetStartedPage from './pages/GetStartedPage';

function App() {
  // Check if the user has visited before
  const hasVisited = sessionStorage.getItem('hasVisited');

  // If this is the first visit in this session, mark it
  if (!hasVisited) {
    sessionStorage.setItem('hasVisited', 'true');
  }

  return (
    <Router>
      <PreferencesProvider>
        <WeatherProvider>
          <MusicProvider>
            <Routes>
              <Route path="/" element={<GetStartedPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* Catch all other routes and redirect to get started page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MusicProvider>
        </WeatherProvider>
      </PreferencesProvider>
    </Router>
  );
}

export default App;
