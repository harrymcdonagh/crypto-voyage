import React from "react";
import {
  Box,
  Link,
  Text,
  Image,
  HStack,
  Grid,
  GridItem,
  StatHelpText,
  StatArrow,
  StatNumber,
  Stat,
} from "@chakra-ui/react";
import { Coin } from "../hooks/useCoins";
// import useCoinMetadata from "../hooks/useCoinAPIData";
// import { coinMarketCapAxiosInstance } from "../services/api-client";

interface Props {
  coin: Coin;
}

const CoinInfo = ({ coin }: Props) => {
  // const { data, isLoading } = useCoinMetadata(
  //   coinMarketCapAxiosInstance,
  //   `/v2/cryptocurrency/info?id=${coin.id}`
  // );

  // Static data for demonstration purposes
  const coinData = {
    logo: "https://example.com/logo.png",
    name: "Example Coin",
    description:
      "Bitcoin (BTC) is a cryptocurrency launched in 2010. Users are able to generate BTC through the process of mining. Bitcoin has a current supply of 19,719,725. The last known price of Bitcoin is 57,483.67944392 USD and is up 3.09 over the last 24 hours. It is currently trading on 11595 active market(s) with $28,440,758,295.02 traded over the last 24 hours. More information can be found at https://bitcoin.org/.",
    urls: {
      website: ["https://example.com"],
      explorer: ["https://explorer.example.com"],
      message_board: ["https://messageboard.example.com"],
      technical_doc: ["https://docs.example.com"],
      source_code: ["https://github.com/example"],
      reddit: ["https://reddit.com/r/example"],
    },
    quote: {
      USD: {
        price: 30000.0,
        market_cap: 1234567890,
        percent_change_1h: -0.5,
        percent_change_24h: 2.5,
        percent_change_7d: 5.1,
      },
    },
  };

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
          <Text fontSize="xl" as="b" mb={1}>
            % Price Changes
          </Text>
          <Stat size="sm">
            <StatNumber>
              1hr:
              {coinData.quote.USD.percent_change_1h < 0 ? (
                <StatArrow type="decrease" />
              ) : (
                <StatArrow type="increase" />
              )}
              %{coinData.quote.USD.percent_change_1h.toFixed(3)}
            </StatNumber>
          </Stat>
          <Stat size="sm">
            <StatNumber>
              24hr:
              {coinData.quote.USD.percent_change_24h < 0 ? (
                <StatArrow type="decrease" />
              ) : (
                <StatArrow type="increase" />
              )}
              %{coinData.quote.USD.percent_change_24h.toFixed(3)}
            </StatNumber>
          </Stat>
          <Stat size="sm">
            <StatNumber>
              7d:
              {coinData.quote.USD.percent_change_7d < 0 ? (
                <StatArrow type="decrease" />
              ) : (
                <StatArrow type="increase" />
              )}
              %{coinData.quote.USD.percent_change_7d.toFixed(3)}
            </StatNumber>
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
            Content for the box
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
            ${coinData.quote.USD.market_cap.toLocaleString()}
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
