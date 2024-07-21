import { useState } from "react";
import { Grid, GridItem, Show, Spinner, Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import PriceTable from "./components/PriceTable";
import SidePanel from "./components/SidePanel";
import DailyStats from "./components/DailyStats";
import useCoins from "./hooks/useCoins";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [watchlisted, setWatchlisted] = useState<Set<string>>(new Set());
  const { data, isLoading } = useCoins();

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleWatchlist = (coinId: string) => {
    setWatchlisted((prevWatchlistedCoins) => {
      const newWatchlistedCoins = new Set(prevWatchlistedCoins);
      if (newWatchlistedCoins.has(coinId)) {
        newWatchlistedCoins.delete(coinId);
      } else {
        newWatchlistedCoins.add(coinId);
      }
      return newWatchlistedCoins;
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Spinner thickness="4px" speed="1s" size="xl" />
      </Box>
    );
  }

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav" "main"`,
      }}
      templateColumns={{
        base: "1fr",
      }}
      gap={4}
      mx={{ base: "10px", lg: "100px", xl: "180px", "2xl": "300px" }}
    >
      <GridItem area="nav">
        <NavBar toggleSidePanel={toggleSidePanel} />
      </GridItem>
      <GridItem area="main">
        <Show above="lg">
          <DailyStats data={data} watchlisted={watchlisted} />
        </Show>
        <PriceTable
          data={data}
          watchlisted={watchlisted}
          handleWatchlist={handleWatchlist}
        />
      </GridItem>
      {isOpen && (
        <GridItem>
          <SidePanel isOpen={isOpen} toggleSidePanel={toggleSidePanel} />
        </GridItem>
      )}
    </Grid>
  );
}

export default App;
