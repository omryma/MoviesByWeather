import React, { useRef, useState } from 'react'
import { Search } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { movieSearch } from '../../utils/fetchers';
import '../../index.css'
import { fetchMovie } from '../../slices/movies';

const MovieSearchBar = () => {
  const [searchQuery, setQuery] = useState('')
  const [searchResults, setResults] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [selectedResult, setSelectedResult] = useState('')
  const searchTimer = useRef();
  const queryRef = useRef(searchQuery)
  const dispatch = useDispatch()

  const handleResultSelect = (e, { result }) => {
    const { id: imdbID, title } = result
    setSelectedResult(title)
    dispatch(fetchMovie(imdbID))
  }

  const handleQueryChange = (e, { value }) => {
    queryRef.current = value
    clearTimeout(searchTimer.current)
    setQuery(value)
    setLoading(true)
    setSelectedResult('')
    searchTimer.current = setTimeout(async () => {
      const options = await movieSearch(queryRef.current);
      if (options) setResults(options.map(({ Title, Year, imdbID, Poster }) => ({ title: Title, poster: Poster, imdbID, year: Year })))
      setLoading(false)
    }, 600)
  }

  return (
    <Search
      placeholder="Search for other movies"
      size="big"
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={handleQueryChange}
      results={searchResults.map(({ imdbID, title, year, poster }) => ({ id: imdbID, title, description: year, image: poster }))}
      value={selectedResult || searchQuery}
      showNoResults={!isLoading && searchResults.length === 0}
    />
  )
}

export default MovieSearchBar;
