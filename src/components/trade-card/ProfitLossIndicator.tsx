
import React from 'react';
import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfitLossIndicatorProps {
  profitLoss: number;
  amount: number;
}

export const ProfitLossIndicator: React.FC<ProfitLossIndicatorProps> = ({ profitLoss, amount }) => {
  // Fix for displaying zero values correctly
  const formattedAmount = Math.abs(amount) < 0.005 ? 0 : amount;
  const isProfitable = formattedAmount > 0;
  
  return (
    <div className="flex items-center">
      {isProfitable ? 
        <ArrowUp className="h-4 w-4 text-green-500 mr-1" /> : 
        formattedAmount === 0 ?
          null : // Don't show arrow for zero
          <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
      }
      <span className={cn(
        "font-medium",
        formattedAmount > 0 ? "text-green-500" : 
        formattedAmount < 0 ? "text-red-500" : "text-gray-500" // neutral color for zero
      )}>
        <DollarSign className="h-3 w-3 inline" />
        {formattedAmount === 0 
          ? "0.00" 
          : `${isProfitable ? "" : "-"}${Math.abs(formattedAmount).toFixed(2)}`
        }
      </span>
    </div>
  );
};
