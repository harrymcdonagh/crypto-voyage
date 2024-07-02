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
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaStar } from "react-icons/fa6";
import CoinInfo from './CoinInfo';


const PriceTable = () => {
    const { data, error, isLoading } = useCoins();
    const [watchlisted, setWatchlisted] = useState<Set<string>>(new Set());

    const handleWatchlist = (coinId: string) => {
        setWatchlisted((prevWtchlistedCoins) => {
            const newWatchlistedCoins = new Set(prevWtchlistedCoins);
            if (newWatchlistedCoins.has(coinId)) {
                newWatchlistedCoins.delete(coinId);
            }
            else {
                newWatchlistedCoins.add(coinId);
            }
            return newWatchlistedCoins;
        })
    }


    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height='70vh'
            >
                <Spinner 
                    thickness='4px'
                    speed='1s'
                    size='xl'
                />
            </Box>
        );
    }

    return (
        <TableContainer padding={5} borderWidth={1} borderColor='lightblue' borderRadius={100} marginTop={10} maxW='80%' mx='auto'>
            <Box textAlign='center'>
                <Text fontSize={50} as='b' marginBottom={5}>Todays Prices</Text>
            </Box>
            <Table variant='simple' size='sm'>
                <Thead>
                    <Tr>
                        <Th>Rank</Th>
                        <Th>Name</Th>
                        <Th>Market Cap</Th>
                        <Th>Price USD</Th>
                        <Th>% Change</Th>
                        <Th>Watchlist</Th>
                        <Th textAlign='center'>Info</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map((coin) => (
                        <Tr key={coin.id}>
                            <Td>#{coin.cmc_rank}</Td>
                            <Td>{coin.name} ({coin.symbol})</Td>
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
                            <Td textAlign='center'>
                            {watchlisted.has(coin.id.toString()) ? (
                                <Icon as={FaStar} onClick={() => handleWatchlist(coin.id.toString())} color='yellow.500'></Icon>
                                ) : (
                                <Icon as={FaStar} onClick={() => handleWatchlist(coin.id.toString())}></Icon>
                                )}
                            </Td>
                            <Td>
                                <CoinInfo coin = {coin}/>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default PriceTable;
