import { useState } from 'react'
import {Button, ButtonGroup, Grid, GridItem} from '@chakra-ui/react'
import './App.css'
import NavBar from './components/NavBar'

function App() {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <GridItem area = 'nav'>
          <NavBar/>
        </GridItem>
        <GridItem backgroundColor = 'white' area = 'aside'>
          Aside
        </GridItem>
        <GridItem backgroundColor = 'green' area = 'main'>
          Main
        </GridItem>
        </Grid>
    </>
  )
}

export default App
