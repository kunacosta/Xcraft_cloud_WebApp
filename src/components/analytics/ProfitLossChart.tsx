
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import ChartCard from './ChartCard';
import { Trade } from '@/types/trade';

interface ProfitLossChartProps {
  trades: Trade[];
}

const ProfitLossChart: React.FC<ProfitLossChartProps> = ({ trades }) => {
  // Prepare data for chart
  const prepareProfitLossData = () => {
    // Group trades by date (simple version - by day)
    const groupedByDay = trades.reduce((acc, trade) => {
      const date = new Date(trade.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, profit: 0, loss: 0, netPL: 0 };
      }
      
      const pl = trade.profitLoss;
      if (pl > 0) {
        acc[date].profit += pl;
      } else {
        acc[date].loss += pl;
      }
      acc[date].netPL += pl;
      
      return acc;
    }, {} as Record<string, { date: string; profit: number; loss: number; netPL: number }>);
    
    return Object.values(groupedByDay).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const profitLossData = prepareProfitLossData();

  return (
    <ChartCard 
      title="Profit/Loss Over Time" 
      description="Cumulative performance by day"
      icon={TrendingUp}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={profitLossData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              borderColor: '#e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.05)',
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="netPL" 
            stroke="#3b82f6" 
            fill="url(#colorProfit)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default ProfitLossChart;
