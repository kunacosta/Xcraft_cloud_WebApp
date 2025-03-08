
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Trade } from '@/types/trade';
import { CardHeader as UICardHeader } from '@/components/ui/card';
import { TradeStatusBadge } from './TradeStatusBadge';

interface CardHeaderProps {
  trade: Trade;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ trade }) => {
  const formattedDate = formatDistanceToNow(new Date(trade.date), { addSuffix: true });
  
  return (
    <UICardHeader className="p-4 pb-2 flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-white">
      <div className="flex items-center">
        <span className="text-lg font-montserrat font-bold">{trade.currencyPair}</span>
        <TradeStatusBadge tradeType={trade.tradeType} />
      </div>
      <div className="text-sm text-gray-600">
        {formattedDate}
      </div>
    </UICardHeader>
  );
};
