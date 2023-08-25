import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lat={lat}&lon={lon}&appid=35f64db42684841400022dfe81aeac44`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });

      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          className="input-bar"
          value={location}
          onKeyUp={searchLocation}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h2>{data.name}</h2>
          </div>

          <div className="temp">
            {data.main ? (
              <h1>{(data.main.temp - 273.15).toFixed(1)}°C</h1>
            ) : null}
          </div>

          <div className="description">
            <p>{data.weather ? data.weather[0].main : null}</p>
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <h4 className="bold">
                  {(data.main.feels_like - 273.15).toFixed(1)}°C
                </h4>
              ) : null}

              <p>Feels</p>
            </div>

            <div className="humidity">
              {data.main ? (
                <h4 className="bold">{data.main.humidity}%</h4>
              ) : null}
              <p>Humidity</p>
            </div>

            <div className="wind">
              {data.wind ? (
                <h4 className="bold">{data.wind.speed.toFixed(1)}m/s</h4>
              ) : null}

              <p>Wind</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
