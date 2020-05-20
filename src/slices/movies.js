import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isRecommendation: true,
  selectedMovie: localStorage.selectedMovie ? JSON.parse(localStorage.selectedMovie) : null,
  isError: false,
  isLoading: false
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getMovie: (state) => {
      state.isLoading = true
      state.isError = false
      state.isRecommendation = false
    },
    getMovieSuccess: (state, { payload }) => {
      state.selectedMovie = payload.selectedMovie
      state.isLoading = false
    },
    getMovieFailure: (state) => {
      state.isError = true
      state.isLoading = false
    },
    setRecommendation: (state) => {
      state.isRecommendation = true
    }
  }
})

export const { getMovie, getMovieSuccess, getMovieFailure, setRecommendation } = moviesSlice.actions

export const moviesSelector = (state) => state.movies

export default moviesSlice.reducer

export const fetchMovie = (movieID) => async dispatch => {
  dispatch(getMovie())
  try {
    const apiKey = 'dce24c91'
    const selectedMovieRes = await fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`)
    const selectedMovieJSON = await selectedMovieRes.json()
    const selectedMovie = { title: selectedMovieJSON.Title,
      year: selectedMovieJSON.Year,
      poster: selectedMovieJSON.Poster,
      plot: selectedMovieJSON.Plot,
      genre: selectedMovieJSON.Genre,
      imdbID: selectedMovieJSON.imdbID
    }

    dispatch(getMovieSuccess({ selectedMovie }))
  } catch (e) {
    console.log(e)
    dispatch(getMovieFailure())
  }
}
