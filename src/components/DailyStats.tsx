import {
  Grid,
  GridItem,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Stat,
  StatArrow,
  StatHelpText,
  StatNumber,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
// import useCoins from "../hooks/useCoins";

const DailyStats = () => {
  // const { data, error, isLoading } = useCoins();

  const itemsToShow = useBreakpointValue({ base: 3, sm: 3, md: 3, lg: 5 });

  // Static data for demonstration purposes
  const data = [
    {
      id: "1",
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
      symbol: "ETH",
      quote: {
        USD: {
          price: 2000.0,
          percent_change_24h: -1.5,
        },
      },
    },
    {
      id: "3",
      symbol: "ADA",
      quote: {
        USD: {
          price: 1.2,
          percent_change_24h: 5.1,
        },
      },
    },
    {
      id: "4",
      symbol: "DOGE",
      quote: {
        USD: {
          price: 0.07,
          percent_change_24h: -3.2,
        },
      },
    },
    {
      id: "5",
      symbol: "XRP",
      quote: {
        USD: {
          price: 0.5,
          percent_change_24h: 0.8,
        },
      },
    },
    {
      id: "6",
      symbol: "SOL",
      quote: {
        USD: {
          price: 35.0,
          percent_change_24h: -0.5,
        },
      },
    },
  ];

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      <GridItem
        w="100%"
        h="100%"
        borderRadius="10px"
        borderWidth={1}
        borderColor="gray.200"
      >
        <TableContainer>
          <Box textAlign="center" margin="0.75rem">
            <Text as="b" fontSize={20}>
              Top Gainers 🔥
            </Text>
          </Box>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Ticker</Th>
                <Th>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                .sort(
                  (a, b) =>
                    b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h
                )
                .slice(0, itemsToShow)
                .map((coin, index) => (
                  <Tr key={coin.id}>
                    <Td>#{index + 1}</Td>
                    <Td>{coin.symbol}</Td>
                    <Td>
                      <Stat size="sm">
                        <StatNumber>
                          $
                          {coin.quote.USD.price >= 1000
                            ? coin.quote.USD.price.toFixed(0)
                            : coin.quote.USD.price.toFixed(5)}
                          <StatHelpText>
                            {coin.quote.USD.percent_change_24h < 0 ? (
                              <StatArrow type="decrease" />
                            ) : (
                              <StatArrow type="increase" />
                            )}
                            %{coin.quote.USD.percent_change_24h.toFixed(3)}
                          </StatHelpText>
                        </StatNumber>
                      </Stat>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </GridItem>
      <GridItem
        w="100%"
        h="100%"
        borderRadius="10px"
        borderWidth={1}
        borderColor="gray.200"
      >
        <TableContainer>
          <Box textAlign="center" margin="0.75rem">
            <Text as="b" fontSize={20}>
              Top Losers ❗️
            </Text>
          </Box>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Ticker</Th>
                <Th>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                .sort(
                  (a, b) =>
                    a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h
                )
                .slice(0, itemsToShow)
                .map((coin, index) => (
                  <Tr key={coin.id}>
                    <Td>#{index + 1}</Td>
                    <Td>{coin.symbol}</Td>
                    <Td>
                      <Stat size="sm">
                        <StatNumber>
                          $
                          {coin.quote.USD.price >= 1000
                            ? coin.quote.USD.price.toFixed(0)
                            : coin.quote.USD.price.toFixed(5)}
                          <StatHelpText>
                            {coin.quote.USD.percent_change_24h < 0 ? (
                              <StatArrow type="decrease" />
                            ) : (
                              <StatArrow type="increase" />
                            )}
                            %{coin.quote.USD.percent_change_24h.toFixed(3)}
                          </StatHelpText>
                        </StatNumber>
                      </Stat>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </GridItem>
      <GridItem
        w="100%"
        h="100%"
        borderRadius="10px"
        borderWidth={1}
        borderColor="gray.200"
      >
        <TableContainer>
          <Box textAlign="center" margin="0.75rem">
            <Text as="b" fontSize={20}>
              WatchList ⭐
            </Text>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Rank</Th>
                  <Th>Ticker</Th>
                  <Th>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data
                  .sort(
                    (a, b) =>
                      a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h
                  )
                  .slice(0, itemsToShow)
                  .map((coin, index) => (
                    <Tr key={coin.id}>
                      <Td>#{index + 1}</Td>
                      <Td>{coin.symbol}</Td>
                      <Td>
                        <Stat size="sm">
                          <StatNumber>
                            $
                            {coin.quote.USD.price >= 1000
                              ? coin.quote.USD.price.toFixed(0)
                              : coin.quote.USD.price.toFixed(5)}
                            <StatHelpText>
                              {coin.quote.USD.percent_change_24h < 0 ? (
                                <StatArrow type="decrease" />
                              ) : (
                                <StatArrow type="increase" />
                              )}
                              %{coin.quote.USD.percent_change_24h.toFixed(3)}
                            </StatHelpText>
                          </StatNumber>
                        </Stat>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </TableContainer>
      </GridItem>
    </Grid>
  );
};

export default DailyStats;
