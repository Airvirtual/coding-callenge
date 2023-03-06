import Pools from "./Pools";
import Tokens from "./Tokens";
import Transactions from "./Transactions";

const routes = [
  { path: '/', component: <Pools />},
  { path: '/token', component: <Tokens />},
  { path: '/transaction', component: <Transactions />},
]

export default routes;