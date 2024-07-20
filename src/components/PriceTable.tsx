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
  useDisclosure,
  useBreakpointValue, // Import this for responsive values
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
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
  const { onToggle } = useDisclosure();
  const tableSize = useBreakpointValue({ base: "sm", md: "md" });
  const hideWatchlist = useBreakpointValue({ base: true, md: false });

  const toggleCoinInfo = (coinId: string) => {
    setExpandedCoin((prevCoinId) => (prevCoinId === coinId ? null : coinId));
    onToggle();
  };

  return (
    <Stack
      padding={5}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="lg"
      marginTop={{ sm: 5, lg: 10 }}
      mx="auto"
      overflowX="auto"
    >
      <Box textAlign="center" my="auto">
        <Text fontSize={{ sm: "20px", lg: "25px" }} as="b" marginBottom={5}>
          Today's Prices
        </Text>
      </Box>
      <Table variant="simple" size={tableSize}>
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Name</Th>
            <Th>Price USD</Th>
            <Th>% Change</Th>
            {!hideWatchlist && <Th>Watchlist</Th>}
            <Th>Info</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data
            .sort((a, b) => a.cmc_rank - b.cmc_rank)
            .map((coin) => (
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
                  {!hideWatchlist && (
                    <Td>
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
                  )}
                  <Td>
                    <Button size="sm" onClick={() => toggleCoinInfo(coin.id.toString())}>
                      {expandedCoin === coin.id.toString() ? "Hide Info" : "Show Info"}
                    </Button>
                  </Td>
                </Tr>
                {expandedCoin === coin.id.toString() && (
                  <Tr>
                    <Td colSpan={hideWatchlist ? 5 : 6} padding={0}>
                      <Box
                        padding={4}
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
