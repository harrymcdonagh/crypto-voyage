import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Text,
  Icon,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { Fragment, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import CoinInfoBox from "./CoinInfoBox";

const PriceTable = ({
  data,
  watchlisted,
  handleWatchlist,
}: {
  data: any[];
  watchlisted: Set<string>;
  handleWatchlist: (id: string) => void;
}) => {
  const [expandedCoin, setExpandedCoin] = useState<string | null>(null);

  // Media query to check if screen width is 766px or less
  const [isLessThan766] = useMediaQuery("(max-width: 766px)");

  // Automatically close the info box if screen width is 766px or less
  useEffect(() => {
    if (isLessThan766) {
      setExpandedCoin(null);
    }
  }, [isLessThan766]);

  const toggleCoinInfo = (coinId: string) => {
    setExpandedCoin((prevCoinId) => (prevCoinId === coinId ? null : coinId));
  };

  return (
    <Stack
      padding={3}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="md"
      marginTop={{ sm: 3, lg: 5 }}
      mx="auto"
      maxW="100%"
      overflowX="auto"
    >
      <Box textAlign="center" my="auto" overflowX="auto" maxW="100%">
        <Text
          fontSize={{ base: "18px", sm: "20px", lg: "22px", xl: "24px" }}
          as="b"
          marginBottom={3}
        >
          Today's Prices
        </Text>
      </Box>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th display={{ base: "none", lg: "table-cell" }}>Rank</Th>
            <Th display={{ base: "none", md: "table-cell" }}>Name</Th>
            <Th>Symbol</Th>
            <Th>Price USD</Th>
            <Th>% Change</Th>
            <Th display={{ base: "none", lg: "table-cell" }}>Watchlist</Th>
            <Th display={{ base: "none", md: "table-cell" }}>Info</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data
            .sort((a, b) => a.cmc_rank - b.cmc_rank)
            .map((coin) => (
              <Fragment key={coin.id}>
                <Tr minHeight="50px">
                  <Td
                    padding={{ base: 3, md: 4 }}
                    display={{ base: "none", md: "table-cell" }}
                  >
                    #{coin.cmc_rank}
                  </Td>
                  <Td
                    padding={{ base: 3, md: 4 }}
                    display={{ base: "none", lg: "table-cell" }}
                  >
                    {coin.symbol === "FET" ? "Fetch AI" : coin.name}
                  </Td>
                  <Td padding={{ base: 3, md: 4 }}>{coin.symbol}</Td>
                  <Td padding={{ base: 3, md: 4 }}>
                    $
                    {coin.quote.USD.price >= 1000
                      ? coin.quote.USD.price.toFixed(0)
                      : coin.quote.USD.price.toFixed(5)}
                  </Td>
                  <Td padding={{ base: 3, md: 4 }}>
                    <Text
                      color={
                        coin.quote.USD.percent_change_24h < 0 ? "red.500" : "green.500"
                      }
                      fontSize={{ base: "md", md: "md" }}
                    >
                      %{coin.quote.USD.percent_change_24h.toFixed(3)}
                    </Text>
                  </Td>
                  <Td
                    padding={{ base: 3, md: 4 }}
                    display={{ base: "none", lg: "table-cell" }}
                  >
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
                  <Td
                    padding={{ base: 3, md: 4 }}
                    display={{ base: "none", md: "table-cell" }}
                  >
                    <Button size="sm" onClick={() => toggleCoinInfo(coin.id.toString())}>
                      {expandedCoin === coin.id.toString() ? "Hide Info" : "Show Info"}
                    </Button>
                  </Td>
                </Tr>
                {expandedCoin === coin.id.toString() && (
                  <Tr>
                    <Td colSpan={7} padding={0}>
                      <Box
                        padding={2}
                        borderWidth={1}
                        borderColor="gray.200"
                        borderRadius="md"
                      >
                        <CoinInfoBox coin={coin} />
                      </Box>
                    </Td>
                  </Tr>
                )}
              </Fragment>
            ))}
        </Tbody>
      </Table>
    </Stack>
  );
};

export default PriceTable;
