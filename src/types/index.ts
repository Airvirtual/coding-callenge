export interface Token {
  id?: string;
  symbol?: string;
  name?: string;
  totalSupply?: string;
  volume?: string;
  totalValueLocked?: string;
  tokenDayData?: TokenDayData[];
}

export interface TokenDayData {
  open: number;
  close: number;
  priceUSD: number;
}

export interface TokenData {
  tokens: Token[];
}

export interface Transaction {
  id: number;
  timestamp: number;
  swaps: Swap[];
}

export interface Swap {
  id?: number;
  recipient?: string;
  amountUSD?: string;
  token0?: Token;
  token1?: Token;
}

export interface TransactionData {
  transactions: Transaction[];
}

export interface TopPool {
  id: number;
  totalValueLockedUSD: string;
  volumeUSD: string;
  token0: {
    symbol: string;
  };
  token1: {
    symbol: string;
  };
}

export interface TopPoolData {
  pools: TopPool[];
}
