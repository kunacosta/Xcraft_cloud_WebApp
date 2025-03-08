
import React, { useEffect } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { FormValues, currencyPairs } from './TradeFormSchema';
import { tradingStrategies } from '@/types/trade';

interface TradeFormFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const TradeFormFields: React.FC<TradeFormFieldsProps> = ({ form }) => {
  // Watch form values for automatic pip calculation
  const entryPrice = useWatch({
    control: form.control,
    name: "entryPrice",
    defaultValue: 0
  });
  
  const exitPrice = useWatch({
    control: form.control,
    name: "exitPrice",
    defaultValue: 0
  });
  
  const tradeType = useWatch({
    control: form.control,
    name: "tradeType",
    defaultValue: "buy"
  });

  // Calculate pips whenever entry price, exit price, or trade type changes
  useEffect(() => {
    if (entryPrice && exitPrice) {
      // Calculate pips based on the difference between entry and exit prices
      let pipDifference = 0;
      
      // For buy trades: exitPrice - entryPrice
      // For sell trades: entryPrice - exitPrice
      if (tradeType === 'buy') {
        pipDifference = (exitPrice - entryPrice) * 10000; // Convert to pips (4 decimal places)
      } else {
        pipDifference = (entryPrice - exitPrice) * 10000; // Convert to pips (4 decimal places)
      }
      
      // Update the form with the calculated pips
      form.setValue("profitLoss", Number(pipDifference.toFixed(2)));
    }
  }, [entryPrice, exitPrice, tradeType, form]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="currencyPair"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency Pair</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency pair" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currencyPairs.map((pair) => (
                    <SelectItem key={pair} value={pair}>
                      {pair}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tradeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trade Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trade type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="buy">Buy (Long)</SelectItem>
                  <SelectItem value="sell">Sell (Short)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="entryPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entry Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.00001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="exitPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exit Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.00001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="lotSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lot Size</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="profitLoss"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profit/Loss (pips) - Auto-calculated</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} readOnly className="bg-gray-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount ($) - Manual Input</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="Enter monetary value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="strategy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trading Strategy</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select trading strategy (optional)" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {tradingStrategies.map((strategy) => (
                  <SelectItem key={strategy.value} value={strategy.value}>
                    {strategy.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Add your trade notes here (strategy, market conditions, etc.)" 
                {...field} 
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
