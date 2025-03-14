
import { Trade } from '@/types/trade';

export interface BasicTradeStats {
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
}

export const calculateBasicStats = (trades: Trade[]): BasicTradeStats => {
  // Basic statistics
  const totalTrades = trades.length;
  const winningTrades = trades.filter(trade => trade.amount > 0).length;
  const losingTrades = trades.filter(trade => trade.amount <= 0).length;
  
  const winningTradesArr = trades.filter(trade => trade.amount > 0);
  const losingTradesArr = trades.filter(trade => trade.amount <= 0);
  
  const totalProfit = winningTradesArr.reduce((sum, trade) => sum + trade.amount, 0);
  const totalLoss = Math.abs(losingTradesArr.reduce((sum, trade) => sum + trade.amount, 0));
  const netProfit = totalProfit - totalLoss;
  
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  
  // Averages
  const avgProfit = winningTradesArr.length > 0 ? totalProfit / winningTradesArr.length : 0;
  const avgLoss = losingTradesArr.length > 0 ? totalLoss / losingTradesArr.length : 0;
  
  // Profit factor and risk-reward ratio
  const profitFactor = totalLoss > 0 ? totalProfit / totalLoss : totalProfit > 0 ? Infinity : 0;
  const riskRewardRatio = avgLoss > 0 ? (avgProfit / avgLoss) : 'N/A';
  
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
    riskRewardRatio
  };
};
