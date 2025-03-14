import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CircleDollarSign } from 'lucide-react';
import ChartCard from './ChartCard';
import { Trade } from '@/types/trade';

interface CurrencyPairChartProps {
  trades: Trade[];
}

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#0ea5e9', '#38bdf8', '#7dd3fc'];

const CurrencyPairChart: React.FC<CurrencyPairChartProps> = ({ trades }) => {
  // Prepare data for chart
  const prepareCurrencyPairData = () => {
    // Count trades by currency pair
    const pairs = trades.reduce((acc, trade) => {
      const pair = trade.currencyPair;
      if (!acc[pair]) {
        acc[pair] = { name: pair, value: 0, profitLoss: 0, count: 0 };
      }
      acc[pair].value += 1;
      acc[pair].profitLoss += trade.amount;
      acc[pair].count += 1;
      
      return acc;
    }, {} as Record<string, { name: string; value: number; profitLoss: number; count: number }>);
    
    return Object.values(pairs).sort((a, b) => b.value - a.value).slice(0, 5);
  };

  const currencyPairData = prepareCurrencyPairData();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-sm text-gray-600">Trades: {data.count}</p>
          <p className={`text-sm font-medium ${data.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            P/L: {formatCurrency(data.profitLoss)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard 
      title="Top Currency Pairs" 
      description="Distribution of trading activity"
      icon={CircleDollarSign}
    >
      <div className="h-[280px] flex items-center justify-center">
        {currencyPairData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
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
                animationDuration={800}
              >
                {currencyPairData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "12px",
                  fontWeight: 500
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-500 text-center">
            Not enough currency pair data
          </div>
        )}
      </div>
    </ChartCard>
  );
};

export default CurrencyPairChart;
