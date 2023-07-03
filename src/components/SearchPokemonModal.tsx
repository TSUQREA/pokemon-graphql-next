import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Input,
  Button,
  Divider,
  Text,
  Grid,
  HStack,
  Spacer,
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react'
import { useQuery } from 'urql'
import { graphql } from '@/lib/gql'
import Link from 'next/link'
import { Space } from 'lucide-react'

type Props = {
  renderTrigger: (onOpen: () => void) => ReactNode
}

const SearchPokemonModalQuery = graphql(/* GraphQL */ `
  query SearchPokemonModalQuery($name: String!) {
    pokemon(name: $name) {
      id
      name
    }
  }
`)

export const SearchPokemonModal = ({ renderTrigger }: Props) => {
  const [searchText, setSearchText] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [{ data, fetching, error }, execute] = useQuery({
    query: SearchPokemonModalQuery,
    pause: true,
    variables: {
      name: searchText,
    },
  })

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    execute()
  }

  return (
    <>
      {renderTrigger(onOpen)}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ポケモン名で検索</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <form onSubmit={onSubmit}>
              <Grid gap={4}>
                <FormControl isInvalid={!!error?.message}>
                  <FormLabel>ポケモン名</FormLabel>
                  <Input
                    placeholder={'例）Pikachu'}
                    value={searchText}
                    onChange={onChangeSearch}
                  />
                  {!error?.message ? (
                    <FormHelperText>英語名で入力してください</FormHelperText>
                  ) : (
                    <FormErrorMessage>{error.message}</FormErrorMessage>
                  )}
                </FormControl>

                <Button w={'full'} isLoading={fetching}>
                  検索
                </Button>

                {data && (
                  <>
                    <Divider />
                    <Grid mt={4} gap={2}>
                      <Text
                        fontSize={'xs'}
                        fontWeight={'medium'}
                        color={'gray.600'}
                      >
                        検索結果
                      </Text>
                      {data.pokemon ? (
                        <HStack>
                          <Text>{data.pokemon.name}</Text>
                          <Spacer />
                          <Link href={`/${data.pokemon.id}`}>
                            <Button size={'xs'}>詳細ページを開く</Button>
                          </Link>
                        </HStack>
                      ) : (
                        <Text>ポケモンが見つかりませんでした</Text>
                      )}
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
