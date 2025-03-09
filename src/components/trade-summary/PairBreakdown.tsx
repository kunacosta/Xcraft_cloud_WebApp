
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TradeStatistics } from '../stats/TradeStats';

interface PairBreakdownProps {
  stats: TradeStatistics;
  formatCurrency: (value: number) => string;
}

const PairBreakdown: React.FC<PairBreakdownProps> = ({ stats, formatCurrency }) => {
  return (
    <Card className="bg-white shadow-card border border-xcraft-accent/10">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-white">
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

export default PairBreakdown;
