
import React from 'react';
import { useTrades } from '@/context/TradeContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmptyState from '@/components/EmptyState';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, CircleDollarSign, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

const Analytics = () => {
  const { trades, loading } = useTrades();
  
  // Prepare data for charts
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
  
  const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }
  
  if (trades.length === 0) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold font-montserrat mb-8">Analytics</h1>
        <div className="min-h-[400px] flex items-center justify-center">
          <EmptyState
            title="No data to analyze"
            description="Add some trades to see analytics and performance insights."
            action={{ label: "Go to Dashboard", href: "/" }}
          />
        </div>
      </div>
    );
  }
  
  const profitLossData = prepareProfitLossData();
  const currencyPairData = prepareCurrencyPairData();
  const tradeTypeData = prepareTradeTypeData();
  
  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <h1 className="text-3xl font-bold font-poppins relative inline-block mb-6">
        <span className="relative z-10">Analytics Dashboard</span>
        <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-100 rounded-sm -z-10 transform -rotate-1"></span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
                paddingAngle={2}
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
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        
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
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }} 
              />
              <Legend />
              <Bar dataKey="profit" stackId="a" fill="#10b981" name="Profitable Trades" radius={[4, 4, 0, 0]} />
              <Bar dataKey="loss" stackId="a" fill="#f43f5e" name="Losing Trades" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mt-6">
        <div className="flex items-center text-blue-600 mb-2">
          <PieChartIcon className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Data Insights</h3>
        </div>
        <p className="text-sm text-gray-600">
          Charts display your trading activity across different time periods and instruments. 
          Add more trades to see richer data visualization and trends.
        </p>
      </div>
    </div>
  );
};

interface ChartCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  children,
  className = "" 
}) => {
  return (
    <Card className={`bg-white shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium text-gray-800">{title}</CardTitle>
          <CardDescription className="text-gray-500">{description}</CardDescription>
        </div>
        <Icon className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default Analytics;
