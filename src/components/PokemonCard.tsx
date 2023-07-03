import {
  AspectRatio,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
} from '@chakra-ui/react'
import { FragmentType, graphql, useFragment } from '@/lib/gql'

const PokemonFragment = graphql(/* GraphQL */ `
  fragment PokemonCard_pokemon on Pokemon {
    name
    image
  }
`)

type Props = {
  pokemon: FragmentType<typeof PokemonFragment>
}

export const PokemonCard = (props: Props) => {
  const pokemon = useFragment(PokemonFragment, props.pokemon)

  return (
    <Card>
      <CardHeader>
        <Heading size={'sm'}>{pokemon.name}</Heading>
      </CardHeader>

      <CardBody>
        <AspectRatio w={'full'} ratio={1}>
          {pokemon.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <Image src={pokemon.image} alt={pokemon.name ?? ''} />
          )}
        </AspectRatio>
      </CardBody>
    </Card>
  )
}
