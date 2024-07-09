import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Text,
  Icon,
  Box,
  Button,
  Stack,
  Collapse,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { FaStar } from "react-icons/fa";
import CoinInfoBox from "./CoinInfoBox";

// import useCoins from "../hooks/useCoins";

const PriceTable = () => {
  // const { data, error, isLoading } = useCoins();
  const [watchlisted, setWatchlisted] = useState<Set<string>>(new Set());
  const [expandedCoin, setExpandedCoin] = useState<string | null>(null);
  const { isOpen, onToggle } = useDisclosure();

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

  const toggleCoinInfo = (coinId: string) => {
    setExpandedCoin((prevCoinId) => (prevCoinId === coinId ? null : coinId));
    onToggle(); // Toggle the collapse state
  };

  // Static data for demonstration purposes
  const data = [
    {
      id: "1",
      cmc_rank: 1,
      name: "Bitcoin",
      symbol: "BTC",
      quote: {
        USD: {
          price: 30000.0,
          percent_change_24h: 2.5,
        },
      },
    },
    {
      id: "2",
      cmc_rank: 2,
      name: "Ethereum",
      symbol: "ETH",
      quote: {
        USD: {
          price: 2000.0,
          percent_change_24h: -1.5,
        },
      },
    },
    // Add more coins as needed
  ];

  // if (isLoading) {
  //   return (
  //     <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
  //       <Spinner thickness="4px" speed="1s" size="xl" />
  //     </Box>
  //   );
  // }

  return (
    <Stack
      padding={5}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="lg"
      marginTop={{ sm: 5, lg: 10 }}
      mx="auto"
    >
      <Box textAlign="center" my="auto">
        <Text fontSize={{ sm: "25px", lg: "27px", xl: "29px" }} as="b" marginBottom={5}>
          Today's Prices
        </Text>
      </Box>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Name</Th>
            <Th>Price USD</Th>
            <Th>% Change</Th>
            <Th>Watchlist</Th>
            <Th>Info</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((coin) => (
            <Fragment key={coin.id}>
              <Tr>
                <Td>#{coin.cmc_rank}</Td>
                <Td>
                  {coin.symbol === "FET" ? "Fetch AI" : coin.name} ({coin.symbol})
                </Td>
                <Td>
                  $
                  {coin.quote.USD.price >= 1000
                    ? coin.quote.USD.price.toFixed(0)
                    : coin.quote.USD.price.toFixed(5)}
                </Td>
                <Td>
                  <Text
                    color={coin.quote.USD.percent_change_24h < 0 ? "red" : "lightgreen"}
                  >
                    %{coin.quote.USD.percent_change_24h.toFixed(3)}
                  </Text>
                </Td>
                <Td textAlign="center">
                  {watchlisted.has(coin.id.toString()) ? (
                    <Icon
                      as={FaStar}
                      onClick={() => handleWatchlist(coin.id.toString())}
                      color="yellow.500"
                      cursor="pointer"
                    />
                  ) : (
                    <Icon
                      as={FaStar}
                      onClick={() => handleWatchlist(coin.id.toString())}
                      cursor="pointer"
                    />
                  )}
                </Td>
                <Td>
                  <Button size="sm" onClick={() => toggleCoinInfo(coin.id.toString())}>
                    {expandedCoin === coin.id.toString() ? "Hide Info" : "Show Info"}
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td colSpan={7} padding={0}>
                  <Collapse
                    in={expandedCoin === coin.id.toString()}
                    transition={{ exit: { duration: 0.5 }, enter: { duration: 1 } }}
                  >
                    <Box
                      padding={4}
                      borderWidth={1}
                      borderColor="gray.200"
                      borderRadius="md"
                    >
                      <CoinInfoBox coin={coin} />
                    </Box>
                  </Collapse>
                </Td>
              </Tr>
            </Fragment>
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
};

export default PriceTable;
