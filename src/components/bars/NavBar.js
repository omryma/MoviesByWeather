import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'

const NavBar = () => {
  const history = useHistory()
  const { pathname } = history.location

  return (
    <Menu
      inverted
      pointing
      secondary
      size="massive"
    >
      <Container>
        <Menu.Item
          as="a"
          active={pathname === '/weather'}
          onClick={() => history.push('/weather')}
        >
          Weather
        </Menu.Item>
        <Menu.Item
          as="a"
          active={pathname === '/movies'}
          onClick={() => history.push('/movies')}
        >
          Movies
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar;
