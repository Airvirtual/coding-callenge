import { createClient } from "urql";
export const client = createClient({
  url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  // fetchOptions: () => {
  //   const token = getToken();
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}` : "" },
  //   };
  // },
});
