import { gql } from "@apollo/client";

export const TransactionModel = gql`
  type Query {
    transactions(first: Int!, skip: Int!): [Transaction!]!
  }

  type Transaction {
    id: ID!
    timestamp: BigInt!
    swaps(first: Int!): [Swap!]!
  }

  type Swap {
    id: ID!
    recipient: Bytes!
    amountUSD: BigInt!
    token0: Token!
    token1: Token!
  }

  type Token {
    id: ID!
    totalSupply: BigDecimal!
  }
`;
