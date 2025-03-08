
import React from 'react';
import { Lightbulb } from 'lucide-react';

const DataInsights: React.FC = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 mt-6 shadow-card">
      <div className="flex items-center text-blue-600 mb-3">
        <Lightbulb className="h-5 w-5 mr-2" />
        <h3 className="font-medium text-lg">Data Insights</h3>
      </div>
      <p className="text-gray-600">
        Charts display your trading activity across different time periods and instruments. 
        Add more trades to see richer data visualization and trends.
      </p>
    </div>
  );
};

export default DataInsights;
