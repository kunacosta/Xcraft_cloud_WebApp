
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
