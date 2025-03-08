
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../TradeFormSchema';
import { tradingStrategies } from '@/types/trade';

interface StrategyFieldProps {
  form: UseFormReturn<FormValues>;
}

export const StrategyField: React.FC<StrategyFieldProps> = ({ form }) => {
  return (
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
  );
};
