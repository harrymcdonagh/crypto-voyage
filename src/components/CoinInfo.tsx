import { Coin } from "../hooks/useCoins";
import {
  Box,
  Link,
  Spinner,
  Text,
  Image,
  HStack,
  Grid,
  GridItem,
  Stat,
  StatArrow,
} from "@chakra-ui/react";
import useCoinMetadata from "../hooks/useCoinAPIData";
import { coinMarketCapAxiosInstance } from "../services/api-client";

interface Props {
  coin: Coin;
}

const CoinInfo = ({ coin }: Props) => {
  const { data, isLoading } = useCoinMetadata(
    coinMarketCapAxiosInstance,
    `/v2/cryptocurrency/info?id=${coin.id}`
  );

  //@ts-ignore
  const coinData = data && data.data ? data.data[coin.id] : null;

  if (isLoading || !coinData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Spinner thickness="4px" speed="1s" size="xl" />
      </Box>
    );
  }

  const renderIconsForUrls = () => {
    const urls = coinData.urls;
    const icons = [
      { icon: "🌐", label: "Website", url: urls.website[0] },
      { icon: "🔗", label: "Explorer", url: urls.explorer[0] },
      { icon: "📜", label: "Technical Doc", url: urls.technical_doc[0] },
      { icon: "💻", label: "Source Code", url: urls.source_code[0] },
      { icon: "🔍", label: "Reddit", url: urls.reddit[0] },
    ];

    return icons.map((iconData, index) => (
      <Link
        key={index}
        href={iconData.url}
        isExternal
        _hover={{ textDecoration: "none" }}
      >
        <Box
          p={1}
          height="90px"
          width="90px"
          borderRadius="50px"
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          _hover={{ backgroundColor: "#0066cc", transition: "background-color 1s" }}
        >
          <span style={{ fontSize: "2em" }}>{iconData.icon}</span>
          <Text mt={2} fontSize="sm" fontWeight="bold">
            {iconData.label}
          </Text>
        </Box>
      </Link>
    ));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <HStack spacing={4} alignItems="center">
        <Image
          src={coinData.logo}
          alt={coinData.name}
          boxSize={{ base: "50px", lg: "52px", xl: "54px" }}
        />
        <Text fontSize={{ base: "20px", lg: "22px", xl: "24px" }} fontWeight="bold">
          {coinData.name}
        </Text>
      </HStack>
      <Grid gap="4" mt="4" width="100%">
        <GridItem area="description" colSpan={{ base: 1, md: 1 }}>
          <Box
            p={4}
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="lg"
            minHeight={{ base: "160px", md: "180px" }}
            textAlign="left"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Text fontSize={{ base: "20px", lg: "22px", xl: "24px" }} as="b" mb={1}>
              Description
            </Text>
            <Text
              fontFamily="monospace"
              fontSize={{ base: "17px", lg: "15px", xl: "17px", "2xl": "20px" }}
              mt={5}
              flex="1"
              lineHeight="1"
            >
              {coinData.description}
            </Text>
          </Box>
        </GridItem>
      </Grid>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap="4"
        mt="4"
        width="100%"
        justifyContent="center"
      >
        <Box
          p={4}
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="lg"
          minHeight={{ base: "100px", md: "120px" }}
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Text fontSize="lg" as="b" mb={1}>
            % Price Changes
          </Text>
          <Stat size="sm">
            1hr:
            {coin.quote.USD.percent_change_1h < 0 ? (
              <StatArrow type="decrease" />
            ) : (
              <StatArrow type="increase" />
            )}
            %{coin.quote.USD.percent_change_1h.toFixed(3)}
          </Stat>
          <Stat size="sm">
            24hr:
            {coin.quote.USD.percent_change_24h < 0 ? (
              <StatArrow type="decrease" />
            ) : (
              <StatArrow type="increase" />
            )}
            %{coin.quote.USD.percent_change_24h.toFixed(3)}
          </Stat>
          <Stat size="sm">
            7d:
            {coin.quote.USD.percent_change_7d < 0 ? (
              <StatArrow type="decrease" />
            ) : (
              <StatArrow type="increase" />
            )}
            %{coin.quote.USD.percent_change_7d.toFixed(3)}
          </Stat>
        </Box>
        <Box
          p={4}
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="lg"
          minHeight={{ base: "100px", md: "120px" }}
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Text fontSize="xl" as="b" mb={1}>
            Volume
          </Text>
          <Text mt={2} fontSize="md">
            ${coin.quote.USD.volume_24h.toLocaleString()}
          </Text>
        </Box>
        <Box
          p={4}
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="lg"
          minHeight={{ base: "100px", md: "120px" }}
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Text fontSize="xl" as="b" mb={1}>
            Market Cap
          </Text>
          <Text mt={2} fontSize="md">
            ${coin.quote.USD.market_cap.toLocaleString()}
          </Text>
        </Box>
      </Grid>
      <Box
        mt={{ base: 2, md: 4 }}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        textAlign="center"
      >
        {renderIconsForUrls()}
      </Box>
    </Box>
  );
};

export default CoinInfo;
