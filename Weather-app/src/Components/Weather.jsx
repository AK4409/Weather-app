import React, { useEffect, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloudy_icon from "../assets/cloudysun.webp";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import thunder_icon from "../assets/thunder.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.jpg";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");

  // Weather icons mapping from OpenWeatherMap codes
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": rain_icon,
    "03n": rain_icon,
    "04d": snow_icon,
    "04n": snow_icon,
    "09d": thunder_icon,
    "09n": thunder_icon,
    "10d": wind_icon,
    "10n": wind_icon,
    "11d": humidity_icon,
    "11n": humidity_icon,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windspeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon, // Assign selected icon
        });
      } else {
        alert("City not found! Try another.");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  return (
    <div className="weather">
      <div className="Search-bar">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img src={search_icon} alt="Search" onClick={() => search(city)} />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather icon" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weatherData.windspeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
