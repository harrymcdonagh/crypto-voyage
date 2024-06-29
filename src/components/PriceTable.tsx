import React from 'react';
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
} from '@chakra-ui/react';

const PriceTable = () => {
    const { data, error, isLoading } = useCoins();

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
        <TableContainer padding={10} borderWidth={4} borderRadius={100} margin={10} scale={0.75}>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Ticker</Th>
                        <Th>Name</Th>
                        <Th>Market Cap</Th>
                        <Th>Price USD</Th>
                        <Th>% Change</Th>
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
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default PriceTable;
