import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  location: localStorage.location ? JSON.parse(localStorage.location) : {},
  todayWeather: localStorage.todayWeather ? JSON.parse(localStorage.todayWeather) : {},
  isError: false,
  isLoading: false,
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getWeather: (state) => {
      state.isLoading = true
      state.isError = false
    },
    getWeatherSuccess: (state, { payload }) => {
      state.todayWeather = payload.weatherObj
      state.location = payload.location
      state.isLoading = false
    },
    getWeatherFailure: (state) => {
      state.isError = true
      state.isLoading = false
    },
  }
})

export const { getWeather, getWeatherSuccess, getWeatherFailure } = weatherSlice.actions

export const weatherSelector = (state) => state.weather

export default weatherSlice.reducer

export const fetchWeather = (location) => async dispatch => {
  dispatch(getWeather())
  try {
    const apiKey = 'hqXB1f6tFcH2FG9ngBOOhroEyG8BKrJ6'
    const weatherRes = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${location.locationKey}?apikey=${apiKey}&details=true`)
    const weatherJSON = await weatherRes.json()
    const weatherObj = { temperature: weatherJSON[0].Temperature.Metric.Value,
      weatherIcon: weatherJSON[0].WeatherIcon,
      realFeel: weatherJSON[0].RealFeelTemperature.Metric.Value,
      humid: weatherJSON[0].RelativeHumidity
    }

    dispatch(getWeatherSuccess({ weatherObj, location }))
  } catch (e) {
    console.log(e)
    dispatch(getWeatherFailure())
  }
}
