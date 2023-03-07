import { gql } from "@apollo/client";

// Query to get token day data
export const TOKEN_DAY_DATA = gql`
  query TokenDayData($skip: Int!, $first: Int!) {
    tokens(first: $first, skip: $skip) {
      id
      symbol
      name
      totalValueLocked

      tokenDayData(orderBy: date, orderDirection: desc, skip: 0, first: 1) {
        id
        date
        priceUSD
      }
    }
  }
`;

// Query to get transactions
export const GET_TRANSACTIONS = gql`
  query GetTransactions($first: Int!, $skip: Int!) {
    transactions(first: $first, skip: $skip) {
      id
      timestamp
      swaps(first: 1) {
        id
        recipient
        amountUSD
        token0 {
          id
          totalSupply
        }
        token1 {
          id
          totalSupply
        }
      }
    }
  }
`;

// Query to get top pools by total value locked in USD
export const GET_TOP_POOLS = gql`
  query GetTopPools($first: Int!, $skip: Int!) {
    pools(
      first: $first
      skip: $skip
      orderBy: "totalValueLockedUSD"
      orderDirection: "asc"
      where: { feeTier: 3000 }
    ) {
      id
      totalValueLockedUSD
      volumeUSD
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
  }
`;
