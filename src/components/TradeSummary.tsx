
import React from 'react';
import { Trade } from '@/types/trade';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowDown, 
  ArrowUp, 
  BarChart2, 
  TrendingDown, 
  TrendingUp, 
  Award,
  Target,
  AlertTriangle,
  Activity,
  PieChart
} from 'lucide-react';
import { calculateTradeStatistics } from './stats/TradeStats';
import { tradingStrategies } from '@/types/trade';

interface TradeSummaryProps {
  trades: Trade[];
}

const TradeSummary: React.FC<TradeSummaryProps> = ({ trades }) => {
  // Calculate summary statistics using our utility
  const stats = calculateTradeStatistics(trades);
  
  // Get strategy name from value
  const getStrategyName = (value: string): string => {
    const strategy = tradingStrategies.find(s => s.value === value);
    return strategy ? strategy.label : value;
  };

  // Find best performing pair
  let bestPair = { pair: '', profit: -Infinity };
  Object.entries(stats.tradesByPair).forEach(([pair, data]) => {
    if (data.profit > bestPair.profit) {
      bestPair = { pair, profit: data.profit };
    }
  });
  
  // Find best performing strategy
  let bestStrategy = { strategy: '', profit: -Infinity };
  Object.entries(stats.tradesByStrategy).forEach(([strategy, data]) => {
    if (data.profit > bestStrategy.profit && strategy !== 'Unknown') {
      bestStrategy = { strategy, profit: data.profit };
    }
  });
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Net Profit/Loss" 
          value={`${stats.netProfit > 0 ? '+' : ''}${stats.netProfit.toFixed(2)} pips`}
          icon={stats.netProfit > 0 ? TrendingUp : TrendingDown}
          description={`From ${stats.totalTrades} total trades`}
          trend={stats.netProfit > 0 ? 'positive' : 'negative'}
        />
        
        <StatCard 
          title="Win Rate" 
          value={`${stats.winRate.toFixed(1)}%`}
          icon={BarChart2}
          description={`${stats.winningTrades} wins, ${stats.losingTrades} losses`}
          trend={stats.winRate > 50 ? 'positive' : 'negative'}
        />
        
        <StatCard 
          title="Avg. Win" 
          value={`${stats.avgProfit.toFixed(2)} pips`}
          icon={ArrowUp}
          description={`Total: ${stats.totalProfit.toFixed(2)} pips`}
          trend="positive"
        />
        
        <StatCard 
          title="Avg. Loss" 
          value={`${stats.avgLoss.toFixed(2)} pips`}
          icon={ArrowDown}
          description={`Risk/Reward: ${typeof stats.riskRewardRatio === 'number' ? stats.riskRewardRatio.toFixed(2) : stats.riskRewardRatio}`}
          trend="negative"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Profit Factor" 
          value={stats.profitFactor === Infinity ? '∞' : stats.profitFactor.toFixed(2)}
          icon={Activity}
          description={`Higher is better (>1 is profitable)`}
          trend={stats.profitFactor > 1.5 ? 'positive' : stats.profitFactor > 1 ? 'neutral' : 'negative'}
        />
        
        <StatCard 
          title="Best Streak" 
          value={`${stats.consecutiveWins} wins`}
          icon={Award}
          description={`Worst: ${stats.consecutiveLosses} consecutive losses`}
          trend="positive"
        />
        
        <StatCard 
          title="Largest Win" 
          value={`${stats.largestWin.toFixed(2)} pips`}
          icon={Target}
          description={`vs ${stats.largestLoss.toFixed(2)} pips largest loss`}
          trend="positive"
        />
        
        <StatCard 
          title="Best Performer" 
          value={bestPair.pair || 'N/A'}
          icon={PieChart}
          description={bestPair.pair ? `${bestPair.profit.toFixed(2)} pips total profit` : 'No profitable pairs yet'}
          trend="neutral"
        />
      </div>
      
      {Object.keys(stats.tradesByStrategy).length > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="bg-black/30 backdrop-blur-sm border border-xcraft-accent/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Performance by Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(stats.tradesByStrategy)
                  .sort((a, b) => b[1].profit - a[1].profit)
                  .map(([strategy, data]) => (
                    <div key={strategy} className="flex justify-between items-center">
                      <span className="text-sm">{strategy === 'Unknown' ? 'No Strategy' : getStrategyName(strategy)}</span>
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${data.profit > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {data.profit > 0 ? '+' : ''}{data.profit.toFixed(2)} pips
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({data.count} trades)
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/30 backdrop-blur-sm border border-xcraft-accent/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Performance by Pair</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(stats.tradesByPair)
                  .sort((a, b) => b[1].profit - a[1].profit)
                  .slice(0, 6) // Show top 6 pairs
                  .map(([pair, data]) => (
                    <div key={pair} className="flex justify-between items-center">
                      <span className="text-sm">{pair}</span>
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${data.profit > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {data.profit > 0 ? '+' : ''}{data.profit.toFixed(2)} pips
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({data.count} trades)
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
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
