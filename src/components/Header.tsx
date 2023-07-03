import Link from 'next/link'
import { Center, CenterProps, Image } from '@chakra-ui/react'

type Props = CenterProps

export const Header = ({ ...centerProps }: Props) => {
  return (
    <Center as={'header'} {...centerProps}>
      <Link href="/">
        <Image
          width={40}
          src="https://zukan.pokemon.co.jp/img/logo.svg"
          alt="logo"
        />
      </Link>
    </Center>
  )
}
