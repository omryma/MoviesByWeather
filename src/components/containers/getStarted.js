import React, { useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { Button, Container, Header, Icon } from 'semantic-ui-react';
import unidecode from 'unidecode-plus/unidecode';
import { useDispatch } from 'react-redux';
import { autoCompleteLocation, getLocation } from '../../utils/fetchers';
import { fetchWeather } from '../../slices/weather';

const GetStarted = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserLocationWeather = async () => {
      const locationByIp = await getLocation()
      if (locationByIp.status === 'success') {
        const autoComp = await autoCompleteLocation(unidecode(locationByIp.city)) //In case of accented letters
        if (autoComp.length > 0) {
          const res = autoComp[0]
          dispatch(fetchWeather({ locationKey: res.Key, cityName: res.LocalizedName, countryName: res.Country.LocalizedName, countryCode: res.Country.ID
          }))
        } else dispatch(fetchWeather({ locationKey: 215854, cityName: 'Tel Aviv', countryName: 'Israel', countryCode: 'IL' })) //If location detection was failed
      } else dispatch(fetchWeather({ locationKey: 215854, cityName: 'Tel Aviv', countryName: 'Israel', countryCode: 'IL' })) //If location detected but location key fetch was failed
    }
    getUserLocationWeather()
  }, [])

  return (
    <Container fluid className="startContainer">
      <Header
        as="h1"
        content="Movies By Weather"
        inverted
        style={{ fontSize: '6em', margin: '1em' }}
      />
      <Header
        as="h1"
        content="Fits movies to your local weather 🌞 ☔ ❄"
        inverted
        style={{ margin: '4em' }}
      />
      <Button circular animated="vertical" primary size="huge" onClick={() => history.push('/weather')}>
        <Button.Content visible>
          Get Started
          <Icon name="right arrow" />
        </Button.Content>
        <Button.Content hidden content="Get your weather" />
      </Button>
    </Container>
  )
}

export default withRouter(GetStarted)
