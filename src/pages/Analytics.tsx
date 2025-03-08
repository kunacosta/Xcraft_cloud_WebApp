
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
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
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
      <h1 className="text-3xl font-bold font-montserrat">Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/30 backdrop-blur-sm border border-xcraft-accent/10">
          <CardHeader>
            <CardTitle>Profit/Loss Over Time</CardTitle>
            <CardDescription>Cumulative performance by day</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profitLossData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                <Area type="monotone" dataKey="netPL" stroke="#0077B6" fill="#0077B6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 backdrop-blur-sm border border-xcraft-accent/10">
          <CardHeader>
            <CardTitle>Top Currency Pairs</CardTitle>
            <CardDescription>Most traded currency pairs</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currencyPairData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {currencyPairData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 backdrop-blur-sm border border-xcraft-accent/10 lg:col-span-2">
          <CardHeader>
            <CardTitle>Trade Performance by Type</CardTitle>
            <CardDescription>Comparison of buy vs sell performance</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tradeTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                <Legend />
                <Bar dataKey="profit" stackId="a" fill="#00C49F" name="Profitable Trades" />
                <Bar dataKey="loss" stackId="a" fill="#FF8042" name="Losing Trades" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
