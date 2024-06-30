import { HStack, Switch, Text, useColorMode, Icon } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const c = colorMode === "dark";
  
  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={c}
        onChange={toggleColorMode}
      />
      <Icon as={c ? FaMoon : IoSunny} boxSize={4} />
    </HStack>
  );
};

export default ColorModeSwitch;
