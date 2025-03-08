
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';
import ChartCard from './ChartCard';
import { Trade } from '@/types/trade';

interface TradeTypeChartProps {
  trades: Trade[];
}

const TradeTypeChart: React.FC<TradeTypeChartProps> = ({ trades }) => {
  // Prepare data for chart
  const prepareTradeTypeData = () => {
    const buyTrades = trades.filter(t => t.tradeType === 'buy');
    const sellTrades = trades.filter(t => t.tradeType === 'sell');
    
    const buyProfit = buyTrades.reduce((sum, t) => sum + (t.profitLoss > 0 ? 1 : 0), 0);
    const buyLoss = buyTrades.length - buyProfit;
    
    const sellProfit = sellTrades.reduce((sum, t) => sum + (t.profitLoss > 0 ? 1 : 0), 0);
    const sellLoss = sellTrades.length - sellProfit;
    
    return [
      { name: 'Buy', profit: buyProfit, loss: buyLoss },
      { name: 'Sell', profit: sellProfit, loss: sellLoss }
    ];
  };

  const tradeTypeData = prepareTradeTypeData();

  return (
    <ChartCard 
      title="Trade Performance by Type" 
      description="Comparison of buy vs sell performance"
      icon={BarChart3}
      className="lg:col-span-2"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={tradeTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              borderColor: '#e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.05)',
            }} 
          />
          <Legend />
          <Bar dataKey="profit" stackId="a" fill="#10b981" name="Profitable Trades" radius={[4, 4, 0, 0]} />
          <Bar dataKey="loss" stackId="a" fill="#f43f5e" name="Losing Trades" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default TradeTypeChart;
