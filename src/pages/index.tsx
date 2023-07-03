import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Text,
} from '@chakra-ui/react'
import { PokemonCard } from '@/components/PokemonCard'
import { graphql } from '@/lib/gql'
import { useQuery } from 'urql'
import { nonNull } from '@/lib/util'
import { NumberParam, useQueryParam, withDefault } from 'use-query-params'

const HomePageQuery = graphql(/* GraphQL */ `
  query HomePageQuery($first: Int!) {
    pokemons(first: $first) {
      id
      ...PokemonCard_pokemon
    }
  }
`)

const PER_PAGE = 10

export default function Home() {
  const [first, setFirst] = useQueryParam(
    'first',
    withDefault(NumberParam, PER_PAGE)
  )

  const [{ data }] = useQuery({
    query: HomePageQuery,
    variables: {
      first: first,
    },
  })

  const onClickMore = () => {
    setFirst(first + PER_PAGE)
  }

  return (
    <Box p={10}>
      <Grid templateColumns={'repeat(5, 1fr)'} gap={6}>
        {data?.pokemons?.filter(nonNull).map((pokemon) => (
          <GridItem key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </GridItem>
        ))}
      </Grid>

      <HStack justifyContent={'flex-end'} mt={10} spacing={4}>
        <Text fontWeight={'medium'}>{first} 件表示中</Text>
        <Button variant={'outline'} onClick={onClickMore}>
          もっと見る
        </Button>
      </HStack>
    </Box>
  )
}
