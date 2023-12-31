/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  fragment PokemonCard_pokemon on Pokemon {\n    name\n    image\n  }\n':
    types.PokemonCard_PokemonFragmentDoc,
  '\n  fragment PokemonPropertyList_pokemon on Pokemon {\n    classification\n    types\n    maxHP\n    maxCP\n  }\n':
    types.PokemonPropertyList_PokemonFragmentDoc,
  '\n  query SearchPokemonModalQuery($name: String!) {\n    pokemon(name: $name) {\n      id\n      name\n    }\n  }\n':
    types.SearchPokemonModalQueryDocument,
  '\n  query PokemonDetailPageQuery($id: String!) {\n    pokemon(id: $id) {\n      id\n      name\n      image\n      ...PokemonPropertyList_pokemon\n    }\n  }\n':
    types.PokemonDetailPageQueryDocument,
  '\n  query HomePageQuery($first: Int!) {\n    pokemons(first: $first) {\n      id\n      ...PokemonCard_pokemon\n    }\n  }\n':
    types.HomePageQueryDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PokemonCard_pokemon on Pokemon {\n    name\n    image\n  }\n'
): (typeof documents)['\n  fragment PokemonCard_pokemon on Pokemon {\n    name\n    image\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PokemonPropertyList_pokemon on Pokemon {\n    classification\n    types\n    maxHP\n    maxCP\n  }\n'
): (typeof documents)['\n  fragment PokemonPropertyList_pokemon on Pokemon {\n    classification\n    types\n    maxHP\n    maxCP\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query SearchPokemonModalQuery($name: String!) {\n    pokemon(name: $name) {\n      id\n      name\n    }\n  }\n'
): (typeof documents)['\n  query SearchPokemonModalQuery($name: String!) {\n    pokemon(name: $name) {\n      id\n      name\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query PokemonDetailPageQuery($id: String!) {\n    pokemon(id: $id) {\n      id\n      name\n      image\n      ...PokemonPropertyList_pokemon\n    }\n  }\n'
): (typeof documents)['\n  query PokemonDetailPageQuery($id: String!) {\n    pokemon(id: $id) {\n      id\n      name\n      image\n      ...PokemonPropertyList_pokemon\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query HomePageQuery($first: Int!) {\n    pokemons(first: $first) {\n      id\n      ...PokemonCard_pokemon\n    }\n  }\n'
): (typeof documents)['\n  query HomePageQuery($first: Int!) {\n    pokemons(first: $first) {\n      id\n      ...PokemonCard_pokemon\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
