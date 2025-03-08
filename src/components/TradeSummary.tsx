
import React from 'react';
import { Trade } from '@/types/trade';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, BarChart2, TrendingDown, TrendingUp } from 'lucide-react';

interface TradeSummaryProps {
  trades: Trade[];
}

const TradeSummary: React.FC<TradeSummaryProps> = ({ trades }) => {
  // Calculate summary statistics
  const totalTrades = trades.length;
  
  const winningTrades = trades.filter(trade => trade.profitLoss > 0);
  const losingTrades = trades.filter(trade => trade.profitLoss <= 0);
  
  const totalProfit = winningTrades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  const totalLoss = losingTrades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  const netProfit = totalProfit + totalLoss;
  
  const winRate = totalTrades > 0 ? (winningTrades.length / totalTrades) * 100 : 0;
  
  // Calculate averages
  const avgProfit = winningTrades.length > 0 ? totalProfit / winningTrades.length : 0;
  const avgLoss = losingTrades.length > 0 ? Math.abs(totalLoss / losingTrades.length) : 0;
  
  // Calculate risk-reward ratio
  const riskRewardRatio = avgLoss > 0 ? (avgProfit / avgLoss).toFixed(2) : 'N/A';
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Net Profit/Loss" 
        value={`${netProfit > 0 ? '+' : ''}${netProfit.toFixed(2)} pips`}
        icon={netProfit > 0 ? TrendingUp : TrendingDown}
        description={`From ${totalTrades} total trades`}
        trend={netProfit > 0 ? 'positive' : 'negative'}
      />
      
      <StatCard 
        title="Win Rate" 
        value={`${winRate.toFixed(1)}%`}
        icon={BarChart2}
        description={`${winningTrades.length} wins, ${losingTrades.length} losses`}
        trend={winRate > 50 ? 'positive' : 'negative'}
      />
      
      <StatCard 
        title="Avg. Win" 
        value={`${avgProfit.toFixed(2)} pips`}
        icon={ArrowUp}
        description={`Total: ${totalProfit.toFixed(2)} pips`}
        trend="positive"
      />
      
      <StatCard 
        title="Avg. Loss" 
        value={`${avgLoss.toFixed(2)} pips`}
        icon={ArrowDown}
        description={`Risk/Reward: ${riskRewardRatio}`}
        trend="negative"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  trend: 'positive' | 'negative' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, value, icon: Icon, description, trend 
}) => {
  return (
    <Card className="bg-black/30 backdrop-blur-sm border border-xcraft-accent/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${
          trend === 'positive' ? 'text-green-500' : 
          trend === 'negative' ? 'text-red-500' : 
          'text-muted-foreground'
        }`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${
          trend === 'positive' ? 'text-green-500' : 
          trend === 'negative' ? 'text-red-500' : 
          'text-foreground'
        }`}>
          {value}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default TradeSummary;
