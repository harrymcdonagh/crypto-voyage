import { Grid, GridItem, Text } from "@chakra-ui/react"

const FilterButtons = () => {
  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        <GridItem w='100%' h='70'  borderRadius='10px' borderWidth='3px' borderColor='lightblue'>
          <Text textAlign='center' fontSize={20}>Top Gainers</Text>
        </GridItem>
        <GridItem w='100%' h='70'  borderRadius='10px' borderWidth='3px' borderColor='lightblue'>
          <Text textAlign='center' fontSize={20}>Top Losers</Text>
        </GridItem>
        <GridItem w='100%' h='70'  borderRadius='10px' borderWidth='3px' borderColor='lightblue'>
          <Text textAlign='center' fontSize={20}>Watchlist</Text>
        </GridItem>
     </Grid>
  )
}

export default FilterButtons