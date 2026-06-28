import { useEffect, useState } from "react";

function Weather() {
  //default city
  const DEFAULT_CITY = "Mumbai";

  //State declarations
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //functions to implement
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  //handleSearch()
  const handleSearch = () => {
    //Trim whitespace
    const trimmedCity = city.trim();

    //Validate empty input
    if (trimmedCity.length === 0) {
      //Set error state if empty
      setError("Please enter the city.");
      return;
    }

    //Clear previous errors if valid
    setError(null);
    //Call fetchWeather
    fetchWeather(trimmedCity);
  };

  //handleKeyDown()
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  //Helper functions
  //fetchWeather
  const fetchWeather = async (cityName) => {
    try {
      //clear previous er
      setError(null);

      //Set loading to true
      setLoading(true);

      const coordinates = await getCoordinates(cityName);

      const weatherData = await getCurrentWeather(
        coordinates.latitude,
        coordinates.longitude,
        cityName
      );

      setWeather(weatherData);
      setCity("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //get Current Location Weather
  const getCurrentLocationWeather = () => {
    if (!navigator.geolocation) {
      fetchWeather(DEFAULT_CITY);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const weatherData = await getCurrentWeather(
            latitude,
            longitude,
            "Current Location"
          );

          setWeather(weatherData);
        } catch (error) {
          //Silent fallback
          fetchWeather(DEFAULT_CITY);
        }
      },

      () => {
        // User denied permission
        fetchWeather(DEFAULT_CITY);
      }
    );
  };

  //get weather condition
  const getWeatherCondition = (code) => {
    switch (code) {
      case 0:
        return "Clear Sky";

      case 1:
      case 2:
        return "Partly Cloudy";

      case 3:
        return "Overcast";

      case 61:
      case 63:
      case 65:
      case 80:
      case 81:
      case 82:
        return "Rain";

      case 71:
      case 73:
      case 75:
        return "Snow";

      case 95:
      case 96:
      case 99:
        return "Thunderstorm";

      default:
        return "Unknown";
    }
  };

  const getCoordinates = async (cityName) => {
    //fetch city coordinates
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
    );

    //handle if error in fetch city coordinates
    if (!response.ok) throw new Error("Failed to get city coordinates");

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("City not found");
    }

    return data.results[0];
  };

  const getCurrentWeather = async (latitude, longitude, cityName) => {
    //fetch weather data
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
    );

    //handle if error in fetch data
    if (!response.ok) throw new Error("Failed to get weather data");

    //parse JSON
    const data = await response.json();

    //return weather data
    return {
      city: cityName,
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      wind: data.current.wind_speed_10m,
      condition: getWeatherCondition(data.current.weather_code),
    };
  };

  //Use Effect
  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="City Name"
          value={city}
          onChange={handleCityChange}
          onKeyDown={handleKeyDown}
          aria-label="Search city"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          aria-label="Search weather"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {loading && <h2 className="loading">Loading...</h2>}

      {error && <h2 className="error">{error}</h2>}

      {weather && (
        <div className="card">
          <h2>{weather.city}</h2>

          <p>🌡 Temperature: {weather.temperature}°C</p>

          <p>💧 Humidity: {weather.humidity}%</p>

          <p>🌬 Wind Speed: {weather.wind} km/h</p>

          <p>☁️ Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
