
import React from 'react';
import { cn } from '@/lib/utils';
import { TradeType } from '@/types/trade';

interface TradeStatusBadgeProps {
  tradeType: TradeType;
}

export const TradeStatusBadge: React.FC<TradeStatusBadgeProps> = ({ tradeType }) => {
  return (
    <span className={cn(
      "ml-2 text-xs font-medium px-2 py-0.5 rounded-full",
      tradeType === 'buy' ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"
    )}>
      {tradeType === 'buy' ? 'BUY' : 'SELL'}
    </span>
  );
};
