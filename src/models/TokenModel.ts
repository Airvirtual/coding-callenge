import { gql } from "@apollo/client";

// Define GraphQL schema for TokenDayDataModel
export const TokenDayDataModel = gql`
  type Query {
    tokens(token: ID!, first: Int!, skip: Int!): [Token!]!
  }

  type Token {
    id: ID!
    symbol: String!
    name: String!
    totalValueLocked: BigDecimal!
    tokenDayData(first: Int!, skip: Int!): [TokenDayData!]!
  }

  type TokenDayData {
    id: ID!
    date: String!
    priceUSD: BigInt!
  }
`;
