
import React from 'react';
import StatCard from './StatCard';
import { Activity, Award, Target, PieChart } from 'lucide-react';
import { TradeStatistics } from '../stats/TradeStats';

interface AdvancedMetricsSectionProps {
  stats: TradeStatistics;
  bestPair: { pair: string; profit: number };
  formatCurrency: (value: number) => string;
}

const AdvancedMetricsSection: React.FC<AdvancedMetricsSectionProps> = ({ 
  stats, bestPair, formatCurrency 
}) => {
  return (
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
        value={formatCurrency(stats.largestWin)}
        icon={Target}
        description={`vs ${formatCurrency(stats.largestLoss)} largest loss`}
        trend="positive"
      />
      
      <StatCard 
        title="Best Performer" 
        value={bestPair.pair || 'N/A'}
        icon={PieChart}
        description={bestPair.pair ? `${formatCurrency(bestPair.profit)} total profit` : 'No profitable pairs yet'}
        trend="neutral"
      />
    </div>
  );
};

export default AdvancedMetricsSection;
