
import { Trade } from '@/types/trade';

export interface BreakdownStats {
  tradesByPair: Record<string, { count: number; profit: number; winRate: number }>;
  tradesByStrategy: Record<string, { count: number; profit: number; winRate: number }>;
  monthlyPerformance: Record<string, { count: number; profit: number; winRate: number }>;
}

export const calculateBreakdownStats = (trades: Trade[]): BreakdownStats => {
  // Breakdown by currency pair with win rate
  const tradesByPair: Record<string, { count: number; profit: number; winRate: number }> = {};
  
  trades.forEach(trade => {
    if (!tradesByPair[trade.currencyPair]) {
      tradesByPair[trade.currencyPair] = { count: 0, profit: 0, winRate: 0 };
    }
    tradesByPair[trade.currencyPair].count++;
    tradesByPair[trade.currencyPair].profit += trade.amount;
  });
  
  // Calculate win rate for each pair
  Object.keys(tradesByPair).forEach(pair => {
    const pairTrades = trades.filter(t => t.currencyPair === pair);
    const wins = pairTrades.filter(t => t.amount > 0).length;
    tradesByPair[pair].winRate = pairTrades.length > 0 ? (wins / pairTrades.length) * 100 : 0;
  });

  // Breakdown by strategy with win rate
  const tradesByStrategy: Record<string, { count: number; profit: number; winRate: number }> = {};
  
  trades.forEach(trade => {
    const strategy = trade.strategy || 'Unknown';
    if (!tradesByStrategy[strategy]) {
      tradesByStrategy[strategy] = { count: 0, profit: 0, winRate: 0 };
    }
    tradesByStrategy[strategy].count++;
    tradesByStrategy[strategy].profit += trade.amount;
  });
  
  // Calculate win rate for each strategy
  Object.keys(tradesByStrategy).forEach(strategy => {
    const strategyTrades = trades.filter(t => (t.strategy || 'Unknown') === strategy);
    const wins = strategyTrades.filter(t => t.amount > 0).length;
    tradesByStrategy[strategy].winRate = strategyTrades.length > 0 ? (wins / strategyTrades.length) * 100 : 0;
  });
  
  // Monthly performance breakdown
  const monthlyPerformance: Record<string, { count: number; profit: number; winRate: number }> = {};
  
  trades.forEach(trade => {
    const date = new Date(trade.date);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyPerformance[yearMonth]) {
      monthlyPerformance[yearMonth] = { count: 0, profit: 0, winRate: 0 };
    }
    
    monthlyPerformance[yearMonth].count++;
    monthlyPerformance[yearMonth].profit += trade.amount;
  });
  
  // Calculate win rate for each month
  Object.keys(monthlyPerformance).forEach(month => {
    const monthTrades = trades.filter(t => {
      const date = new Date(t.date);
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return yearMonth === month;
    });
    
    const wins = monthTrades.filter(t => t.amount > 0).length;
    monthlyPerformance[month].winRate = monthTrades.length > 0 ? (wins / monthTrades.length) * 100 : 0;
  });
  
  return {
    tradesByPair,
    tradesByStrategy,
    monthlyPerformance
  };
};
