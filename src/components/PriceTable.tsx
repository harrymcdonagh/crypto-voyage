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
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaStar } from "react-icons/fa6";


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

    if (error) return null;

    if (isLoading) {
        return (
            <Spinner
                thickness='4px'
                speed='0.65s'
                size='xl'
            />
        );
    }

    return (
        <TableContainer padding={10} borderWidth={4} borderColor='lightblue' borderRadius={100} marginTop={5} maxW='70%' mx='auto'>
            <Text textAlign='center' fontSize={30} marginBottom={5}>TODAYS PRICES</Text>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Ticker</Th>
                        <Th>Name</Th>
                        <Th>Market Cap</Th>
                        <Th>Price USD</Th>
                        <Th>% Change</Th>
                        <Th>Watchlist</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map((coin) => (
                        <Tr key={coin.id}>
                            <Td>{coin.symbol}</Td>
                            <Td>{coin.name}</Td>
                            <Td>${coin.quote.USD.market_cap.toLocaleString()}</Td>
                            <Td>
                                ${coin.quote.USD.price >= 1000
                                    ? coin.quote.USD.price.toFixed(0)
                                    : coin.quote.USD.price.toFixed(5)}
                            </Td>
                            <Td>
                                <Text color={coin.quote.USD.percent_change_24h < 0 ? 'red' : 'green'}>
                                    %{coin.quote.USD.percent_change_24h.toFixed(3)}
                                </Text>
                            </Td>
                            <Td>
                            {watchlisted.has(coin.id.toString()) ? (
                                <Icon as={FaStar} onClick={() => handleWatchlist(coin.id.toString())} color='yellow.500'></Icon>
                                ) : (
                                <Icon as={FaStar} onClick={() => handleWatchlist(coin.id.toString())}></Icon>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default PriceTable;
