
import { Trade } from '@/types/trade';

export interface BreakdownStats {
  tradesByPair: Record<string, { count: number; profit: number; winRate: number; }>;
  tradesByStrategy: Record<string, { count: number; profit: number; winRate: number; }>;
  monthlyPerformance: Record<string, { count: number; profit: number; winRate: number; }>;
}

export const calculateBreakdowns = (trades: Trade[]): BreakdownStats => {
  const tradesByPair = calculatePairBreakdown(trades);
  const tradesByStrategy = calculateStrategyBreakdown(trades);
  const monthlyPerformance = calculateMonthlyBreakdown(trades);

  return {
    tradesByPair,
    tradesByStrategy,
    monthlyPerformance
  };
};

const calculatePairBreakdown = (trades: Trade[]) => {
  const breakdown: Record<string, { count: number; profit: number; winRate: number; }> = {};
  
  trades.forEach(trade => {
    if (!breakdown[trade.currencyPair]) {
      breakdown[trade.currencyPair] = { count: 0, profit: 0, winRate: 0 };
    }
    breakdown[trade.currencyPair].count++;
    breakdown[trade.currencyPair].profit += (trade.amount || 0);
  });
  
  Object.keys(breakdown).forEach(pair => {
    const pairTrades = trades.filter(t => t.currencyPair === pair);
    const wins = pairTrades.filter(t => (t.amount || 0) > 0).length;
    breakdown[pair].winRate = pairTrades.length > 0 ? (wins / pairTrades.length) * 100 : 0;
  });
  
  return breakdown;
};

const calculateStrategyBreakdown = (trades: Trade[]) => {
  const breakdown: Record<string, { count: number; profit: number; winRate: number; }> = {};
  
  trades.forEach(trade => {
    const strategy = trade.strategy || 'Unknown';
    if (!breakdown[strategy]) {
      breakdown[strategy] = { count: 0, profit: 0, winRate: 0 };
    }
    breakdown[strategy].count++;
    breakdown[strategy].profit += (trade.amount || 0);
  });
  
  Object.keys(breakdown).forEach(strategy => {
    const strategyTrades = trades.filter(t => (t.strategy || 'Unknown') === strategy);
    const wins = strategyTrades.filter(t => (t.amount || 0) > 0).length;
    breakdown[strategy].winRate = strategyTrades.length > 0 ? (wins / strategyTrades.length) * 100 : 0;
  });
  
  return breakdown;
};

const calculateMonthlyBreakdown = (trades: Trade[]) => {
  const breakdown: Record<string, { count: number; profit: number; winRate: number; }> = {};
  
  trades.forEach(trade => {
    const date = new Date(trade.date);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!breakdown[yearMonth]) {
      breakdown[yearMonth] = { count: 0, profit: 0, winRate: 0 };
    }
    
    breakdown[yearMonth].count++;
    breakdown[yearMonth].profit += (trade.amount || 0);
  });
  
  Object.keys(breakdown).forEach(month => {
    const monthTrades = trades.filter(t => {
      const date = new Date(t.date);
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return yearMonth === month;
    });
    
    const wins = monthTrades.filter(t => (t.amount || 0) > 0).length;
    breakdown[month].winRate = monthTrades.length > 0 ? (wins / monthTrades.length) * 100 : 0;
  });
  
  return breakdown;
};
