import { Box, HStack, StackDivider, Text, VStack } from '@chakra-ui/react'
import { FragmentType, graphql, useFragment } from '@/lib/gql'
import { useMemo } from 'react'

const PokemonFragment = graphql(/* GraphQL */ `
  fragment PokemonPropertyList_pokemon on Pokemon {
    classification
    types
    maxHP
    maxCP
  }
`)

type Props = {
  pokemon: FragmentType<typeof PokemonFragment>
}

export const PokemonPropertyList = (props: Props) => {
  const pokemon = useFragment(PokemonFragment, props.pokemon)

  const properties = useMemo(
    () => [
      {
        label: '分類',
        value: pokemon.classification,
      },
      {
        label: 'タイプ',
        value: pokemon.types,
      },
      {
        label: '最大HP',
        value: pokemon.maxHP,
      },
      {
        label: '最大CP',
        value: pokemon.maxCP,
      },
    ],
    [pokemon]
  )

  return (
    <VStack alignItems={'flex-start'} divider={<StackDivider />}>
      {properties.map((property) => (
        <Box key={property.label}>
          <Text fontSize={'xs'} color={'gray.700'}>
            {property.label}
          </Text>
          <Text fontWeight={'medium'}>{property.value}</Text>
        </Box>
      ))}
    </VStack>
  )
}
