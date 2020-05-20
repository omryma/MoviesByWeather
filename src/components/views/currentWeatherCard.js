import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Grid, Header, Image, Statistic } from 'semantic-ui-react'
import Clock from 'react-live-clock'
import ct from 'countries-and-timezones';
import WeatherIcon from '../bars/weatherIcon';
import weatherModesDict from '../../utils/weatherModesDict';
import { generateFlag } from '../../utils/utilitiesFuncs';
import { weatherSelector } from '../../slices/weather';

const CurrentWeatherCard = () => {
  const { location, todayWeather } = useSelector(weatherSelector)

  useEffect(() => {
    localStorage.setItem('location', JSON.stringify(location))
    localStorage.setItem('todayWeather', JSON.stringify(todayWeather))
  })

  return (
    <Grid.Row style={{ margin: '3em' }}>
      <Grid.Column width={8}>
        <Header inverted as="h3" style={{ fontSize: '2em' }}>
          The weather in <i>{location.cityName}, {location.countryName}</i>:
        </Header>
        <Grid.Row style={{ margin: '2em' }}><Statistic inverted horizontal value={`${todayWeather.temperature}℃`} size="huge" /></Grid.Row>
        <Grid.Row style={{ margin: '2em' }}><Statistic inverted horizontal label={`${todayWeather.realFeel}℃`} value="RealFeel" size="mini" /></Grid.Row>
        <Grid.Row style={{ margin: '2em' }}><Statistic inverted horizontal label={`${todayWeather.realFeel}%`} value="Humidity" size="mini" /></Grid.Row>
        <Grid.Row>
          <Clock format="HH:mm:ss" ticking timezone={ct.getCountry(location.countryCode).timezones[0]} />
          <br />
          <Image avatar src={generateFlag(location.countryCode)} />
        </Grid.Row>
      </Grid.Column>
      <Grid.Column floated="right" width={6}>
        <WeatherIcon mode={weatherModesDict[todayWeather.weatherIcon]} size={200} />
      </Grid.Column>
    </Grid.Row>
  )
}

export default CurrentWeatherCard
