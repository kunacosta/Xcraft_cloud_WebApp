
import { Trade } from '@/types/trade';

export interface SequenceTradeStats {
  consecutiveWins: number;
  consecutiveLosses: number;
  largestWin: number;
  largestLoss: number;
}

export const calculateSequenceStats = (trades: Trade[]): SequenceTradeStats => {
  // Sort trades by date (newest first)
  const sortedTrades = [...trades].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Find consecutive wins/losses
  let currentConsecutiveWins = 0;
  let maxConsecutiveWins = 0;
  let currentConsecutiveLosses = 0;
  let maxConsecutiveLosses = 0;
  
  sortedTrades.forEach(trade => {
    if (trade.amount > 0) {
      // Winning trade
      currentConsecutiveWins++;
      currentConsecutiveLosses = 0;
      if (currentConsecutiveWins > maxConsecutiveWins) {
        maxConsecutiveWins = currentConsecutiveWins;
      }
    } else {
      // Losing trade
      currentConsecutiveLosses++;
      currentConsecutiveWins = 0;
      if (currentConsecutiveLosses > maxConsecutiveLosses) {
        maxConsecutiveLosses = currentConsecutiveLosses;
      }
    }
  });
  
  // Find largest win and loss
  const winningTradesArr = trades.filter(trade => trade.amount > 0);
  const losingTradesArr = trades.filter(trade => trade.amount <= 0);
  
  const largestWin = winningTradesArr.length > 0 
    ? Math.max(...winningTradesArr.map(t => t.amount))
    : 0;
    
  const largestLoss = losingTradesArr.length > 0 
    ? Math.abs(Math.min(...losingTradesArr.map(t => t.amount)))
    : 0;
    
  return {
    consecutiveWins: maxConsecutiveWins,
    consecutiveLosses: maxConsecutiveLosses,
    largestWin,
    largestLoss
  };
};
