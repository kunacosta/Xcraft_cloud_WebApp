
import React from 'react';
import { Lightbulb, TrendingUp, TrendingDown, CircleDollarSign, BarChart2 } from 'lucide-react';
import { useTrades } from '@/context/TradeContext';

const DataInsights: React.FC = () => {
  const { trades } = useTrades();
  
  // Generate insights based on trade data
  const generateInsights = () => {
    if (trades.length === 0) return [];
    
    const insights = [];
    
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
        icon: TrendingUp,
        text: `Overall positive performance with ${winRate.toFixed(1)}% win rate.`,
        color: 'text-green-600',
        bg: 'bg-green-100'
      });
    } else {
      insights.push({
        icon: TrendingDown,
        text: `Overall negative performance with ${winRate.toFixed(1)}% win rate.`,
        color: 'text-red-600',
        bg: 'bg-red-100'
      });
    }
    
    if (mostProfitablePair && mostProfitablePair[1] > 0) {
      insights.push({
        icon: CircleDollarSign,
        text: `${mostProfitablePair[0]} is your most profitable currency pair.`,
        color: 'text-blue-600',
        bg: 'bg-blue-100'
      });
    }
    
    if (bestTradeTypePL > 0) {
      insights.push({
        icon: BarChart2,
        text: `${bestTradeType.charAt(0).toUpperCase() + bestTradeType.slice(1)} trades are performing better than ${bestTradeType === 'buy' ? 'sell' : 'buy'} trades.`,
        color: 'text-purple-600',
        bg: 'bg-purple-100'
      });
    }
    
    return insights;
  };

  const insights = generateInsights();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100 mt-6 shadow-lg transition-all hover:shadow-xl">
      <div className="flex items-center text-blue-700 mb-4">
        <Lightbulb className="h-6 w-6 mr-2" />
        <h3 className="font-semibold text-lg">Data Insights</h3>
      </div>
      
      {insights.length > 0 ? (
        <div className="space-y-3">
          {insights.map((insight, idx) => (
            <div key={idx} className="flex items-start">
              <div className={`p-2 rounded-full mr-3 mt-1 ${insight.bg}`}>
                <insight.icon className={`h-4 w-4 ${insight.color}`} />
              </div>
              <p className="text-gray-700">{insight.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          Charts display your trading activity across different time periods and instruments. 
          Add more trades to see richer data visualization and trends.
        </p>
      )}
      
      <div className="mt-4 text-sm text-gray-500 italic">
        Note: Insights are based on your current trading data and should not be considered as financial advice.
      </div>
    </div>
  );
};

export default DataInsights;
