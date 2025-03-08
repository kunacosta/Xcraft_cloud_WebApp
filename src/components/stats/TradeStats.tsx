
import React from 'react';
import { Trade } from '@/types/trade';

export interface TradeStatistics {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalProfit: number;
  totalLoss: number;
  netProfit: number;
  avgProfit: number;
  avgLoss: number;
  profitFactor: number;
  riskRewardRatio: number | string;
  consecutiveWins: number;
  consecutiveLosses: number;
  largestWin: number;
  largestLoss: number;
  averageTradeReturn: number;
  medianTradeReturn: number;
  tradeFrequency: string;
  maxDrawdown: number;
  maxDrawdownPercentage: number;
  sharpeRatio: number;
  expectancy: number;
  tradesByPair: Record<string, { count: number, profit: number, winRate: number }>;
  tradesByStrategy: Record<string, { count: number, profit: number, winRate: number }>;
  monthlyPerformance: Record<string, { count: number, profit: number, winRate: number }>;
}

export const calculateTradeStatistics = (trades: Trade[]): TradeStatistics => {
  // Basic statistics
  const totalTrades = trades.length;
  const winningTrades = trades.filter(trade => trade.profitLoss > 0).length;
  const losingTrades = trades.filter(trade => trade.profitLoss <= 0).length;
  
  const winningTradesArr = trades.filter(trade => trade.profitLoss > 0);
  const losingTradesArr = trades.filter(trade => trade.profitLoss <= 0);
  
  const totalProfit = winningTradesArr.reduce((sum, trade) => sum + trade.profitLoss, 0);
  const totalLoss = Math.abs(losingTradesArr.reduce((sum, trade) => sum + trade.profitLoss, 0));
  const netProfit = totalProfit - totalLoss;
  
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  
  // Averages
  const avgProfit = winningTradesArr.length > 0 ? totalProfit / winningTradesArr.length : 0;
  const avgLoss = losingTradesArr.length > 0 ? totalLoss / losingTradesArr.length : 0;
  
  // Profit factor and risk-reward ratio
  const profitFactor = totalLoss > 0 ? totalProfit / totalLoss : totalProfit > 0 ? Infinity : 0;
  const riskRewardRatio = avgLoss > 0 ? (avgProfit / avgLoss) : 'N/A';
  
  // Find consecutive wins/losses
  let currentConsecutiveWins = 0;
  let maxConsecutiveWins = 0;
  let currentConsecutiveLosses = 0;
  let maxConsecutiveLosses = 0;
  
  // Sort trades by date (newest first)
  const sortedTrades = [...trades].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  sortedTrades.forEach(trade => {
    if (trade.profitLoss > 0) {
      // Winning trade
      currentConsecutiveWins++;
      currentConsecutiveLosses = 0;
      if (currentConsecutiveWins > maxConsecutiveWins) {
        maxConsecutiveWins = currentConsecutiveWins;
      }
    } else {
      // Losing trade
      currentConsecutiveLosses++;
      currentConsecutiveWins = 0;
      if (currentConsecutiveLosses > maxConsecutiveLosses) {
        maxConsecutiveLosses = currentConsecutiveLosses;
      }
    }
  });
  
  // Find largest win and loss
  const largestWin = winningTradesArr.length > 0 
    ? Math.max(...winningTradesArr.map(t => t.profitLoss))
    : 0;
    
  const largestLoss = losingTradesArr.length > 0 
    ? Math.abs(Math.min(...losingTradesArr.map(t => t.profitLoss)))
    : 0;
  
  // Average and median trade return
  const allReturns = trades.map(trade => trade.profitLoss);
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
  const { maxDrawdown, maxDrawdownPercentage } = calculateDrawdown(sortedTrades.reverse()); // Oldest to newest
  
  // Calculate Sharpe Ratio (simplified version using 0 as risk-free rate)
  const returns = calculatePeriodicReturns(sortedTrades);
  const sharpeRatio = calculateSharpeRatio(returns);
  
  // Calculate expectancy
  const expectancy = (winRate / 100) * avgProfit - ((100 - winRate) / 100) * avgLoss;
  
  // Breakdown by currency pair with win rate
  const tradesByPair: Record<string, { count: number, profit: number, winRate: number }> = {};
  
  trades.forEach(trade => {
    if (!tradesByPair[trade.currencyPair]) {
      tradesByPair[trade.currencyPair] = { count: 0, profit: 0, winRate: 0 };
    }
    tradesByPair[trade.currencyPair].count++;
    tradesByPair[trade.currencyPair].profit += trade.profitLoss;
  });
  
  // Calculate win rate for each pair
  Object.keys(tradesByPair).forEach(pair => {
    const pairTrades = trades.filter(t => t.currencyPair === pair);
    const wins = pairTrades.filter(t => t.profitLoss > 0).length;
    tradesByPair[pair].winRate = pairTrades.length > 0 ? (wins / pairTrades.length) * 100 : 0;
  });

  // Breakdown by strategy with win rate
  const tradesByStrategy: Record<string, { count: number, profit: number, winRate: number }> = {};
  
  trades.forEach(trade => {
    const strategy = trade.strategy || 'Unknown';
    if (!tradesByStrategy[strategy]) {
      tradesByStrategy[strategy] = { count: 0, profit: 0, winRate: 0 };
    }
    tradesByStrategy[strategy].count++;
    tradesByStrategy[strategy].profit += trade.profitLoss;
  });
  
  // Calculate win rate for each strategy
  Object.keys(tradesByStrategy).forEach(strategy => {
    const strategyTrades = trades.filter(t => (t.strategy || 'Unknown') === strategy);
    const wins = strategyTrades.filter(t => t.profitLoss > 0).length;
    tradesByStrategy[strategy].winRate = strategyTrades.length > 0 ? (wins / strategyTrades.length) * 100 : 0;
  });
  
  // Monthly performance breakdown
  const monthlyPerformance: Record<string, { count: number, profit: number, winRate: number }> = {};
  
  trades.forEach(trade => {
    const date = new Date(trade.date);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyPerformance[yearMonth]) {
      monthlyPerformance[yearMonth] = { count: 0, profit: 0, winRate: 0 };
    }
    
    monthlyPerformance[yearMonth].count++;
    monthlyPerformance[yearMonth].profit += trade.profitLoss;
  });
  
  // Calculate win rate for each month
  Object.keys(monthlyPerformance).forEach(month => {
    const monthTrades = trades.filter(t => {
      const date = new Date(t.date);
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return yearMonth === month;
    });
    
    const wins = monthTrades.filter(t => t.profitLoss > 0).length;
    monthlyPerformance[month].winRate = monthTrades.length > 0 ? (wins / monthTrades.length) * 100 : 0;
  });
  
  return {
    totalTrades,
    winningTrades,
    losingTrades,
    winRate,
    totalProfit,
    totalLoss,
    netProfit,
    avgProfit,
    avgLoss,
    profitFactor,
    riskRewardRatio,
    consecutiveWins: maxConsecutiveWins,
    consecutiveLosses: maxConsecutiveLosses,
    largestWin,
    largestLoss,
    averageTradeReturn,
    medianTradeReturn,
    tradeFrequency,
    maxDrawdown,
    maxDrawdownPercentage,
    sharpeRatio,
    expectancy,
    tradesByPair,
    tradesByStrategy,
    monthlyPerformance
  };
};

// Helper functions for advanced statistics

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
    balance += trade.profitLoss;
    
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
    return dayTrades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  });
}

function calculateSharpeRatio(returns: number[]): number {
  if (returns.length < 2) return 0;
  
  const meanReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / (returns.length - 1);
  const stdDev = Math.sqrt(variance);
  
  return stdDev === 0 ? 0 : meanReturn / stdDev;
}
