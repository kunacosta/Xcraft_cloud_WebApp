
import React from 'react';
import { Insight } from './helpers/generateInsights';
import { 
  TrendingUp, 
  TrendingDown, 
  CircleDollarSign, 
  BarChart2 
} from 'lucide-react';

interface InsightItemProps {
  insight: Insight;
}

// Map of icon strings to actual components
const iconComponents = {
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  BarChart2
};

const InsightItem: React.FC<InsightItemProps> = ({ insight }) => {
  // Get the correct icon component
  const IconComponent = iconComponents[insight.icon as keyof typeof iconComponents] || TrendingUp;

  return (
    <div className="flex items-start">
      <div className={`p-2 rounded-full mr-3 mt-1 ${insight.bg}`}>
        <IconComponent className={`h-4 w-4 ${insight.color}`} />
      </div>
      <p className="text-gray-700">{insight.text}</p>
    </div>
  );
};

export default InsightItem;
