
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
  // Convert the icon string to the actual component
  const IconComponent = 
    typeof insight.icon === 'string' 
      ? iconComponents[insight.icon as keyof typeof iconComponents]
      : insight.icon;

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
