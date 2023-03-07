export const TransactionPoolsQuery = `
  query {
    swaps(orderBy: timestamp, orderDirection: desc) {
    id
    timestamp
    token0 {
      id
      name
    }
    token1 {
      id
      name
    }
    transaction {
      id
    }
    amountUSD
    recipient
    sender
    amount0
    amount1
  }
  }
`;

export const TopPoolsQuery = `
  query {
    pools(first:30,orderBy: volumeUSD, orderDirection:desc){
      id
      totalValueLockedUSD
      poolDayData{
        volumeUSD
      }
    }
  }
`;

export const TokensQuery = `
  query {
    tokens(

    orderBy: symbol
    direction: asc
    where: { derivedETH_not: 0 }
  ) {
    id
    symbol
    name
    derivedETH
    totalValueLocked
    tokenDayData(
      orderBy: date
      orderDirection: desc
      first: 2
      where: { date_gt: -1 }
    ) {
      date
      priceUSD
    }
  }
  }
`;
