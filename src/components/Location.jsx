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

// Swedish cities lookup table (lat, lon, name, radius in km)
const swedishCities = [
  { lat: 59.3293, lon: 18.0686, name: 'Stockholm', radius: 30 },
  { lat: 57.7089, lon: 11.9746, name: 'Göteborg', radius: 25 },
  { lat: 55.6050, lon: 13.0038, name: 'Malmö', radius: 20 },
  { lat: 59.8586, lon: 17.6389, name: 'Uppsala', radius: 15 },
  { lat: 60.4858, lon: 15.4337, name: 'Borlänge', radius: 15 },
  { lat: 60.6065, lon: 15.6355, name: 'Falun', radius: 10 },
  { lat: 59.2753, lon: 15.2134, name: 'Örebro', radius: 15 },
  { lat: 58.4108, lon: 15.6214, name: 'Linköping', radius: 15 },
  { lat: 59.6099, lon: 16.5448, name: 'Västerås', radius: 15 },
  { lat: 58.5877, lon: 16.1924, name: 'Norrköping', radius: 15 },
  { lat: 56.0465, lon: 12.6945, name: 'Helsingborg', radius: 15 },
  { lat: 57.7826, lon: 14.1618, name: 'Jönköping', radius: 15 },
  { lat: 63.8258, lon: 20.2630, name: 'Umeå', radius: 20 },
  { lat: 65.5848, lon: 22.1547, name: 'Luleå', radius: 20 },
  { lat: 62.3908, lon: 17.3069, name: 'Sundsvall', radius: 15 },
  { lat: 59.3794, lon: 13.5036, name: 'Karlstad', radius: 15 },
  { lat: 56.1612, lon: 15.5869, name: 'Karlskrona', radius: 15 },
  { lat: 56.8787, lon: 14.8059, name: 'Växjö', radius: 15 },
  { lat: 55.3708, lon: 13.1551, name: 'Lund', radius: 10 },
  { lat: 60.1282, lon: 18.6435, name: 'Gävle', radius: 15 },
];

// Calculate distance between two coordinates (Haversine formula)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Find nearest Swedish city
const findNearestCity = (lat, lon) => {
  let nearest = null;
  let minDistance = Infinity;
  
  for (const city of swedishCities) {
    const distance = getDistance(lat, lon, city.lat, city.lon);
    if (distance < minDistance && distance <= city.radius * 2) {
      minDistance = distance;
      nearest = city;
    }
  }
  
  return nearest ? nearest.name : null;
};

export const Location = () => {
  const [weather, setWeather] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ name: 'Borlänge', lat: 60.4858, lon: 15.4337 });

  const getUserLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }, []);

  const reverseGeocode = useCallback(async (lat, lon) => {
    // Check if coordinates are within Sweden (expanded bounds)
    const isInSweden = lat >= 54 && lat <= 71 && lon >= 9 && lon <= 26;

    if (!isInSweden) {
      return 'Borlänge'; // Fallback for international visitors
    }

    try {
      // Use BigDataCloud API (free, CORS-enabled, no API key needed)
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=sv`
      );
      
      if (response.ok) {
        const data = await response.json();
        // Return city name or locality
        return data.city || data.locality || data.principalSubdivision || 'Sweden';
      }
    } catch (err) {
      console.error('Geocoding error:', err);
    }

    // Fallback to hardcoded cities if API fails
    const cityName = findNearestCity(lat, lon);
    return cityName || 'Sweden';
  }, []);

  const fetchWeather = useCallback(async (lat = location.lat, lon = location.lon, locationName = location.name) => {
    if (Date.now() - lastFetch < 300000) return;

    setLoading(true);
    try {
      // Check if coordinates are within Sweden (expanded bounds)
      const isInSweden = lat >= 54 && lat <= 71 && lon >= 9 && lon <= 26;

      if (!isInSweden) {
        // Fallback to Borlänge for locations outside Sweden
        lat = 60.4858;
        lon = 15.4337;
        locationName = 'Borlänge';
      }

      // Round coordinates to 6 decimal places for SMHI API
      const roundedLat = Math.round(lat * 1000000) / 1000000;
      const roundedLon = Math.round(lon * 1000000) / 1000000;

      // Fetch real weather data from SMHI API
      const smhiUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${roundedLon}/lat/${roundedLat}/data.json`;
      
      const response = await fetch(smhiUrl);
      
      if (!response.ok) {
        throw new Error(`SMHI API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Get current time forecast (first timeSeries entry is closest to now)
      const currentForecast = data.timeSeries[0];
      
      // Extract temperature and weather symbol from parameters
      let temp = 0;
      let symbol = 1;
      
      for (const param of currentForecast.parameters) {
        if (param.name === 't') {
          temp = Math.round(param.values[0]);
        }
        if (param.name === 'Wsymb2') {
          symbol = param.values[0];
        }
      }

      const weatherData = {
        current: {
          temp_c: temp,
          symbol: symbol,
          last_updated: currentForecast.validTime,
          location: locationName
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
  }, [lastFetch, location.lat, location.lon, location.name]);

  useEffect(() => {
    const initializeLocation = async () => {
      // Check if we have cached weather data
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

      // Try to get user's location
      try {
        const userCoords = await getUserLocation();

        // Get location name from API
        const locationName = await reverseGeocode(userCoords.lat, userCoords.lon);

        // Update location state
        const newLocation = {
          name: locationName,
          lat: userCoords.lat,
          lon: userCoords.lon
        };
        setLocation(newLocation);

        // Fetch weather for user's location
        await fetchWeather(userCoords.lat, userCoords.lon, locationName);

      } catch (locationError) {
        // Fallback to default location (Borlänge)
        await fetchWeather(60.4858, 15.4337, 'Borlänge');
      }
    };

    initializeLocation();
  }, [fetchWeather, getUserLocation, reverseGeocode]);

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
        <span className="text-gray-600 dark:text-gray-400">{location.name}</span>
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
          href={`https://www.google.com/maps/place/${encodeURIComponent(location.name)}+Sweden`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {location.name}
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