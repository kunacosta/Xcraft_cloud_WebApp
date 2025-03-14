
import { Trade } from '@/types/trade';

export interface Insight {
  icon: React.ElementType;
  text: string;
  color: string;
  bg: string;
}

export const generateInsights = (trades: Trade[]): Insight[] => {
  if (trades.length === 0) return [];
  
  const insights: Insight[] = [];
  
  // Calculate total P/L
  const totalPL = trades.reduce((sum, trade) => sum + trade.amount, 0);
  const isPositive = totalPL > 0;
  
  // Calculate win rate
  const winningTrades = trades.filter(t => t.amount > 0);
  const winRate = (winningTrades.length / trades.length) * 100;
  
  // Most profitable currency pair
  const pairProfits = trades.reduce((acc, trade) => {
    const pair = trade.currencyPair;
    if (!acc[pair]) acc[pair] = 0;
    acc[pair] += trade.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const mostProfitablePair = Object.entries(pairProfits)
    .sort((a, b) => b[1] - a[1])
    .shift();
    
  // Best trade type (buy or sell)
  const buyTrades = trades.filter(t => t.tradeType === 'buy');
  const sellTrades = trades.filter(t => t.tradeType === 'sell');
  
  const buyPL = buyTrades.reduce((sum, t) => sum + t.amount, 0);
  const sellPL = sellTrades.reduce((sum, t) => sum + t.amount, 0);
  
  const bestTradeType = buyPL > sellPL ? 'buy' : 'sell';
  const bestTradeTypePL = bestTradeType === 'buy' ? buyPL : sellPL;
  
  // Add insights based on data
  if (isPositive) {
    insights.push({
      icon: "TrendingUp" as any, // We'll convert this string to the actual component in the UI
      text: `Overall positive performance with ${winRate.toFixed(1)}% win rate.`,
      color: 'text-green-600',
      bg: 'bg-green-100'
    });
  } else {
    insights.push({
      icon: "TrendingDown" as any,
      text: `Overall negative performance with ${winRate.toFixed(1)}% win rate.`,
      color: 'text-red-600',
      bg: 'bg-red-100'
    });
  }
  
  if (mostProfitablePair && mostProfitablePair[1] > 0) {
    insights.push({
      icon: "CircleDollarSign" as any,
      text: `${mostProfitablePair[0]} is your most profitable currency pair.`,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    });
  }
  
  if (bestTradeTypePL > 0) {
    insights.push({
      icon: "BarChart2" as any,
      text: `${bestTradeType.charAt(0).toUpperCase() + bestTradeType.slice(1)} trades are performing better than ${bestTradeType === 'buy' ? 'sell' : 'buy'} trades.`,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    });
  }
  
  return insights;
};
