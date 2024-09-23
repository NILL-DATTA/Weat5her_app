
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import image1 from '../image/thunder.jpg';

export default function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState({
    description: '',
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0,
    country: '',
    pressure: 0
  });
  const [forecast, setForecast] = useState([]);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleclick = () => {
    const apiKey = 'f66d9727501911f62c328508b94c5e3e';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    axios.get(weatherUrl)
      .then((response) => {
        setData({
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          temp_max: response.data.main.temp_max,
          temp_min: response.data.main.temp_min,
          humidity: response.data.main.humidity,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          country: response.data.sys.country,
          pressure: response.data.main.pressure
        });
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get(forecastUrl)
      .then((response) => {
        setForecast(response.data.list);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  return (
    <>
      <div className="container text-center mt-3">
        <h1 className='text-white'>Weather App Using React Js</h1>
        <input type="text" className='input-field mt-4' onChange={handleChange} placeholder='Please Enter Country/City Name ' style={{width:"30%"}} /> <br />
        <button className='btn btn-outline-danger mt-3 btn-md' type='submit' onClick={handleclick} style={{width:"30%"}}>Search</button>
      </div>

      <div className="card-group mt-3">
        <div className="card m-5">
          <div className="card-body">
            <h4 className="card-title text-center">Description</h4>
            <p className="card-text text-center">{data.description}</p>
          </div>
        </div>
        <div className="card m-5">
          <div className="card-body">
            <h4 className="card-title text-center">Temperature</h4>
            <p className="card-text text-center">{((data.temp) - 273.15).toFixed(2)} °C</p>
          </div>
        </div>
        <div className="card m-5">
          <div className="card-body">
            <h4 className="card-title text-center">Max Temperature</h4>
            <p className="card-text text-center">{((data.temp_max) - 273.15).toFixed(2)} °C</p>
          </div>
        </div>
      </div>
      <div className="card-group">
        <div className="card m-5">
          <div className="card-body">
            <h4 className="card-title text-center">Min Temperature</h4>
            <p className="card-text text-center">{((data.temp_min) - 273.15).toFixed(2)} °C</p>
          </div>
        </div>
        <div className="card m-5">
          <div className="card-body">
            <h4 className="card-title text-center">Humidity</h4>
            <p className="card-text text-center">{data.humidity} %</p>
          </div>
        </div>
        <div className="card m-5">
          <div className="card-body">
            <h4 className="card-title text-center">Sunrise</h4>
            <p className="card-text text-center">{formatTime(data.sunrise)}</p>
          </div>
        </div>
      </div>
      <div className="card-group">
        <div className="card m-5">
          <div className="card-body">
            <h4 className="card-title text-center">Sunset</h4>
            <p className="card-text text-center">{formatTime(data.sunset)}</p>
          </div>
        </div>
        <div className="card m-5">
          <div className="card-body">
            <h4 className="card-title text-center">Country</h4>
            <p className="card-text text-center">{data.country}</p>
          </div>
        </div>
        <div className="card m-5">
          <div className="card-body">
            <h4 className="card-title text-center">Pressure</h4>
            <p className="card-text text-center">{data.pressure} hPa</p>
          </div>
        </div>
      </div>

      <h2 className="text-center mt-5" style={{color:"black"}}>5-Day Forecast</h2>
      <div className="forecast-container">
        {forecast.filter((item, index, self) => 
          index === self.findIndex((t) => (
            new Date(t.dt * 1000).getDate() === new Date(item.dt * 1000).getDate()
          ))
        ).slice(0, 5).map((item, index) => (
          <div key={index} className="forecast-item card m-2 p-2">
            <h5 className="text-center">{new Date(item.dt * 1000).toLocaleDateString()}</h5>
            <p className="text-center">{item.weather[0].description}</p>
            <p className="text-center">{((item.main.temp) - 273.15).toFixed(2)} °C</p>
          </div>
        ))}
        </div>
    </>
  );
}