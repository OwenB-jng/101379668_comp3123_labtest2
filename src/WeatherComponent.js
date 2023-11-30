import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherComponent.css';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Toronto');
  const [citySearch, setCitySearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'eb2f48ac41445a0fe0275a0f194034c0';
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [city]);

  const handleSearch = () => {
    setCity(citySearch);
  };

  return (
    <div className="weatherContainer">
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search by city name"
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <h3>Temperatures:</h3>
          <p>Temperature in Kelvin: {(weatherData.main.temp).toFixed(2)}°K</p>
          <p>Temperature in Celcius: {(weatherData.main.temp-273.15).toFixed(2)}°C</p>
          <p>Temperature in Fahrenheit: {((weatherData.main.temp-273.15)*9/5+32).toFixed(2)}°F</p>
          <h3>General Weather:</h3>
          <p>Weather condition: {weatherData.weather[0].description}</p>
          <p>Sunrise in comparison to Toronto: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset in comparison to Toronto: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
