import React from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { Button, Grid, Icon, Loader } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import WeatherSearchBar from '../bars/weatherSearchBar';
import CurrentWeatherCard from '../views/currentWeatherCard';
import { weatherSelector } from '../../slices/weather';


const WeatherContainer = () => {
  const history = useHistory()
  const { isLoading } = useSelector(weatherSelector)
  return (
    isLoading ? <Loader active={isLoading} size="massive" style={{ marginTop: '7em' }}>Loading...</Loader>
      : (
        <Grid container verticalAlign="middle" relaxed style={{ margin: '4em' }}>
          <Grid.Row centered>
            <WeatherSearchBar />
          </Grid.Row>
          <CurrentWeatherCard />
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button
                circular
                primary
                animated="vertical"
                size="huge"
                onClick={() => history.push('/movies')}
                style={{ width: '14em' }}
              >
                <Button.Content visible>
                  Continue&nbsp;
                  <Icon name="right arrow" />
                </Button.Content>
                <Button.Content hidden content="Get your mood movies" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
  )
}

export default withRouter(WeatherContainer)
