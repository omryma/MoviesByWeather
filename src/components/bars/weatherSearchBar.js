import React, { useRef, useState } from 'react'
import { Search } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { autoCompleteLocation } from '../../utils/fetchers';
import { fetchWeather } from '../../slices/weather';
import { generateFlag } from '../../utils/utilitiesFuncs';
import '../../index.css'
import { setRecommendation } from '../../slices/movies';

const WeatherSearchBar = () => {
  const [searchQuery, setQuery] = useState('')
  const [searchResults, setResults] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [selectedResult, setSelectedResult] = useState('')
  const searchTimer = useRef();
  const queryRef = useRef(searchQuery)
  const dispatch = useDispatch()

  const handleResultSelect = (e, { result }) => {
    const { id: locationKey, title: cityName, description: countryName, image: flagImage } = result
    setSelectedResult(cityName)
    const countryCode = flagImage.split('/')[3]
    dispatch(fetchWeather({ locationKey, cityName, countryName, countryCode }))
    dispatch(setRecommendation())
  }

  const handleQueryChange = (e, { value }) => {
    queryRef.current = value
    clearTimeout(searchTimer.current)
    setQuery(value)
    setLoading(true)
    setSelectedResult('')
    searchTimer.current = setTimeout(async () => {
      const options = await autoCompleteLocation(queryRef.current);
      setResults(options.map(({ Key, Type, LocalizedName, Country }) => ({ locationKey: Key, type: Type, cityName: LocalizedName, countryName: Country.LocalizedName, countryCode: Country.ID })))
      setLoading(false)
    }, 600)
  }

  return (
    <Search
      placeholder="Search for locations"
      fluid
      size="big"
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={handleQueryChange}
      results={searchResults.map(({ locationKey, cityName, countryName, countryCode }) => ({ id: locationKey, title: cityName, description: countryName, image: generateFlag(countryCode) }))}
      value={selectedResult || searchQuery}
      showNoResults={!isLoading && searchResults.length === 0}
    />
  )
}

export default WeatherSearchBar;
