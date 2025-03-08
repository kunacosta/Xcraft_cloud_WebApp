
import * as z from 'zod';

// Form validation schema for the trade form
export const formSchema = z.object({
  currencyPair: z.string().min(1, "Currency pair is required"),
  tradeType: z.enum(['buy', 'sell']),
  entryPrice: z.coerce.number().positive("Entry price must be positive"),
  exitPrice: z.coerce.number().positive("Exit price must be positive"),
  lotSize: z.coerce.number().positive("Lot size must be positive"),
  profitLoss: z.coerce.number(), // This will be in pips, calculated automatically
  amount: z.coerce.number(), // Monetary amount in account currency, calculated automatically
  notes: z.string().optional(),
  strategy: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

// Currency pair options
export const currencyPairs = [
  'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 
  'USD/CAD', 'AUD/USD', 'NZD/USD', 'EUR/GBP',
  'EUR/JPY', 'GBP/JPY', 'AUD/JPY', 'EUR/AUD'
];
