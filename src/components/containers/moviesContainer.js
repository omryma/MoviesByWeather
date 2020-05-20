import React from 'react'
import { withRouter } from 'react-router-dom';
import { Grid, Loader } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import MovieSearchBar from '../bars/movieSearchBar';
import { moviesSelector } from '../../slices/movies';
import RecommendedMovies from '../views/recommendedMovies';
import CurrentMovieCard from '../views/currentMovieCard';

const MoviesContainer = () => {
  const { isRecommendation, isLoading } = useSelector(moviesSelector)

  return (
    isLoading ? <Loader active={isLoading} size="massive" style={{ marginTop: '7em' }}>Loading...</Loader>
      : (
        <Grid container verticalAlign="middle" relaxed style={{ margin: '4em' }}>
          <Grid.Row centered>
            <MovieSearchBar />
          </Grid.Row>
          {isRecommendation ? <RecommendedMovies /> : <CurrentMovieCard />}
        </Grid>
      )
  )
}

export default withRouter(MoviesContainer)
