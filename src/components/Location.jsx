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

export const Location = () => {
  const [weather, setWeather] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchWeather = useCallback(async () => {
    if (Date.now() - lastFetch < 300000) return;
    
    setLoading(true);
    try {
      const lon = 15.4337;
      const lat = 60.4858;
      const response = await fetch(
        `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('SMHI Raw Data:', data);
      console.log('First time series entry:', data.timeSeries[0]);

      const currentWeather = data.timeSeries[0];
      const temperatureParam = currentWeather.parameters.find(p => p.name === 't');
      const symbolParam = currentWeather.parameters.find(p => p.name === 'Wsymb2');
      
      if (!temperatureParam || !symbolParam) {
        throw new Error('Weather data not found in SMHI response');
      }

      const temperature = temperatureParam.values[0];
      const symbolCode = symbolParam.values[0];
      
      const weatherData = {
        current: {
          temp_c: temperature,
          symbol: symbolCode,
          last_updated: new Date(currentWeather.validTime).toISOString()
        }
      };

      console.log('Processed weather data:', weatherData);

      setWeather(weatherData);
      setLastFetch(Date.now());
      localStorage.removeItem('weatherData'); // Clear old cache
      localStorage.setItem('weatherData', JSON.stringify({
        data: weatherData,
        timestamp: Date.now()
      }));
      setError(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
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
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  if (error || !weather || !weather.current) {
    return (
      <div className="inline-flex items-center gap-2 text-sm">
        <span className="text-gray-600 dark:text-gray-400">Borlänge</span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-wrap items-center gap-1 sm:gap-2 text-sm">
      <div className="inline-flex items-center gap-1 sm:gap-2">
        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        </svg>
        <a 
          href="https://www.google.com/maps/place/Borlänge" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Borlänge
        </a>
      </div>
      <div className="inline-flex items-center gap-1 min-w-fit">
        <span className="font-medium text-gray-800 dark:text-gray-200">
          {weatherSymbols[weather.current.symbol]?.icon} {Math.round(weather.current.temp_c)}°C
        </span>
        <button
          onClick={() => {
            localStorage.removeItem('weatherData');
            fetchWeather();
          }}
          className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 active:scale-95 transition-all"
          title={`${weatherSymbols[weather.current.symbol]?.desc} - Last updated at ${new Date(weather.current.last_updated).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Stockholm'
          })}`}
        >
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <span className="text-[10px] sm:text-xs text-gray-800 dark:text-gray-200">
        {new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/Stockholm'
        })}
      </span>
    </div>
  );
}; 