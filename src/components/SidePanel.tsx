import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack,
    Box,
    VStack,
  } from '@chakra-ui/react';

  import { MdAccountCircle } from "react-icons/md";
  import { FaFireAlt } from "react-icons/fa";
  import { IoPieChart } from "react-icons/io5";
  import { FaStar } from "react-icons/fa6";
  import { Button } from '@chakra-ui/react';
  import ColorModeSwitch from './ColorModeSwitch';

  
  interface Props {
    isOpen: boolean;
    toggleSidePanel: () => void;
  }
  
  const SidePanel = ({ isOpen, toggleSidePanel }: Props) => {
    return (
      <Drawer placement="right" isOpen={isOpen} onClose={toggleSidePanel}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing="15px" justify="center" align="center" w="full">
              <Box w="full" display="flex" justifyContent="center">
                <ColorModeSwitch />
              </Box>
              <Box w="full" display="flex" justifyContent="center">
                <Button
                  leftIcon={<MdAccountCircle />}
                  colorScheme="blue"
                  variant="outline"
                  w="60%"
                >
                  Login
                </Button>
              </Box>
              <Box w="full" display="flex" justifyContent="center">
                <Button
                  leftIcon={<FaFireAlt />}
                  colorScheme="blue"
                  variant="outline"
                  w="60%"
                >
                  Trending
                </Button>
              </Box>
              <Box w="full" display="flex" justifyContent="center">
                <Button
                  leftIcon={<IoPieChart />}
                  colorScheme="blue"
                  variant="outline"
                  w="60%"
                >
                  Portfolio
                </Button>
              </Box>
              <Box w="full" display="flex" justifyContent="center">
                <Button
                  leftIcon={<FaStar />}
                  colorScheme="blue"
                  variant="outline"
                  w="60%"
                >
                  Watchlist
                </Button>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
      </Drawer>
    );
  };
  
  export default SidePanel;
  