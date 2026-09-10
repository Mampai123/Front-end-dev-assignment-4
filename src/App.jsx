import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const API_KEY = "bb38c6eb38bad2a32785be3abfe98ad3";

  const [city, setCity] = useState("Kolkata");
  const [searchCity, setSearchCity] = useState("Kolkata");

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch weather data
  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found. Please enter a valid city name.");
        }

        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
        }

        throw new Error("Unable to fetch weather data.");
      }

      const data = await response.json();

      setWeather(data);
      setCity(cityName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather when application loads
  useEffect(() => {
    fetchWeather("Kolkata");
  }, []);

  // Search button
  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedCity = searchCity.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }

    fetchWeather(trimmedCity);
  };

  return (
    <div className="app">
      <Header />

      <main className="container">
        <SearchBar
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          handleSearch={handleSearch}
        />

        {/* Loading */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="error-box">
            <h3>⚠️ Error</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Weather */}
        {!loading && !error && weather && (
          <WeatherCard weather={weather} />
        )}
      </main>
    </div>
  );
}

export default App;
