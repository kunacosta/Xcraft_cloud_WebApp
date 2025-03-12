
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfitLossIndicatorProps {
  profitLoss: number;
  amount: number;
}

export const ProfitLossIndicator: React.FC<ProfitLossIndicatorProps> = ({ profitLoss, amount }) => {
  // Fix for displaying zero values correctly
  const formattedAmount = Math.abs(amount) < 0.005 ? 0 : amount;
  const isProfitable = formattedAmount > 0;
  
  // Format the value as currency
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(Math.abs(value));
  };
  
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
        {formattedAmount === 0 
          ? "$0.00" 
          : formattedAmount > 0 
            ? formatValue(formattedAmount)
            : `-${formatValue(formattedAmount)}`
        }
      </span>
    </div>
  );
};
