import URL from './constants';

type Tranaction = { id: string; timestamp: string; amount0: string; amount1: string };

const getTransactions = async (page: number, size: number, timestamp_gte: number) => {
  const headers = {
    'content-type': 'application/json',
  };
  const graphqlQuery = {
    operationName: 'fetchTransactions',
    query: `query fetchTransactions($first: Int = 10, $skip: Int = 0,  $timestamp_gte: BigInt = "0") {
        transactions(first: $first, skip: $skip, timestamp_gte: $timestamp_gte) {
            timestamp
            id
            swaps {
              amount0
              amount1
            }
        }
      }`,
    variables: {
      first: size,
      skip: page * size,
      timestamp_gte: timestamp_gte.toString(),
    },
  };

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(graphqlQuery),
  };

  const response = await fetch(URL, options);
  const data = await response.json();

  return data.data.transactions.map((it: any) => ({
    id: it.id,
    timestamp: it.timestamp,
    amount0: it.swaps[0]?.amount0 ?? 0,
    amount1: it.swaps[0]?.amount1 ?? 0,
  })) as Tranaction[];
};

export default getTransactions;
