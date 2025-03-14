
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfitLossIndicatorProps {
  amount: number;
}

export const ProfitLossIndicator: React.FC<ProfitLossIndicatorProps> = ({ amount }) => {
  const isProfitable = amount > 0;
  
  return (
    <div className="flex items-center">
      {isProfitable ? 
        <ArrowUp className="h-4 w-4 text-green-500 mr-1" /> : 
        <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
      }
      <span className={cn(
        "font-medium",
        isProfitable ? "text-green-500" : "text-red-500"
      )}>
        {isProfitable ? "+" : ""}{amount.toFixed(2)} $
      </span>
    </div>
  );
};
