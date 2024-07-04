import { Box, Grid, GridItem } from "@chakra-ui/react";
import useCoinbaseData from "../hooks/useCoinData";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Coin } from "../hooks/useCoins";
import CoinGraph from "./CoinGraph";
interface Props {
  coin: Coin;
}

const CoinInfo = ({ coin }: Props) => {
  return (
    <Box>
      <Grid
        templateAreas={`"header header"
                    "icon main"
                    "icon footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"1fr 1fr"}
        h="650px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="orange.300" area={"header"}>
          {coin.name}
        </GridItem>
        <GridItem pl="2" bg="pink.300" area={"icon"}></GridItem>
        <GridItem pl="2" bg="green.300" area={"main"}>
          <CoinGraph coin={coin} />
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CoinInfo;
