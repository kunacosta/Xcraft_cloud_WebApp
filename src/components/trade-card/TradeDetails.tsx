
import React from 'react';
import { Tag } from 'lucide-react';
import { Trade, tradingStrategies } from '@/types/trade';

interface TradeDetailsProps {
  trade: Trade;
}

export const TradeDetails: React.FC<TradeDetailsProps> = ({ trade }) => {
  const getStrategyLabel = (value?: string): string => {
    if (!value) return '';
    const strategy = tradingStrategies.find(s => s.value === value);
    return strategy ? strategy.label : value;
  };
  
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="text-sm">
          <span className="text-gray-600">Entry:</span> {trade.entryPrice.toFixed(5)}
        </div>
        <div className="text-sm">
          <span className="text-gray-600">Exit:</span> {trade.exitPrice.toFixed(5)}
        </div>
        <div className="text-sm">
          <span className="text-gray-600">Lot Size:</span> {trade.lotSize}
        </div>
      </div>
      
      {trade.strategy && (
        <div className="mt-2 mb-2 flex items-center">
          <Tag className="h-3 w-3 mr-1 text-blue-500" />
          <span className="text-xs text-blue-500 font-medium">
            {getStrategyLabel(trade.strategy)}
          </span>
        </div>
      )}
      
      {trade.notes && (
        <div className="mt-2 text-sm">
          <div className="text-gray-600 font-medium mb-1">Notes:</div>
          <p className="text-sm text-gray-800">{trade.notes}</p>
        </div>
      )}
    </div>
  );
};
