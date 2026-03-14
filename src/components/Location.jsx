import React, { useState, useEffect, useCallback } from 'react';

const weatherSymbols = {
  1: { icon: "☀️", desc: "Clear sky" },
  2: { icon: "🌤️", desc: "Nearly clear sky" },
  3: { icon: "⛅", desc: "Variable cloudiness" },
  4: { icon: "🌥️", desc: "Halfclear sky" },
  5: { icon: "☁️", desc: "Cloudy sky" },
  6: { icon: "🌫️", desc: "Overcast" },
  7: { icon: "🌫️", desc: "Fog" },
  8: { icon: "🌧️", desc: "Light rain showers" },
  9: { icon: "🌧️", desc: "Moderate rain showers" },
  10: { icon: "🌧️", desc: "Heavy rain showers" },
  11: { icon: "⛈️", desc: "Thunderstorm" },
  12: { icon: "🌨️", desc: "Light sleet showers" },
  13: { icon: "🌨️", desc: "Moderate sleet showers" },
  14: { icon: "🌨️", desc: "Heavy sleet showers" },
  15: { icon: "❄️", desc: "Light snow showers" },
  16: { icon: "❄️", desc: "Moderate snow showers" },
  17: { icon: "❄️", desc: "Heavy snow showers" },
  18: { icon: "🌧️", desc: "Light rain" },
  19: { icon: "🌧️", desc: "Moderate rain" },
  20: { icon: "🌧️", desc: "Heavy rain" },
  21: { icon: "⛈️", desc: "Thunder" },
  22: { icon: "🌨️", desc: "Light sleet" },
  23: { icon: "🌨️", desc: "Moderate sleet" },
  24: { icon: "🌨️", desc: "Heavy sleet" },
  25: { icon: "❄️", desc: "Light snowfall" },
  26: { icon: "❄️", desc: "Moderate snowfall" },
  27: { icon: "❄️", desc: "Heavy snowfall" }
};

const BORLANGE = { name: 'Borlänge', lat: 60.4858, lon: 15.4337 };

export const Location = () => {
  const [weather, setWeather] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchWeather = useCallback(async () => {
    if (Date.now() - lastFetch < 300000) return;

    setLoading(true);
    try {
      const smhiUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${BORLANGE.lon}/lat/${BORLANGE.lat}/data.json`;
      const response = await fetch(smhiUrl);
      if (!response.ok) throw new Error(`SMHI API error: ${response.status}`);

      const data = await response.json();
      const currentForecast = data.timeSeries[0];
      let temp = 0;
      let symbol = 1;
      for (const param of currentForecast.parameters) {
        if (param.name === 't') temp = Math.round(param.values[0]);
        if (param.name === 'Wsymb2') symbol = param.values[0];
      }

      const weatherData = {
        current: {
          temp_c: temp,
          symbol: symbol,
          last_updated: currentForecast.validTime,
          location: BORLANGE.name
        }
      };

      setWeather(weatherData);
      setLastFetch(Date.now());
      localStorage.setItem('weatherData', JSON.stringify({
        data: weatherData,
        timestamp: Date.now()
      }));
      setError(false);
    } catch (err) {
      console.error('Error fetching weather from SMHI:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [lastFetch]);

  useEffect(() => {
    const cached = localStorage.getItem('weatherData');
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 300000) {
          setWeather(data);
          setLastFetch(timestamp);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Error parsing cached weather data:', err);
      }
    }
    fetchWeather();
  }, [fetchWeather]);

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 text-sm animate-pulse">
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700 rounded-full" />
        <div className="w-16 h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg" />
        <div className="w-12 h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg" />
      </div>
    );
  }

  if (error || !weather || !weather.current) {
    return (
      <div className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        </svg>
        <span className="text-gray-600 dark:text-gray-400">Borlänge</span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-wrap items-center gap-2 text-sm px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-500/5">
      {/* Location */}
      <div className="inline-flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <a 
          href={`https://www.google.com/maps/place/Borl%C3%A4nge+Sweden`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Borlänge
        </a>
      </div>
      
      {/* Divider */}
      <span className="w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
      
      {/* Weather */}
      <div className="inline-flex items-center gap-1.5">
        <span className="text-lg">{weatherSymbols[weather.current.symbol]?.icon}</span>
        <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
          {weather.current.temp_c}°C
        </span>
        <button
          onClick={() => {
            localStorage.removeItem('weatherData');
            fetchWeather();
          }}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-all"
          title={`${weatherSymbols[weather.current.symbol]?.desc} - Click to refresh`}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Divider */}
      <span className="w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
      
      {/* Time */}
      <div className="inline-flex items-center gap-1">
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })}
        </span>
      </div>
    </div>
  );
}; 