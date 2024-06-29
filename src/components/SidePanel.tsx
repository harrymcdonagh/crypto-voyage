import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react';
  
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
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <p>Item 1</p>
              <p>Item 2</p>
              <p>Item 3</p>
            </DrawerBody>
            <DrawerFooter>
              <p>Footer</p>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  };
  
  export default SidePanel;
  