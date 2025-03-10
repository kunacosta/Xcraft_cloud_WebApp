
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrades } from '@/context/TradeContext';
import { calculateTradeStatistics } from '@/components/stats/TradeStats';
import { formatCurrency } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ComprehensiveReport = () => {
  const { trades } = useTrades();
  const stats = calculateTradeStatistics(trades);

  // Calculate monthly growth rate
  const monthlyData = Object.entries(stats.monthlyPerformance)
    .sort((a, b) => a[0].localeCompare(b[0]));
  
  let growthRate = 0;
  if (monthlyData.length >= 2) {
    const firstMonth = monthlyData[0][1].profit;
    const lastMonth = monthlyData[monthlyData.length - 1][1].profit;
    const monthSpan = monthlyData.length - 1;
    
    if (firstMonth !== 0 && monthSpan > 0) {
      // Calculate compound monthly growth rate
      growthRate = (Math.pow(lastMonth / firstMonth, 1 / monthSpan) - 1) * 100;
    }
  }

  const topPerformingPair = Object.entries(stats.tradesByPair)
    .sort((a, b) => b[1].profit - a[1].profit)[0];
  
  const worstPerformingPair = Object.entries(stats.tradesByPair)
    .sort((a, b) => a[1].profit - b[1].profit)[0];

  return (
    <Card className="bg-white shadow-md border border-gray-100">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
        <CardTitle className="text-xl font-bold">Comprehensive Trading Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <h3 className="text-xl font-semibold">1. Executive Summary</h3>
            <p className="text-gray-700">
              This report provides a comprehensive analysis of your trading activity and performance 
              over the documented period. The analysis includes performance metrics, trading patterns, 
              market insights, and strategic recommendations based on {trades.length} recorded trades.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-blue-700">Key Highlights:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                <li>Overall Trading Performance: {stats.netProfit > 0 ? 'Profitable' : 'Loss-making'}</li>
                <li>Net Profit/Loss: {formatCurrency(stats.netProfit)}</li>
                <li>Win Rate: {stats.winRate.toFixed(2)}%</li>
                <li>Profit Factor: {stats.profitFactor.toFixed(2)}</li>
                <li>Total Number of Trades: {stats.totalTrades}</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <h3 className="text-xl font-semibold">2. Performance Metrics</h3>
            <p className="text-gray-700">
              Your trading performance metrics provide insights into the effectiveness of your trading strategy
              and overall profitability.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800">Profitability Metrics</h4>
                <ul className="mt-2 space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Total Profit:</span>
                    <span className="font-medium text-green-600">{formatCurrency(stats.totalProfit)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Total Loss:</span>
                    <span className="font-medium text-red-600">{formatCurrency(stats.totalLoss)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Net Profit/Loss:</span>
                    <span className={`font-medium ${stats.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(stats.netProfit)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Average Profit per Trade:</span>
                    <span className="font-medium text-green-600">{formatCurrency(stats.avgProfit)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Average Loss per Trade:</span>
                    <span className="font-medium text-red-600">{formatCurrency(stats.avgLoss)}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800">Performance Ratios</h4>
                <ul className="mt-2 space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Win Rate:</span>
                    <span className="font-medium">{stats.winRate.toFixed(2)}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Profit Factor:</span>
                    <span className="font-medium">{stats.profitFactor.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Risk-Reward Ratio:</span>
                    <span className="font-medium">{typeof stats.riskRewardRatio === 'number' ? stats.riskRewardRatio.toFixed(2) : stats.riskRewardRatio}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sharpe Ratio:</span>
                    <span className="font-medium">{stats.sharpeRatio.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Monthly Growth Rate:</span>
                    <span className={`font-medium ${growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {growthRate.toFixed(2)}%
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-4">
            <h3 className="text-xl font-semibold">3. Detailed Analysis</h3>
            
            <div className="mt-4 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">3.1 Currency Pair Analysis</h4>
                <p className="text-gray-700 mb-3">
                  Analysis of performance across different currency pairs reveals strengths and weaknesses
                  in your trading approach for specific markets.
                </p>
                
                {topPerformingPair && (
                  <div className="bg-green-50 p-3 rounded mb-3">
                    <p className="font-medium">Top Performing Pair: {topPerformingPair[0]}</p>
                    <p className="text-sm text-gray-600">
                      Profit: {formatCurrency(topPerformingPair[1].profit)} | 
                      Win Rate: {topPerformingPair[1].winRate.toFixed(2)}% | 
                      Trades: {topPerformingPair[1].count}
                    </p>
                  </div>
                )}
                
                {worstPerformingPair && (
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-medium">Worst Performing Pair: {worstPerformingPair[0]}</p>
                    <p className="text-sm text-gray-600">
                      Profit: {formatCurrency(worstPerformingPair[1].profit)} | 
                      Win Rate: {worstPerformingPair[1].winRate.toFixed(2)}% | 
                      Trades: {worstPerformingPair[1].count}
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">3.2 Strategy Effectiveness</h4>
                <p className="text-gray-700 mb-3">
                  Evaluation of your trading strategies shows which approaches are generating positive results
                  and which may need refinement.
                </p>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="space-y-3">
                    {Object.entries(stats.tradesByStrategy)
                      .sort((a, b) => b[1].profit - a[1].profit)
                      .map(([strategy, data]) => (
                        <div key={strategy} className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{strategy}</span>
                            <span className="text-xs text-gray-500 ml-2">({data.count} trades)</span>
                          </div>
                          <div className="flex items-center">
                            <span className={`font-medium ${data.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(data.profit)}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              ({data.winRate.toFixed(1)}% win rate)
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">3.3 Risk Management Assessment</h4>
                <p className="text-gray-700 mb-3">
                  Assessment of your risk management practices based on drawdown metrics and position sizing.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="font-medium mb-1">Maximum Drawdown</p>
                    <p className="text-lg font-semibold">{formatCurrency(stats.maxDrawdown)}</p>
                    <p className="text-xs text-gray-500">
                      {stats.maxDrawdownPercentage.toFixed(2)}% of peak balance
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="font-medium mb-1">Largest Loss</p>
                    <p className="text-lg font-semibold text-red-500">{formatCurrency(stats.largestLoss)}</p>
                    <p className="text-xs text-gray-500">
                      {((stats.largestLoss / stats.totalLoss) * 100).toFixed(2)}% of total losses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4">
            <h3 className="text-xl font-semibold">4. Recommendations & Conclusion</h3>
            
            <div className="space-y-4 mt-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">4.1 Strategic Recommendations</h4>
                
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {stats.winRate < 50 && (
                    <li>
                      <span className="font-medium">Improve Win Rate:</span> Your current win rate of {stats.winRate.toFixed(2)}% 
                      suggests a need to refine entry and exit criteria. Consider implementing stricter validation 
                      before entering trades.
                    </li>
                  )}
                  
                  {topPerformingPair && (
                    <li>
                      <span className="font-medium">Capitalize on Strengths:</span> Focus more on {topPerformingPair[0]} 
                      which has shown strong performance with a {topPerformingPair[1].winRate.toFixed(2)}% win rate and 
                      {formatCurrency(topPerformingPair[1].profit)} in profits.
                    </li>
                  )}
                  
                  {worstPerformingPair && worstPerformingPair[1].profit < 0 && (
                    <li>
                      <span className="font-medium">Address Weaknesses:</span> Consider reducing exposure to {worstPerformingPair[0]} 
                      which has resulted in {formatCurrency(Math.abs(worstPerformingPair[1].profit))} in losses, or refine your 
                      strategy for this pair.
                    </li>
                  )}
                  
                  {stats.maxDrawdownPercentage > 20 && (
                    <li>
                      <span className="font-medium">Enhance Risk Management:</span> Your maximum drawdown of {stats.maxDrawdownPercentage.toFixed(2)}% 
                      is significant. Consider implementing stricter position sizing and stop-loss protocols.
                    </li>
                  )}
                  
                  {typeof stats.riskRewardRatio === 'number' && stats.riskRewardRatio < 1 && (
                    <li>
                      <span className="font-medium">Improve Risk-Reward Ratio:</span> Your current risk-reward ratio of {stats.riskRewardRatio.toFixed(2)} 
                      indicates you're risking more than you're gaining on average. Aim for a minimum ratio of 1:1.5.
                    </li>
                  )}
                  
                  <li>
                    <span className="font-medium">Regular Review:</span> Continue documenting and analyzing trades to identify patterns 
                    and refine strategies. Monthly performance reviews can help maintain discipline and focus.
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">4.2 Conclusion</h4>
                <p className="text-gray-700">
                  This comprehensive analysis provides a detailed view of your trading performance, highlighting strengths 
                  to leverage and areas for improvement. By implementing the recommended strategies and maintaining disciplined 
                  trading practices, you can work towards enhancing your overall profitability and reducing drawdowns.
                </p>
                <p className="text-gray-700 mt-2">
                  The key to successful trading lies in continuous improvement and adaptation. Use this analysis as a 
                  foundation for refining your trading approach, and consider revisiting these metrics regularly to 
                  track your progress and make necessary adjustments to your strategy.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ComprehensiveReport;
