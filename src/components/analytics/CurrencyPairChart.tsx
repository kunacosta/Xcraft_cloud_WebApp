
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CircleDollarSign } from 'lucide-react';
import ChartCard from './ChartCard';
import { Trade } from '@/types/trade';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface CurrencyPairChartProps {
  trades: Trade[];
}

// More vibrant and visually distinct color palette
const COLORS = [
  '#8B5CF6', // Vivid Purple
  '#D946EF', // Magenta Pink
  '#F97316', // Bright Orange
  '#0EA5E9', // Ocean Blue
  '#10B981', // Emerald Green
  '#EC4899', // Pink
];

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
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Trades: {data.count}</p>
          <p className={`text-sm font-medium ${data.profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            P/L: {formatCurrency(data.profitLoss)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Create config for chart component
  const chartConfig = currencyPairData.reduce((config, _, index) => {
    config[`data-${index}`] = { color: COLORS[index % COLORS.length] };
    return config;
  }, {} as Record<string, { color: string }>);

  return (
    <ChartCard 
      title="Top Currency Pairs" 
      description="Distribution of trading activity"
      icon={CircleDollarSign}
    >
      <div className="h-[280px] flex items-center justify-center">
        {currencyPairData.length > 0 ? (
          <ChartContainer config={chartConfig} className="w-full h-full">
            <PieChart>
              <Pie
                data={currencyPairData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={85}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={4}
                animationDuration={800}
                label={({ name, percent }) => {
                  // Only show name for segments with enough room (more than 10%)
                  return percent > 0.1 ? `${name} (${(percent * 100).toFixed(0)}%)` : '';
                }}
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
              <ChartTooltip content={<CustomTooltip />} />
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
          </ChartContainer>
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
