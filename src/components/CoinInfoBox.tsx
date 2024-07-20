import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { Coin } from "../hooks/useCoins";
import CoinGraph from "./CoinGraph";
import CoinInfo from "./CoinInfo";

interface Props {
  coin: Coin;
}

const CoinInfoBox = ({ coin }: Props) => {
  const graphWidth = useBreakpointValue({
    base: "100%",
    sm: "20%",
    md: "30%",
    lg: "40%",
    xl: "40%",
  });
  const infoWidth = useBreakpointValue({
    base: "100%",
    sm: "40%",
    md: "50%",
    lg: "60%",
    xl: "60%",
  });
  const graphHeight = useBreakpointValue({
    base: "300px",
    md: "300px",
    lg: "500px",
    xl: "500px",
  });

  return (
    <Box>
      <Grid
        templateAreas={{
          base: `"info" "graph"`,
          sm: `"info" "graph"`,
          md: `"info" "graph"`,
          lg: `"info graph"`,
          xl: `"info graph"`,
        }}
        templateColumns={{
          base: "1fr",
          sm: "1fr",
          md: "1fr",
          lg: `${infoWidth} ${graphWidth}`,
          xl: `${infoWidth} ${graphWidth}`,
        }}
        gap="1"
        h="auto"
      >
        <GridItem pl="2" area="info">
          <CoinInfo coin={coin} />
        </GridItem>
        <GridItem pl="2" area="graph">
          <CoinGraph height={graphHeight} coin={coin} />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CoinInfoBox;
