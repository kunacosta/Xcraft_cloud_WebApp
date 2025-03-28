
export type TradeType = 'buy' | 'sell';

export interface Trade {
  id: string;
  currencyPair: string;
  entryPrice: number;
  exitPrice: number;
  tradeType: TradeType;
  amount: number; // Monetary value (in dollars)
  notes: string;
  date: string | Date;
  lotSize: number;
  strategy?: string;
  user_id?: string;
}

// Database types
export type TradeInsert = Omit<Trade, 'id' | 'user_id'>;
export type TradeUpdate = Partial<Trade>;

// Trading strategies
export const tradingStrategies = [
  { value: 'trend_following', label: 'Trend Following' },
  { value: 'breakout', label: 'Breakout' },
  { value: 'mean_reversion', label: 'Mean Reversion' },
  { value: 'fibonacci', label: 'Fibonacci Retracement' },
  { value: 'support_resistance', label: 'Support and Resistance' },
  { value: 'price_action', label: 'Price Action' },
  { value: 'momentum', label: 'Momentum' },
  { value: 'scalping', label: 'Scalping' },
  { value: 'swing', label: 'Swing Trading' },
  { value: 'position', label: 'Position Trading' }
];
