import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Menu, Segment } from 'semantic-ui-react';
import NavBar from './components/bars/NavBar';

const App = (props) => {
  const { children } = props

  return (
    <Segment
      raised
      inverted
      textAlign="center"
      // style={{ minHeight: '60vh' }}
      vertical
    >
      <NavBar />
      {children}
    </Segment>
  )
}

export default withRouter(App);
