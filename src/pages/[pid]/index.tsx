import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import { graphql } from '@/lib/gql'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import { PokemonPropertyList } from '@/components/PokemonPropertyList'
import Link from 'next/link'

const PokemonDetailPageQuery = graphql(/* GraphQL */ `
  query PokemonDetailPageQuery($id: String!) {
    pokemon(id: $id) {
      id
      name
      image
      ...PokemonPropertyList_pokemon
    }
  }
`)

export default function PokemonDetailPage() {
  const router = useRouter()

  const [{ data }] = useQuery({
    query: PokemonDetailPageQuery,
    variables: {
      id: String(router.query.pid),
    },
  })

  if (!data?.pokemon) {
    return <Box p={10}>loading...</Box>
  }

  return (
    <Box p={10}>
      <Link href={'/'}>
        <Button variant={'link'}>前のページに戻る</Button>
      </Link>
      <Box mt={4}>
        <Text fontSize={'xs'} color={'gray.700'}>
          {data.pokemon.id}
        </Text>
        <Heading size={'md'} mt={2}>
          {data.pokemon.name}
        </Heading>

        <Box mt={4} maxW={'md'}>
          <PokemonPropertyList pokemon={data.pokemon} />
        </Box>
      </Box>
      <Box position={'fixed'} bottom={4} right={4} zIndex={-10}>
        {data.pokemon.image && (
          <Image src={data.pokemon.image} alt={data.pokemon.name ?? ''} />
        )}
      </Box>
    </Box>
  )
}
