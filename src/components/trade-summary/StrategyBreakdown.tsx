
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TradeStatistics } from '../stats/TradeStats';
import { tradingStrategies } from '@/types/trade';

interface StrategyBreakdownProps {
  stats: TradeStatistics;
  formatCurrency: (value: number) => string;
}

const StrategyBreakdown: React.FC<StrategyBreakdownProps> = ({ stats, formatCurrency }) => {
  // Get strategy name from value
  const getStrategyName = (value: string): string => {
    const strategy = tradingStrategies.find(s => s.value === value);
    return strategy ? strategy.label : value;
  };

  return (
    <Card className="bg-white shadow-card border border-xcraft-accent/10">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-white">
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
                    {data.profit > 0 ? '+' : ''}{formatCurrency(data.profit)}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({data.count} trades)
                  </span>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StrategyBreakdown;
