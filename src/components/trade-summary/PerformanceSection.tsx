
import React from 'react';
import StatCard from './StatCard';
import { TrendingUp, TrendingDown, BarChart2, ArrowUp, ArrowDown } from 'lucide-react';
import { TradeStatistics } from '../stats/TradeStats';

interface PerformanceSectionProps {
  stats: TradeStatistics;
  formatCurrency: (value: number) => string;
}

const PerformanceSection: React.FC<PerformanceSectionProps> = ({ stats, formatCurrency }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Net Profit/Loss" 
        value={`${stats.netProfit > 0 ? '+' : ''}${formatCurrency(stats.netProfit)}`}
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
        value={formatCurrency(stats.avgProfit)}
        icon={ArrowUp}
        description={`Total: ${formatCurrency(stats.totalProfit)}`}
        trend="positive"
      />
      
      <StatCard 
        title="Avg. Loss" 
        value={formatCurrency(stats.avgLoss)}
        icon={ArrowDown}
        description={`Risk/Reward: ${typeof stats.riskRewardRatio === 'number' ? stats.riskRewardRatio.toFixed(2) : stats.riskRewardRatio}`}
        trend="negative"
      />
    </div>
  );
};

export default PerformanceSection;
