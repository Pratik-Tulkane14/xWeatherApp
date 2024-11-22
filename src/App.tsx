import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const BASEURL = "https://api.weatherapi.com/v1/current.json";
const APIKEY = "9e6b104985ac4c6c98e155655242211";

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

interface Weather {
  location: Location;
  current: Current;
}

function App() {
  const [search, setSearch] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<Weather | string>("")
  const getWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return
    setIsLoading(true)
    try {
      const result = await axios.get<Weather>(`${BASEURL}?key=${APIKEY}&q=${search}`);
      if (result.status === 200) {
        setWeatherData(result.data);
        setIsLoading(false);
      }
    } catch (error) {
      window.alert("Failed to fetch weather data")
      console.log(error, "erorr");
      setIsLoading(false);

    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (search === "") {
      setWeatherData("");
    }
  }, [search])
  return (
    <div className="main">
      <form>
        <input type='text' placeholder='Enter city name' className="search" value={search} onChange={(e) => setSearch(e.target.value)}></input>
        <button type='submit' className="submit-btn" onClick={((e) => getWeather(e))}>Search</button>
      </form>
      {isLoading &&
        <p>
          "Loading data..."
        </p>
      }
      {weatherData &&
        <div className="weather-cards">
          <div className="weather-card">
            <p>Temperature
            </p>
            <span>
              {weatherData?.current?.temp_c}°C
            </span>
          </div>
          <div className="weather-card">
            <p>Humidity
            </p>
            <span>
              {weatherData?.current?.humidity}%
            </span>
          </div>
          <div className="weather-card">
            <p>Condition
            </p>
            <span>
              {weatherData?.current?.condition.text}
            </span>
          </div>
          <div className="weather-card">
            <p>Wind Speed
            </p>
            <span>
              {weatherData?.current?.wind_kph}kph
            </span>
          </div>
        </div>
      }
    </div>
  )
}

export default App
