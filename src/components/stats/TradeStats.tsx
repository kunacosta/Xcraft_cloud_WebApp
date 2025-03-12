
import { Trade } from '@/types/trade';
import { calculateBasicStats, BasicTradeStats } from './utils/basicStats';
import { calculateAdvancedStats, AdvancedTradeStats } from './utils/advancedStats';
import { calculateRiskMetrics, RiskMetrics } from './utils/riskStats';
import { calculateBreakdowns, BreakdownStats } from './utils/breakdownStats';

export interface TradeStatistics extends 
  BasicTradeStats, 
  AdvancedTradeStats, 
  RiskMetrics, 
  BreakdownStats {}

export const calculateTradeStatistics = (trades: Trade[]): TradeStatistics => {
  const basicStats = calculateBasicStats(trades);
  const advancedStats = calculateAdvancedStats(trades, basicStats);
  const riskMetrics = calculateRiskMetrics(trades, basicStats);
  const breakdowns = calculateBreakdowns(trades);
  
  return {
    ...basicStats,
    ...advancedStats,
    ...riskMetrics,
    ...breakdowns
  };
};
