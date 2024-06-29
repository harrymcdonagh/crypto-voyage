import { Button, HStack, Image, Text } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import SidePanel from "./SidePanel";
import logo from "../assets/logo.webp";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize="60px" />
      <Text as="b" fontSize="3xl">CryptoVoyage</Text>
      <Button onClick={toggleSidePanel}>
        <GiHamburgerMenu />
      </Button>
      <SidePanel isOpen={isOpen} toggleSidePanel={toggleSidePanel} />
    </HStack>
  );
};

export default NavBar;
