import React, { useEffect } from 'react'
import { Grid, Header, Image, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { moviesSelector } from '../../slices/movies';


const CurrentMovieCard = () => {
  const { selectedMovie } = useSelector(moviesSelector)

  useEffect(() => {
    localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie))
    console.log(selectedMovie)
  })

  return (
    <Grid.Row style={{ margin: '3em' }}>
      <Grid.Column width={8}>
        <Header inverted as="h1" style={{ fontSize: '2em' }}>
          {selectedMovie.title}
        </Header>
        <Grid.Row style={{ margin: '2em' }}><h3> <b>Year:</b> {selectedMovie.year}</h3></Grid.Row>
        <Grid.Row style={{ margin: '2em' }}><h4> <b>Plot:</b> {selectedMovie.plot}</h4></Grid.Row>
        <Grid.Row style={{ margin: '2em' }}>
          <h4><b>Genres: </b></h4>
          {selectedMovie.genre.split(',').map((genre) => (
            <Label>{genre}</Label>
          ))}
        </Grid.Row>
      </Grid.Column>
      <Grid.Column floated="right" width={6}>
        <Image src={selectedMovie.poster} />
      </Grid.Column>
    </Grid.Row>
  )
}
export default CurrentMovieCard
