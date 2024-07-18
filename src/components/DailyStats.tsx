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

const DailyStats = ({ data, watchlisted }: { data: any[]; watchlisted: Set<string> }) => {
  const itemsToShow = useBreakpointValue({ base: 3, sm: 3, md: 3, lg: 5 });

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
                  .filter((coin) => watchlisted.has(coin.id.toString()))
                  .map((coin, index) => (
                    <Tr key={coin.id}>
                      <Td>#{coin.cmc_rank}</Td>
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
