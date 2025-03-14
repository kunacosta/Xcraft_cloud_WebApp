
import { Trade } from '@/types/trade';

export interface AdvancedTradeStats {
  averageTradeReturn: number;
  medianTradeReturn: number;
  tradeFrequency: string;
  maxDrawdown: number;
  maxDrawdownPercentage: number;
  sharpeRatio: number;
  expectancy: number;
}

export const calculateAdvancedStats = (trades: Trade[], winRate: number, avgProfit: number, avgLoss: number): AdvancedTradeStats => {
  const totalTrades = trades.length;
  const netProfit = trades.reduce((sum, trade) => sum + trade.amount, 0);
  
  // Average and median trade return
  const allReturns = trades.map(trade => trade.amount);
  const averageTradeReturn = totalTrades > 0 ? netProfit / totalTrades : 0;
  
  // Calculate median
  const medianTradeReturn = calculateMedian(allReturns);
  
  // Trade frequency
  let tradeFrequency = 'N/A';
  if (totalTrades >= 2) {
    const oldestTradeDate = new Date(Math.min(...trades.map(t => new Date(t.date).getTime())));
    const newestTradeDate = new Date(Math.max(...trades.map(t => new Date(t.date).getTime())));
    const tradingDays = Math.max(1, Math.round((newestTradeDate.getTime() - oldestTradeDate.getTime()) / (1000 * 60 * 60 * 24)));
    const tradesPerDay = totalTrades / tradingDays;
    tradeFrequency = `${tradesPerDay.toFixed(1)} trades/day`;
  }
  
  // Calculate drawdown
  const sortedTrades = [...trades].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  ); // Oldest to newest
  const { maxDrawdown, maxDrawdownPercentage } = calculateDrawdown(sortedTrades);
  
  // Calculate Sharpe Ratio (simplified version using 0 as risk-free rate)
  const returns = calculatePeriodicReturns(sortedTrades);
  const sharpeRatio = calculateSharpeRatio(returns);
  
  // Calculate expectancy
  const expectancy = (winRate / 100) * avgProfit - ((100 - winRate) / 100) * avgLoss;
  
  return {
    averageTradeReturn,
    medianTradeReturn,
    tradeFrequency,
    maxDrawdown,
    maxDrawdownPercentage,
    sharpeRatio,
    expectancy
  };
};

// Helper functions
function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
}

function calculateDrawdown(trades: Trade[]): { maxDrawdown: number, maxDrawdownPercentage: number } {
  if (trades.length === 0) return { maxDrawdown: 0, maxDrawdownPercentage: 0 };
  
  let balance = 0;
  let peak = 0;
  let maxDrawdown = 0;
  let maxDrawdownPercentage = 0;
  
  trades.forEach(trade => {
    balance += trade.amount;
    
    if (balance > peak) {
      peak = balance;
    }
    
    const drawdown = peak - balance;
    const drawdownPercentage = peak > 0 ? (drawdown / peak) * 100 : 0;
    
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
      maxDrawdownPercentage = drawdownPercentage;
    }
  });
  
  return { maxDrawdown, maxDrawdownPercentage };
}

function calculatePeriodicReturns(trades: Trade[]): number[] {
  // Group trades by day
  const dailyTrades: Record<string, Trade[]> = {};
  
  trades.forEach(trade => {
    const dateStr = new Date(trade.date).toISOString().split('T')[0];
    if (!dailyTrades[dateStr]) {
      dailyTrades[dateStr] = [];
    }
    dailyTrades[dateStr].push(trade);
  });
  
  // Calculate daily returns
  return Object.keys(dailyTrades).map(date => {
    const dayTrades = dailyTrades[date];
    return dayTrades.reduce((sum, trade) => sum + trade.amount, 0);
  });
}

function calculateSharpeRatio(returns: number[]): number {
  if (returns.length < 2) return 0;
  
  const meanReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / (returns.length - 1);
  const stdDev = Math.sqrt(variance);
  
  return stdDev === 0 ? 0 : meanReturn / stdDev;
}
