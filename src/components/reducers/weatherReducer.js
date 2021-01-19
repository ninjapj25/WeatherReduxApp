import {
    GET_WEATHER_INPUT,
    FETCH_WEATHER_INFO,
    FETCH_WEATHER_INFO_BY_LAT_LONG
} from "../actions/types";

const initialState = {
    input: '',
    weatherInfo: ''
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WEATHER_INPUT:
            return {
                ...state,
                input: action.payload
            }
        case FETCH_WEATHER_INFO:
        return {
            ...state,
            weatherInfo: action.payload
        }
        case FETCH_WEATHER_INFO_BY_LAT_LONG:
        return {
            ...state,
            weatherInfo: action.payload
        }
        default:
            return state;
    }
}

export default weatherReducer