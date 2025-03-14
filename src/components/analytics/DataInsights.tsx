
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useTrades } from '@/context/TradeContext';
import { generateInsights } from './helpers/generateInsights';
import InsightItem from './InsightItem';

const DataInsights: React.FC = () => {
  const { trades } = useTrades();
  
  const insights = generateInsights(trades);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100 mt-6 shadow-lg transition-all hover:shadow-xl">
      <div className="flex items-center text-blue-700 mb-4">
        <Lightbulb className="h-6 w-6 mr-2" />
        <h3 className="font-semibold text-lg">Data Insights</h3>
      </div>
      
      {insights.length > 0 ? (
        <div className="space-y-3">
          {insights.map((insight, idx) => (
            <InsightItem key={idx} insight={insight} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          Charts display your trading activity across different time periods and instruments. 
          Add more trades to see richer data visualization and trends.
        </p>
      )}
      
      <div className="mt-4 text-sm text-gray-500 italic">
        Note: Insights are based on your current trading data and should not be considered as financial advice.
      </div>
    </div>
  );
};

export default DataInsights;
