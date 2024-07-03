import useCoins from '../hooks/useCoins';
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
} from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { FaStar } from "react-icons/fa6";
import CoinInfo from './CoinInfo';

const PriceTable = () => {
    const { data, error, isLoading } = useCoins();
    const [watchlisted, setWatchlisted] = useState<Set<string>>(new Set());
    const [expandedCoin, setExpandedCoin] = useState<string | null>(null);

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
    };

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="70vh"
            >
                <Spinner 
                    thickness="4px"
                    speed="1s"
                    size="xl"
                />
            </Box>
        );
    }

    return (
        <TableContainer padding={5} borderWidth={1} borderColor="lightblue" borderRadius="lg" marginTop={10} mx="auto">
            <Box textAlign="center" my="auto">
                <Text fontSize={50} as="b" marginBottom={5}>Today's Prices</Text>
            </Box>
            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        <Th>Rank</Th>
                        <Th>Name</Th>
                        <Th>Market Cap</Th>
                        <Th>Price USD</Th>
                        <Th>% Change</Th>
                        <Th>Watchlist</Th>
                        <Th>Info</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map((coin) => (
                        <Fragment key={coin.id}>
                            <Tr>
                                <Td>#{coin.cmc_rank}</Td>
                                <Td>{coin.symbol === 'FET' ? 'Fetch AI' : coin.name} ({coin.symbol})</Td>
                                <Td>${coin.quote.USD.market_cap.toLocaleString()}</Td>
                                <Td>
                                    ${coin.quote.USD.price >= 1000
                                        ? coin.quote.USD.price.toFixed(0)
                                        : coin.quote.USD.price.toFixed(5)}
                                </Td>
                                <Td>
                                    <Text color={coin.quote.USD.percent_change_24h < 0 ? 'red' : 'lightgreen'}>
                                        %{coin.quote.USD.percent_change_24h.toFixed(3)}
                                    </Text>
                                </Td>
                                <Td textAlign="center">
                                    {watchlisted.has(coin.id.toString()) ? (
                                        <Icon as={FaStar} onClick={() => handleWatchlist(coin.id.toString())} color="yellow.500" cursor="pointer" />
                                    ) : (
                                        <Icon as={FaStar} onClick={() => handleWatchlist(coin.id.toString())} cursor="pointer" />
                                    )}
                                </Td>
                                <Td>
                                    <Button size="sm" onClick={() => toggleCoinInfo(coin.id.toString())}>
                                        {expandedCoin === coin.id.toString() ? 'Hide Info' : 'Show Info'}
                                    </Button>
                                </Td>
                            </Tr>
                            {expandedCoin === coin.id.toString() && (
                                <Tr>
                                    <Td colSpan={7} padding={0}>
                                        <Box padding={4} borderWidth={1} borderColor="gray.200" borderRadius="md">
                                            <CoinInfo coin={coin} />
                                        </Box>
                                    </Td>
                                </Tr>
                            )}
                        </Fragment>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default PriceTable;
               
