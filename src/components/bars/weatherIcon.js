import React from 'react'
import ReactAnimatedWeather from 'react-animated-weather';

const WeatherIcon = ({ mode, size = 64 }) => (
  <ReactAnimatedWeather
    icon={mode}
    size={size}
    color="white"
  />
)

export default WeatherIcon;
