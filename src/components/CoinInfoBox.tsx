import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { Coin } from "../hooks/useCoins";
import CoinGraph from "./CoinGraph";
import CoinInfo from "./CoinInfo";

interface Props {
  coin: Coin;
}

const CoinInfoBox = ({ coin }: Props) => {
  // Dynamic height value for the CoinGraph component
  const graphHeight = useBreakpointValue({
    base: "300px",
    sm: "300px",
    md: "300px",
    lg: "500px",
    xl: "500px",
  });

  // Dynamic column layout for responsive design
  const columns = useBreakpointValue({
    base: "1fr",
    sm: "1fr",
    md: "1fr",
    lg: "2fr 310px",
    xl: "2fr 400px",
    "2xl": "2fr 500px",
  });

  return (
    <Box
      maxW="container.lg" // Limits the width to the container size
      mx="auto"
      p={4} // Adds padding for better spacing
    >
      <Grid
        templateAreas={{
          base: `"info" "graph"`,
          sm: `"info" "graph"`,
          md: `"info" "graph"`,
          lg: `"info graph"`,
          xl: `"info graph"`,
        }}
        templateColumns={columns} // Use the dynamic column widths
        gap={4}
      >
        <GridItem area="info">
          <CoinInfo coin={coin} />
        </GridItem>
        <GridItem area="graph">
          <CoinGraph height={graphHeight} coin={coin} />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CoinInfoBox;
