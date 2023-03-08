// Fetch Data from GrapQL For recent Transaction starting from skipAmount Index
// If Skip Amount is 0 then it will fetch 10 Transaction, if the Skip Amount 
// is 10, this function will fetch information from  10th Transaction to 20th Transaction

export const loadTransactions = (skipAmount) => {
  return fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
                {
                    swaps(first: 10, skip: ${skipAmount}, orderBy: timestamp, orderDirection: desc) {
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
        `,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const transactionData = data?.data?.swaps ?? [];
      return transactionData;
    })
    .catch((error) => {
      console.error(error);
    });
};
