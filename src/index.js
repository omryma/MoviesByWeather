import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import GetStarted from './components/containers/getStarted'
import WeatherContainer from './components/containers/weatherContainer'
import MoviesContainer from './components/containers/moviesContainer'
import rootReducer from './slices';

const store = configureStore({ reducer: rootReducer })

render((
  <Provider store={store}>
    <HashRouter hashType="noslash">
      <App>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 1 }}
          atActive={{ opacity: 1 }}
        >
          <Route exact path="/" component={GetStarted} />
          <Route path="/weather" component={WeatherContainer} />
          <Route path="/movies" component={MoviesContainer} />
        </AnimatedSwitch>
      </App>
    </HashRouter>
  </Provider>
), document.getElementById('root'))
