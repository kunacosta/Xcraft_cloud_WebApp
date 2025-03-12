
import { Trade } from '@/types/trade';

export interface RiskMetrics {
  maxDrawdown: number;
  maxDrawdownPercentage: number;
  sharpeRatio: number;
  expectancy: number;
}

export const calculateRiskMetrics = (
  trades: Trade[],
  basicStats: { avgProfit: number; avgLoss: number; winRate: number; }
): RiskMetrics => {
  const { maxDrawdown, maxDrawdownPercentage } = calculateDrawdown(trades);
  const returns = calculatePeriodicReturns(trades);
  const sharpeRatio = calculateSharpeRatio(returns);
  
  const expectancy = (basicStats.winRate / 100) * basicStats.avgProfit - 
                    ((100 - basicStats.winRate) / 100) * basicStats.avgLoss;

  return {
    maxDrawdown,
    maxDrawdownPercentage,
    sharpeRatio,
    expectancy
  };
};

const calculateDrawdown = (trades: Trade[]): { maxDrawdown: number; maxDrawdownPercentage: number; } => {
  if (trades.length === 0) return { maxDrawdown: 0, maxDrawdownPercentage: 0 };
  
  let balance = 0;
  let peak = 0;
  let maxDrawdown = 0;
  let maxDrawdownPercentage = 0;
  
  trades.forEach(trade => {
    balance += (trade.amount || 0);
    
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
};

const calculatePeriodicReturns = (trades: Trade[]): number[] => {
  const dailyTrades: Record<string, Trade[]> = {};
  
  trades.forEach(trade => {
    const dateStr = new Date(trade.date).toISOString().split('T')[0];
    if (!dailyTrades[dateStr]) {
      dailyTrades[dateStr] = [];
    }
    dailyTrades[dateStr].push(trade);
  });
  
  return Object.values(dailyTrades).map(dayTrades => 
    dayTrades.reduce((sum, trade) => sum + (trade.amount || 0), 0)
  );
};

const calculateSharpeRatio = (returns: number[]): number => {
  if (returns.length < 2) return 0;
  
  const meanReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / (returns.length - 1);
  const stdDev = Math.sqrt(variance);
  
  return stdDev === 0 ? 0 : meanReturn / stdDev;
};
