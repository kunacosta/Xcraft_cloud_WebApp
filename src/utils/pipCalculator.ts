
// Currency pair specific pip value calculation
export type PipCalculatorOptions = {
  baseAmount: number;
  lotSize: number;
  currencyPair: string;
};

// More accurate pip calculation based on currency pair
export const calculatePipValue = (options: PipCalculatorOptions): number => {
  const { baseAmount, lotSize, currencyPair } = options;
  
  // Standard lot size is 100,000 units of base currency
  const standardLot = 100000;
  const pipValuePerStandardLot = getPipValueForPair(currencyPair);
  
  // Calculate pip value based on lot size
  return (lotSize / standardLot) * pipValuePerStandardLot * baseAmount;
};

// Calculate pip difference between entry and exit prices
export const calculatePipDifference = (entryPrice: number, exitPrice: number, tradeType: 'buy' | 'sell', currencyPair: string): number => {
  // For most pairs, 1 pip = 0.0001, but for JPY pairs, 1 pip = 0.01
  const pipMultiplier = currencyPair.includes('JPY') ? 100 : 10000;
  
  // Calculate based on trade direction
  if (tradeType === 'buy') {
    return (exitPrice - entryPrice) * pipMultiplier;
  } else {
    return (entryPrice - exitPrice) * pipMultiplier;
  }
};

// Get pip value for specific currency pair
const getPipValueForPair = (currencyPair: string): number => {
  // Default pip value for most pairs (in USD)
  let pipValue = 10; // $10 per pip for a standard lot
  
  // Adjust pip value based on currency pair
  if (currencyPair.includes('JPY')) {
    pipValue = 8.30; // Approximate for JPY pairs
  } else if (currencyPair.includes('GBP/USD')) {
    pipValue = 10;
  } else if (currencyPair.includes('EUR/USD')) {
    pipValue = 10;
  } else if (currencyPair.includes('AUD/USD')) {
    pipValue = 10;
  } else if (currencyPair.includes('NZD/USD')) {
    pipValue = 10;
  } else if (currencyPair.includes('USD/CAD')) {
    pipValue = 8;
  } else if (currencyPair.includes('USD/CHF')) {
    pipValue = 9.30;
  }
  
  return pipValue;
};

// Calculate profit/loss for a trade
export const calculateProfitLoss = (
  entryPrice: number,
  exitPrice: number,
  lotSize: number,
  tradeType: 'buy' | 'sell',
  currencyPair: string
): number => {
  // Calculate pip difference
  const pipDifference = calculatePipDifference(entryPrice, exitPrice, tradeType, currencyPair);
  
  // Calculate pip value
  const options: PipCalculatorOptions = {
    baseAmount: 1,
    lotSize: lotSize * 100000, // Convert to standard lot units
    currencyPair
  };
  
  const pipValue = calculatePipValue(options);
  
  // Calculate total profit/loss
  return pipDifference * pipValue;
};
