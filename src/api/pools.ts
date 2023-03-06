import URL from './constants';

type Pool = { id: string; totalValueLocked: string; volume: string };

const getPools = async (page: number, size: number) => {
  const headers = {
    'content-type': 'application/json',
  };
  const graphqlQuery = {
    operationName: 'fetchPools',
    query: `query fetchPools($first: Int = 10, $skip: Int = 0) {
        poolDayDatas(first: $first, skip: $skip) {
          id
          pool {
            totalValueLockedUSD
            volumeUSD
          }
        }
      }`,
    variables: {
      first: size,
      skip: page * size,
    },
  };

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(graphqlQuery),
  };

  const response = await fetch(URL, options);
  const data = await response.json();

  return data.data.poolDayDatas.map((it: any) => ({
    id: it.id,
    totalValueLocked: it.pool.totalValueLockedUSD,
    volume: it.pool.volumeUSD,
  })) as Pool[];
};

export default getPools;
