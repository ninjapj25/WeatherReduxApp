import { GET_WEATHER_INPUT, FETCH_WEATHER_INFO, FETCH_WEATHER_INFO_BY_LAT_LONG } from "./types";
import dotenv from 'dotenv'
dotenv.config()

const getWeatherInput = (e) => {
    return {
        type: GET_WEATHER_INPUT,
        payload: e,
    }
};

const fetchWeatherInfo = (query) => (dispatch) => {
    let checkFetch = (response) => {
        if (!response.ok) {
          throw alert("Please enter an existing city name");
        }
        return response;
      };
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${[
        query,
      ]}&appid=${process.env.REACT_APP_API_KEY}`)
    .then(checkFetch)
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: FETCH_WEATHER_INFO,
            payload: data
        })
    })
};

const fetchWeatherInfoByLatLong = (lat, long) => (dispatch) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: FETCH_WEATHER_INFO_BY_LAT_LONG,
            payload: data
        })
    })
};

export default {
    getWeatherInput,
    fetchWeatherInfo,
    fetchWeatherInfoByLatLong
}
