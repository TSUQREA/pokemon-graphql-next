import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { PokemonCard } from '@/components/PokemonCard'
import { graphql } from '@/lib/gql'
import { useQuery } from 'urql'
import { nonNull } from '@/lib/util'
import { NumberParam, useQueryParam, withDefault } from 'use-query-params'
import Link from 'next/link'
import { SearchPokemonModal } from '@/components/SearchPokemonModal'
import { SearchIcon } from 'lucide-react'

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
      <SearchPokemonModal
        renderTrigger={(onOpen) => (
          <IconButton
            position={'fixed'}
            top={10}
            right={10}
            isRound
            aria-label={'検索'}
            icon={<SearchIcon />}
            onClick={onOpen}
          />
        )}
      />

      <Grid templateColumns={'repeat(5, 1fr)'} gap={6}>
        {data?.pokemons?.filter(nonNull).map((pokemon) => (
          <Link key={pokemon.id} href={`/${pokemon.id}`}>
            <GridItem>
              <PokemonCard pokemon={pokemon} />
            </GridItem>
          </Link>
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
