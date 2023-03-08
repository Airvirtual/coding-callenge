// Fetch Data from GrapQL For Top Pool starting from skipAmount Index
// If Skip Amount is 0 then it will fetch top 10 pools, if the Skip Amount 
// is 10, this function will fetch information from top 10 pools to top 20 
export const loadPools = async (skipAmount) => {
  return fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          {
            pools(first: 10, skip: ${skipAmount}, orderBy: volumeUSD, orderDirection: desc) {
              id
              totalValueLockedUSD
              volumeUSD
            }
          }
        `,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const poolData = data?.data?.pools ?? [];
      return poolData;;
    })
    .catch((error) => console.warn(error));
};
