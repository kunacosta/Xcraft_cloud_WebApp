
import React from 'react';
import { Trade } from '@/types/trade';
import { calculateBasicStats, BasicTradeStats } from './helpers/calculateBasicStats';
import { calculateSequenceStats, SequenceTradeStats } from './helpers/calculateSequenceStats';
import { calculateAdvancedStats, AdvancedTradeStats } from './helpers/calculateAdvancedStats';
import { calculateBreakdownStats, BreakdownStats } from './helpers/calculateBreakdownStats';

export interface TradeStatistics extends 
  BasicTradeStats, 
  SequenceTradeStats, 
  AdvancedTradeStats, 
  BreakdownStats {}

export const calculateTradeStatistics = (trades: Trade[]): TradeStatistics => {
  // Calculate basic statistics first
  const basicStats = calculateBasicStats(trades);
  
  // Calculate sequence-based statistics
  const sequenceStats = calculateSequenceStats(trades);
  
  // Calculate advanced statistics using some of the basic stats
  const advancedStats = calculateAdvancedStats(
    trades, 
    basicStats.winRate, 
    basicStats.avgProfit, 
    basicStats.avgLoss
  );
  
  // Calculate breakdown statistics
  const breakdownStats = calculateBreakdownStats(trades);
  
  // Combine all statistics into one object
  return {
    ...basicStats,
    ...sequenceStats,
    ...advancedStats,
    ...breakdownStats
  };
};
