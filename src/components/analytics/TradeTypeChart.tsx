
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
    
    const buyProfit = buyTrades.reduce((sum, t) => sum + (t.amount > 0 ? 1 : 0), 0);
    const buyLoss = buyTrades.length - buyProfit;
    const buyProfitSum = buyTrades.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0);
    const buyLossSum = buyTrades.reduce((sum, t) => sum + (t.amount < 0 ? t.amount : 0), 0);
    
    const sellProfit = sellTrades.reduce((sum, t) => sum + (t.amount > 0 ? 1 : 0), 0);
    const sellLoss = sellTrades.length - sellProfit;
    const sellProfitSum = sellTrades.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0);
    const sellLossSum = sellTrades.reduce((sum, t) => sum + (t.amount < 0 ? t.amount : 0), 0);
    
    return [
      { 
        name: 'Buy', 
        profit: buyProfit, 
        loss: buyLoss,
        profitAmount: buyProfitSum,
        lossAmount: Math.abs(buyLossSum),
        winRate: buyTrades.length > 0 ? (buyProfit / buyTrades.length * 100).toFixed(1) : '0'
      },
      { 
        name: 'Sell', 
        profit: sellProfit, 
        loss: sellLoss,
        profitAmount: sellProfitSum,
        lossAmount: Math.abs(sellLossSum),
        winRate: sellTrades.length > 0 ? (sellProfit / sellTrades.length * 100).toFixed(1) : '0'
      }
    ];
  };

  const tradeTypeData = prepareTradeTypeData();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium text-sm mb-2">{label} Trades</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <p className="text-emerald-600 font-medium">Profitable: {data.profit}</p>
            <p className="text-red-600 font-medium">Losing: {data.loss}</p>
            <p className="text-emerald-600">Gains: {formatCurrency(data.profitAmount)}</p>
            <p className="text-red-600">Losses: {formatCurrency(data.lossAmount)}</p>
            <p className="text-blue-600 col-span-2">Win Rate: {data.winRate}%</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard 
      title="Trade Performance by Type" 
      description="Comparison of buy vs sell performance"
      icon={BarChart3}
      className="lg:col-span-2"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={tradeTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Bar dataKey="profit" stackId="a" fill="#10b981" name="Profitable Trades" radius={[4, 4, 0, 0]} />
              <Bar dataKey="loss" stackId="a" fill="#f43f5e" name="Losing Trades" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col justify-center">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Performance Summary</h3>
          
          <div className="space-y-5">
            {tradeTypeData.map((type) => (
              <div key={type.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{type.name} Trades</span>
                  <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                    Win Rate: {type.winRate}%
                  </span>
                </div>
                
                <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ 
                      width: `${type.profit / (type.profit + type.loss) * 100}%`,
                      transition: 'width 1s ease-in-out'
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Wins: {type.profit}</span>
                  <span className="text-red-600">Losses: {type.loss}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChartCard>
  );
};

export default TradeTypeChart;
