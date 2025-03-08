
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
  tradesByPair: Record<string, { count: number, profit: number }>;
  tradesByStrategy: Record<string, { count: number, profit: number }>;
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
  
  // Breakdown by currency pair
  const tradesByPair: Record<string, { count: number, profit: number }> = {};
  
  trades.forEach(trade => {
    if (!tradesByPair[trade.currencyPair]) {
      tradesByPair[trade.currencyPair] = { count: 0, profit: 0 };
    }
    tradesByPair[trade.currencyPair].count++;
    tradesByPair[trade.currencyPair].profit += trade.profitLoss;
  });

  // Breakdown by strategy
  const tradesByStrategy: Record<string, { count: number, profit: number }> = {};
  
  trades.forEach(trade => {
    const strategy = trade.strategy || 'Unknown';
    if (!tradesByStrategy[strategy]) {
      tradesByStrategy[strategy] = { count: 0, profit: 0 };
    }
    tradesByStrategy[strategy].count++;
    tradesByStrategy[strategy].profit += trade.profitLoss;
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
    tradesByPair,
    tradesByStrategy
  };
};
