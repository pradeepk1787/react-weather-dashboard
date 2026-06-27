import { useState } from "react";

function Weather() {
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

  //fetchWeather
  const fetchWeather = async (cityName) => {
    try {
      //clear previous er
      setError(null);

      //Set loading to true
      setLoading(true);

      //fetch weather data
      const response = await fetch("");

      //handle if error in fetch data
      if (!response.ok) throw new Error("Failed to get weather data");

      //parse JSON
      const data = await response.json();

      //set weather data
      setWeather({
        city: cityName,
        temperature: data.temperature,
        humidity: data.humidity,
        wind: data.wind,
        condition: data.condition,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  //getCurrentLocationWeather()

  //handleKeyDown()
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>

      <input
        type="text"
        placeholder="City Name"
        value={city}
        onChange={handleCityChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Weather;
