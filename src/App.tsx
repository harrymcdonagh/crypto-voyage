import { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import PriceTable from './components/PriceTable';
import SidePanel from './components/SidePanel';
import DailyStats from './components/DailyStats';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
        }}
        templateColumns={{
          base: '1fr',
        }}
      >
        <GridItem area='nav'>
          <NavBar toggleSidePanel={toggleSidePanel} />
        </GridItem>
        <GridItem area='main'>
          <DailyStats />
          <PriceTable />
        </GridItem>
        {isOpen && (
          <GridItem>
            <SidePanel isOpen={isOpen} toggleSidePanel={toggleSidePanel} />
          </GridItem>
        )}
      </Grid>
    </>
  );
}

export default App;
