import { HStack, Text } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <HStack justifyContent="center" padding="10px" marginBottom={2}>
      <Text
        as="b"
        fontFamily="Montserrat"
        fontSize={["lg", "2xl", "3xl", "4xl"]}
        textAlign="center"
      >
        CryptoVoyage 🚀
      </Text>
    </HStack>
  );
};

export default NavBar;
