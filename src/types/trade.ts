
export type TradeType = 'buy' | 'sell';

export interface Trade {
  id: string;
  currencyPair: string;
  entryPrice: number;
  exitPrice: number;
  tradeType: TradeType;
  profitLoss: number;
  notes: string;
  date: string;
  lotSize: number;
}

// Database types
export type TradeInsert = Omit<Trade, 'id' | 'date'>;
export type TradeUpdate = Partial<Trade>;
