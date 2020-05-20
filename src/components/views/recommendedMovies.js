import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header, Image, Card } from 'semantic-ui-react';
import { weatherSelector } from '../../slices/weather';
import weatherModesDict from '../../utils/weatherModesDict';
import modesMoviesDict from '../../utils/modesMoviesDict';
import { fetchMovie } from '../../slices/movies';

const RecommendedMovies = () => {
  const { todayWeather } = useSelector(weatherSelector)
  const dispatch = useDispatch()

  const recMovies = modesMoviesDict[weatherModesDict[todayWeather.weatherIcon]]

  const getGenre = (genres) => (genres.indexOf(',') === -1 ? genres : genres.split(',')[0])

  const onMovieClick = (id) => dispatch(fetchMovie(id))

  return (
    <>
      <Grid.Row style={{ margin: '3em' }}>
        <Header inverted as="h3" style={{ fontSize: '2em' }}>
          Recommended movies for a day like this:
        </Header>
      </Grid.Row>
      <Grid.Row centered>
        {recMovies.map((movie) => (
          <Grid.Column width={4}>
            <Card raised style={{ height: '42em', width: '50em' }} onClick={(e, data) => onMovieClick(data.id)} id={movie.imdbID}>
              <Image src={movie.Poster} size="medium" />
              <Card.Content>
                <Card.Header>{movie.Title}</Card.Header>
                <Card.Meta>{getGenre(movie.Genre)}, {movie.Year}</Card.Meta>
                <Card.Description textAlign="center">{movie.Plot}</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid.Row>
    </>
  )
}
export default RecommendedMovies
