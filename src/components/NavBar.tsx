import { Button, HStack, Image, Text } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/logo.webp";

const NavBar = ({ toggleSidePanel }: { toggleSidePanel: () => void }) => {
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
      <Button onClick={toggleSidePanel} display={["block"]}>
        <GiHamburgerMenu />
      </Button>
    </HStack>
  );
};

export default NavBar;
