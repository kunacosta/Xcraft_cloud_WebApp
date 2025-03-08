
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CircleDollarSign } from 'lucide-react';
import ChartCard from './ChartCard';
import { Trade } from '@/types/trade';

interface CurrencyPairChartProps {
  trades: Trade[];
}

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

const CurrencyPairChart: React.FC<CurrencyPairChartProps> = ({ trades }) => {
  // Prepare data for chart
  const prepareCurrencyPairData = () => {
    // Count trades by currency pair
    const pairs = trades.reduce((acc, trade) => {
      const pair = trade.currencyPair;
      if (!acc[pair]) {
        acc[pair] = { name: pair, value: 0, profitLoss: 0 };
      }
      acc[pair].value += 1;
      acc[pair].profitLoss += trade.profitLoss;
      
      return acc;
    }, {} as Record<string, { name: string; value: number; profitLoss: number }>);
    
    return Object.values(pairs).sort((a, b) => b.value - a.value).slice(0, 5);
  };

  const currencyPairData = prepareCurrencyPairData();

  return (
    <ChartCard 
      title="Top Currency Pairs" 
      description="Most traded currency pairs"
      icon={CircleDollarSign}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={currencyPairData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={3}
          >
            {currencyPairData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              borderColor: '#e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.05)',
            }} 
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default CurrencyPairChart;
