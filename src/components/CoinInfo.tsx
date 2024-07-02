import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react"

import { Coin } from "../hooks/useCoins";

interface Props {
    coin: Coin;
  }
  
  const CoinInfo = ({ coin }: Props) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
        <>
          <Button onClick={onToggle}>Click Me</Button>
          <Collapse in={isOpen} animateOpacity>
            <Box
              p='40px'
              color='white'
              mt='4'
              bg='teal.500'
              rounded='md'
              shadow='md'
            >
              {coin.name}
            </Box>
          </Collapse>
        </>
      )
  };
  
  export default CoinInfo;