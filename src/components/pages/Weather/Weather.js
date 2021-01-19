import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import allActions from '../../actions/index'
import './Weather.css'
import upperDesign from "../../images/UPPER DESIGN.svg";
import logo from "../../images/Logo.svg";

function Weather() {
    const weather = useSelector((state) => state.weatherReducer);
    const dispatch = useDispatch();
    const [query, setQuery] = useState()
    let defaultIcon = 'http://openweathermap.org/img/wn/10d@2x.png'
    let d = new Date();
    let date = d.toDateString();

    useEffect(() => {
        navigator.geolocation 
              ?   navigator.geolocation.getCurrentPosition((position) => {
                  dispatch(allActions.weatherActions.fetchWeatherInfoByLatLong(position.coords.latitude, position.coords.longitude))
              })   :   alert("Please enter a city")
    }, [])
    useEffect(() => {
        if(query) {
          dispatch(allActions.weatherActions.fetchWeatherInfo(query))
        }
    }, [query])

    const handleSubmit = e => {
        e.preventDefault()
        setQuery(weather.input)
        weather.input = ''
    }
    
    return (
      <div className='container'>
          {weather.weatherInfo ? (
          <div>
              <img src={upperDesign} className="top-wave" alt="wave" />
              <img src={upperDesign} className="bottom-wave" alt="wave" />
              <div className="logo">
                  <a href="#">
                      <img src={logo} alt="logo" />
                  </a>
              </div>
              <div className="card">
                <div className="card-header">
                  <h2>
                    {weather.weatherInfo.name} - {weather.weatherInfo.sys.country}
                  </h2> 
                  <h3>{Math.floor(weather.weatherInfo.main.temp - 273.15)} &deg; C</h3>
                </div>
                <div className="card-columns">
                  <div className="clouds">
                    <div>
                      <h2>{weather.weatherInfo.clouds.all}</h2>
                    </div>
                    <br />
                    <div>
                      <h2>Clouds Count</h2>
                    </div>
                  </div>
                  <hr className="first"></hr>
                  <div className="weather">
                    <div>
                      <img src={weather.weatherInfo ? `http://openweathermap.org/img/wn/${weather.weatherInfo.weather[0].icon}@2x.png` : defaultIcon} alt="weather icon" />
                    </div>
                    <br />
                    <div>
                      <h2>{weather.weatherInfo.weather[0].description}</h2>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="wind">
                    <div>
                      <h2>
                        {weather.weatherInfo.wind.deg} &deg; - {Math.ceil((weather.weatherInfo.wind.speed / 1000) * 3600)} kph
                      </h2>
                    </div>
                    <br />
                    <div>
                      <h2>Wind</h2>
                    </div>
                  </div>
                </div>
                <h2 className="card-footer"> {date} </h2>
              </div>
              <form className='form' onSubmit={(e) => handleSubmit(e)}>
                  <div className="input-container">
                      <input
                        type="text"
                        autoFocus
                        onChange={(e) => dispatch(allActions.weatherActions.getWeatherInput(e.target.value))}
                        value={weather.input}
                        placeholder="Please enter a City name"
                      />
                      <br />
                      <button
                        type="submit"
                        value="submit"
                        className="search-btn"
                        onClick={(e) => handleSubmit(e)}
                      >Submit
                      </button>
                  </div>
              </form>    
          </div>
          ) : (<h1>Loading....</h1>)}
      </div>
    );
}

export default Weather;
