import { HStack, Text, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import logo from "../assets/logo.webp";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px" marginBottom={2}>
      <Image src={logo} boxSize="60px" />
      <Text
        as="b"
        fontFamily="Montserrat"
        fontSize={["lg", "2xl", "3xl", "4xl"]}
        textAlign="center"
      >
        CryptoVoyage 🚀
      </Text>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
