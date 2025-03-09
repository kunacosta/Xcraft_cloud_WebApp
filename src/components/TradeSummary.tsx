
import React from 'react';
import { Trade } from '@/types/trade';
import { calculateTradeStatistics } from './stats/TradeStats';
import { 
  PerformanceSection, 
  AdvancedMetricsSection, 
  StrategyBreakdown, 
  PairBreakdown 
} from './trade-summary';

interface TradeSummaryProps {
  trades: Trade[];
}

const TradeSummary: React.FC<TradeSummaryProps> = ({ trades }) => {
  // Calculate summary statistics using our utility
  const stats = calculateTradeStatistics(trades);

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

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <div className="space-y-6">
      <PerformanceSection stats={stats} formatCurrency={formatCurrency} />
      
      <AdvancedMetricsSection 
        stats={stats} 
        bestPair={bestPair} 
        formatCurrency={formatCurrency} 
      />
      
      {Object.keys(stats.tradesByStrategy).length > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <StrategyBreakdown stats={stats} formatCurrency={formatCurrency} />
          <PairBreakdown stats={stats} formatCurrency={formatCurrency} />
        </div>
      )}
    </div>
  );
};

export default TradeSummary;
