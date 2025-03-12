
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
}

export const calculateBasicStats = (trades: Trade[]): BasicTradeStats => {
  const totalTrades = trades.length;
  const winningTrades = trades.filter(trade => (trade.amount || 0) > 0).length;
  const losingTrades = trades.filter(trade => (trade.amount || 0) <= 0).length;
  
  const winningTradesArr = trades.filter(trade => (trade.amount || 0) > 0);
  const losingTradesArr = trades.filter(trade => (trade.amount || 0) <= 0);
  
  const totalProfit = winningTradesArr.reduce((sum, trade) => sum + (trade.amount || 0), 0);
  const totalLoss = Math.abs(losingTradesArr.reduce((sum, trade) => sum + (trade.amount || 0), 0));
  const netProfit = trades.reduce((sum, trade) => sum + (trade.amount || 0), 0);
  
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  
  const avgProfit = winningTradesArr.length > 0 ? totalProfit / winningTradesArr.length : 0;
  const avgLoss = losingTradesArr.length > 0 ? totalLoss / losingTradesArr.length : 0;
  
  return {
    totalTrades,
    winningTrades,
    losingTrades,
    winRate,
    totalProfit,
    totalLoss,
    netProfit,
    avgProfit,
    avgLoss
  };
};
