import { combineReducers } from 'redux'

import moviesReducer from './movies'
import weatherReducer from './weather';

const rootReducer = combineReducers({
  movies: moviesReducer,
  weather: weatherReducer
})

export default rootReducer
