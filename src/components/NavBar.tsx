import { Button, HStack, Image, Text } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/logo.webp";

const NavBar = ({ toggleSidePanel }: { toggleSidePanel: () => void }) => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize="60px" />
      <Text as="b" fontSize="3xl">CryptoVoyage</Text>
      <Button onClick={toggleSidePanel}>
        <GiHamburgerMenu />
      </Button>
    </HStack>
  );
};

export default NavBar;
