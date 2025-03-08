
import React from 'react';
import { useTrades } from '@/context/TradeContext';
import EmptyState from '@/components/EmptyState';
import ProfitLossChart from '@/components/analytics/ProfitLossChart';
import CurrencyPairChart from '@/components/analytics/CurrencyPairChart';
import TradeTypeChart from '@/components/analytics/TradeTypeChart';
import DataInsights from '@/components/analytics/DataInsights';

const Analytics = () => {
  const { trades, loading } = useTrades();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }
  
  if (trades.length === 0) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold font-poppins mb-8">Analytics</h1>
        <div className="min-h-[400px] flex items-center justify-center">
          <EmptyState
            title="No data to analyze"
            description="Add some trades to see analytics and performance insights."
            action={{ label: "Go to Dashboard", href: "/" }}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <h1 className="text-3xl font-bold font-poppins relative inline-block mb-8">
        <span className="relative z-10">Analytics Dashboard</span>
        <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-100 rounded-sm -z-10 transform -rotate-1"></span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfitLossChart trades={trades} />
        <CurrencyPairChart trades={trades} />
        <TradeTypeChart trades={trades} />
      </div>
      
      <DataInsights />
    </div>
  );
};

export default Analytics;
