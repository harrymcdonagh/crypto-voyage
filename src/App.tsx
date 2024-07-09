import { useState } from "react";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import PriceTable from "./components/PriceTable";
import SidePanel from "./components/SidePanel";
import DailyStats from "./components/DailyStats";

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
          lg: `"nav" "main"`,
        }}
        templateColumns={{
          base: "1fr",
        }}
        gap={4}
        margin={4}
      >
        <GridItem area="nav">
          <NavBar toggleSidePanel={toggleSidePanel} />
        </GridItem>
        <GridItem mx={{ base: "60px" }} area="main">
          <Show above="lg">
            <DailyStats />
          </Show>
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
