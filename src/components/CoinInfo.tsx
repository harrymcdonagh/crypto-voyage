import { Box } from "@chakra-ui/react";
import { Coin } from "../hooks/useCoins";

interface Props {
    coin: Coin;
}

const CoinInfo = ({ coin }: Props) => {
    return (
        <Box>
            <p>Market cap: ${coin.quote.USD.market_cap}</p>
            <p>Volume 24h: ${coin.quote.USD.volume_24h.toLocaleString()}</p>
            <p>Circulating Supply: {coin.circulating_supply.toLocaleString()}</p>
            <p>Total Supply: {coin.total_supply.toLocaleString()}</p>
        </Box>
    );
};

export default CoinInfo;
