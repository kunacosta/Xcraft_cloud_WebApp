
// Pip calculation utilities for forex trading - for reference only when manually calculating

// Standard pip sizes
const PIP_SIZE = {
  JPY: 0.01,   // For JPY pairs, a pip is 0.01
  STANDARD: 0.0001  // For most other pairs, a pip is 0.0001
};

// Calculate pip difference between entry and exit prices
export const calculatePips = (
  entryPrice: number, 
  exitPrice: number, 
  currencyPair: string, 
  tradeType: 'buy' | 'sell'
): number => {
  // Determine if it's a JPY pair
  const isJpyPair = currencyPair.includes('JPY');
  const pipSize = isJpyPair ? PIP_SIZE.JPY : PIP_SIZE.STANDARD;
  
  // Calculate price difference based on trade direction
  let priceDifference: number;
  if (tradeType === 'buy') {
    priceDifference = exitPrice - entryPrice;
  } else { // sell
    priceDifference = entryPrice - exitPrice;
  }
  
  // Calculate pips by dividing the price difference by the pip size
  return priceDifference / pipSize;
};

// Get estimated pip value in USD for a standard lot (100,000 units)
export const calculatePipValue = (currencyPair: string): number => {
  // Standard pip values per 100,000 units (standard lot)
  // These are approximations and would ideally be updated with real exchange rates
  if (currencyPair.startsWith('USD/') || currencyPair.endsWith('/USD')) {
    // For pairs with USD as base or quote currency
    return 10; // $10 per pip for standard lot
  } else if (currencyPair.includes('JPY')) {
    // For JPY pairs without USD
    return 8.30; // Approximate for JPY cross pairs
  } else if (currencyPair.includes('EUR')) {
    // For EUR pairs without USD
    return 11.20; // Approximate for EUR cross pairs
  } else if (currencyPair.includes('GBP')) {
    // For GBP pairs without USD
    return 13.10; // Approximate for GBP cross pairs
  }
  
  // Default pip value if not matched above
  return 10;
};

// Calculate monetary value based on pips, pip value, and lot size
export const calculateMonetaryValue = (
  pips: number, 
  pipValuePerStandardLot: number, 
  lotSize: number
): number => {
  // Standard lot is 100,000 units, so we convert the lot size
  // 1.0 lot = 100,000 units
  // 0.1 lot = 10,000 units (mini lot)
  // 0.01 lot = 1,000 units (micro lot)
  return pips * pipValuePerStandardLot * lotSize;
};

// For frontend display - get lot size name based on value
export const getLotSizeName = (lotSize: number): string => {
  if (lotSize >= 1) return 'Standard Lot';
  if (lotSize >= 0.1) return 'Mini Lot';
  if (lotSize >= 0.01) return 'Micro Lot';
  return 'Custom';
};
