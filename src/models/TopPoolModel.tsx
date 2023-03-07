import { gql } from "@apollo/client";

// Define GraphQL schema for TopPoolModel
export const TopPoolModel = gql`
  type Query {
    pools(first: Int!, skip: Int!): [Pool!]!
  }

  type Pool {
    id: ID!
    totalValueLockedUSD: BigInt!
    volumeUSD: BigInt!
    token0: Token!
    token1: Token!
  }

  type Token {
    symbol: String!
  }
}
`;
