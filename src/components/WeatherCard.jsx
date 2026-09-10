function WeatherCard({ weather }) {
  // Convert Unix timestamp into readable time
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      {/* City */}
      <div className="city-section">
        <h2>
          {weather.name}, {weather.sys.country}
        </h2>

        <p>{weather.weather[0].description}</p>
      </div>

      {/* Weather Icon */}
      <img
        src={iconUrl}
        alt={weather.weather[0].description}
        className="weather-icon"
      />

      {/* Temperature */}
      <div className="temperature">
        {Math.round(weather.main.temp)}°C
      </div>

      {/* Weather Details */}
      <div className="weather-details">

        <div className="detail">
          <span className="detail-icon">💧</span>
          <div>
            <p>Humidity</p>
            <strong>{weather.main.humidity}%</strong>
          </div>
        </div>

        <div className="detail">
          <span className="detail-icon">💨</span>
          <div>
            <p>Wind Speed</p>
            <strong>{weather.wind.speed} m/s</strong>
          </div>
        </div>

        <div className="detail">
          <span className="detail-icon">🌅</span>
          <div>
            <p>Sunrise</p>
            <strong>
              {formatTime(weather.sys.sunrise)}
            </strong>
          </div>
        </div>

        <div className="detail">
          <span className="detail-icon">🌇</span>
          <div>
            <p>Sunset</p>
            <strong>
              {formatTime(weather.sys.sunset)}
            </strong>
          </div>
        </div>

      </div>
    </div>
  );
}

export default WeatherCard;
