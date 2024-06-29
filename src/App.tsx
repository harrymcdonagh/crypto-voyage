import { useState } from 'react'
import {Button, Grid, GridItem, List, ListItem, Text} from '@chakra-ui/react'
import NavBar from './components/NavBar'
import PriceTable from './components/PriceTable'
import SidePanel from './components/SidePanel'

function App() {

  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`
        }}
        templateColumns={{
          base: "1fr",
        }}
      >
        <GridItem area = 'nav'>
          <NavBar/>
        </GridItem>
        <GridItem area = 'main'>
          <PriceTable />
        </GridItem>
        </Grid>
    </>
  )
}

export default App
