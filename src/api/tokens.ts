import URL from './constants';

type Token = { id: string; name: string; totalValueLocked: string; price: number; priceChange: number };

const getTokens = async (page: number, size: number) => {
  const headers = {
    'content-type': 'application/json',
  };
  const graphqlQuery = {
    operationName: 'fetchTokens',
    query: `query fetchTokens($first: Int = 10, $skip: Int = 0) {
        tokenDayDatas(first: $first, skip: $skip) {
            id
            open
            close
            priceUSD
            totalValueLocked
            token {
                name
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

  return data.data.tokenDayDatas.map((it: any) => ({
    id: it.id,
    name: it.token.name,
    totalValueLocked: it.totalValueLocked,
    price: it.priceUSD,
    priceChange: it.close - it.open,
  })) as Token[];
};

export default getTokens;
