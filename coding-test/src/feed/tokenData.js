// Fetch Data from GrapQL For Tokens starting from skipAmount Index
// If Skip Amount is 0 then it will fetch 10 tokens, if the Skip Amount 
// is 10, this function will fetch information from  10 Tokens to 20
export const loadTokens = (skipAmount) => {
  return fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
                {
                    tokens(first: 10, skip: ${skipAmount}, orderBy: symbol, direction: asc, where: { derivedETH_not: 0 }) {
                      id
                      symbol
                      name
                      derivedETH
                      totalValueLocked
                      tokenDayData(
                          orderBy: date,
                          orderDirection: desc,
                          first: 2,
                          where: { date_gt: -1 }
                        ) {
                          date
                          priceUSD
                      }
                    }
                  }
        `,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const tokenData = data?.data?.tokens ?? [];
      return tokenData;
    })
    .catch((error) => {
      console.error(error);
    });
};
