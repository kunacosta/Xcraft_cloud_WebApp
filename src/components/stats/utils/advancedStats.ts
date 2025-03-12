
import { Trade } from '@/types/trade';

export interface AdvancedTradeStats {
  profitFactor: number;
  riskRewardRatio: number | string;
  consecutiveWins: number;
  consecutiveLosses: number;
  largestWin: number;
  largestLoss: number;
  averageTradeReturn: number;
  medianTradeReturn: number;
  tradeFrequency: string;
}

export const calculateAdvancedStats = (
  trades: Trade[], 
  basicStats: { totalProfit: number; totalLoss: number; avgProfit: number; avgLoss: number; }
): AdvancedTradeStats => {
  const profitFactor = basicStats.totalLoss > 0 ? 
    basicStats.totalProfit / basicStats.totalLoss : 
    basicStats.totalProfit > 0 ? Infinity : 0;
    
  const riskRewardRatio = basicStats.avgLoss > 0 ? 
    (basicStats.avgProfit / basicStats.avgLoss) : 'N/A';

  // Calculate consecutive trades
  let currentConsecutiveWins = 0;
  let maxConsecutiveWins = 0;
  let currentConsecutiveLosses = 0;
  let maxConsecutiveLosses = 0;
  
  const sortedTrades = [...trades].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  sortedTrades.forEach(trade => {
    if ((trade.amount || 0) > 0) {
      currentConsecutiveWins++;
      currentConsecutiveLosses = 0;
      maxConsecutiveWins = Math.max(maxConsecutiveWins, currentConsecutiveWins);
    } else {
      currentConsecutiveLosses++;
      currentConsecutiveWins = 0;
      maxConsecutiveLosses = Math.max(maxConsecutiveLosses, currentConsecutiveLosses);
    }
  });

  const winningTradesArr = trades.filter(trade => (trade.amount || 0) > 0);
  const losingTradesArr = trades.filter(trade => (trade.amount || 0) <= 0);
  
  const largestWin = winningTradesArr.length > 0 
    ? Math.max(...winningTradesArr.map(t => t.amount || 0))
    : 0;
    
  const largestLoss = losingTradesArr.length > 0 
    ? Math.abs(Math.min(...losingTradesArr.map(t => t.amount || 0)))
    : 0;

  const allReturns = trades.map(trade => trade.amount || 0);
  const averageTradeReturn = trades.length > 0 ? basicStats.netProfit / trades.length : 0;
  const medianTradeReturn = calculateMedian(allReturns);

  let tradeFrequency = 'N/A';
  if (trades.length >= 2) {
    const oldestTradeDate = new Date(Math.min(...trades.map(t => new Date(t.date).getTime())));
    const newestTradeDate = new Date(Math.max(...trades.map(t => new Date(t.date).getTime())));
    const tradingDays = Math.max(1, Math.round((newestTradeDate.getTime() - oldestTradeDate.getTime()) / (1000 * 60 * 60 * 24)));
    const tradesPerDay = trades.length / tradingDays;
    tradeFrequency = `${tradesPerDay.toFixed(1)} trades/day`;
  }

  return {
    profitFactor,
    riskRewardRatio,
    consecutiveWins: maxConsecutiveWins,
    consecutiveLosses: maxConsecutiveLosses,
    largestWin,
    largestLoss,
    averageTradeReturn,
    medianTradeReturn,
    tradeFrequency
  };
};

const calculateMedian = (values: number[]): number => {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
};
